import { Lora, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import RouteScripts from "./route-scripts";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9219272095137377";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TR4YNLEVS9";

const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://lowermymedicalbills.com"),
  title: "Lower My Medical Bills - Appeal-First Claim Review",
  description:
    "Review your EOB with an appeal-first workflow that prioritizes claim risk and next actions.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <RouteScripts adsenseClient={adsenseClient} gaMeasurementId={gaMeasurementId} />
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="26" height="4.5" rx="2.25" fill="#0f2133"/>
                  <rect x="0" y="7.75" width="18" height="4.5" rx="2.25" fill="#0f2133"/>
                  <rect x="0" y="15.5" width="10" height="4.5" rx="2.25" fill="#3069a8"/>
                </svg>
              </span>
              <div className="logo-text">
                <h1>
                  <span className="logo-word-light">lower my </span><span className="logo-word-heavy">medical bills</span>
                </h1>
                <span className="logo-tagline">EOB Review · Appeal Guidance</span>
              </div>
            </Link>
            <nav className="nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/guides">Playbooks</Link>
              <Link href="/templates">Templates</Link>
              <Link href="/about">About</Link>
              <Link href="/analyzer" className="nav-link-primary">
                Start Review
              </Link>
            </nav>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <p>&copy; 2026 Lower My Medical Bills. All rights reserved.</p>
              <nav className="footer-nav" aria-label="Footer navigation">
                <Link href="/privacy">Privacy Policy</Link>
                <span className="separator">|</span>
                <Link href="/terms">Terms of Use</Link>
                <span className="separator">|</span>
                <Link href="/disclaimer">Disclaimer</Link>
                <span className="separator">|</span>
                <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
                <span className="separator">|</span>
                <Link href="/templates">Templates</Link>
                <span className="separator">|</span>
                <Link href="/editorial-policy">Editorial Policy</Link>
                <span className="separator">|</span>
                <Link href="/sources">Sources</Link>
                <span className="separator">|</span>
                <Link href="/contact">Contact</Link>
                <span className="separator">|</span>
                <Link href="/about">About</Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
