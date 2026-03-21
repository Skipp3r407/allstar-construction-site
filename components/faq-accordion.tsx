"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article key={item.question} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#111827]">{item.question}</span>
              <span className="text-lg font-bold text-[#1f2937]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <div className="border-t border-gray-200 px-5 py-4 text-sm text-[#4b5563]">{item.answer}</div> : null}
          </article>
        );
      })}
    </div>
  );
}
