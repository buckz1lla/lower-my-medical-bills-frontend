import { Lora, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9219272095137377";

const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lower My Medical Bills - Free EOB Analyzer & Appeal Prep Tool",
  description:
    "Upload your EOB to spot potential billing issues and prepare stronger insurance appeals with clearer documentation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        {adsenseClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body>
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              <h1>&#128176; Lower My Medical Bills</h1>
            </Link>
            <nav className="nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/analyzer" className="nav-link-primary">
                Check My EOB
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
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
