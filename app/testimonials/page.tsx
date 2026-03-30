import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { GoogleReviewsSection } from "@/components/google-reviews-section";
import { PageHero } from "@/components/page-hero";
import { Reveal, StaggerReveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testimonials | All-Star Custom Construction LLC",
  description:
    "Read local reviews from homeowners who chose All-Star Custom Construction LLC for patios, retaining walls, pergolas, concrete, and masonry projects.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="What Central Florida Homeowners Say"
        description="Real feedback from clients who trusted us with custom outdoor construction and masonry projects."
      />

      <GoogleReviewsSection />

      <section className="section-pad">
        <div className="container-main">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Client Reviews"
              title="Dependable Service and Quality Results"
              description="We are proud to earn repeat business and referrals by delivering clear communication, fair pricing, and durable finished work."
            />
          </Reveal>
          <StaggerReveal className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerMs={65} alternateSides>
            {testimonials.map((item) => (
              <div key={item.name}>
                <TestimonialCard name={item.name} city={item.city} quote={item.quote} />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <Reveal direction="up">
        <CtaBanner
          title="Ready to Be Our Next Success Story?"
          subtitle="Call now or request a free quote for your concrete, masonry, or outdoor living project."
        />
      </Reveal>
    </>
  );
}
