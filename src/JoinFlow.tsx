import { useEffect, useMemo, useState, type CSSProperties } from "react";

/**
 * Web guest flow — join by code, pick availability, vote on destinations, and
 * submit, all without downloading the app. Writes to the SAME Supabase backend
 * the app uses (public anon key + the public RPCs), so the organiser sees these
 * responses in their app exactly as if the guest had used it.
 */

const SUPABASE_URL = "https://damhyqmutzsljksswlpr.supabase.co";
// Public anon key — designed to be shipped to clients; every table is RLS-guarded
// and guest writes go through SECURITY DEFINER RPCs. Same value as the app bundle.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbWh5cW11dHpzbGprc3N3bHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NjUxNDcsImV4cCI6MjEwMDM0MTE0N30.KvYipj6YA7coQdkpT8qzwZIzpL5lPb5qCTa6c_x0p78";

const EMOJI_OPTIONS = ["😎", "🤙", "🍻", "🏄", "🐨", "🔥", "😊", "🎒"];

interface Destination {
  id: string;
  name: string;
  emoji: string;
  country?: string | null;
}
interface TripInvite {
  id: string;
  code: string;
  title: string;
  description: string | null;
  date_range_start: string;
  date_range_end: string;
  trip_length_min: number;
  trip_length_max: number;
  group_size_estimate: number;
  status: "open" | "closed" | "decided";
  destinations: Destination[];
  responseCount: number;
}

interface SubmissionReceipt {
  responseId: string;
  expenseAccessToken: string;
}

type Step = "identity" | "dates" | "vote" | "review" | "done";

async function rpc<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg =
      (data as { message?: string } | null)?.message ||
      `Request failed (${res.status}).`;
    throw new Error(msg);
  }
  if (data && typeof data === "object" && "error" in data) {
    const err = (data as { error?: unknown }).error;
    if (typeof err === "string") throw new Error(err);
  }
  return data as T;
}

/** Every YYYY-MM-DD from start→end inclusive, in local time (no UTC drift). */
function eachDate(startISO: string, endISO: string): string[] {
  const [sy, sm, sd] = startISO.split("-").map(Number);
  const [ey, em, ed] = endISO.split("-").map(Number);
  if ([sy, sm, sd, ey, em, ed].some((n) => !Number.isFinite(n))) return [];
  const cur = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const out: string[] = [];
  let guard = 0;
  while (cur <= end && guard < 400) {
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const d = String(cur.getDate()).padStart(2, "0");
    out.push(`${cur.getFullYear()}-${m}-${d}`);
    cur.setDate(cur.getDate() + 1);
    guard += 1;
  }
  return out;
}

function isWeekend(iso: string): boolean {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = new Date(y, m - 1, d).getDay();
  return wd === 0 || wd === 6;
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function shortDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function dateRangeLabel(startISO: string, endISO: string): string {
  return `${shortDateLabel(startISO)} – ${shortDateLabel(endISO)}`;
}

/** Mon-first weekday index (0=Mon … 6=Sun). */
function mondayIndex(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return (new Date(y, m - 1, d).getDay() + 6) % 7;
}

function submissionId(tripId: string): string {
  const key = `grouptraveller/web-submission/${tripId}`;
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `web-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    return `web-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }
}

