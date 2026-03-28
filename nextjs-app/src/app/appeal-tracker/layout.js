// Appeal tracker pages are user-specific — do not index.
export const metadata = {
  title: "Appeal Tracker | Lower My Medical Bills",
  description: "Track the status of your medical billing appeal and manage follow-up dates.",
  robots: { index: false, follow: false },
};

export default function AppealTrackerLayout({ children }) {
  return children;
}
