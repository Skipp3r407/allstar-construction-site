import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";

export const metadata: Metadata = {
  title: "All-Star Custom Construction LLC | Custom Concrete, Masonry & Outdoor Living in Central Florida",
  description:
    "Led by 26+ years of construction expertise and established for 12 years in Central Florida, All-Star Custom Construction LLC delivers premium concrete, masonry, pavers, pergolas, decks, fences, and retaining walls.",
};

const trustPoints = [
  "Backed by 26+ years of hands-on construction experience",
  "Established 12 years ago and proudly serving Central Florida",
  "Quality craftsmanship with clean finishes",
  "Custom project planning for your property",
  "Reliable scheduling and communication",
  "Custom builds designed for beauty and function",
  "Attention to detail from prep to final walkthrough",
  "Local expertise across Orlando and Central Florida neighborhoods",
];

const featuredProjects = [
  {
    title: "Custom Paver Patio Installation",
    category: "Pavers",
    caption: "Patterned paver patio designed for outdoor hosting and Florida weather.",
  },
  {
    title: "Backyard Pergola Build",
    category: "Pergolas",
    caption: "Custom pergola framing that creates shade and architectural presence.",
  },
  {
    title: "Decorative Fire Pit Area",
    category: "Fire Pits",
    caption: "Warm, functional gathering space integrated with hardscape details.",
  },
  {
    title: "Concrete Sidewalk Project",
    category: "Sidewalks",
    caption: "Clean path upgrade improving safety, access, and curb appeal.",
  },
  {
    title: "Retaining Wall Upgrade",
    category: "Retaining Walls",
    caption: "Durable wall system built to stabilize grade and refine yard structure.",
  },
  {
    title: "Privacy Fence Installation",
    category: "Fences",
    caption: "Boundary-focused fence install with durable materials and a clean finish.",
  },
];

export default function HomePage() {
  return <HomePageContent trustPoints={trustPoints} featuredProjects={featuredProjects} />;
}
