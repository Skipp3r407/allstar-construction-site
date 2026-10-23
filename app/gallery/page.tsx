import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GALLERY_FILTER_CATEGORIES, galleryItems } from "@/lib/gallery-data";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: "Project Gallery: Pavers, Pergolas & Concrete",
  description:
    "Real Central Florida projects by All-Star Custom Construction: pavers, concrete, masonry, pergolas, fire pits, decks, fences and retaining walls.",
};

const categories = [...GALLERY_FILTER_CATEGORIES];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="See Our Work Across Central Florida"
        description="From concrete and pavers to pergolas, decks, and fire pits, explore the craftsmanship behind our outdoor construction projects for Orlando-area homeowners and surrounding communities."
      />

      <section className="section-pad">
        <div className="container-main">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Built to Last"
              title="Recent Projects & Craftsmanship"
              description="Filter by service to view the hardscape, structural, and outdoor living work we deliver throughout Central Florida — with the same attention to detail on every job site."
            />
          </Reveal>
          <div className="mt-8">
            <GalleryGrid
              items={galleryItems}
              categories={categories}
              enableFilters
              enableLightbox
              enableStagger
            />
          </div>
        </div>
      </section>

      <Reveal direction="up">
        <CtaBanner
          title="Ready to Start Your Project?"
          subtitle="Request a free quote or call now to plan your concrete, paver, masonry, pergola, deck, fence, or retaining wall project in Central Florida."
        />
      </Reveal>
    </>
  );
}
