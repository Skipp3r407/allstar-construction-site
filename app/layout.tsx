import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Chatbot } from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { Header } from "@/components/header";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Footer } from "@/components/footer";
import { company, coreServices, serviceAreas } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "All-Star Custom Construction | Central Florida Pavers & Concrete",
    template: "%s | All-Star Construction",
  },
  description:
    "Pavers, concrete, pergolas, masonry, fire pits, decks, fences and retaining walls across Central Florida. 26+ years of experience. Free quotes.",
  keywords: [
    "Central Florida contractor",
    "Orlando pavers",
    "pergola builder Florida",
    "concrete contractor",
    "retaining wall",
    "outdoor construction",
  ],
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "All-Star Custom Construction LLC",
    title: "All-Star Custom Construction | Central Florida",
    url: SITE_URL,
    images: ["/opengraph-image"],
    description:
      "Premium outdoor construction for homeowners: pavers, pergolas, concrete, masonry, and more.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LoadingScreen />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <Chatbot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
              "@id": `${SITE_URL}/#business`,
              name: company.name,
              telephone: "+1-321-315-6014",
              email: company.email,
              image: `${SITE_URL}/images/logo.png`,
              logo: `${SITE_URL}/images/logo.png`,
              areaServed: serviceAreas.map((city) => ({ "@type": "City", name: `${city}, FL` })),
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Outdoor construction services",
                itemListElement: coreServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.summary } })),
              },
              description:
                "Custom concrete, masonry, and outdoor living construction for Central Florida homeowners, backed by 26+ years of hands-on experience and 12 years in business.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Orlando",
                addressRegion: "FL",
                addressCountry: "US",
              },
              url: SITE_URL,
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
