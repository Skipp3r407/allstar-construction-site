import Link from "next/link";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { company, coreServices, serviceAreas, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "All-Star Custom Construction LLC | Custom Concrete, Masonry & Outdoor Living in Central Florida",
  description:
    "Led by 26+ years of construction expertise and established for 12 years in Central Florida, All-Star Custom Construction LLC delivers premium concrete, masonry, pavers, pergolas, decks, fences, and retaining walls.",
};

const trustPoints = [
  "Backed by 26+ years of hands-on construction experience",
  "Established 12 years ago and proudly serving Central Florida",
  "Quality craftsmanship with clean finishes",
  "Custom project planning for your property",
  "Reliable scheduling and communication",
  "Custom builds designed for beauty and function",
  "Attention to detail from prep to final walkthrough",
  "Local expertise across Orlando and Central Florida neighborhoods",
];

const featuredProjects = [
  {
    title: "Custom Paver Patio Installation",
    category: "Pavers",
    caption: "Patterned paver patio designed for outdoor hosting and Florida weather.",
  },
  {
    title: "Backyard Pergola Build",
    category: "Pergolas",
    caption: "Custom pergola framing that creates shade and architectural presence.",
  },
  {
    title: "Decorative Fire Pit Area",
    category: "Fire Pits",
    caption: "Warm, functional gathering space integrated with hardscape details.",
  },
  {
    title: "Concrete Sidewalk Project",
    category: "Sidewalks",
    caption: "Clean path upgrade improving safety, access, and curb appeal.",
  },
  {
    title: "Retaining Wall Upgrade",
    category: "Retaining Walls",
    caption: "Durable wall system built to stabilize grade and refine yard structure.",
  },
  {
    title: "Privacy Fence Installation",
    category: "Fences",
    caption: "Boundary-focused fence install with durable materials and a clean finish.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,160,23,0.3),_transparent_40%)]" />
        <div className="animate-float-slow absolute right-8 top-20 hidden h-28 w-28 rounded-full bg-[#d4a017]/20 blur-2xl md:block" />
        <div className="container-main relative">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a017]">
              Serving Central Florida Homeowners
            </p>
            <h1
              className="animate-fade-up mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "90ms" }}
            >
              Custom Outdoor Construction in Central Florida
            </h1>
            <p className="animate-fade-up mt-5 max-w-2xl text-lg text-gray-200" style={{ animationDelay: "170ms" }}>
              Backed by {company.ownerExperience} of industry expertise, All-Star Custom
              Construction LLC delivers concrete, masonry, and outdoor living builds that combine
              durability with premium curb appeal.
            </p>
            <p
              className="animate-fade-up mt-4 text-xl font-semibold uppercase tracking-[0.12em] text-[#d4a017] sm:text-2xl"
              style={{ animationDelay: "220ms" }}
            >
              12+ Years Serving Central Florida
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "250ms" }}>
              <Link href="/contact" className="btn-primary">
                Request a Free Quote
              </Link>
              <a href={company.phoneLink} className="btn-secondary bg-transparent text-white border-white hover:bg-white/10">
                Call Now
              </a>
            </div>
            <div className="animate-fade-up mt-10 grid gap-4 sm:grid-cols-3" style={{ animationDelay: "320ms" }}>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{company.ownerExperience} Experience</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{company.yearsEstablished} in Business</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Quality Workmanship Guarantee</p>
              </div>
            </div>
            <div className="mt-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Scroll
                <span className="flex h-7 w-4 items-start justify-center rounded-full border border-gray-300 p-1">
                  <span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-[#d4a017]" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
      <section className="section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Services"
            title="Concrete, Masonry, and Outdoor Living Solutions"
            description="From strong foundations to polished outdoor entertainment spaces, we deliver custom construction work designed for beauty and function."
            centered
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <ServiceCard key={service.title} title={service.title} summary={service.summary} />
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-white section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Why Homeowners Choose Us"
            title="Trusted Craftsmanship With a Local Reputation"
            description="We bring a contractor mindset that values precision, transparency, and long-term durability on every project."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point} className="card-premium">
                <p className="font-semibold text-[#1f2937]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About All-Star"
              title="Custom Exterior Improvements Backed by Real Craftsmanship"
              description="All-Star Custom Construction LLC helps Central Florida homeowners transform underused yards and outdated hardscapes into high-value outdoor spaces. We combine practical planning with skilled installation so your project not only looks great, but lasts."
            />
            <Link href="/about" className="btn-secondary mt-6">
              Learn More About Our Company
            </Link>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold">Built to Handle Florida Conditions</h3>
            <p className="mt-4 text-gray-200">
              Heat, rain, and heavy use demand smart material choices and proper installation.
              That is why our team focuses on preparation, drainage, structural integrity, and
              finishing details.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-100">
              <li>• Site-specific recommendations, not one-size-fits-all solutions</li>
              <li>• Clean job sites and respectful project management</li>
              <li>• Honest timelines with clear communication from start to finish</li>
            </ul>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-white section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Craftsmanship You Can See"
            description="See the quality of our work across Orlando and surrounding Central Florida communities."
          />
          <div className="mt-10">
            <GalleryGrid items={featuredProjects} />
          </div>
          <Link href="/gallery" className="btn-secondary mt-8">
            View Full Gallery
          </Link>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="section-pad">
        <div className="container-main">
          <SectionHeading
            eyebrow="Client Reviews"
            title="What Homeowners Say About Working With Our Team"
            description="Local feedback from homeowners who trusted us with custom outdoor improvement projects."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <TestimonialCard key={item.name} name={item.name} city={item.city} quote={item.quote} />
            ))}
          </div>
          <Link href="/testimonials" className="btn-secondary mt-8">
            Read More Testimonials
          </Link>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-white section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Service Areas"
              title="Proudly Serving Communities Across Central Florida"
              description="We regularly complete projects in Orlando, Kissimmee, Sanford, Winter Park, Altamonte Springs, Clermont, Oviedo, Apopka, Lakeland, and Davenport."
            />
            <p className="mt-4 text-[#4b5563]">
              Do not see your city listed? Reach out anyway. We may still be able to schedule your
              project based on scope and location.
            </p>
            <Link href="/service-areas" className="btn-secondary mt-6">
              Explore Service Areas
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceAreas.map((city) => (
              <div key={city} className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-semibold text-[#1f2937] shadow-sm">
                {city}, FL
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
        <CtaBanner />
      </Reveal>

      <Reveal>
      <section className="section-pad pt-0">
        <div className="container-main">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <SectionHeading
              eyebrow="Contact"
              title="Start Your Project With a Clear, No-Pressure Estimate"
              description="Call us directly or send project details through our quote request form. We are ready to help you plan the right approach for your property."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a href={company.phoneLink} className="card-premium">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Phone</p>
                <p className="mt-2 text-lg font-bold text-[#111827]">{company.phone}</p>
              </a>
              <a href={`mailto:${company.email}`} className="card-premium">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Email</p>
                <p className="mt-2 text-lg font-bold text-[#111827]">{company.email}</p>
              </a>
              <div className="card-premium">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Area</p>
                <p className="mt-2 text-lg font-bold text-[#111827]">{company.location}</p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary mt-6">
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>
      </Reveal>
    </>
  );
}
