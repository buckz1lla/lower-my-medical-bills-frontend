export const metadata = {
  title: "EOB Analyzer - Upload Your Explanation of Benefits | Lower My Medical Bills",
  description:
    "Upload your Explanation of Benefits (PDF or image). Our analyzer scans for billing errors, duplicate charges, and overcharges in seconds.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/analyzer" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free EOB Analyzer - Spot Billing Errors Instantly",
    description:
      "Upload your EOB and get a free report of potential billing errors. Pay only to unlock appeal letter templates.",
    url: "https://www.lowermymedicalbills.com/analyzer",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function AnalyzerLayout({ children }) {
  return children;
}
