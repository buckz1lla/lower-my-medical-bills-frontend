export const metadata = {
  title: "EOB Analyzer - Upload Your Explanation of Benefits | Lower My Medical Bills",
  description:
    "Upload your Explanation of Benefits (PDF or image). Our analyzer highlights potential billing issues and helps you prepare next-step appeal documents.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/analyzer" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free EOB Analyzer - Review Claims and Prepare Appeals",
    description:
      "Upload your EOB and get a free claim-by-claim review. Unlock appeal prep documents when you are ready to act.",
    url: "https://www.lowermymedicalbills.com/analyzer",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function AnalyzerLayout({ children }) {
  return children;
}
