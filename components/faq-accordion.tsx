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
          <article
            key={item.question}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:border-[#d4a017]/45"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#fffef8]"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#111827] transition-colors duration-200 group-hover:text-[#d4a017]">
                {item.question}
              </span>
              <span
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 text-lg font-bold text-[#1f2937] transition duration-300 group-hover:border-[#d4a017] group-hover:text-[#d4a017] ${
                  isOpen ? "rotate-180 border-[#d4a017]/50 bg-[#fffef8] text-[#d4a017]" : ""
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] border-t border-gray-200" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 py-4 text-sm text-[#4b5563]">{item.answer}</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
