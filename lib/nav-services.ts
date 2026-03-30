/** Header dropdown + mobile accordion — links to /services#slug */
export type NavServiceItem = {
  id: string;
  label: string;
  description: string;
};

export const servicesNavItems: NavServiceItem[] = [
  {
    id: "concrete-footings",
    label: "Concrete Footings",
    description: "Structural base for pergolas, fences, and load-bearing work.",
  },
  {
    id: "concrete-slabs",
    label: "Concrete Slabs",
    description: "Durable slabs for patios, utility areas, and outdoor rooms.",
  },
  {
    id: "sidewalks",
    label: "Sidewalks",
    description: "Clean walkways for safety, access, and curb appeal.",
  },
  {
    id: "pavers",
    label: "Pavers",
    description: "Patios, paths, and accents built for Florida weather.",
  },
  {
    id: "masonry",
    label: "Masonry",
    description: "Walls, veneers, and features with lasting character.",
  },
  {
    id: "pergolas",
    label: "Pergolas",
    description: "Shade, structure, and outdoor living definition.",
  },
  {
    id: "fire-pits",
    label: "Fire Pits",
    description: "Gathering spaces designed for evenings and entertaining.",
  },
  {
    id: "decks",
    label: "Decks",
    description: "Expanded outdoor living with solid framing and flow.",
  },
  {
    id: "fences",
    label: "Fences",
    description: "Privacy and perimeter installs with a clean finish.",
  },
  {
    id: "retaining-walls",
    label: "Retaining Walls",
    description: "Grade control, drainage, and usable yard space.",
  },
];
