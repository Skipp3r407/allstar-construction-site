"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navLinks } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[box-shadow,background-color,border-color] duration-300 ${
          isScrolled
            ? "border-gray-200/90 bg-white/95 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.25)] backdrop-blur-md"
            : "border-gray-200/80 bg-white/92 backdrop-blur-sm"
        }`}
      >
        <div className="container-main">
          <div className="flex min-h-[4.5rem] items-center justify-between gap-3 py-2 sm:min-h-[5.25rem] lg:min-h-[6.5rem] lg:py-3">
            <Link href="/" className="group flex shrink-0 items-center">
              <Image
                src="/images/logo.png"
                alt="All-Star Custom Construction LLC"
                width={720}
                height={288}
                priority
                className="h-16 w-auto object-contain object-left transition duration-300 group-hover:opacity-95 sm:h-[4.5rem] lg:h-24"
              />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-6 xl:gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative whitespace-nowrap pb-1 text-sm transition duration-300 hover:text-[#d4a017] ${
                      isActive ? "font-semibold text-[#111827]" : "font-medium text-[#4b5563]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#d4a017] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <a
                href={company.phoneLink}
                className="rounded-md border border-[#1f2937] px-3 py-2.5 text-sm font-semibold text-[#1f2937] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f3f4f6] hover:shadow-sm"
              >
                Call {company.phone}
              </a>
              <Link href="/contact" className="btn-primary px-5 py-2.5 shadow-md shadow-[#d4a017]/20">
                Get a Quote
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-[#111827] shadow-sm transition hover:border-[#d4a017]/40 hover:bg-[#fafafa] lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="text-xl leading-none">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: overlay + slide-in panel from right */}
      <div
        className={`fixed inset-0 z-[85] bg-[#111827]/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[90] flex w-[min(100vw-1rem,20rem)] max-w-full flex-col border-l border-gray-200 bg-white shadow-[-8px_0_40px_-12px_rgba(17,24,39,0.35)] transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <span className="text-sm font-bold text-[#111827]">Menu</span>
          <button
            type="button"
            className="rounded-lg p-2 text-[#6b7280] hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-1 block rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#111827]/6 text-[#111827] ring-1 ring-[#d4a017]/40"
                    : "text-[#1f2937] hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-100 p-4 space-y-3">
          <a
            href={company.phoneLink}
            className="btn-secondary flex w-full justify-center py-3"
            onClick={() => setIsOpen(false)}
          >
            Call Now
          </a>
          <Link
            href="/contact"
            className="btn-primary flex w-full justify-center py-3 shadow-md shadow-[#d4a017]/25"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </aside>
    </>
  );
}
