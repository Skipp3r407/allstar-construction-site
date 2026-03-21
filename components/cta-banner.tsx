import Link from "next/link";
import { company } from "@/lib/site-data";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
};

export function CtaBanner({
  title = "Ready to Upgrade Your Outdoor Space?",
  subtitle = "Get expert guidance, quality workmanship, and a clear quote for your Central Florida project.",
}: CtaBannerProps) {
  return (
    <section className="section-pad">
      <div className="container-main">
        <div className="rounded-2xl bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-3 text-gray-200">{subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Request a Free Quote
              </Link>
              <a href={company.phoneLink} className="btn-secondary border-white bg-white text-[#111827]">
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
