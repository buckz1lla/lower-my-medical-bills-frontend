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
                <svg width="72" height="32" viewBox="0 0 68 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0"  y="0"  width="14" height="14" rx="3" fill="#c0392b"/>
                  <text x="7"  y="10.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif">L</text>
                  <rect x="18" y="5"  width="14" height="14" rx="3" fill="#e07030"/>
                  <text x="25" y="15.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif">M</text>
                  <rect x="36" y="10" width="14" height="14" rx="3" fill="#20a060"/>
                  <text x="43" y="20.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif">M</text>
                  <rect x="54" y="15" width="14" height="14" rx="3" fill="#1a8a50"/>
                  <text x="61" y="25.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif">B</text>
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
