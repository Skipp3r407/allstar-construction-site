import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { getFeaturedGalleryItems } from "@/lib/gallery-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "All-Star Custom Construction | Central Florida Pavers & Concrete" },
  description:
    "Pavers, pergolas, concrete, masonry, fire pits, decks, fences and retaining walls in Orlando and Central Florida. 26+ years of experience. Free quotes.",
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
