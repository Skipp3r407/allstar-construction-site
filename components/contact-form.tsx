"use client";

import { FormEvent, useEffect, useState } from "react";
import { LEAD_STORAGE_KEY } from "@/lib/chatbot-types";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [prefilledNote, setPrefilledNote] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as Record<string, string>;
      queueMicrotask(() => {
        if (d.name) setName(d.name);
        if (d.phone) setPhone(d.phone);
        if (d.email) setEmail(d.email);
        if (d.service) setService(d.service);
        const city = d.city?.trim();
        const det = d.details?.trim() ?? "";
        if (city || det) {
          const combined = [city ? `City: ${city}` : null, det || null].filter(Boolean).join("\n\n");
          setDetails(combined);
        }
        setPrefilledNote(true);
      });
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message: details,
          source: "contact",
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again or call us."
        );
        console.error("[contact-form] API error:", res.status, data);
        return;
      }

      setStatus("success");
      try {
        sessionStorage.removeItem(LEAD_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setDetails("");
      setPrefilledNote(false);
    } catch (e) {
      console.error("[contact-form] Network error:", e);
      setStatus("error");
      setErrorMessage("Could not reach the server. Check your connection or call us.");
    }
  };

  return (
    <form
      className="card-premium space-y-4"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "loading"}
    >
      {prefilledNote ? (
        <p className="rounded-md border border-[#d4a017]/35 bg-[#fff8e8] px-3 py-2 text-xs text-[#78350f]">
          Some fields were filled from your chat assistant. Review and add photos or notes before sending.
        </p>
      ) : null}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-[#111827]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 hover:border-[#d4a017]/45 focus:border-[#d4a017] focus:shadow-sm focus:ring-2 focus:ring-[#d4a017]/25"
          placeholder="Your full name"
          autoComplete="name"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 focus:border-[#1f2937] focus:shadow-sm focus:ring-2 focus:ring-[#1f2937]/25"
            placeholder="321-315-6014"
            autoComplete="tel"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 hover:border-[#d4a017]/45 focus:border-[#d4a017] focus:shadow-sm focus:ring-2 focus:ring-[#d4a017]/25"
            placeholder="you@example.com"
            autoComplete="email"
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
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 hover:border-[#d4a017]/45 focus:border-[#d4a017] focus:shadow-sm focus:ring-2 focus:ring-[#d4a017]/25"
          value={service}
          onChange={(e) => setService(e.target.value)}
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
          required
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition duration-200 hover:border-[#d4a017]/45 focus:border-[#d4a017] focus:shadow-sm focus:ring-2 focus:ring-[#d4a017]/25"
          placeholder="Tell us about your project goals, timeline, and property details."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary inline-flex min-h-[48px] w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#111827] border-t-transparent"
              aria-hidden
            />
            Sending…
          </>
        ) : (
          "Request a Free Quote"
        )}
      </button>
      {status === "success" ? (
        <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Thanks! Your message has been sent. We’ll get back to you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {errorMessage ?? "Something went wrong. Please call us directly and we will help right away."}
        </p>
      ) : null}
      <p className="text-xs text-[#6b7280]">We typically respond to quote requests within one business day.</p>
    </form>
  );
}
