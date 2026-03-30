"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { company, navLinks } from "@/lib/site-data";
import { servicesNavItems } from "@/lib/nav-services";

const LOGO_CLASSES =
  "h-[6.24rem] w-auto object-contain object-left transition duration-300 group-hover:opacity-95 sm:h-[7.02rem] lg:h-[9.36rem]";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DesktopServicesDropdown({
  pathname,
  servicesOpen,
  onOpenChange,
}: {
  pathname: string;
  servicesOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const menuId = useId();
  const closeTimer = useRef<number | undefined>(undefined);
  const isServicesActive = pathname === "/services" || pathname.startsWith("/services");

  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => onOpenChange(false), 140);
  }, [cancelClose, onOpenChange]);

  const openNow = useCallback(() => {
    cancelClose();
    onOpenChange(true);
  }, [cancelClose, onOpenChange]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={servicesOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        className={`group relative flex items-center gap-1 whitespace-nowrap pb-1 text-sm transition-colors duration-200 hover:text-[#d4a017] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4a017] ${
          isServicesActive ? "font-semibold text-[#d4a017]" : "font-medium text-[#1f2937]"
        }`}
        onFocus={openNow}
        onKeyDown={(e) => {
          if (e.key === "Escape") onOpenChange(false);
        }}
      >
        Services
        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${
            servicesOpen ? "rotate-180 text-[#d4a017]" : "text-[#9ca3af] group-hover:text-[#d4a017]"
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[#d4a017] transition-all duration-300 ${
            isServicesActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-hidden={!servicesOpen}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition duration-200 ease-out motion-reduce:transition-none ${
          servicesOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="w-[min(calc(100vw-2rem),36rem)] rounded-2xl border border-gray-200/90 bg-white p-4 shadow-[0_20px_50px_-12px_rgba(17,24,39,0.2)] ring-1 ring-black/[0.04]">
          <Link
            href="/services"
            role="menuitem"
            className="mb-3 block rounded-lg border border-[#d4a017]/25 bg-[#fffef5] px-3 py-2.5 text-center text-sm font-semibold text-[#111827] transition-all duration-200 hover:bg-[#fff8e8] hover:text-[#d4a017]"
          >
            View all services
          </Link>
          <div className="grid gap-1 sm:grid-cols-2">
            {servicesNavItems.map((item) => (
              <Link
                key={item.id}
                href={`/services#${item.id}`}
                role="menuitem"
                className="group/item block rounded-xl p-3 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:ring-1 hover:ring-[#d4a017]/30 motion-reduce:transition-colors motion-reduce:hover:translate-x-0"
              >
                <span className="block text-sm font-semibold text-[#111827] transition-colors duration-200 group-hover/item:text-[#d4a017]">
                  {item.label}
                </span>
                <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-[#6b7280] transition-colors duration-200 group-hover/item:text-[#57534e]">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const navLinkClass = (href: string, isActive: boolean) =>
    `group relative whitespace-nowrap pb-1 text-sm transition-colors duration-200 hover:text-[#d4a017] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4a017] ${
      isActive ? "font-semibold text-[#d4a017]" : "font-medium text-[#1f2937]"
    }`;

  const beforeServices = navLinks.slice(0, 2);
  const afterServices = navLinks.slice(3);

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
          <div className="flex min-h-[6.6rem] items-center justify-between gap-4 py-3 sm:min-h-[7.5rem] lg:min-h-[9.3rem] lg:gap-6 lg:py-4">
            <Link href="/" className="group flex shrink-0 items-center">
              <Image
                src="/images/logo.png"
                alt="All-Star Custom Construction LLC"
                width={1123}
                height={449}
                priority
                className={LOGO_CLASSES}
              />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-5 xl:gap-7 lg:flex" aria-label="Main">
              {beforeServices.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href} className={navLinkClass(link.href, isActive)}>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#d4a017] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}

              <DesktopServicesDropdown
                pathname={pathname}
                servicesOpen={servicesOpen}
                onOpenChange={setServicesOpen}
              />

              {afterServices.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href} className={navLinkClass(link.href, isActive)}>
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
                className="rounded-md border border-[#1f2937] px-3 py-2.5 text-sm font-semibold text-[#1f2937] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4a017]/55 hover:bg-[#fffef8] hover:text-[#d4a017] hover:shadow-sm hover:shadow-[#d4a017]/10 motion-reduce:transform-none motion-reduce:hover:translate-y-0"
              >
                Call {company.phone}
              </a>
              <Link href="/contact" className="btn-primary px-5 py-2.5 shadow-md shadow-[#d4a017]/20">
                Get a Quote
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-[#111827] shadow-sm transition-all duration-200 hover:border-[#d4a017]/50 hover:bg-[#fffef8] hover:text-[#d4a017] lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() =>
                setIsOpen((prev) => {
                  if (prev) setMobileServicesOpen(false);
                  return !prev;
                })
              }
            >
              <span className="text-xl leading-none">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[85] bg-[#111827]/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeMobileMenu}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[90] flex w-[min(100vw-1rem,22rem)] max-w-full flex-col border-l border-gray-200 bg-white shadow-[-8px_0_40px_-12px_rgba(17,24,39,0.35)] transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <span className="text-sm font-bold text-[#111827]">Menu</span>
          <button
            type="button"
            className="rounded-lg p-2 text-[#6b7280] transition-colors duration-200 hover:bg-[#fffef8] hover:text-[#d4a017]"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Mobile">
          {beforeServices.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-1 block rounded-lg px-3 py-3 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-[#111827]/6 text-[#d4a017] ring-1 ring-[#d4a017]/40"
                    : "text-[#1f2937] hover:bg-[#fffef8] hover:text-[#d4a017]"
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mb-1">
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors duration-200 ${
                pathname.startsWith("/services")
                  ? "bg-[#111827]/6 text-[#d4a017] ring-1 ring-[#d4a017]/40"
                  : "text-[#1f2937] hover:bg-[#fffef8] hover:text-[#d4a017]"
              }`}
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown
                className={`shrink-0 transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180 text-[#d4a017]" : "text-[#9ca3af]"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none ${
                mobileServicesOpen ? "max-h-[1200px]" : "max-h-0"
              }`}
            >
              <div className="border-l-2 border-[#d4a017]/35 pl-3 pr-1 pt-1">
                <Link
                  href="/services"
                  className="mb-2 block rounded-md px-2 py-2 text-sm font-semibold text-[#d4a017] transition-colors duration-200 hover:bg-[#fffef5] hover:text-[#bf9014]"
                  onClick={closeMobileMenu}
                >
                  View all services →
                </Link>
                <ul className="space-y-0.5 pb-2">
                  {servicesNavItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/services#${item.id}`}
                        className="block rounded-md px-2 py-2.5 text-sm text-[#374151] transition-all duration-200 hover:translate-x-1 hover:bg-[#fafafa] hover:text-[#d4a017] motion-reduce:transition-colors motion-reduce:hover:translate-x-0"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {afterServices.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-1 block rounded-lg px-3 py-3 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-[#111827]/6 text-[#d4a017] ring-1 ring-[#d4a017]/40"
                    : "text-[#1f2937] hover:bg-[#fffef8] hover:text-[#d4a017]"
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-3 border-t border-gray-100 p-4">
          <a
            href={company.phoneLink}
            className="btn-secondary flex w-full justify-center py-3"
            onClick={closeMobileMenu}
          >
            Call Now
          </a>
          <Link
            href="/contact"
            className="btn-primary flex w-full justify-center py-3 shadow-md shadow-[#d4a017]/25"
            onClick={closeMobileMenu}
          >
            Get a Quote
          </Link>
        </div>
      </aside>
    </>
  );
}
