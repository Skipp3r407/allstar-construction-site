import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ServiceDetailCard } from "@/components/service-detail-card";

export const metadata: Metadata = {
  title: "Services | All-Star Custom Construction LLC",
  description:
    "Explore concrete, masonry, paver, pergola, deck, fence, fire pit, and retaining wall services from All-Star Custom Construction LLC in Central Florida.",
};

const detailedServices = [
  {
    title: "Concrete Footings",
    overview:
      "Footings are the base of structural outdoor work. We install properly sized, reinforced footings for pergolas, fences, and supporting elements.",
    benefits: [
      "Improves structural stability and longevity",
      "Supports code-conscious construction practices",
      "Reduces future settling and movement concerns",
    ],
    reason: "Homeowners choose professional footings to protect larger investments above grade.",
  },
  {
    title: "Slabs & Sidewalks",
    overview:
      "We pour clean, level concrete slabs and sidewalks for patios, utility spaces, walkways, and access improvements.",
    benefits: [
      "Low-maintenance and long-lasting surfaces",
      "Safer walking paths around your property",
      "Improved function for backyard and side-yard use",
    ],
    reason: "A quality slab or sidewalk creates immediate function with reliable performance.",
  },
  {
    title: "Pavers",
    overview:
      "Custom paver installations provide a premium look for patios, pathways, and decorative outdoor zones.",
    benefits: [
      "Wide variety of colors, textures, and patterns",
      "Excellent curb appeal and visual value",
      "Easy spot repairs compared to poured surfaces",
    ],
    reason: "Pavers are popular with homeowners who want high-end style with everyday durability.",
  },
  {
    title: "Masonry",
    overview:
      "From feature walls to functional elements, our masonry work adds definition, strength, and timeless character to outdoor spaces.",
    benefits: [
      "Durable construction with classic aesthetics",
      "Versatile for decorative and structural applications",
      "Pairs well with pavers, concrete, and landscaping",
    ],
    reason: "Masonry is ideal when you want substance, texture, and long-term performance.",
  },
  {
    title: "Pergolas",
    overview:
      "A custom pergola can turn an open backyard into a shaded, comfortable gathering area with architectural appeal.",
    benefits: [
      "Creates visual structure in outdoor layouts",
      "Adds partial shade for Florida afternoons",
      "Enhances patio and fire pit spaces",
    ],
    reason: "Homeowners choose pergolas for both function and a dramatic design upgrade.",
  },
  {
    title: "Fire Pits",
    overview:
      "We build fire pit areas that become natural focal points for entertaining and relaxing throughout the year.",
    benefits: [
      "Extends outdoor use into evenings and cooler seasons",
      "Boosts backyard comfort and entertainment value",
      "Custom shapes and finishes to match your style",
    ],
    reason: "Fire pit features create a premium outdoor living experience at home.",
  },
  {
    title: "Decks",
    overview:
      "Our deck projects are designed for practical flow, weather resistance, and seamless transitions from indoors to outdoors.",
    benefits: [
      "Adds usable square footage for gatherings",
      "Customizable layout and finish options",
      "Improves property value and livability",
    ],
    reason: "Decks give homeowners a functional platform for everyday outdoor living.",
  },
  {
    title: "Fences",
    overview:
      "We install custom fence systems to improve privacy, safety, and boundary definition around your property.",
    benefits: [
      "Enhances backyard privacy and security",
      "Defines property lines with a clean finish",
      "Available styles to complement your home",
    ],
    reason: "A well-built fence combines practical protection with visual polish.",
  },
  {
    title: "Retaining Walls",
    overview:
      "Retaining walls help manage grade changes, drainage, and erosion while adding structure to landscaping plans.",
    benefits: [
      "Stabilizes sloped or uneven areas",
      "Supports better water management",
      "Creates more usable, organized yard space",
    ],
    reason: "Homeowners choose retaining walls for both engineering value and curb appeal.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Premium Outdoor Construction Services in Central Florida"
        description="From foundations to finishing features, we deliver custom concrete, masonry, and outdoor living installations built for daily use and long-term value."
      />

      <section className="section-pad">
        <div className="container-main grid gap-6 lg:grid-cols-2">
          {detailedServices.map((service) => (
            <ServiceDetailCard
              key={service.title}
              title={service.title}
              overview={service.overview}
              benefits={service.benefits}
              reason={service.reason}
            />
          ))}
        </div>
      </section>

      <CtaBanner title="Need Help Choosing the Right Service?" subtitle="Tell us about your property goals and we will recommend the best approach for design, durability, and budget." />
    </>
  );
}
