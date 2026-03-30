"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/gallery-data";
import { StaggerReveal } from "@/components/reveal";

export type { GalleryItem } from "@/lib/gallery-data";

const ASPECT = "aspect-[3/2]";

function isSvgSrc(src: string) {
  return src.endsWith(".svg") || src.endsWith(".svg?url");
}

function GalleryCard({
  item,
  filteredIndex,
  enableLightbox,
  onOpen,
  priority,
}: {
  item: GalleryItem;
  filteredIndex: number;
  enableLightbox: boolean;
  onOpen: (index: number) => void;
  priority?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#d4a017]/40 hover:shadow-xl hover:shadow-[#d4a017]/8">
      <button
        type="button"
        className={`block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017] ${
          enableLightbox ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => enableLightbox && onOpen(filteredIndex)}
        aria-label={
          enableLightbox
            ? `Open larger view: ${item.title}`
            : `${item.title} — ${item.category}`
        }
      >
        <div className={`relative ${ASPECT} overflow-hidden bg-[#111827]`}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.04]"
            priority={priority}
            unoptimized={isSvgSrc(item.src)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 ring-0 transition duration-300 group-hover:ring-2 group-hover:ring-inset group-hover:ring-[#d4a017]/35" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm font-semibold leading-snug text-white drop-shadow">{item.title}</p>
            {item.location ? (
              <p className="mt-1 text-xs font-medium text-white/90">{item.location}</p>
            ) : null}
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#111827] shadow-sm">
            {item.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-[#111827] transition-colors duration-200 group-hover:text-[#d4a017]">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6b7280] transition-colors duration-200 group-hover:text-[#d4a017]">
            {item.caption}
          </p>
        </div>
      </button>
    </article>
  );
}

type GalleryGridProps = {
  items: GalleryItem[];
  categories?: string[];
  enableFilters?: boolean;
  enableLightbox?: boolean;
  enableStagger?: boolean;
};

export function GalleryGrid({
  items,
  categories = [],
  enableFilters = false,
  enableLightbox = false,
  enableStagger = false,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterButtons = useMemo(() => {
    if (!enableFilters) return [];
    return ["All", ...categories];
  }, [categories, enableFilters]);

  const filteredItems = useMemo(() => {
    if (!enableFilters || activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, enableFilters, items]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || filteredItems.length === 0) return null;
      return (i - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || filteredItems.length === 0) return null;
      return (i + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const current = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const gridClass =
    "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-gallery-filter motion-reduce:animate-none";

  const gridInner = filteredItems.map((item, index) => (
    <GalleryCard
      key={item.id}
      item={item}
      filteredIndex={index}
      enableLightbox={enableLightbox}
      onOpen={setLightboxIndex}
      priority={index < 2}
    />
  ));

  return (
    <>
      {enableFilters ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {filterButtons.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition duration-200 ${
                  isActive
                    ? "bg-[#111827] text-white ring-2 ring-[#d4a017]/50"
                    : "border border-gray-300 bg-white text-[#374151] transition-all duration-200 hover:border-[#d4a017]/50 hover:bg-[#fffef8] hover:text-[#d4a017]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      {enableStagger ? (
        <StaggerReveal
          key={activeCategory}
          className={gridClass}
          staggerMs={56}
          alternateSides
        >
          {gridInner}
        </StaggerReveal>
      ) : (
        <div key={activeCategory} className={gridClass}>
          {gridInner}
        </div>
      )}

      {enableLightbox && current ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          onClick={closeLightbox}
        >
          <div
            className="relative flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#111827] shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full max-h-[min(65vh,560px)] min-h-[200px] bg-black sm:aspect-[16/10] sm:max-h-[min(70vh,620px)]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized={isSvgSrc(current.src)}
              />
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-2 top-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-[#111827] shadow-md transition-all duration-200 hover:bg-[#fffef8] hover:text-[#d4a017]"
              >
                Close
              </button>
              {filteredItems.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#111827] shadow-md transition-all duration-200 hover:bg-[#fffef8] hover:text-[#d4a017] min-[400px]:h-12 min-[400px]:w-12"
                    aria-label="Previous image"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#111827] shadow-md transition-all duration-200 hover:bg-[#fffef8] hover:text-[#d4a017] min-[400px]:h-12 min-[400px]:w-12"
                    aria-label="Next image"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
            <div className="border-t border-white/10 bg-[#111827] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d4a017]">{current.category}</p>
              <h2 id="gallery-lightbox-title" className="mt-2 text-xl font-bold tracking-tight">
                {current.title}
              </h2>
              {current.location ? (
                <p className="mt-1 text-sm text-gray-300">{current.location}</p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{current.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
