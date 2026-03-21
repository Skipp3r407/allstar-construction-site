"use client";

import { useMemo, useState } from "react";

export type GalleryItem = {
  title: string;
  category: string;
  caption: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  categories?: string[];
  enableFilters?: boolean;
  enableLightbox?: boolean;
};

export function GalleryGrid({
  items,
  categories = [],
  enableFilters = false,
  enableLightbox = false,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterButtons = useMemo(() => {
    if (!enableFilters) return [];
    return ["All", ...categories];
  }, [categories, enableFilters]);

  const filteredItems = useMemo(() => {
    if (!enableFilters || activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, enableFilters, items]);

  return (
    <>
      {enableFilters ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {filterButtons.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "bg-[#1f2937] text-white"
                    : "border border-gray-300 bg-white text-[#374151] hover:border-[#1f2937]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={`${item.title}-${item.category}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => (enableLightbox ? setSelectedItem(item) : undefined)}
              aria-label={`Open preview for ${item.title}`}
            >
              <div
                className="relative h-52 overflow-hidden bg-gradient-to-br from-[#374151] to-[#111827]"
                role="img"
                aria-label={`${item.title} - ${item.category} project placeholder image`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,160,23,0.35),_transparent_45%)]" />
                <div className="absolute inset-0 transition duration-300 group-hover:scale-105 group-hover:bg-black/10" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6b7280]">{item.caption}</p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {enableLightbox && selectedItem ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative h-72 bg-gradient-to-br from-[#1f2937] to-[#111827] sm:h-80">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,160,23,0.35),_transparent_45%)]" />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#111827]"
              >
                Close
              </button>
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">
                {selectedItem.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#111827]">{selectedItem.title}</h3>
              <p className="mt-2 text-sm text-[#6b7280]">{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
