"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CtaBanner } from "@/components/cta-banner";
import { GalleryGrid } from "@/components/gallery-grid";
import {
  fadeInLeft,
  fadeInUp,
  fadeInLeftSubtle,
  fadeInRightSubtle,
  ScrollInLeft,
  ScrollInRight,
  ScrollInUp,
  ScrollInUpZoom,
  staggerContainer,
} from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { company, coreServices, serviceAreas, testimonials } from "@/lib/site-data";

const viewport = { once: true, margin: "-100px" as const };

type HomePageContentProps = {
  trustPoints: string[];
  featuredProjects: Array<{ title: string; category: string; caption: string }>;
};

export function HomePageContent({ trustPoints, featuredProjects }: HomePageContentProps) {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,160,23,0.3),_transparent_40%)]" />
        <div className="animate-float-slow absolute right-8 top-20 hidden h-28 w-28 rounded-full bg-[#d4a017]/20 blur-2xl md:block" />
        <div className="container-main relative">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeInLeft}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={viewport}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a017]">
                Serving Central Florida Homeowners
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Custom Outdoor Construction in Central Florida
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-gray-200">
                Backed by {company.ownerExperience} of industry expertise, All-Star Custom
                Construction LLC delivers concrete, masonry, and outdoor living builds that combine
                durability with premium curb appeal.
              </p>
              <p className="mt-4 text-xl font-semibold uppercase tracking-[0.12em] text-[#d4a017] sm:text-2xl">
                12+ Years Serving Central Florida
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeInUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={viewport}
            >
              <Link href="/contact" className="btn-primary">
                Request a Free Quote
              </Link>
              <a
                href={company.phoneLink}
                className="btn-secondary border-white bg-transparent text-white hover:bg-white/10"
              >
                Call Now
              </a>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-4 sm:grid-cols-3"
              variants={fadeInUp}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={viewport}
            >
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{company.ownerExperience} Experience</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">{company.yearsEstablished} in Business</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Quality Workmanship Guarantee</p>
              </div>
            </motion.div>

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

      <section className="section-pad">
        <div className="container-main">
          <ScrollInUp>
            <SectionHeading
              eyebrow="Our Services"
              title="Concrete, Masonry, and Outdoor Living Solutions"
              description="From strong foundations to polished outdoor entertainment spaces, we deliver custom construction work designed for beauty and function."
              centered
            />
          </ScrollInUp>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={viewport}
          >
            {coreServices.map((service, i) => (
              <motion.div
                key={service.title}
                variants={i % 2 === 0 ? fadeInLeftSubtle : fadeInRightSubtle}
                className="h-full"
              >
                <ServiceCard title={service.title} summary={service.summary} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-main">
          <ScrollInLeft>
            <SectionHeading
              eyebrow="Why Homeowners Choose Us"
              title="Trusted Craftsmanship With a Local Reputation"
              description="We bring a contractor mindset that values precision, transparency, and long-term durability on every project."
            />
          </ScrollInLeft>
          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={viewport}
          >
            {trustPoints.map((point) => (
              <motion.div key={point} variants={fadeInUp} className="h-full">
                <div className="card-premium h-full">
                  <p className="font-semibold text-[#1f2937]">{point}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollInLeft>
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
          </ScrollInLeft>
          <ScrollInRight>
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
          </ScrollInRight>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-main">
          <ScrollInUp>
            <SectionHeading
              eyebrow="Featured Projects"
              title="Craftsmanship You Can See"
              description="See the quality of our work across Orlando and surrounding Central Florida communities."
            />
          </ScrollInUp>
          <ScrollInUpZoom className="mt-10">
            <GalleryGrid items={featuredProjects} />
          </ScrollInUpZoom>
          <ScrollInUp className="mt-8 inline-block">
            <Link href="/gallery" className="btn-secondary">
              View Full Gallery
            </Link>
          </ScrollInUp>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-main">
          <ScrollInUp>
            <SectionHeading
              eyebrow="Client Reviews"
              title="What Homeowners Say About Working With Our Team"
              description="Local feedback from homeowners who trusted us with custom outdoor improvement projects."
            />
          </ScrollInUp>
          <motion.div
            className="mt-8 grid gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={viewport}
          >
            {testimonials.slice(0, 3).map((item) => (
              <motion.div key={item.name} variants={fadeInUp}>
                <TestimonialCard name={item.name} city={item.city} quote={item.quote} />
              </motion.div>
            ))}
          </motion.div>
          <ScrollInUp className="mt-8 inline-block">
            <Link href="/testimonials" className="btn-secondary">
              Read More Testimonials
            </Link>
          </ScrollInUp>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <ScrollInLeft>
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
          </ScrollInLeft>
          <ScrollInRight>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((city) => (
                <div
                  key={city}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-semibold text-[#1f2937] shadow-sm"
                >
                  {city}, FL
                </div>
              ))}
            </div>
          </ScrollInRight>
        </div>
      </section>

      <ScrollInUp>
        <CtaBanner />
      </ScrollInUp>

      <section className="section-pad pt-0">
        <div className="container-main">
          <ScrollInUp>
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
          </ScrollInUp>
        </div>
      </section>
    </>
  );
}
