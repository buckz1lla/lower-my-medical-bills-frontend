export const metadata = {
  title: "Is My Medical Bill Fair? Free Price Checker | Lower My Medical Bills",
  description:
    "Compare your medical bill against CMS Medicare benchmark rates. Instantly see if you were overcharged and get negotiation tips — free, no sign-up needed.",
  alternates: { canonical: "https://lowermymedicalbills.com/fair-price" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Is My Medical Bill Fair? Free Medicare Rate Checker",
    description:
      "Enter any procedure and your billed amount to see how it compares to the federal Medicare benchmark rate. Free tool, no account required.",
    url: "https://lowermymedicalbills.com/fair-price",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function FairPriceLayout({ children }) {
  return children;
}
