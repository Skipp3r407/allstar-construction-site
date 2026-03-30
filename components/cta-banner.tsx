import Link from "next/link";
import { company } from "@/lib/site-data";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
};

export function CtaBanner({
  title = "Ready to Start Your Project?",
  subtitle = "Get expert guidance, quality workmanship, and a clear quote for your Central Florida project.",
}: CtaBannerProps) {
  return (
    <section className="section-pad">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-2xl border border-[#d4a017]/20 bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] p-8 text-white shadow-[0_20px_50px_-20px_rgba(17,24,39,0.5)] ring-1 ring-white/10 transition duration-300 hover:shadow-[0_24px_60px_-18px_rgba(212,160,23,0.15)] sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d4a017]/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-3 text-gray-200">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-primary min-h-[48px] animate-pulse-soft px-6 py-3 text-center shadow-lg shadow-[#d4a017]/30 sm:min-w-[200px]"
              >
                Request a Free Quote
              </Link>
              <a
                href={company.phoneLink}
                className="btn-secondary inline-flex min-h-[48px] min-w-[140px] items-center justify-center border-white bg-white px-6 py-3 !text-[#111827] hover:!border-[#d4a017]/55 hover:!bg-[#fffef8] hover:!text-[#d4a017]"
                aria-label={`Call ${company.phone}`}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
