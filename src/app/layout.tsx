import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMERGO | Premium Buitenverblijven voor Honden",
  description:
    "EMERGO ontwerpt en levert premium buitenverblijven voor honden. Vakmanschap, duurzaamheid en stijl voor uw trouwe vriend.",
  keywords: ["hondenhok", "buitenverblijf hond", "premium hondenhok", "EMERGO", "luxe hondenhok"],
  openGraph: {
    title: "EMERGO | Premium Buitenverblijven voor Honden",
    description: "Vakmanschap, duurzaamheid en stijl voor uw trouwe vriend.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
