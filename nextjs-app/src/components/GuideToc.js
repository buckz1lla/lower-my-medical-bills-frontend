"use client";

import { useEffect, useRef, useState } from "react";

export default function GuideToc({ sections }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    const headings = document.querySelectorAll(".guide-section h2[id]");
    if (!headings.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          const idx = Array.from(headings).indexOf(topmost.target);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => observerRef.current.observe(h));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav className="guide-toc" aria-label="Table of contents">
      <p className="guide-toc-heading">In this guide</p>
      <ol className="guide-toc-list">
        {sections.map((section, idx) => (
          <li key={idx} className={activeIdx === idx ? "guide-toc-item guide-toc-active" : "guide-toc-item"}>
            <a href={`#section-${idx}`}>{section.heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
