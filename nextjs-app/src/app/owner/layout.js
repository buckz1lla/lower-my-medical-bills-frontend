// Owner-only pages — keep out of search indexes.
export const metadata = {
  title: "Owner Login | Lower My Medical Bills",
  robots: { index: false, follow: false },
};

export default function OwnerLayout({ children }) {
  return children;
}
