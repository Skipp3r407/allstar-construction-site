import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Gallery | All-Star Custom Construction LLC",
  description:
    "View project examples from All-Star Custom Construction LLC, including pavers, pergolas, fire pits, masonry, decks, fences, slabs, and retaining walls.",
};

const galleryItems = [
  {
    title: "Custom Paver Patio Installation",
    category: "Pavers",
    caption: "Custom Paver Patio Installation",
  },
  {
    title: "Paver Walkway and Patio Upgrade",
    category: "Pavers",
    caption: "Paver Walkway and Patio Upgrade",
  },
  {
    title: "Concrete Slab for Outdoor Expansion",
    category: "Concrete",
    caption: "Concrete Slab for Outdoor Expansion",
  },
  {
    title: "Decorative Masonry Feature Installation",
    category: "Masonry",
    caption: "Decorative Masonry Feature Installation",
  },
  {
    title: "Backyard Fire Pit Seating Area",
    category: "Fire Pits",
    caption: "Backyard Fire Pit Seating Area",
  },
  {
    title: "Durable Retaining Wall Project",
    category: "Retaining Walls",
    caption: "Durable Retaining Wall Project",
  },
  {
    title: "Wood Fence Installation for Privacy",
    category: "Fences",
    caption: "Wood Fence Installation for Privacy",
  },
  {
    title: "Concrete Footing Prep for Structural Build",
    category: "Concrete",
    caption: "Concrete Footing Prep for Structural Build",
  },
  {
    title: "New Sidewalk Installation",
    category: "Sidewalks",
    caption: "New Sidewalk Installation",
  },
  {
    title: "Custom Deck Build for Outdoor Living",
    category: "Decks",
    caption: "Custom Deck Build for Outdoor Living",
  },
  {
    title: "Paver Driveway Border Detail",
    category: "Pavers",
    caption: "Paver Driveway Border Detail",
  },
  {
    title: "Stone Masonry Enhancement Project",
    category: "Masonry",
    caption: "Stone Masonry Enhancement Project",
  },
  {
    title: "Backyard Pergola Build",
    category: "Pergolas",
    caption: "Custom Backyard Pergola in Central Florida",
  },
  {
    title: "Concrete Sidewalk Project",
    category: "Sidewalks",
    caption: "Concrete Sidewalk Project",
  },
];

const categories = [
  "Concrete",
  "Sidewalks",
  "Pavers",
  "Masonry",
  "Pergolas",
  "Fire Pits",
  "Decks",
  "Fences",
  "Retaining Walls",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="See What We Have Built Across Central Florida"
        description="Explore project examples that highlight our craftsmanship, custom planning, and quality installation standards."
      />

      <Reveal>
      <section className="section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Work"
            title="Our Project Gallery"
            description="Filter by project type to preview the concrete, masonry, and outdoor living work we complete for local homeowners."
          />
          <div className="mt-8">
            <GalleryGrid items={galleryItems} categories={categories} enableFilters enableLightbox />
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
        <CtaBanner
          title="Ready to Start Your Outdoor Project?"
          subtitle="Request a free quote or call now to discuss your concrete, masonry, pergola, deck, fence, or retaining wall project."
        />
      </Reveal>
    </>
  );
}
