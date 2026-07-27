import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import JoinFlow from "./JoinFlow";
import "./styles.css";

const rawSegments = window.location.pathname.split("/").filter(Boolean);
const normalizedPath =
  window.location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
const isPrivacyPage = normalizedPath === "/privacy";

// /join/<code> → the web guest flow. Keep the code's original case (the raw
// pathname), decoding any URL escaping.
const joinCode =
  rawSegments[0]?.toLowerCase() === "join" && rawSegments[1]
    ? decodeURIComponent(rawSegments[1])
    : null;

if (isPrivacyPage) {
  const title = "Privacy Policy — GroupTraveller";
  const description =
    "How GroupTraveller collects, uses, shares, retains and protects information across the app, group invite flow and website.";

  document.title = title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", title);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[name="twitter:title"]')
    ?.setAttribute("content", title);
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute("content", description);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {joinCode ? (
      <JoinFlow code={joinCode} />
    ) : isPrivacyPage ? (
      <PrivacyPolicy />
    ) : (
      <App />
    )}
  </StrictMode>,
);
