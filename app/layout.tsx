import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/Chatbot";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { company } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allstarcustomconstruction.com"),
  title: "All-Star Custom Construction LLC | Custom Concrete, Masonry & Outdoor Living in Central Florida",
  description:
    "All-Star Custom Construction LLC is led by 26+ years of construction experience and proudly established for 12 years in Central Florida, delivering premium concrete, masonry, pavers, pergolas, fire pits, decks, fences, and retaining walls.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  alternates: {
    canonical: "/",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
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
