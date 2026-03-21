import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | All-Star Custom Construction LLC",
  description:
    "Contact All-Star Custom Construction LLC for custom concrete, masonry, and outdoor living quote requests across Central Florida.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Request a Free Quote"
        description="Tell us about your project goals and our team will follow up with guidance, scope details, and next steps."
      />

      <section className="section-pad">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Let’s Plan Your Outdoor Project"
              description="Whether you need a new paver patio, retaining wall, deck, fence, or concrete installation, we are here to help you move forward with confidence."
            />
            <div className="mt-6 space-y-4">
              <a href={company.phoneLink} className="card-premium block">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Phone</p>
                <p className="mt-2 text-2xl font-bold text-[#111827]">{company.phone}</p>
                <p className="mt-1 text-sm text-[#6b7280]">Call now for faster scheduling.</p>
              </a>
              <a href={`mailto:${company.email}`} className="card-premium block">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Email</p>
                <p className="mt-2 text-lg font-bold text-[#111827] break-all">{company.email}</p>
              </a>
              <div className="card-premium">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6b7280]">Service Region</p>
                <p className="mt-2 text-lg font-bold text-[#111827]">{company.location}</p>
                <p className="mt-1 text-sm text-[#6b7280]">Built for Central Florida homeowners.</p>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
