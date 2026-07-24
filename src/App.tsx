import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  CloudSun,
  Copy,
  Download,
  ExternalLink,
  Heart,
  Hotel,
  Image,
  Luggage,
  Map,
  MapPin,
  Menu,
  MessageCircleMore,
  Navigation,
  Plane,
  RefreshCw,
  Share2,
  Smartphone,
  Sparkles,
  Star,
  Users,
  WalletCards,
  WifiOff,
  X,
  Zap,
} from "lucide-react";

type DemoStep = "dates" | "vote" | "match";

const audiences = ["Friends", "Couples", "Families", "Teams", "Sporting groups"];

const testimonials = [
  {
    quote:
      "We agreed on Lisbon in two nights. The previous trip took three months and a minor friendship crisis.",
    name: "Mia, group of 7",
  },
  {
    quote:
      "Nobody needed another account, so everyone actually voted. That alone felt like magic.",
    name: "James, football club",
  },
  {
    quote:
      "Dates, flights, hotel, expenses—all the things we used to lose in the chat were finally together.",
    name: "Nina, family group",
  },
];

const faqs = [
  {
    question: "Does everyone need to download the app?",
    answer:
      "No. The organiser can share a simple invite link and friends can join, add their availability and vote without creating an account. People who want the full trip toolkit can download the app later.",
  },
  {
    question: "How does GroupTraveller find the best dates?",
    answer:
      "Each traveller marks the dates they can make. GroupTraveller compares everyone’s availability, highlights the strongest overlaps and makes clashes obvious before anyone books.",
  },
  {
    question: "Can we compare more than one destination?",
    answer:
      "Yes. Add a shortlist, then let everyone swipe-vote. The group view ranks destinations by overall preference so the decision feels fair and fast.",
  },
  {
    question: "Can we use it after the trip is booked?",
    answer:
      "That’s where it gets even more useful. Track live flight and hotel prices, save booking links, view maps and weather, split shared expenses, set reminders, export to calendars and keep key details offline.",
  },
  {
    question: "Is it only for groups of friends?",
    answer:
      "Not at all. GroupTraveller works for couples travelling together, families, clubs, teams and any group that needs to agree on the basics before the fun can start.",
  },
];

const dateOptions = [
  { date: "18–23 Sep", people: "6 of 7 free", score: 86 },
  { date: "25–30 Sep", people: "4 of 7 free", score: 57 },
  { date: "02–07 Oct", people: "5 of 7 free", score: 71 },
];

const destinations = [
  {
    name: "Lisbon",
    meta: "Sun, tiles & late dinners",
    image: "/images/group-hike.webp",
    fit: "92% group match",
  },
  {
    name: "The Dolomites",
    meta: "Hikes, huts & huge views",
    image: "/images/dolomites.webp",
    fit: "84% group match",
  },
  {
    name: "Swiss Alps",
    meta: "Trains, lakes & easy logistics",
    image: "/images/alpine-group.webp",
    fit: "78% group match",
  },
];

