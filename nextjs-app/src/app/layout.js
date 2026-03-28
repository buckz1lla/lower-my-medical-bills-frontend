import { Lora, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lower My Medical Bills - Free EOB Review & Billing Error Finder",
  description:
    "Upload your EOB to identify billing errors, duplicate charges, and savings opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <header className="site-header">
          <div className="site-shell">
            <div className="site-brand-row">
              <Link href="/" className="site-brand">
                Lower My Medical Bills
              </Link>
              <nav className="site-nav" aria-label="Main navigation">
                <Link href="/analyzer">Analyzer</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-shell site-footer-grid">
            <p>Lower My Medical Bills</p>
            <nav aria-label="Footer navigation">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
