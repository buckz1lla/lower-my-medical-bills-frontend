import { Lora, Source_Sans_3, Plus_Jakarta_Sans } from "next/font/google";
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

const logoFont = Plus_Jakarta_Sans({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["800"],
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
      <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${logoFont.variable}`}>
      <body>
        <RouteScripts adsenseClient={adsenseClient} gaMeasurementId={gaMeasurementId} />
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#3069a8"/>
                  {/* Dollar sign stem */}
                  <rect x="16.5" y="5" width="3" height="17" rx="1.5" fill="white"/>
                  {/* Upper crossbar */}
                  <rect x="11" y="10" width="14" height="2.5" rx="1.25" fill="white"/>
                  {/* Lower crossbar */}
                  <rect x="11" y="17.5" width="14" height="2.5" rx="1.25" fill="white"/>
                  {/* Downward arrow chevron */}
                  <path d="M13 25 L18 31 L23 25" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="logo-text">
                <h1>lowermymedicalbills</h1>
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
