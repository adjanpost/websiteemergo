import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { OfferteButton } from "@/components/offerte-button";
import { MadeInEU } from "@/components/MadeInEU";
import { MaatConfigurator } from "@/components/MaatConfigurator";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Producten",
  description:
    "Ontdek de EMERGO Kennel en EMERGO Shelter — handgemaakte premium buitenverblijven van massief Europees hout en donkergroen staal.",
};

export default async function ProductenPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const p = d.products;

  const compareItems = [p.compareWood, p.compareWarranty, p.compareCustom];

  return (
    <div className="pt-20">

      {/* ══════════════════════════════════════════
          MINI-HERO
      ══════════════════════════════════════════ */}
      <section
        className="flex items-center justify-center text-center"
        style={{ backgroundColor: "#1a2e1a", minHeight: 380 }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {p.heroEyebrow}
          </p>
          <h1
            className="font-light text-white leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            {p.heroHeading1}
            <br />
            <em className="italic">{p.heroHeading2}</em>
          </h1>
          <p
            className="font-light leading-relaxed mx-auto"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", maxWidth: 520 }}
          >
            {p.heroBody}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTEN GRID
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {products.map((product) => {
              const pd = d.productData[product.slug as "kennel" | "shelter"];
              return (
              <Link
                key={product.slug}
                href={`/${lang}/producten/${product.slug}`}
                className="product-card-outer block"
              >
                <div
                  className="product-card-inner relative aspect-[3/2]"
                  style={{ backgroundImage: `url(${product.overviewImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="product-card-overlay absolute inset-0" />
                  <p
                    className="absolute bottom-8 right-8 md:bottom-10 md:right-10 text-[10px] tracking-[0.3em] uppercase z-10"
                    style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.6)" }}
                  >
                    {product.name}
                  </p>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <h2
                      className="font-light italic text-white leading-snug mb-4"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)" }}
                    >
                      {pd.tagline}
                    </h2>
                    <p className="text-white/75 mb-5 leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", maxWidth: "40ch" }}>
                      {pd.cardTagline}
                    </p>
                    <div className="mb-5">
                      <MadeInEU label={d.common.madeInEurope} style={{ background: "rgba(248,245,240,0.08)", border: "0.5px solid rgba(248,245,240,0.15)" }} />
                    </div>
                    <span className="product-card-cta" style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
                      {p.viewProduct}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VERGELIJKINGSBALK
      ══════════════════════════════════════════ */}
      <section className="py-12 border-t border-b border-border" style={{ backgroundColor: "oklch(0.96 0.005 80)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {compareItems.map((item) => (
              <div key={item} className="flex items-center gap-3 px-10 py-4 md:py-0">
                <span className="shrink-0" style={{ width: 20, height: 1, backgroundColor: "#c4956a", display: "block" }} />
                <span className="text-sm font-light text-foreground/70" style={{ fontFamily: "var(--font-sans)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAATCONFIGURATOR
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "oklch(0.96 0.005 80)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}>
                {p.configLabel}
              </p>
              <h2 className="font-light leading-[1.05] mb-4" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                {p.configHeading1}
                <br />
                <em className="italic">{p.configHeading2}</em>
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-sans)", maxWidth: "38ch" }}>
                {p.configBody}
              </p>
            </div>
            <div><MaatConfigurator lang={lang} /></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48 text-center" style={{ backgroundColor: "#1a2e1a" }} data-cursor="light">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <h2 className="font-light text-white leading-[1.05] mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            {p.ctaHeading}
          </h2>
          <p className="font-light mb-14" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
            {p.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <OfferteButton href={`/${lang}/contact`} label={d.common.requestQuote} />
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center px-10 py-5 border border-white/30 text-[10px] tracking-[0.3em] uppercase text-white/70 hover:border-white/60 hover:text-white transition-colors duration-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {p.ctaContact}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
