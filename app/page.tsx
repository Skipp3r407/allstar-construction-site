import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { getFeaturedGalleryItems } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Central Florida Outdoor Construction & Free Quotes",
  description:
    "26+ years experience, 12+ years serving Central Florida. Pavers, pergolas, concrete, masonry, fire pits, decks, fences, retaining walls — request a free quote from All-Star Custom Construction LLC.",
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

export default function HomePage() {
  return (
    <HomePageContent trustPoints={trustPoints} featuredGallery={getFeaturedGalleryItems()} />
  );
}
