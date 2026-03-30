"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-[95] flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[#d4a017]/30 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white shadow-lg shadow-black/20 transition duration-200 hover:scale-105 hover:border-[#d4a017]/50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:bottom-24 sm:right-6"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
