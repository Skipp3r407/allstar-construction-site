import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | All-Star Custom Construction LLC",
  description:
    "Learn how All-Star Custom Construction LLC is built on 26+ years of industry experience and proudly established for 12 years serving homeowners across Central Florida.",
};

const builds = [
  "Concrete footings, slabs, and sidewalks",
  "Custom paver patios and walkways",
  "Masonry features and structural walls",
  "Pergolas, fire pits, and entertainment spaces",
  "Decks, fences, and retaining walls",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Built on Craftsmanship, Reliability, and Local Pride"
        description="All-Star Custom Construction LLC helps homeowners across Central Florida create outdoor spaces that are practical, durable, and tailored to how they live."
      />

      <section className="section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A Hands-On Construction Team Focused on Lasting Results"
              description={`All-Star Custom Construction LLC was established ${company.yearsEstablished} ago, built on a foundation of ${company.ownerExperience} of hands-on industry experience. We bring a skilled, detail-driven approach to every project, whether it is a new concrete slab or a full backyard transformation.`}
            />
            <p className="mt-4 text-[#4b5563]">
              Homeowners trust us because we communicate clearly, show up prepared, and deliver
              clean finished work that holds up in Florida conditions.
            </p>
            </div>
          </Reveal>
          <Reveal direction="right">
          <div className="card-premium">
            <h2 className="text-2xl font-bold text-[#111827]">Our Mission</h2>
            <p className="mt-3 text-[#4b5563]">
              To provide custom outdoor construction and masonry solutions that improve property
              value, elevate curb appeal, and create spaces families can enjoy for years.
            </p>
            <h3 className="mt-6 text-lg font-bold text-[#111827]">Why Quality Matters to Us</h3>
            <p className="mt-2 text-[#4b5563]">
              We know outdoor work is an investment. That is why we focus on proper prep work,
              material performance, and finishing details that support both structure and design.
            </p>
          </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-main grid gap-8 lg:grid-cols-2">
          <Reveal direction="left">
          <div className="card-premium">
            <h2 className="text-2xl font-bold text-[#111827]">What Makes Us Different</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#374151]">
              <li>• Custom recommendations based on your layout, goals, and budget</li>
              <li>• Professional project flow from estimate through final walkthrough</li>
              <li>• Durable materials and installation methods suited for local climate</li>
              <li>• Respect for your property with tidy, organized work zones</li>
            </ul>
          </div>
          </Reveal>
          <Reveal direction="right">
          <div className="card-premium">
            <h2 className="text-2xl font-bold text-[#111827]">What We Build</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#374151]">
              {builds.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          </Reveal>
        </div>
      </section>

      <Reveal direction="up">
        <CtaBanner title="Let’s Build Something That Lasts" />
      </Reveal>
    </>
  );
}
