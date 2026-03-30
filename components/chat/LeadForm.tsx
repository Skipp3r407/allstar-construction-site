"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CHATBOT_COMPANY, CHATBOT_SERVICES, LEAD_STORAGE_KEY } from "@/lib/chatbot-types";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  details: string;
  source: "chatbot-form" | "chatbot-chat";
  createdAt: string;
};

type LeadFormProps = {
  onSubmitted: (payload: LeadPayload) => void;
  onCancel: () => void;
};

/**
 * One-screen alternative to the conversational lead flow (better for some mobile users).
 */
export function LeadForm({ onSubmitted, onCancel }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: LeadPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim(),
      city: city.trim(),
      details: details.trim(),
      source: "chatbot-form",
      createdAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
    onSubmitted(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2.5 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-inner"
    >
      <p className="text-xs font-semibold text-[#111827]">Quick quote form</p>
      <input
        required
        className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <input
        required
        type="tel"
        className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        autoComplete="tel"
      />
      <input
        required
        type="email"
        className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <select
        required
        className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="">Service needed</option>
        {CHATBOT_SERVICES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        required
        className="w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        autoComplete="address-level2"
      />
      <textarea
        required
        rows={3}
        className="w-full resize-none rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937]/20"
        placeholder="Project details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1 px-3 py-2 text-xs">
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-[#374151] transition-colors duration-200 hover:border-[#d4a017]/45 hover:bg-[#fffef8] hover:text-[#d4a017]"
        >
          Back to chat
        </button>
      </div>
      <p className="text-[10px] text-[#6b7280]">
        Or use the full{" "}
        <Link href="/contact" className="font-semibold text-[#d4a017] underline-offset-2 hover:underline">
          Contact page
        </Link>
        . Call {CHATBOT_COMPANY.phoneDisplay} anytime.
      </p>
    </form>
  );
}