const S = {
  page: {
    minHeight: "100dvh",
    background: "var(--offwhite)",
    color: "var(--navy)",
    fontFamily: "var(--sans)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 18px 48px",
  } as CSSProperties,
  wrap: { width: "100%", maxWidth: 480 } as CSSProperties,
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 800,
    fontSize: 18,
    justifyContent: "center",
    marginBottom: 20,
    fontFamily: "var(--display)",
  } as CSSProperties,
  dot: {
    width: 28,
    height: 28,
    borderRadius: 9,
    background: "linear-gradient(135deg, var(--coral), #ff8c5a)",
    display: "grid",
    placeItems: "center",
    fontSize: 16,
  } as CSSProperties,
  card: {
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: 24,
    padding: "26px 22px",
    boxShadow: "var(--shadow)",
  } as CSSProperties,
  kicker: {
    display: "inline-block",
    background: "var(--lavender)",
    color: "var(--navy)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    padding: "6px 12px",
    borderRadius: 999,
  } as CSSProperties,
  h1: {
    fontSize: 27,
    lineHeight: 1.15,
    fontWeight: 800,
    margin: "14px 0 6px",
    fontFamily: "var(--display)",
  } as CSSProperties,
  sub: { color: "var(--muted)", fontSize: 15, lineHeight: 1.5, margin: 0 } as CSSProperties,
  primaryBtn: {
    width: "100%",
    marginTop: 22,
    background: "linear-gradient(135deg, var(--coral), #ff8c5a)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    border: "none",
    borderRadius: 15,
    padding: "15px 18px",
    cursor: "pointer",
    boxShadow: "0 12px 24px -12px rgba(255,107,53,0.7)",
  } as CSSProperties,
  ghostBtn: {
    flex: 1,
    background: "var(--white)",
    color: "var(--navy)",
    fontSize: 15,
    fontWeight: 700,
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: "14px 12px",
    cursor: "pointer",
  } as CSSProperties,
  input: {
    width: "100%",
    marginTop: 16,
    fontSize: 17,
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid var(--line)",
    background: "var(--offwhite)",
    color: "var(--navy)",
    boxSizing: "border-box",
    fontFamily: "var(--sans)",
  } as CSSProperties,
  chip: (active: boolean): CSSProperties => ({
    borderRadius: 999,
    padding: "9px 13px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    border: `1px solid ${active ? "var(--coral)" : "var(--line)"}`,
    background: active ? "var(--coral)" : "var(--white)",
    color: active ? "#fff" : "var(--navy)",
  }),
  foot: {
    color: "var(--muted)",
    fontSize: 12.5,
    textAlign: "center",
    marginTop: 18,
  } as CSSProperties,
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.brand}>
          <span style={S.dot}>✈️</span> GroupTraveller
        </div>
        {children}
        <p style={S.foot}>GroupTraveller · plan trips with your group, together.</p>
      </div>
    </div>
  );
}

