export const metadata = {
  title: "Medical Billing & Appeal Guides | Lower My Medical Bills",
  description:
    "Practical guides for denied claims, confusing EOBs, and high medical bills. Each guide ends with concrete next steps.",
  alternates: { canonical: "https://lowermymedicalbills.com/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Medical Billing & Appeal Guides",
    description:
      "Practical walkthroughs for denied claims, confusing EOBs, and high bills. Each guide ends with concrete next steps.",
    url: "https://lowermymedicalbills.com/guides",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function GuidesLayout({ children }) {
  return children;
}
