"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="card-premium space-y-4" action="#" method="post" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-[#111827]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
          placeholder="Your full name"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-[#111827]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
            placeholder="321-315-6014"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-[#111827]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-semibold text-[#111827]">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          <option>Concrete Footings</option>
          <option>Slabs & Sidewalks</option>
          <option>Pavers</option>
          <option>Masonry</option>
          <option>Pergolas</option>
          <option>Fire Pits</option>
          <option>Decks</option>
          <option>Fences</option>
          <option>Retaining Walls</option>
          <option>Other / Not Sure Yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="details" className="mb-1 block text-sm font-semibold text-[#111827]">
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
          placeholder="Tell us about your project goals, timeline, and property details."
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto">
        {status === "loading" ? "Sending..." : "Request a Free Quote"}
      </button>
      {status === "success" ? (
        <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Thanks! Your request was received. We will contact you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          Something went wrong. Please call us directly and we will help right away.
        </p>
      ) : null}
      <p className="text-xs text-[#6b7280]">
        We typically respond to quote requests within one business day.
      </p>
    </form>
  );
}
