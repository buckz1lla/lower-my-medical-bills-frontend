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
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lmmb-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2c6abf"/>
                      <stop offset="100%" stopColor="#163d6e"/>
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="9" fill="url(#lmmb-grad)"/>
                  <path d="M10 12h16M10 18h16M10 24h9" stroke="white" strokeWidth="2.1" strokeLinecap="round"/>
                  <circle cx="27" cy="27" r="6" fill="#b03552"/>
                  <path d="M24.6 27l1.8 1.8 3-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="logo-text">
                <h1>
                  <span className="logo-word-lower">Lower My</span>{" "}
                  <span className="logo-word-brand">Medical Bills</span>
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
