// Results pages are user-specific and paywalled — do not index.
export const metadata = {
  title: "Your EOB Analysis Results | Lower My Medical Bills",
  description: "Review your Explanation of Benefits analysis and unlock appeal prep documents.",
  robots: { index: false, follow: false },
};

export default function ResultsLayout({ children }) {
  return children;
}
