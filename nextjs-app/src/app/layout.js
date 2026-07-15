import { Lora, Source_Sans_3, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
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
  openGraph: {
    title: "Lower My Medical Bills - Appeal-First Claim Review",
    description:
      "Review your EOB with an appeal-first workflow that prioritizes claim risk and next actions.",
    url: "https://lowermymedicalbills.com",
    siteName: "Lower My Medical Bills",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Lower My Medical Bills" }],
  },
  twitter: {
    card: "summary",
    title: "Lower My Medical Bills - Appeal-First Claim Review",
    description:
      "Review your EOB with an appeal-first workflow that prioritizes claim risk and next actions.",
    images: ["/logo.png"],
  },
  verification: {
    google: "OKVAopyrrH0mopSTY7ce-29WN-Rq6BPMnmjhXqMGLRo",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://lowermymedicalbills.com/#organization",
        name: "Lower My Medical Bills",
        url: "https://lowermymedicalbills.com",
        logo: {
          "@type": "ImageObject",
          url: "https://lowermymedicalbills.com/logo.png",
        },
        description:
          "Educational tools and guides that help patients understand their Explanation of Benefits, spot medical billing errors, and prepare stronger insurance appeals.",
        knowsAbout: [
          "Medical billing",
          "Explanation of Benefits (EOB)",
          "Health insurance claim denials",
          "Insurance appeals",
          "Medical bill negotiation",
          "The No Surprises Act",
        ],
        publishingPrinciples: "https://lowermymedicalbills.com/editorial-policy",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://lowermymedicalbills.com/contact",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://lowermymedicalbills.com/#website",
        url: "https://lowermymedicalbills.com",
        name: "Lower My Medical Bills",
        publisher: { "@id": "https://lowermymedicalbills.com/#organization" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
      <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${logoFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <RouteScripts adsenseClient={adsenseClient} gaMeasurementId={gaMeasurementId} />
        <header className="header">
          <div className="header-container">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg width="82" height="40" viewBox="0 0 82 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="1"  y="22" fontSize="24" fontWeight="900" fill="#1a7a45" fontFamily="'Arial Black', Arial, sans-serif">L</text>
                  <text x="17" y="29" fontSize="24" fontWeight="900" fill="#27a060" fontFamily="'Arial Black', Arial, sans-serif">M</text>
                  <text x="41" y="36" fontSize="24" fontWeight="900" fill="#d95f1a" fontFamily="'Arial Black', Arial, sans-serif">M</text>
                  <text x="63" y="40" fontSize="24" fontWeight="900" fill="#c0392b" fontFamily="'Arial Black', Arial, sans-serif">B</text>
                </svg>
              </span>
              <div className="logo-text">
                <h1>lowermymedicalbills</h1>
                <span className="logo-tagline">EOB Review · Appeal Guidance</span>
              </div>
            </Link>
            <nav className="nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/fair-price">Bill Checker</Link>
              <Link href="/templates">Templates</Link>
              <Link href="/about">About</Link>
              <Link href="/analyzer" className="nav-link-primary">
                Start Review
              </Link>
            </nav>
            <MobileNav />
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
                <Link href="/fair-price">Bill Checker</Link>
                <span className="separator">|</span>
                <Link href="/procedures">Procedure Costs</Link>
                <span className="separator">|</span>
                <Link href="/denial-codes">Denial Codes</Link>
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
