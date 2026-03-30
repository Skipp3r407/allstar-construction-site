import Image from "next/image";
import Link from "next/link";
import { getGoogleWriteReviewUrl } from "@/lib/google-business";
import { company, coreServices, navLinks } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();
  const googleReviewUrl = getGoogleWriteReviewUrl();

  return (
    <footer className="bg-[#111827] text-gray-200">
      <div className="container-main section-pad pb-10">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt="All-Star Custom Construction LLC"
              width={130}
              height={60}
              className="h-10 w-auto object-contain opacity-90 sm:h-11"
            />
            <h3 className="mt-3 text-lg font-bold text-white">{company.name}</h3>
            <p className="mt-3 text-sm text-gray-300">
              Trusted custom concrete, masonry, and outdoor living construction across Central
              Florida. Durable craftsmanship with clean, professional results.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#d4a017]">{company.trustLine}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">
              Quick Links
            </h4>
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
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">
              Services
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {coreServices.slice(0, 6).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-300">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Serving homeowners in Central Florida</li>
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
              {googleReviewUrl ? (
                <li>
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-footer inline-block"
                  >
                    Leave a Google review
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container-main flex flex-col gap-2 py-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p>© {year} {company.name}. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-400">
              Website Design by{" "}
              <a
                href="https://elevatedigitalstudios.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cyan-400 transition hover:text-cyan-300"
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
