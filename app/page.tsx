import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { getFeaturedGalleryItems } from "@/lib/gallery-data";

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

export default function HomePage() {
  return (
    <HomePageContent trustPoints={trustPoints} featuredGallery={getFeaturedGalleryItems()} />
  );
}
