import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "FAQ | All-Star Custom Construction LLC",
  description:
    "Find answers to common questions about service areas, estimates, timelines, custom outdoor projects, and materials from All-Star Custom Construction LLC.",
};

const faqItems = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve homeowners throughout Central Florida, including Orlando, Kissimmee, Sanford, Winter Park, Altamonte Springs, Clermont, Oviedo, Apopka, Lakeland, and Davenport.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. We provide free project estimates so you can understand options, materials, and expected scope before moving forward.",
  },
  {
    question: "What types of projects do you handle?",
    answer:
      "We complete concrete footings, slabs, sidewalks, pavers, masonry, pergolas, fire pits, decks, fences, and retaining walls for residential properties.",
  },
  {
    question: "Can you do custom outdoor living projects?",
    answer:
      "Absolutely. We specialize in tailored solutions and can combine multiple features into one cohesive outdoor living design.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline depends on project size, materials, and weather. During your estimate, we provide a realistic schedule and keep communication clear throughout the process.",
  },
  {
    question: "Do you help with design ideas?",
    answer:
      "Yes. We can guide layout, material selection, and practical feature combinations based on your property, budget, and goals.",
  },
  {
    question: "What materials do you work with?",
    answer:
      "We work with concrete, pavers, masonry materials, wood and composite deck materials, fencing systems, and retaining wall block options.",
  },
  {
    question: "How do I get started?",
    answer:
      "Call us or submit the quote form on our Contact page. We will review your project details, discuss goals, and schedule the next step.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Get quick answers about our process, project types, and what to expect when working with All-Star Custom Construction LLC."
      />

      <section className="section-pad">
        <div className="container-main">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Helpful Answers"
              title="Planning a Project? Start Here."
              description="If you need more details, our team is always happy to walk you through options and next steps."
            />
          </Reveal>
          <Reveal direction="up" className="mt-8 max-w-4xl">
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      <Reveal direction="up">
        <CtaBanner
          title="Still Have Questions?"
          subtitle="Reach out for straightforward guidance and a free quote tailored to your project."
        />
      </Reveal>
    </>
  );
}
