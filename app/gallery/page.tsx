import type { Metadata } from "next";
import Script from "next/script";
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
    "Pavers, concrete, masonry, pergolas, fire pits, decks, fences and retaining walls: the outdoor construction work All-Star Custom Construction does across Central Florida.",
};

const categories = [...GALLERY_FILTER_CATEGORIES];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Outdoor Projects We Build"
        description="From concrete and pavers to pergolas, decks, and fire pits, see the kinds of outdoor construction we build for Orlando-area homeowners and surrounding communities."
      />

      <section className="section-pad pb-0">
        <div className="container-main">
          {/* Recent real jobs, published by Elevate Digital Studios. Renders nothing until photos are published. */}
          <div data-elevate-gallery="all-star-custom-construction" data-title="Recent Jobs" data-max="12" data-columns="3" />
          <Script src="https://elevatedigitalstudios.net/gallery-embed.js" strategy="lazyOnload" />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-main">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Built to Last"
              title="What We Build, by Service"
              description="Filter by service to see the hardscape, structural, and outdoor living work we do throughout Central Florida. Photos marked Example show the type of work; photos from our recent jobs appear above as they're finished."
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