function ProductDemo() {
  const [step, setStep] = useState<DemoStep>("dates");
  const [voteIndex, setVoteIndex] = useState(0);
  const [copyLabel, setCopyLabel] = useState("Copy trip link");

  const advanceVote = () => {
    if (voteIndex >= destinations.length - 1) {
      setStep("match");
      return;
    }
    setVoteIndex((index) => index + 1);
  };

  const copyDemoLink = async () => {
    try {
      await navigator.clipboard.writeText("grouptraveller.app/join/summer-escape");
      setCopyLabel("Link copied!");
    } catch {
      setCopyLabel("grouptraveller.app/join/summer-escape");
    }
  };

  return (
    <div className="phone" aria-label="Interactive GroupTraveller app preview">
      <div className="phone-bar" aria-hidden="true">
        <span>9:41</span>
        <i />
        <span>5G&nbsp; ●</span>
      </div>

      <div className="app-header">
        <div className="mini-logo">G</div>
        <div>
          <small>Summer escape</small>
          <strong>
            {step === "dates"
              ? "Pick your dates"
              : step === "vote"
                ? "Vote on the vibe"
                : "We have a winner!"}
          </strong>
        </div>
        <button
          type="button"
          aria-label="Reset demo"
          title="Reset demo"
          onClick={() => {
            setStep("dates");
            setVoteIndex(0);
          }}
        >
          <RefreshCw aria-hidden="true" size={18} />
        </button>
      </div>

      <div className="demo-progress" aria-label={`Demo step ${step}`}>
        <span className="is-done" />
        <span className={step !== "dates" ? "is-done" : ""} />
        <span className={step === "match" ? "is-done" : ""} />
      </div>

      {step === "dates" && (
        <div className="demo-screen date-screen">
          <div className="demo-helper">
            <CalendarDays aria-hidden="true" size={17} />
            <span>Group availability</span>
            <strong>7 joined</strong>
          </div>
          <p className="demo-question">When can everyone make it?</p>
          <div className="date-options">
            {dateOptions.map((option, index) => (
              <button
                type="button"
                className={index === 0 ? "best-date" : ""}
                key={option.date}
                onClick={() => setStep("vote")}
              >
                <span>
                  <strong>{option.date}</strong>
                  <small>{option.people}</small>
                </span>
                <i>
                  <b style={{ width: `${option.score}%` }} />
                </i>
                {index === 0 && <em>Best fit</em>}
              </button>
            ))}
          </div>
          <button className="app-primary" type="button" onClick={() => setStep("vote")}>
            Lock 18–23 Sep <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      )}

      {step === "vote" && (
        <div className="demo-screen vote-screen">
          <p className="demo-question">Would you go here?</p>
          <div className="swipe-card">
            <img
              src={destinations[voteIndex].image}
              alt={destinations[voteIndex].name}
            />
            <div>
              <small>{destinations[voteIndex].fit}</small>
              <h3>{destinations[voteIndex].name}</h3>
              <p>{destinations[voteIndex].meta}</p>
            </div>
          </div>
          <div className="swipe-actions">
            <button type="button" onClick={advanceVote} aria-label="Skip destination">
              <X aria-hidden="true" />
            </button>
            <button
              className="like-button"
              type="button"
              onClick={advanceVote}
              aria-label="Vote for destination"
            >
              <Heart aria-hidden="true" fill="currentColor" />
            </button>
          </div>
          <p className="swipe-hint">Tap to vote — just like swiping</p>
        </div>
      )}

      {step === "match" && (
        <div className="demo-screen match-screen">
          <div className="match-burst" aria-hidden="true">
            <Sparkles />
          </div>
          <p className="match-kicker">The group has spoken</p>
          <h3>Lisbon</h3>
          <p>18–23 September · 7 travellers</p>
          <div className="match-stats">
            <span>
              <strong>92%</strong>
              destination match
            </span>
            <span>
              <strong>6/7</strong>
              available
            </span>
          </div>
          <button className="app-primary" type="button" onClick={copyDemoLink}>
            <Copy aria-hidden="true" size={16} />
            {copyLabel}
          </button>
          <button className="app-secondary" type="button" onClick={() => setStep("dates")}>
            Start another trip
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const subject = encodeURIComponent("Send me the GroupTraveller app");
    const body = encodeURIComponent(
      `Hi GroupTraveller,\n\nPlease send the app link and launch updates to ${email}.\n`,
    );
    setFormMessage("Your email app is opening with your request ready to send.");
    window.location.href = `mailto:hello@grouptraveller.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="GroupTraveller home">
          <span className="brand-mark" aria-hidden="true">
            G
          </span>
          <span>GroupTraveller</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#how">How it works</a>
          <a href="#demo">Try it</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="header-cta" href="#download">
          Get the app
          <Download aria-hidden="true" size={16} />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu">
            <nav aria-label="Mobile navigation">
              {[
                ["How it works", "#how"],
                ["Try it", "#demo"],
                ["Features", "#features"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a href={href} onClick={() => setMenuOpen(false)} key={href}>
                  {label}
                </a>
              ))}
              <a className="button button-navy" href="#download">
                Get the app <Download aria-hidden="true" size={18} />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles aria-hidden="true" size={15} />
              The group trip app that gets a yes
            </p>
            <h1>
              Pick the dates. Vote on the destination.{" "}
              <span>Make the group trip happen.</span>
            </h1>
            <p className="hero-intro">
              One invite link, zero account drama. Find when everyone’s free,
              swipe-vote on where to go, then organise the whole trip in one
              friendly place.
            </p>
            <div className="hero-actions">
              <a className="button button-coral" href="#download">
                Start a trip — it’s free
                <ArrowRight aria-hidden="true" size={19} />
              </a>
              <a className="button button-ghost" href="#demo">
                Try the 30-sec demo
                <Zap aria-hidden="true" size={18} />
              </a>
            </div>
            <div className="hero-social-proof">
              <span className="faces" aria-hidden="true">
                <i>MK</i>
                <i>AD</i>
                <i>JR</i>
                <i>+4</i>
              </span>
              <p>
                <strong>No account needed to join</strong>
                Your friends can vote from the invite link.
              </p>
            </div>
          </div>

          <div className="hero-product">
            <div className="photo-arch">
              <img
                src="/images/group-hike.webp"
                alt="Friends walking together through the mountains"
                fetchPriority="high"
              />
            </div>
            <div className="hero-phone-wrap">
              <ProductDemo />
            </div>
            <div className="float-card float-date">
              <CalendarCheck2 aria-hidden="true" />
              <span>
                <small>Best date overlap</small>
                <strong>18–23 Sep · 6/7 free</strong>
              </span>
            </div>
            <div className="float-card float-vote">
              <Heart aria-hidden="true" fill="currentColor" />
              <span>
                <small>Destination vote</small>
                <strong>Lisbon is leading</strong>
              </span>
            </div>
          </div>
        </section>

        <section className="audience-strip" aria-label="Made for every kind of group">
          <p>Made for</p>
          <div>
            {audiences.map((audience) => (
              <span key={audience}>
                <Check aria-hidden="true" size={15} />
                {audience}
              </span>
            ))}
          </div>
        </section>

        <section className="section how-section" id="how">
          <div className="section-heading centered">
            <p className="eyebrow">From maybe to booked</p>
            <h2>Three tiny steps. One actual holiday.</h2>
            <p>
              GroupTraveller keeps the momentum moving before the group chat has
              time to wander off-topic.
            </p>
          </div>

          <div className="flow-grid">
            <article className="flow-card flow-create">
              <div className="step-number">1</div>
              <div className="flow-visual invite-visual">
                <div className="trip-chip">
                  <span>☀️</span>
                  <div>
                    <small>Trip created</small>
                    <strong>Summer escape</strong>
                  </div>
                </div>
                <div className="invite-link">
                  <span>grouptraveller.app/join/...</span>
                  <Copy aria-hidden="true" size={16} />
                </div>
                <div className="share-row">
                  <i>
                    <MessageCircleMore />
                  </i>
                  <i>
                    <Share2 />
                  </i>
                  <i>
                    <ExternalLink />
                  </i>
                </div>
              </div>
              <h3>Create & share</h3>
              <p>
                Name the trip, add a rough month and drop one invite link into
                the chat.
              </p>
            </article>

            <article className="flow-card flow-dates">
              <div className="step-number">2</div>
              <div className="flow-visual calendar-visual">
                <div className="mini-month">
                  <strong>September</strong>
                  <div className="calendar-grid" aria-hidden="true">
                    {Array.from({ length: 21 }, (_, index) => (
                      <span
                        key={index}
                        className={index > 6 && index < 13 ? "selected-day" : ""}
                      >
                        {index + 8}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="joined-note">
                  <Users aria-hidden="true" size={16} />
                  7 friends joined · no sign-up
                </div>
              </div>
              <h3>Find the overlap</h3>
              <p>
                Everyone taps the dates they can do. The best window rises to
                the top automatically.
              </p>
            </article>

            <article className="flow-card flow-vote">
              <div className="step-number">3</div>
              <div className="flow-visual vote-visual">
                <div className="mini-destination">
                  <img src="/images/dolomites.webp" alt="" />
                  <span>
                    <strong>The Dolomites</strong>
                    <small>84% group match</small>
                  </span>
                </div>
                <div className="vote-buttons" aria-hidden="true">
                  <i>
                    <X />
                  </i>
                  <i>
                    <Heart fill="currentColor" />
                  </i>
                </div>
              </div>
              <h3>Swipe, vote, done</h3>
              <p>
                Compare the shortlist, vote privately and see the group’s
                favourite without another debate.
              </p>
            </article>
          </div>
        </section>

        <section className="demo-section" id="demo">
          <div className="demo-copy">
            <p className="eyebrow eyebrow-light">
              <Zap aria-hidden="true" size={15} />
              Try the group trip matchmaker
            </p>
            <h2>Make the two hard decisions feel easy.</h2>
            <p>
              Click through the demo. See the strongest date overlap, vote on a
              destination and watch a fuzzy group idea become a real plan.
            </p>
            <ul>
              <li>
                <Check aria-hidden="true" size={17} />
                Friends join from one link
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                Votes stay simple and fair
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                The result is clear to everyone
              </li>
            </ul>
            <a className="button button-white" href="#download">
              Start your own trip
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
          <div className="demo-device">
            <span className="orbit orbit-one" aria-hidden="true" />
            <span className="orbit orbit-two" aria-hidden="true" />
            <ProductDemo />
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="section-heading feature-heading">
            <div>
              <p className="eyebrow">Agreement is just the beginning</p>
              <h2>Everything the trip needs, after the group says yes.</h2>
            </div>
            <p>
              Stop jumping between twelve apps. GroupTraveller keeps planning,
              prices, places and payments together from the first vote to the
              flight home.
            </p>
          </div>

          <div className="bento-grid">
            <article className="bento-card bento-prices">
              <div className="feature-icon coral-icon">
                <Plane aria-hidden="true" />
              </div>
              <div>
                <p className="card-kicker">Live prices</p>
                <h3>Know when to book.</h3>
                <p>
                  Compare flights and hotels, open trusted booking links and get
                  a nudge when the price drops.
                </p>
              </div>
              <div className="price-ui">
                <span>
                  BNE <i /> LIS
                </span>
                <strong>$1,284</strong>
                <small>
                  <span>↓ $96</span> since Tuesday
                </small>
              </div>
            </article>

            <article className="bento-card bento-map">
              <div className="map-art">
                <span className="map-road road-a" />
                <span className="map-road road-b" />
                <i className="map-pin pin-hotel">
                  <Hotel />
                </i>
                <i className="map-pin pin-place">
                  <Star />
                </i>
                <i className="map-pin pin-airport">
                  <Plane />
                </i>
              </div>
              <div className="bento-copy">
                <div className="feature-icon navy-icon">
                  <Map aria-hidden="true" />
                </div>
                <p className="card-kicker">Destination maps</p>
                <h3>See how the trip fits together.</h3>
                <p>Hotels, airports and saved attractions on one useful map.</p>
              </div>
            </article>

            <article className="bento-card bento-weather">
              <div className="feature-icon lavender-icon">
                <CloudSun aria-hidden="true" />
              </div>
              <div className="weather-now">
                <span>Lisbon</span>
                <strong>26°</strong>
                <small>Sunny · EUR</small>
              </div>
              <h3>Weather & currency, without the maths.</h3>
            </article>

            <article className="bento-card bento-expenses">
              <div className="feature-icon coral-icon">
                <WalletCards aria-hidden="true" />
              </div>
              <div>
                <p className="card-kicker">Shared expenses</p>
                <h3>Split it now. Stay friends later.</h3>
                <p>
                  Track who paid, what everyone owes and the fewest transfers
                  needed to settle up.
                </p>
              </div>
              <div className="expense-list">
                <span>
                  <i>🏡</i>
                  <b>Apartment</b>
                  <em>$840.00</em>
                </span>
                <span>
                  <i>🍝</i>
                  <b>Group dinner</b>
                  <em>$186.40</em>
                </span>
                <small>
                  <CircleDollarSign size={15} /> You’re owed $128.60
                </small>
              </div>
            </article>

            <article className="bento-card bento-tools">
              <div className="tool-list">
                <span>
                  <BellRing />
                  Price-drop alerts
                </span>
                <span>
                  <CalendarCheck2 />
                  Calendar export
                </span>
                <span>
                  <WifiOff />
                  Offline access
                </span>
                <span>
                  <Image />
                  Shareable trip cards
                </span>
              </div>
              <h3>The small things that keep everyone moving.</h3>
            </article>
          </div>
        </section>

        <section className="trip-view-section">
          <div className="trip-photo">
            <img
              src="/images/alpine-group.webp"
              alt="A group exploring a dramatic alpine landscape"
              loading="lazy"
            />
            <div className="trip-photo-label">
              <MapPin aria-hidden="true" size={16} />
              Somewhere worth agreeing on
            </div>
          </div>
          <div className="trip-view-copy">
            <p className="eyebrow">One home for the whole holiday</p>
            <h2>The plan stays useful after the decision.</h2>
            <p>
              Every traveller sees the same live itinerary, saved places,
              bookings, reminders and expenses—with offline access when the
              signal disappears.
            </p>
            <div className="mini-feature-grid">
              <span>
                <Navigation aria-hidden="true" />
                Maps & places
              </span>
              <span>
                <BellRing aria-hidden="true" />
                Smart reminders
              </span>
              <span>
                <Luggage aria-hidden="true" />
                Trip details
              </span>
              <span>
                <WalletCards aria-hidden="true" />
                Group expenses
              </span>
            </div>
          </div>
        </section>

        <section className="section stories-section">
          <div className="section-heading centered">
            <p className="eyebrow">Group chat survivors</p>
            <h2>Less “any thoughts?” More “see you at the airport.”</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <blockquote className={`testimonial story-${index + 1}`} key={testimonial.name}>
                <div className="stars" aria-label="5 stars">
                  ★★★★★
                </div>
                <p>“{testimonial.quote}”</p>
                <footer>{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-intro">
            <p className="eyebrow">Good questions</p>
            <h2>Before you add it to the group chat…</h2>
            <p>
              Need something else?{" "}
              <a href="mailto:hello@grouptraveller.com">Ask a human.</a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="download-copy">
            <p className="eyebrow eyebrow-light">
              <Smartphone aria-hidden="true" size={15} />
              Your next trip starts here
            </p>
            <h2>Turn “sometime” into dates on the calendar.</h2>
            <p>
              Get the GroupTraveller launch link and be first to start a trip
              with your favourite people.
            </p>
            <form className="download-form" onSubmit={handleWaitlist}>
              <label className="sr-only" htmlFor="download-email">
                Email address
              </label>
              <input
                id="download-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              <button type="submit">
                Send me the app <ArrowRight aria-hidden="true" size={18} />
              </button>
            </form>
            <p className="form-status" aria-live="polite">
              {formMessage}
            </p>
            <div className="store-note">
              <span>
                <Smartphone aria-hidden="true" size={17} /> iPhone
              </span>
              <span>
                <Download aria-hidden="true" size={17} /> Android
              </span>
              <small>App store links will appear here at launch.</small>
            </div>
          </div>
          <div className="download-art" aria-hidden="true">
            <div className="ticket ticket-back">
              <span>GROUP TRIP</span>
              <strong>LIS</strong>
              <small>18 SEP · 7 TRAVELLERS</small>
            </div>
            <div className="ticket ticket-front">
              <span>YOU’RE GOING TO</span>
              <strong>Lisbon</strong>
              <div>
                <span>6 nights</span>
                <span>92% match</span>
              </div>
              <i>
                <Plane />
              </i>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand brand-light" href="#top">
            <span className="brand-mark">G</span>
            <span>GroupTraveller</span>
          </a>
          <p>Pick. Vote. Pack.</p>
        </div>
        <div className="footer-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:hello@grouptraveller.com">Contact</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GroupTraveller</span>
          <span>Built for the trips that deserve to happen.</span>
          <span className="photo-credit">
            Photos:{" "}
            <a href="https://unsplash.com/photos/vIluu0IH6Ps">Buisson</a>,{" "}
            <a href="https://unsplash.com/photos/l3fkqYm1_5E">Hikerwise</a>,{" "}
            <a href="https://unsplash.com/photos/V2f98ETXFTo">Spiske</a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
