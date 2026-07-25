import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarCheck2,
  Database,
  ExternalLink,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

const contactEmail = "hello@grouptraveller.com";
const deletionMailto =
  "mailto:hello@grouptraveller.com?subject=Delete%20my%20GroupTraveller%20account";

function PrivacyPolicy() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">
        Skip to privacy policy
      </a>

      <header className="legal-header">
        <a className="brand" href="/" aria-label="GroupTraveller home">
          <span className="brand-mark" aria-hidden="true">
            G
          </span>
          <span>GroupTraveller</span>
        </a>
        <a className="legal-back-link" href="/">
          <ArrowLeft aria-hidden="true" size={17} />
          Back to GroupTraveller
        </a>
      </header>

      <main className="privacy-page" id="privacy-content">
        <section className="privacy-hero">
          <div className="privacy-hero-copy">
            <p className="eyebrow">
              <ShieldCheck aria-hidden="true" size={16} />
              Privacy, without the fine-print fog
            </p>
            <h1>Privacy policy</h1>
            <p>
              GroupTraveller uses your information to help your group agree on
              a trip and organise it. We do not sell your personal information,
              run third-party ads, or use your data for cross-app tracking.
            </p>
            <div className="privacy-meta">
              <span>Effective 26 July 2026</span>
              <span>Last updated 26 July 2026</span>
            </div>
          </div>

          <div className="privacy-promise" aria-label="Our privacy commitments">
            <span className="privacy-promise-icon">
              <LockKeyhole aria-hidden="true" />
            </span>
            <p>Three things we want you to know</p>
            <ul>
              <li>
                <EyeOff aria-hidden="true" />
                No advertising profiles
              </li>
              <li>
                <Users aria-hidden="true" />
                Guests can join without an account
              </li>
              <li>
                <Trash2 aria-hidden="true" />
                You can request deletion
              </li>
            </ul>
          </div>
        </section>

        <div className="privacy-layout">
          <aside className="privacy-nav" aria-label="Privacy policy contents">
            <p>On this page</p>
            <nav>
              <a href="#scope">1. Scope and who we are</a>
              <a href="#collect">2. Information we collect</a>
              <a href="#use">3. How we use information</a>
              <a href="#share">4. When information is shared</a>
              <a href="#permissions">5. Device permissions</a>
              <a href="#retention">6. Retention and deletion</a>
              <a href="#choices">7. Your choices and rights</a>
              <a href="#security">8. Security and transfers</a>
              <a href="#children">9. Children</a>
              <a href="#changes">10. Changes to this policy</a>
              <a href="#contact">11. Contact us</a>
            </nav>
          </aside>

          <article className="privacy-article">
            <section id="scope">
              <p className="policy-number">01</p>
              <h2>Scope and who we are</h2>
              <p>
                This policy explains how GroupTraveller (“GroupTraveller”,
                “we”, “us” or “our”) handles personal information when you use
                the GroupTraveller mobile app, group invite and voting pages,
                and the website at grouptraveller.app (together, the
                “Services”).
              </p>
              <p>
                It applies whether you organise a trip with an account, join a
                trip as a guest, or visit our website. If you follow a link to
                an airline, hotel, map, app store or booking service, that
                provider’s privacy policy applies to its service.
              </p>
            </section>

            <section id="collect">
              <p className="policy-number">02</p>
              <h2>Information we collect</h2>

              <div className="policy-card-grid">
                <div className="policy-card">
                  <Database aria-hidden="true" />
                  <h3>Account information</h3>
                  <p>
                    Email address, display name, authentication records and
                    account identifiers. Passwords are handled by our
                    authentication provider and are not visible to us in plain
                    text.
                  </p>
                </div>
                <div className="policy-card">
                  <CalendarCheck2 aria-hidden="true" />
                  <h3>Trip and planning information</h3>
                  <p>
                    Trip names and descriptions, origin airport or city,
                    possible and decided dates, destination options, group size,
                    availability, votes, itineraries and reminder settings.
                  </p>
                </div>
                <div className="policy-card">
                  <Users aria-hidden="true" />
                  <h3>Guest and expense information</h3>
                  <p>
                    A guest name and emoji, availability and destination votes,
                    plus shared-expense descriptions, amounts, currencies,
                    payers and split allocations.
                  </p>
                </div>
                <div className="policy-card">
                  <BellRing aria-hidden="true" />
                  <h3>Device and technical information</h3>
                  <p>
                    Push notification tokens, device platform and name where
                    available, notification preferences, request timestamps,
                    security and error information, and one-way identifiers
                    derived from network information for abuse prevention.
                  </p>
                </div>
              </div>

              <h3>Information you choose to provide</h3>
              <p>
                You may also give us information when you contact support,
                report a problem, request account deletion, or communicate with
                us. Please avoid putting sensitive personal information into
                trip titles, descriptions or expense notes.
              </p>

              <h3>Website information</h3>
              <p>
                When you visit our website, our hosting and security providers
                may process standard request information such as IP address,
                browser type, device type, requested page and time of request.
                The current website does not use advertising cookies or
                third-party analytics.
              </p>
            </section>

            <section id="use">
              <p className="policy-number">03</p>
              <h2>How we use information</h2>
              <p>We use information to:</p>
              <ul>
                <li>create and secure accounts and keep you signed in;</li>
                <li>
                  create trips, process availability and votes, find date
                  overlaps and rank destinations;
                </li>
                <li>
                  provide live travel prices, places, maps, weather, currency
                  information and booking links;
                </li>
                <li>
                  manage shared expenses and calculate suggested settlements;
                </li>
                <li>
                  send trip reminders, voting updates, decisions and price-drop
                  notifications when enabled;
                </li>
                <li>
                  keep the Services reliable, prevent fraud and abuse, diagnose
                  faults and protect users;
                </li>
                <li>
                  respond to support, privacy and deletion requests; and
                </li>
                <li>comply with law and enforce our rights.</li>
              </ul>
              <p>
                Where applicable law requires a legal basis, we rely on
                performing our agreement with you, your consent, our legitimate
                interests in operating and protecting the Services, and
                compliance with legal obligations. You can withdraw optional
                permissions at any time through your device settings.
              </p>
            </section>

            <section id="share">
              <p className="policy-number">04</p>
              <h2>When information is shared</h2>

              <h3>With your travel group</h3>
              <p>
                Trip information is collaborative. The trip organiser and
                people with access to the invite may see information needed to
                plan the trip, such as participant names, availability,
                destination results and shared expenses. Some votes may be
                shown as group totals rather than individual choices. Keep
                invite links within the intended group.
              </p>

              <h3>With service providers</h3>
              <p>
                We use providers that help us host, secure and operate the
                Services. Depending on the feature you use, these may include:
              </p>
              <ul>
                <li>
                  Supabase for authentication, databases and server functions;
                </li>
                <li>
                  Cloudflare for website delivery, networking and security;
                </li>
                <li>
                  Expo and your device platform for push notification delivery;
                </li>
                <li>
                  Google Places or Maps and OpenStreetMap services for places,
                  maps and airports;
                </li>
                <li>
                  Open-Meteo and ExchangeRate-API for weather and currency
                  information; and
                </li>
                <li>
                  RapidAPI, Booking.com data services and, where available,
                  other flight or hotel data providers for travel search
                  results.
                </li>
              </ul>
              <p>
                Providers receive only the information reasonably needed for
                the relevant function and must protect it under their
                agreements and applicable law.
              </p>

              <h3>Booking and external links</h3>
              <p>
                When you choose a booking or map link, you leave
                GroupTraveller. The destination service may receive your
                search details, device and network information, and our
                affiliate identifier. We may receive a commission if you
                complete a booking, but we do not receive your payment-card
                details from those providers.
              </p>

              <h3>Legal and organisational reasons</h3>
              <p>
                We may disclose information when reasonably necessary to comply
                with law, protect people or the Services, investigate misuse,
                or complete a merger, financing or transfer of the business. We
                would require any successor to continue protecting personal
                information.
              </p>

              <div className="policy-callout">
                <ShieldCheck aria-hidden="true" />
                <div>
                  <h3>No sale or cross-app tracking</h3>
                  <p>
                    We do not sell personal information, use it for third-party
                    advertising, or track you across other companies’ apps and
                    websites.
                  </p>
                </div>
              </div>
            </section>

            <section id="permissions">
              <p className="policy-number">05</p>
              <h2>Device permissions</h2>
              <p>
                GroupTraveller asks for device access only when it supports a
                feature. You can decline and continue using the rest of the app.
              </p>
              <div className="permission-list">
                <div>
                  <MapPin aria-hidden="true" />
                  <span>
                    <strong>Location</strong>
                    If allowed, your current coordinates are used to suggest a
                    nearby departure airport. They may be sent to our server
                    function and an airport-data provider to complete that
                    lookup. We store the selected origin city and airport with
                    the trip; we do not continuously track your location.
                  </span>
                </div>
                <div>
                  <CalendarCheck2 aria-hidden="true" />
                  <span>
                    <strong>Calendar</strong>
                    If allowed, the app can add or update a decided trip and
                    reminders in a calendar you can write to. Calendar access
                    is processed on your device and existing calendar content
                    is not uploaded to GroupTraveller.
                  </span>
                </div>
                <div>
                  <BellRing aria-hidden="true" />
                  <span>
                    <strong>Notifications</strong>
                    If allowed, we register a push token so we can deliver the
                    trip updates you select. You can change notification
                    preferences in the app or device settings.
                  </span>
                </div>
              </div>
            </section>

            <section id="retention">
              <p className="policy-number">06</p>
              <h2>Retention and deletion</h2>
              <p>
                We keep account information and organiser trip data while the
                account is active and for as long as reasonably needed to
                provide the Services. Guest responses and shared expenses
                generally remain with the relevant trip. Travel-result caches
                are kept on short rolling schedules, while security, support
                and transaction records may be retained longer where needed to
                prevent abuse, resolve disputes or meet legal obligations.
              </p>
              <p>
                When information is deleted, it may remain for a limited period
                in encrypted backups before those backups are overwritten. We
                may retain information that has been anonymised so it can no
                longer reasonably identify you.
              </p>

              <div className="deletion-card" id="deletion">
                <span className="deletion-icon">
                  <Trash2 aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow">Delete your data</p>
                  <h3>Request account deletion</h3>
                  <p>
                    Email us from the address connected to your account with
                    the subject “Delete my GroupTraveller account”. We will
                    verify the request and delete the account and associated
                    personal information unless we must keep specific records
                    for legal or security reasons.
                  </p>
                  <p>
                    Joined without an account? Include the trip invite link,
                    the name and emoji you used, and enough detail for us to
                    locate and verify your response.
                  </p>
                  <a className="button button-coral" href={deletionMailto}>
                    Start a deletion request
                    <ArrowRight aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </section>

            <section id="choices">
              <p className="policy-number">07</p>
              <h2>Your choices and rights</h2>
              <p>
                Depending on where you live, you may have the right to access,
                correct, export or delete your personal information; restrict
                or object to certain processing; withdraw consent; and complain
                to a privacy regulator.
              </p>
              <p>
                You can manage optional location, calendar and notification
                access in your device settings. You can also sign out of the
                app or contact us to exercise a privacy right. We may need to
                verify your identity and the scope of your request before
                acting.
              </p>
            </section>

            <section id="security">
              <p className="policy-number">08</p>
              <h2>Security and international transfers</h2>
              <p>
                We use technical and organisational safeguards designed to
                protect information, including encrypted connections, access
                controls, non-enumerable invite codes, rate limits and
                restricted server credentials. No system can be guaranteed
                completely secure, so protect your password and share invite
                links carefully.
              </p>
              <p>
                Our providers may process information in countries other than
                your own. Where required, we use contractual and other
                safeguards intended to provide an appropriate level of
                protection for international transfers.
              </p>
            </section>

            <section id="children">
              <p className="policy-number">09</p>
              <h2>Children</h2>
              <p>
                GroupTraveller is not directed to children under 13, and we do
                not knowingly collect personal information from children under
                13. If local law requires a higher age for a child to consent
                to data processing, a parent or guardian must provide the
                required consent. Contact us if you believe a child has
                provided information without appropriate permission.
              </p>
            </section>

            <section id="changes">
              <p className="policy-number">10</p>
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy as the Services or legal requirements
                change. We will post the updated version here and change the
                “Last updated” date. If a change materially affects how we use
                personal information, we will provide additional notice where
                appropriate.
              </p>
            </section>

            <section id="contact">
              <p className="policy-number">11</p>
              <h2>Contact us</h2>
              <p>
                Questions, privacy requests or concerns are welcome. Contact
                GroupTraveller at:
              </p>
              <a className="privacy-email" href={`mailto:${contactEmail}`}>
                <Mail aria-hidden="true" />
                <span>
                  <small>Privacy contact</small>
                  <strong>{contactEmail}</strong>
                </span>
                <ExternalLink aria-hidden="true" size={18} />
              </a>
              <p>
                If we cannot resolve your concern, you may have the right to
                contact the privacy or data-protection authority where you
                live.
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer className="legal-footer">
        <a className="brand brand-light" href="/">
          <span className="brand-mark" aria-hidden="true">
            G
          </span>
          <span>GroupTraveller</span>
        </a>
        <p>© {new Date().getFullYear()} GroupTraveller</p>
        <div>
          <a href="/">Home</a>
          <a href={`mailto:${contactEmail}`}>Contact</a>
        </div>
      </footer>
    </>
  );
}

export default PrivacyPolicy;
