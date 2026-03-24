/** Shared types and constants for the site chatbot (no AI — rule-based FAQ + lead capture). */

export type ChatbotFaqCategory =
  | "general"
  | "services"
  | "footings"
  | "slabs"
  | "pavers"
  | "masonry"
  | "pergolas"
  | "firePits"
  | "decks"
  | "fences"
  | "retainingWalls"
  | "serviceArea"
  | "quote"
  | "scheduling"
  | "timeline"
  | "trust"
  | "materials"
  | "maintenance"
  | "contact";

export type ChatbotFaq = {
  id: string;
  category: ChatbotFaqCategory;
  /** Lowercase phrases for matching (no need to repeat full question). */
  keywords: string[];
  question: string;
  answer: string;
};

export const CHATBOT_COMPANY = {
  name: "All-Star Custom Construction LLC",
  area: "Central Florida",
  phone: "321-315-6014",
  phoneDisplay: "321-315-6014",
  phoneLink: "tel:+13213156014",
  email: "allstarconstruction85@gmail.com",
  experience: "26+ years of industry expertise",
  serving: "12+ years serving Central Florida",
} as const;

export const CHATBOT_CITIES = [
  "Orlando",
  "Kissimmee",
  "Sanford",
  "Winter Park",
  "Altamonte Springs",
  "Clermont",
  "Oviedo",
  "Apopka",
  "Lakeland",
  "Davenport",
] as const;

/** Labels must match the Contact form `<option>` text for prefill. */
export const CHATBOT_SERVICES = [
  "Concrete Footings",
  "Slabs & Sidewalks",
  "Pavers",
  "Masonry",
  "Pergolas",
  "Fire Pits",
  "Decks",
  "Fences",
  "Retaining Walls",
  "Other / Not Sure Yet",
] as const;

/** Phrases that start the conversational lead capture flow. */
export const LEAD_INTENT_PHRASES = [
  "quote",
  "estimate",
  "pricing",
  "price",
  "how much",
  "cost",
  "call me",
  "contact me",
  "get started",
  "start my project",
  "book",
  "schedule",
  "someone call",
  "reach out",
  "i need a quote",
  "free quote",
  "request quote",
  "get a quote",
  "send estimate",
];

export const LEAD_STORAGE_KEY = "asc_chatbot_lead";
