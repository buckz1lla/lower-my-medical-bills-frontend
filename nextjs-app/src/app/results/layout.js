// Results pages are user-specific and paywalled — do not index.
export const metadata = {
  title: "Your EOB Analysis Results | Lower My Medical Bills",
  description: "View your Explanation of Benefits analysis and unlock appeal letter templates.",
  robots: { index: false, follow: false },
};

export default function ResultsLayout({ children }) {
  return children;
}
