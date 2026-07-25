import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import "./styles.css";

const normalizedPath =
  window.location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
const isPrivacyPage = normalizedPath === "/privacy";

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
    {isPrivacyPage ? <PrivacyPolicy /> : <App />}
  </StrictMode>,
);
