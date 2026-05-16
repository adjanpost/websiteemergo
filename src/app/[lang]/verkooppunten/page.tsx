import type { Metadata } from "next";
import { hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";
import { VerkooppuntenClient } from "./VerkooppuntenClient";

export const metadata: Metadata = {
  title: "Verkooppunten",
  description:
    "Vind een EMERGO verkooppunt bij u in de buurt. " +
    "Bekijk de Cortile en Belvedere in het echt bij " +
    "een van onze showrooms of dealers.",
};

export default async function VerkooppuntenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <VerkooppuntenClient lang={lang} />;
}
