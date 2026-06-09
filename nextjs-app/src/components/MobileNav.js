"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="mobile-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`burger-line${open ? " burger-line--open" : ""}`} />
        <span className={`burger-line${open ? " burger-line--open" : ""}`} />
        <span className={`burger-line${open ? " burger-line--open" : ""}`} />
      </button>

      {open && (
        <div className="mobile-nav-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <nav
        className={`mobile-nav-drawer${open ? " mobile-nav-drawer--open" : ""}`}
        aria-label="Mobile navigation"
      >
        <Link href="/">Home</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/fair-price">Bill Checker</Link>
        <Link href="/templates">Templates</Link>
        <Link href="/about">About</Link>
        <Link href="/analyzer" className="mobile-nav-cta">
          Start Review
        </Link>
      </nav>
    </>
  );
}
