import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { Header } from "@/components/header";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Footer } from "@/components/footer";
import { company } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allstarcustomconstruction.com"),
  title: {
    default:
      "All-Star Custom Construction LLC | Outdoor Construction in Central Florida",
    template: "%s | All-Star Custom Construction LLC",
  },
  description:
    "Central Florida outdoor construction: 26+ years experience, 12+ years local service. Pavers, pergolas, concrete, masonry, fire pits, decks, fences, retaining walls. Request a free quote.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "All-Star Custom Construction LLC",
    title: "All-Star Custom Construction LLC | Central Florida",
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
              "@type": "LocalBusiness",
              name: company.name,
              telephone: company.phone,
              email: company.email,
              areaServed: "Central Florida",
              description:
                "Custom concrete, masonry, and outdoor living construction for Central Florida homeowners, backed by 26+ years of hands-on experience and 12 years in business.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "FL",
                addressCountry: "US",
              },
              url: "https://www.allstarcustomconstruction.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
