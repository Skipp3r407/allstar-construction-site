/**
 * Project gallery — add real photos under /public/images/gallery/<category>/ and update `src` to .jpg/.webp as needed.
 * Replace SVG placeholders with matching filenames to avoid broken images.
 */

export const GALLERY_FILTER_CATEGORIES = [
  "Concrete",
  "Pavers",
  "Masonry",
  "Pergolas",
  "Fire Pits",
  "Decks",
  "Fences",
  "Retaining Walls",
] as const;

export type GalleryCategory = (typeof GALLERY_FILTER_CATEGORIES)[number];

export type GalleryItem = {
  id: number;
  src: string;
  title: string;
  category: GalleryCategory;
  alt: string;
  caption: string;
  /** Optional city or region — helps local context on cards and lightbox */
  location?: string;
  /** Shown in the homepage “Our Work” preview (6 items) */
  featured?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/concrete/concrete-sidewalk-orlando-1.svg",
    title: "Concrete Sidewalk Installation",
    category: "Concrete",
    alt: "Concrete sidewalk installation at a Central Florida home with smooth finish and clean edges",
    caption: "Walkway upgrade for safer access and stronger curb appeal in Florida weather.",
    location: "Greater Orlando area",
    featured: true,
  },
  {
    id: 2,
    src: "/images/gallery/concrete/concrete-slab-prep-1.svg",
    title: "Outdoor Slab & Base Prep",
    category: "Concrete",
    alt: "Concrete slab preparation and pour for outdoor living space in Central Florida",
    caption: "Proper compaction and reinforcement for a long-lasting outdoor slab.",
    location: "Central Florida",
  },
  {
    id: 3,
    src: "/images/gallery/concrete/concrete-footing-work-1.svg",
    title: "Structural Footing Work",
    category: "Concrete",
    alt: "Concrete footing work for structural outdoor construction in Florida",
    caption: "Footings built to spec for pergolas, additions, and load-bearing outdoor features.",
  },
  {
    id: 4,
    src: "/images/gallery/pavers/paver-patio-orlando-1.svg",
    title: "Custom Paver Patio",
    category: "Pavers",
    alt: "Custom paver patio installation for outdoor living in Central Florida",
    caption: "Patterned paver patio designed for drainage, durability, and everyday hosting.",
    location: "Orange County, FL",
    featured: true,
  },
  {
    id: 5,
    src: "/images/gallery/pavers/paver-walkway-pattern-1.svg",
    title: "Paver Walkway & Border Detail",
    category: "Pavers",
    alt: "Decorative paver walkway with border detail on a Florida residential property",
    caption: "Clean lines and contrast borders that tie the landscape together.",
  },
  {
    id: 6,
    src: "/images/gallery/pavers/paver-driveway-accent-1.svg",
    title: "Driveway Paver Accent",
    category: "Pavers",
    alt: "Paver driveway border and accent installation in Central Florida",
    caption: "High-impact entry detail without a full driveway rebuild.",
  },
  {
    id: 7,
    src: "/images/gallery/pavers/pool-deck-pavers-1.svg",
    title: "Pool Deck Pavers",
    category: "Pavers",
    alt: "Pool deck paver surface around a residential pool in Florida",
    caption: "Cool, slip-resistant texture options for pool decks and patios.",
  },
  {
    id: 8,
    src: "/images/gallery/masonry/stone-masonry-feature-1.svg",
    title: "Stone Masonry Feature",
    category: "Masonry",
    alt: "Stone masonry veneer and feature wall for outdoor living in Central Florida",
    caption: "Natural texture and depth for columns, seating, and focal walls.",
  },
  {
    id: 9,
    src: "/images/gallery/masonry/decorative-masonry-wall-1.svg",
    title: "Decorative Masonry Wall",
    category: "Masonry",
    alt: "Decorative masonry wall installation on a Florida property",
    caption: "Structural and decorative masonry built to last in humid climates.",
  },
  {
    id: 10,
    src: "/images/gallery/pergolas/backyard-pergola-build-1.svg",
    title: "Backyard Pergola Build",
    category: "Pergolas",
    alt: "Custom backyard pergola construction in Central Florida",
    caption: "Shade, structure, and style for outdoor dining and seating areas.",
    location: "Seminole County, FL",
    featured: true,
  },
  {
    id: 11,
    src: "/images/gallery/fire-pits/decorative-fire-pit-area-1.svg",
    title: "Decorative Fire Pit Area",
    category: "Fire Pits",
    alt: "Outdoor fire pit seating area with hardscape surround in Central Florida",
    caption: "Gathering space built for safety, seating, and long-term outdoor use.",
    featured: true,
  },
  {
    id: 12,
    src: "/images/gallery/fire-pits/fire-pit-seating-1.svg",
    title: "Fire Pit & Seating Ring",
    category: "Fire Pits",
    alt: "Circular fire pit with seating wall on a Florida backyard",
    caption: "Integrated seating and fire feature for evening entertaining.",
  },
  {
    id: 13,
    src: "/images/gallery/decks/custom-deck-outdoor-living-1.svg",
    title: "Custom Deck Build",
    category: "Decks",
    alt: "Custom wood or composite deck for outdoor living in Central Florida",
    caption: "Level transitions, secure framing, and finishes built for outdoor living.",
  },
  {
    id: 14,
    src: "/images/gallery/fences/privacy-fence-installation-1.svg",
    title: "Fence Installation",
    category: "Fences",
    alt: "Privacy fence installation on a residential lot in Central Florida",
    caption: "Clean posts, secure panels, and a boundary that looks sharp from every angle.",
    location: "Osceola County, FL",
    featured: true,
  },
  {
    id: 15,
    src: "/images/gallery/retaining-walls/retaining-wall-grade-1.svg",
    title: "Retaining Wall Project",
    category: "Retaining Walls",
    alt: "Segmental retaining wall controlling grade on a Florida property",
    caption: "Structural wall system to manage slope and create usable yard space.",
    featured: true,
  },
  {
    id: 16,
    src: "/images/gallery/retaining-walls/segmental-wall-project-1.svg",
    title: "Segmental Retaining Wall",
    category: "Retaining Walls",
    alt: "Segmental block retaining wall installation in Central Florida",
    caption: "Drainage, geogrid, and base prep done right for long-term stability.",
  },
];

export function getFeaturedGalleryItems(): GalleryItem[] {
  return galleryItems.filter((item) => item.featured);
}
