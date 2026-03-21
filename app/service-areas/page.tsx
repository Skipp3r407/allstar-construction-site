import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { serviceAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Service Areas | All-Star Custom Construction LLC",
  description:
    "All-Star Custom Construction LLC serves homeowners across Central Florida, including Orlando, Kissimmee, Sanford, Winter Park, and surrounding communities.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        title="Proudly Serving Central Florida Communities"
        description="Our team provides custom concrete, masonry, and outdoor construction services for homeowners across the greater Central Florida area."
      />

      <section className="section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Local Service"
            title="Cities We Commonly Serve"
            description="We routinely take on projects throughout the region and understand local property styles, outdoor living needs, and climate-related construction priorities."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((city) => (
              <article key={city} className="card-premium">
                <h3 className="text-xl font-bold text-[#111827]">{city}</h3>
                <p className="mt-2 text-sm text-[#6b7280]">
                  Custom outdoor construction and masonry services for homeowners in {city}, FL.
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-[#d4a017]/40 bg-[#fff8e8] p-4 text-sm text-[#1f2937]">
            If your city is not listed, contact us anyway. We may still be able to schedule your
            project based on location, scope, and timeline.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Check Availability for Your Property"
        subtitle="Call now or request a free quote and we will confirm service options in your area."
      />
    </>
  );
}
