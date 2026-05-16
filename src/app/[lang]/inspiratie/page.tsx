import type { Metadata } from "next";
import { hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { InspiratieClient } from "./InspiratieClient";

export const metadata: Metadata = {
  title: "Inspiratie",
  description:
    "Laat u inspireren door EMERGO — sfeerbeelden van premium buitenverblijven in verzorgde tuinen en artikelen over hondenwelzijn, materialen en buitenleven.",
};

export default async function InspiratiePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <InspiratieClient lang={lang} />;
}