export default function JoinFlow({ code }: { code: string }) {
  const [trip, setTrip] = useState<TripInvite | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState<Step>("identity");
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);
  const [dates, setDates] = useState<string[]>([]);
  // Where the people who already answered overlap. Counts only — never names;
  // anyone with the invite code can call this. Fails soft to no shading.
  const [overlap, setOverlap] = useState<{
    counts: Record<string, number>;
    respondentCount: number;
  }>({ counts: {}, respondentCount: 0 });
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [voteIndex, setVoteIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    rpc<TripInvite>("get_trip_invite", { p_code: code })
      .then((data) => {
        if (!active) return;
        setTrip(data);
        setLoadError(null);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setLoadError(e instanceof Error ? e.message : "Couldn't load this trip.");
      })
      .finally(() => active && setLoading(false));

    // Best-effort: shading is a nicety, so a failure here must never block
    // someone from voting.
    rpc<{ counts?: Record<string, number>; respondentCount?: number }>(
      "get_trip_availability",
      { p_code: code }
    )
      .then((data) => {
        if (!active) return;
        setOverlap({
          counts: data?.counts ?? {},
          respondentCount: data?.respondentCount ?? 0,
        });
      })
      .catch(() => {
        /* no shading */
      });

    return () => {
      active = false;
    };
  }, [code]);

  const months = useMemo(() => {
    if (!trip) return [] as Array<[string, string[]]>;
    const all = eachDate(trip.date_range_start, trip.date_range_end);
    const byMonth = new Map<string, string[]>();
    for (const iso of all) {
      const key = iso.slice(0, 7);
      const list = byMonth.get(key);
      if (list) list.push(iso);
      else byMonth.set(key, [iso]);
    }
    return [...byMonth.entries()];
  }, [trip]);

  if (loading) {
    return (
      <Shell>
        <div style={S.card}>
          <p style={{ ...S.sub, textAlign: "center", padding: "16px 0" }}>
            Loading your trip…
          </p>
        </div>
      </Shell>
    );
  }

  if (loadError || !trip) {
    return (
      <Shell>
        <div style={S.card}>
          <span style={S.kicker}>Hmm</span>
          <h1 style={S.h1}>We couldn't find that trip</h1>
          <p style={S.sub}>
            {loadError ?? "Check the invite link or ask the organiser to resend it."}
          </p>
        </div>
      </Shell>
    );
  }

  if (trip.status !== "open") {
    return (
      <Shell>
        <div style={S.card}>
          <span style={S.kicker}>
            {trip.status === "decided" ? "Locked in" : "Voting closed"}
          </span>
          <h1 style={S.h1}>{trip.title}</h1>
          <p style={S.sub}>
            {trip.status === "decided"
              ? "This trip is decided — the group already picked. Ask the organiser for the details!"
              : "Voting has closed for this trip. Ask the organiser if it can be reopened."}
          </p>
        </div>
      </Shell>
    );
  }

  // Guests must pick ONE consecutive block whose length matches the trip the
  // organiser planned. Mirrors lib/dateSelection.ts in the app — kept in sync by
  // hand because the two bundles share no code.
  const minNights = trip.trip_length_min;
  const nights = Math.max(0, dates.length - 1);
  const hasCompleteRange = dates.length > 1;
  const datesValid = hasCompleteRange && nights >= minNights;
  const minimumWanted = `${minNights} ${minNights === 1 ? "night" : "nights"}`;
  const rangeError = !hasCompleteRange
    ? null
    : nights < minNights
      ? `Too short · minimum is ${minimumWanted}`
      : null;
  const selectionLabel =
    dates.length === 0
      ? "Tap a date to start the range"
      : dates.length === 1
        ? "Now tap an end date"
        : dateRangeLabel(dates[0], dates[dates.length - 1]);
  const rangeStart = dates[0] ?? null;
  const rangeEnd = dates.length > 1 ? dates[dates.length - 1] : null;

  /** Background tint by how much of the group is already free (see the app's
   *  overlapTint — kept in sync by hand; the bundles share no code). */
  const overlapTint = (iso: string): string | null => {
    const free = overlap.counts[iso] ?? 0;
    if (overlap.respondentCount <= 0 || free <= 0) return null;
    const share = free / overlap.respondentCount;
    if (share >= 0.999) return "rgba(255,107,53,0.28)";
    if (share >= 0.5) return "rgba(255,107,53,0.16)";
    return "rgba(139,124,246,0.14)";
  };

  const toggleDate = (iso: string) =>
    setDates((prev) => {
      if (prev.length === 0) return [iso];
      if (prev.length > 1) return [iso]; // completed block → start over
      const anchor = prev[0];
      if (iso === anchor) return [];
      const [a, b] = iso < anchor ? [iso, anchor] : [anchor, iso];
      return eachDate(a, b);
    });

  const dest = trip.destinations[voteIndex];

  const castVote = (liked: boolean) => {
    if (!dest) return;
    setVotes((prev) => ({ ...prev, [dest.id]: liked }));
    if (voteIndex + 1 < trip.destinations.length) {
      setVoteIndex((i) => i + 1);
    } else {
      setStep("review");
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const votePayload = trip.destinations.map((d) => ({
        destination_id: d.id,
        liked: votes[d.id] ?? false,
      }));
      const receipt = await rpc<Partial<SubmissionReceipt>>(
        "submit_trip_response",
        {
          p_trip_id: trip.id,
          p_guest_name: name.trim() || "Guest",
          p_guest_emoji: emoji,
          p_available_dates: dates,
          p_votes: votePayload,
          p_submission_id: submissionId(trip.id),
          p_trip_code: trip.code,
        }
      );
      if (
        typeof receipt.responseId !== "string" ||
        typeof receipt.expenseAccessToken !== "string"
      ) {
        throw new Error("The trip response returned an invalid receipt.");
      }

      // `submit_trip_response` deliberately replays the original receipt when
      // this browser retries its stable submission ID. Apply the current
      // payload through the capability-scoped edit RPC so returning voters see
      // success only after their latest dates and votes are actually saved.
      await rpc("update_trip_response", {
        p_trip_id: trip.id,
        p_response_id: receipt.responseId,
        p_access_token: receipt.expenseAccessToken,
        p_guest_name: name.trim() || "Guest",
        p_guest_emoji: emoji,
        p_available_dates: dates,
        p_votes: votePayload,
      });
      setStep("done");
    } catch (e: unknown) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const likedCount = trip.destinations.filter((d) => votes[d.id]).length;

  return (
    <Shell>
      <div style={S.card}>
        {/* progress dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {(["identity", "dates", "vote", "review"] as Step[]).map((s, i) => {
            const order = ["identity", "dates", "vote", "review"];
            const active = order.indexOf(step) >= i;
            return (
              <span
                key={s}
                style={{
                  height: 6,
                  flex: 1,
                  borderRadius: 999,
                  background: active ? "var(--coral)" : "var(--line)",
                }}
              />
            );
          })}
        </div>

        {step === "identity" && (
          <>
            <span style={S.kicker}>You're invited</span>
            <h1 style={S.h1}>Help plan “{trip.title}”</h1>
            <p style={S.sub}>
              Vote on the dates and destination — no account, no download.
              {trip.responseCount > 0
                ? ` ${trip.responseCount} ${
                    trip.responseCount === 1 ? "person has" : "people have"
                  } responded so far.`
                : ""}
            </p>
            <input
              style={S.input}
              placeholder="What do we call you?"
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  onClick={() => setEmoji(em)}
                  aria-label={`Pick ${em}`}
                  style={{
                    ...S.chip(emoji === em),
                    fontSize: 20,
                    width: 46,
                    height: 46,
                    padding: 0,
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
            <button
              style={{ ...S.primaryBtn, opacity: name.trim() ? 1 : 0.5 }}
              disabled={!name.trim()}
              onClick={() => setStep("dates")}
            >
              Next: pick your dates →
            </button>
          </>
        )}

        {step === "dates" && (
          <>
            <span style={S.kicker}>Step 1 · Date range</span>
            <h1 style={S.h1}>Choose your date range, {name.trim() || "traveller"}</h1>
            <p style={{ ...S.sub, marginTop: 6 }}>
              Tap the first and last day · at least {minimumWanted}
            </p>

            <div
              role="status"
              aria-live="polite"
              style={{
                marginTop: 16,
                padding: "13px 15px",
                borderRadius: 14,
                border: `1px solid ${rangeError ? "var(--coral-dark)" : "var(--line)"}`,
                background: rangeError ? "var(--coral-faint)" : "var(--white)",
                color: rangeError ? "var(--coral-dark)" : "var(--navy)",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {rangeError ?? selectionLabel}
            </div>

            {months.map(([key, monthDates]) => {
              const lead = monthDates.length ? mondayIndex(monthDates[0]) : 0;
              return (
                <div key={key} style={{ marginTop: 18 }}>
                  <p style={{ fontWeight: 700, margin: "0 0 8px" }}>{monthLabel(key)}</p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 6,
                    }}
                  >
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span
                        key={i}
                        style={{
                          textAlign: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--muted)",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: lead }).map((_, i) => (
                      <span key={`b${i}`} />
                    ))}
                    {monthDates.map((iso) => {
                      const active = dates.includes(iso);
                      const endpoint =
                        active && (iso === rangeStart || iso === rangeEnd);
                      const middle = active && !endpoint;
                      const day = Number(iso.slice(8, 10));
                      const rangePosition =
                        iso === rangeStart
                          ? "start of selected range"
                          : iso === rangeEnd
                            ? "end of selected range"
                            : middle
                              ? "within selected range"
                              : null;
                      const overlapLabel =
                        (overlap.counts[iso] ?? 0) > 0
                          ? `${overlap.counts[iso]} of ${overlap.respondentCount} already free`
                          : null;
                      return (
                        <button
                          key={iso}
                          onClick={() => toggleDate(iso)}
                          aria-pressed={active}
                          aria-label={[iso, rangePosition, overlapLabel]
                            .filter(Boolean)
                            .join(", ")}
                          style={{
                            aspectRatio: "1 / 1",
                            borderRadius: 999,
                            border: `1px solid ${endpoint ? "var(--coral)" : "var(--line)"}`,
                            background: endpoint
                              ? "var(--coral)"
                              : middle
                                ? "var(--coral-faint)"
                              : (overlapTint(iso) ?? "var(--white)"),
                            color: endpoint
                              ? "#fff"
                              : isWeekend(iso)
                                ? "var(--muted)"
                                : "var(--navy)",
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: "pointer",
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button style={S.ghostBtn} onClick={() => setStep("identity")}>
                ← Back
              </button>
              <button
                style={{
                  ...S.primaryBtn,
                  marginTop: 0,
                  flex: 2,
                  opacity: datesValid ? 1 : 0.5,
                }}
                disabled={!datesValid}
                onClick={() => setStep("vote")}
              >
                {datesValid
                  ? `Next: vote (${nights} ${nights === 1 ? "night" : "nights"}) →`
                  : dates.length === 1
                    ? "Choose an end date"
                    : rangeError
                      ? "Adjust the range"
                      : "Choose a date range"}
              </button>
            </div>
          </>
        )}

        {step === "vote" && dest && (
          <>
            <span style={S.kicker}>
              Step 2 · {voteIndex + 1} of {trip.destinations.length}
            </span>
            <div
              style={{
                marginTop: 14,
                borderRadius: 20,
                border: "1px solid var(--line)",
                background:
                  "linear-gradient(135deg, var(--coral-faint), var(--lavender))",
                padding: "38px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 56 }}>{dest.emoji || "📍"}</div>
              <h1 style={{ ...S.h1, marginBottom: 2 }}>{dest.name}</h1>
              {dest.country && <p style={S.sub}>{dest.country}</p>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={S.ghostBtn} onClick={() => castVote(false)}>
                👎 Pass
              </button>
              <button
                style={{ ...S.primaryBtn, marginTop: 0, flex: 1 }}
                onClick={() => castVote(true)}
              >
                ❤️ Love it
              </button>
            </div>
            <p style={S.foot}>Your picks help the group choose where to go.</p>
          </>
        )}

        {step === "review" && (
          <>
            <span style={S.kicker}>Almost there</span>
            <h1 style={S.h1}>Ready to send?</h1>
            <p style={S.sub}>
              {dateRangeLabel(dates[0], dates[dates.length - 1])} · {nights}{" "}
              {nights === 1 ? "night" : "nights"} · {likedCount}{" "}
              {likedCount === 1 ? "place" : "places"} you love
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {trip.destinations
                .filter((d) => votes[d.id])
                .map((d) => (
                  <span key={d.id} style={S.chip(true)}>
                    {d.emoji} {d.name}
                  </span>
                ))}
              {likedCount === 0 && (
                <span style={S.sub}>
                  You passed on all of them — that's OK, your dates still count.
                </span>
              )}
            </div>
            {submitError && (
              <p style={{ ...S.sub, color: "var(--coral-dark)", marginTop: 12 }}>
                {submitError}
              </p>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                style={S.ghostBtn}
                onClick={() => {
                  setVoteIndex(0);
                  setStep("vote");
                }}
              >
                ← Revote
              </button>
              <button
                style={{
                  ...S.primaryBtn,
                  marginTop: 0,
                  flex: 2,
                  opacity: submitting ? 0.6 : 1,
                }}
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? "Sending…" : "Send my vote 🎉"}
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <>
            <div style={{ fontSize: 52, textAlign: "center" }}>🎉</div>
            <h1 style={{ ...S.h1, textAlign: "center" }}>You're in, {name.trim() || "traveller"}!</h1>
            <p style={{ ...S.sub, textAlign: "center" }}>
              Your availability and votes are saved. The organiser sees them in
              real time — they'll lock in the final plan soon.
            </p>
            <a
              href="https://apps.apple.com/au/app/grouptraveller/id6794262706"
              target="_blank"
              rel="noreferrer"
              style={{ ...S.primaryBtn, display: "block", textAlign: "center", textDecoration: "none" }}
            >
              Get the app for live flight &amp; hotel prices
            </a>
          </>
        )}
      </div>
    </Shell>
  );
}
