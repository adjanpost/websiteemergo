import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductGallery } from "@/components/product-gallery";
import { MadeInNL } from "@/components/made-in-nl";
import { OfferteButton } from "@/components/offerte-button";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product?.name ?? "Product",
    description: product
      ? `${product.name} van EMERGO — ${product.tagline} Handgemaakt van massief Europees hout met donkergroen staalwerk.`
      : undefined,
  };
}

const materialen = [
  {
    naam: "Douglas & Larchhout",
    tekst: "Europees gecertificeerd, gedroogd op 18% vochtigheid. Stabiel en duurzaam onder alle weersomstandigheden.",
  },
  {
    naam: "Poedercoat staal RAL 6009",
    tekst: "Donkergroen gepoedercoat met een matte finish. Weerbestendig, krasbestendig en tijdloos in kleur.",
  },
  {
    naam: "Mineraalwol isolatie",
    tekst: "Dubbele spouwisolatie in wanden en dak. Comfortabele temperatuur in iedere seizoen.",
  },
  {
    naam: "RVS verbindingen",
    tekst: "Alle scharnieren, bouten en verbindingen zijn van roestvast staal. Geen corrosie, nooit.",
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.find((p) => p.slug !== slug)!;

  return (
    <div className="pt-20">

      {/* ══════════════════════════════════════════
          1. PRODUCT HERO — 2-koloms
      ══════════════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-8 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 md:gap-16 items-start">

          {/* Links: galerij */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Rechts: product info (sticky) */}
          <div className="md:sticky md:top-24">
            <div className="mb-5">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                {product.name}
              </p>
              <MadeInNL variant="detail" />
            </div>

            <h1
              className="font-light leading-[1.05] mt-6 mb-3"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 3vw, 3rem)" }}
            >
              {product.tagline}
            </h1>
            <p
              className="italic text-muted-foreground mb-6"
              style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}
            >
              {product.name}
            </p>

            <div style={{ width: 40, height: 1, backgroundColor: "#c4956a" }} className="mb-8" />

            <p
              className="font-light leading-[2] mb-10"
              style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", maxWidth: "48ch" }}
            >
              {product.intro}
            </p>

            {/* CTA blok */}
            <div className="py-7 border-t border-b border-border mb-8">
              <OfferteButton href="/contact" fullWidth />
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors duration-400"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Of neem direct contact op
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <p
                className="mt-4 text-[10px] text-muted-foreground"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Wij reageren binnen 1 werkdag · Vrijblijvend advies
              </p>
            </div>

            {/* Specs */}
            <div className="divide-y divide-border">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between py-4 gap-4">
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground shrink-0"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {spec.label}
                  </span>
                  <span
                    className="text-sm text-right"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. BESCHRIJVING
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-28 items-start">
            <div className="space-y-6">
              {product.description.map((p, i) => (
                <p
                  key={i}
                  className="font-light leading-[1.9] text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", maxWidth: "52ch" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <div>
              <blockquote
                className="font-light italic leading-snug whitespace-pre-line"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  color: "#2d4a2d",
                }}
              >
                {`"${product.quote}"`}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. MATERIALEN
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-primary mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Materialen &amp; constructie
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Elk detail telt
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-border">
            {materialen.map((m) => (
              <div key={m.naam} className="pt-8 pb-8 pr-8">
                <h3
                  className="font-semibold mb-3"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
                >
                  {m.naam}
                </h3>
                <p
                  className="font-light text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", maxWidth: "30ch" }}
                >
                  {m.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. GERELATEERD PRODUCT
      ══════════════════════════════════════════ */}
      <section
        className="relative py-36 md:py-48"
        style={{ backgroundColor: "#1a2e1a" }}
        data-cursor="light"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${related.overviewImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-8 md:px-16 text-center">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Bekijk ook
          </p>
          <h2
            className="font-light italic text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {related.name}
          </h2>
          <p
            className="font-light mb-12"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {related.tagline}
          </p>
          <Link
            href={`/producten/${related.slug}`}
            className="inline-flex items-center gap-3 border border-white/30 px-10 py-5 text-[10px] tracking-[0.3em] uppercase text-white/70 hover:border-white hover:text-white transition-all duration-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ontdek de {related.name}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
