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
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition duration-300 ${
        isScrolled
          ? "border-gray-300 bg-white/95 shadow-md backdrop-blur"
          : "border-gray-200 bg-white/90 backdrop-blur"
      }`}
    >
      <div className="container-main">
        <div className="flex min-h-[8rem] items-center justify-between gap-4 py-2 sm:min-h-[10rem] lg:min-h-[14rem]">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="All-Star Custom Construction LLC"
              width={600}
              height={240}
              priority
              className="h-28 w-auto object-contain transition duration-300 group-hover:opacity-90 sm:h-32 lg:h-56"
            />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280] 2xl:block">
              Central Florida Contractor
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
                  className={`group relative pb-1 text-sm font-medium transition duration-300 hover:text-[#d4a017] ${
                    isActive ? "text-[#111827]" : "text-[#4b5563]"
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

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phoneLink}
              className="rounded-md border border-[#1f2937] px-3 py-2 text-sm font-semibold text-[#1f2937] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3f4f6] hover:shadow-sm"
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

      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`container-main py-4 transition duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
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
    </header>
  );
}
