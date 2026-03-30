import Image from "next/image";
import Link from "next/link";
import { company, coreServices, navLinks } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-200">
      <div className="container-main section-pad pb-10">
        <div className="rounded-2xl border border-[#d4a017]/20 bg-[#1f2937]/50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d4a017]">Start your project</p>
              <p className="mt-1 text-lg font-bold text-white">Ready for a quote or a quick phone consult?</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary min-h-[48px] px-6 shadow-md shadow-[#d4a017]/25">
                Get a Quote
              </Link>
              <a
                href={company.phoneLink}
                className="btn-secondary min-h-[48px] border-white bg-white !text-[#111827] hover:bg-gray-100"
              >
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt="All-Star Custom Construction LLC"
              width={150}
              height={69}
              className="h-[2.875rem] w-auto object-contain opacity-95 sm:h-[3.15rem]"
            />
            <h3 className="mt-3 text-lg font-bold text-white">{company.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Premium outdoor construction for Central Florida homeowners — concrete, pavers, masonry,
              pergolas, fire pits, decks, fences, and retaining walls with contractor-grade attention to
              detail.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#d4a017]">{company.trustLine}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-footer inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">Services</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {coreServices.map((service) => (
                <li key={service.title}>
                  <Link href="/services" className="link-footer inline-block">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">Contact &amp; Area</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>{company.location}</li>
              <li>
                <a href={company.phoneLink} className="link-footer">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="link-footer break-all">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container-main flex flex-col gap-2 py-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p>
              © {year} {company.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Website Design by{" "}
              <a
                href="https://elevatedigitalstudios.net"
                target="_blank"
                rel="noopener noreferrer"
                className="link-footer font-medium"
              >
                Elevate Digital Studio.
              </a>
            </p>
          </div>
          <p>{company.trustLine}</p>
        </div>
      </div>
    </footer>
  );
}
