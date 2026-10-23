/**
 * Project gallery. Items marked `example: true` use example photos (not All-Star jobs) and show an "Example photo"
 * badge; replace them with real job photos as they come in. Recent real jobs also appear automatically on the gallery
 * page through the Elevate "Recent Work" feed (published from elevatedigitalstudios.net/studio/content).
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
  /** Example photo of this type of work, not an All-Star job (shows an "Example photo" badge). */
  example?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/pavers/pavers-example-1.webp",
    title: "Backyard Paver Patio",
    category: "Pavers",
    alt: "Example photo: Tan and gray brick paver patio behind a Florida home with outdoor furniture",
    caption: "The kind of paver patio we build: tight joints, clean borders, and a base made for Florida rain.",
    example: true,
    featured: true,
  },
  {
    id: 2,
    src: "/images/gallery/concrete/concrete-example-1.webp",
    title: "Concrete Driveway & Sidewalk",
    category: "Concrete",
    alt: "Example photo: Broom-finish concrete driveway and sidewalk in front of a stucco home",
    caption: "Broom-finish concrete with proper slope and control joints, built for daily traffic.",
    example: true,
    featured: true,
  },
  {
    id: 3,
    src: "/images/gallery/pergolas/pergolas-example-1.webp",
    title: "Cedar Pergola Over a Patio",
    category: "Pergolas",
    alt: "Example photo: Cedar wood pergola built over a paver patio",
    caption: "Pergolas sized to your space for shade and an outdoor room feel.",
    example: true,
    featured: true,
  },
  {
    id: 4,
    src: "/images/gallery/fire-pits/fire-pits-example-1.webp",
    title: "Stone Fire Pit Seating Area",
    category: "Fire Pits",
    alt: "Example photo: Round natural stone fire pit with a paver seating area at sunset",
    caption: "Fire pits with seating built around them, ready for Florida evenings.",
    example: true,
    featured: true,
  },
  {
    id: 5,
    src: "/images/gallery/decks/decks-example-1.webp",
    title: "Backyard Wood Deck",
    category: "Decks",
    alt: "Example photo: Wood deck with railing in a Florida backyard",
    caption: "Decks built level and solid, with railings and steps where you need them.",
    example: true,
    featured: true,
  },
  {
    id: 6,
    src: "/images/gallery/fences/fences-example-1.webp",
    title: "Privacy Fence",
    category: "Fences",
    alt: "Example photo: Privacy fence along a backyard property line",
    caption: "Privacy fencing set straight and strong along the property line.",
    example: true,
    featured: true,
  },
  {
    id: 7,
    src: "/images/gallery/masonry/masonry-example-1.webp",
    title: "Stone Masonry Garden Wall",
    category: "Masonry",
    alt: "Example photo: Natural stone masonry garden wall with landscaping",
    caption: "Stone and block masonry that adds structure and curb appeal.",
    example: true,
  },
  {
    id: 8,
    src: "/images/gallery/retaining-walls/retaining-walls-example-1.webp",
    title: "Block Retaining Wall",
    category: "Retaining Walls",
    alt: "Example photo: Segmental block retaining wall holding a sloped yard",
    caption: "Retaining walls that level a slope and handle drainage the right way.",
    example: true,
  },
];

export function getFeaturedGalleryItems(): GalleryItem[] {
  return galleryItems.filter((item) => item.featured);
}
