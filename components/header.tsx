"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, navLinks } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-main">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="group">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
              Central Florida Contractor
            </span>
            <span className="block text-base font-extrabold tracking-tight text-[#111827] transition group-hover:text-[#d4a017] sm:text-lg">
              All-Star Custom Construction LLC
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition hover:text-[#d4a017] ${
                    isActive ? "text-[#111827]" : "text-[#4b5563]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phoneLink}
              className="rounded-md border border-[#1f2937] px-3 py-2 text-sm font-semibold text-[#1f2937] transition hover:bg-[#f3f4f6]"
            >
              Call {company.phone}
            </a>
            <Link href="/contact" className="btn-primary px-4 py-2.5">
              Request a Free Quote
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-[#111827] lg:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="text-lg leading-none">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container-main py-4">
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-[#1f2937] hover:bg-[#f3f4f6]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-3">
              <a href={company.phoneLink} className="btn-secondary w-full">
                Call Now
              </a>
              <Link href="/contact" className="btn-primary w-full" onClick={() => setIsOpen(false)}>
                Get an Estimate
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
