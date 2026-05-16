import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { FillButton } from "@/components/fill-button";
import { RevealWords } from "@/components/reveal-words";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { BackgroundImage } from "@/components/background-image";
import { EUFlagMicro } from "@/components/EUFlagMicro";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { FadeUp } from "@/components/fade-up";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";

const KLANTFOTOS = [
  "/images/klant-1.jpg.png",
  "/images/klant-2.jpg.png",
  "/images/klant-3.jpg.png",
  "/images/klant-4.jpg.png",
  "/images/klant-5.jpg.png",
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const h = d.home;

  const COLLECTION = [
    { url: "/images/kennel-hero.png", naam: "EMERGO Cortile", sub: h.kennelSub, slug: "kennel" },
    { url: "/images/shelter-hero.jpg.png", naam: "EMERGO Belvedere", sub: h.shelterSub, slug: "shelter" },
  ];

  const MATERIALS = [
    { nr: "01", titel: h.mat01Title, tekst: h.mat01Text },
    { nr: "02", titel: h.mat02Title, tekst: h.mat02Text },
    { nr: "03", titel: h.mat03Title, tekst: h.mat03Text },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <HeroSlideshow>
        {/* Bottom-right label */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-10 pointer-events-none select-none flex items-center gap-2">
          <EUFlagMicro />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            Handgemaakt in Europa
          </p>
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-8 md:px-16 pb-20 md:pb-32">
          {/* Text beperkt tot linkerkant */}
          <div style={{ maxWidth: "clamp(280px, 45%, 560px)" }}>
            <div style={{ fontFamily: "var(--font-serif)", lineHeight: 1, display: "flex", flexDirection: "column", gap: "0.1em" }}>
              <span className="text-white font-light block" style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", letterSpacing: "-0.01em" }}>
                {h.heroLine1}
              </span>
              <span className="text-white/60 font-light italic block" style={{ fontSize: "clamp(1.4rem, 3.5vw, 3.2rem)", letterSpacing: "0.01em" }}>
                {h.heroLine2}
              </span>
              <span className="text-white font-bold block" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.02em", lineHeight: 0.9 }}>
                {h.heroLine3}
              </span>
              {h.heroLine3b && (
                <span className="font-light italic text-white/60 block" style={{ fontSize: "clamp(1.2rem, 3vw, 2.6rem)", letterSpacing: "0.01em" }}>
                  {h.heroLine3b}
                </span>
              )}
            </div>

            <Link
              href={`/${lang}/producten`}
              className="inline-flex items-center gap-3 mt-10 text-[11px] tracking-[0.3em] uppercase text-white/70 border-b border-white/30 pb-1 hover:text-white hover:border-white transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {h.heroCta}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </HeroSlideshow>

      {/* ══════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-52">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-primary mb-12"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {h.introLabel}
            </p>

            <div style={{ fontFamily: "var(--font-serif)" }}>
              <span className="block text-[13vw] md:text-[7vw] font-bold tracking-tight leading-none mb-4">
                {h.introWord}
              </span>
              <span className="block text-[5vw] md:text-[2.4vw] font-light italic text-muted-foreground leading-snug tracking-wide">
                {h.introSub}
              </span>
            </div>

            <p
              className="mt-12 text-base text-muted-foreground leading-relaxed mx-auto"
              style={{ fontFamily: "var(--font-sans)", maxWidth: "58ch" }}
            >
              <RevealWords delay={100}>{h.introBody}</RevealWords>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COLLECTIE GRID
      ══════════════════════════════════════════ */}
      <section className="pb-36 md:pb-52">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-primary mb-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {h.collectionLabel}
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }}>
                <span className="block text-[7vw] md:text-[3.5vw] font-light text-muted-foreground tracking-wide italic">
                  {h.collectionHeading1}
                </span>
                <span className="block text-[9vw] md:text-[4.5vw] font-bold tracking-tight">
                  {h.collectionHeading2}
                </span>
              </h2>
            </div>
            <Link
              href={`/${lang}/producten`}
              className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary border-b border-primary pb-0.5 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {h.collectionViewAll} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {COLLECTION.map((p) => (
              <Link
                key={p.naam}
                href={`/${lang}/producten/${p.slug}`}
                className="group block collection-card relative aspect-[3/4] overflow-hidden"
                style={{ backgroundImage: `url(${p.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="collection-overlay absolute inset-0" />
                <div className="relative z-10 p-5 md:p-7 h-full flex flex-col justify-between">
                  <div />
                  <div>
                    <h3
                      className="text-lg md:text-xl font-semibold tracking-wide leading-none text-white mb-2"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {p.naam}
                    </h3>
                    <p
                      className="text-[10px] text-white/60 tracking-[0.15em] uppercase"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {p.sub}
                    </p>
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/80" style={{ fontFamily: "var(--font-sans)" }}>
                        Bekijk
                      </span>
                      <ArrowRight className="h-3 w-3 text-white/80" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE SPLIT 1 — VAKMANSCHAP
      ══════════════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-8 md:px-16 pb-36 md:pb-52">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 items-center">
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{
              backgroundImage: "url(/images/huis-craft.jpg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>

          <div>
            <div className="w-8 h-px bg-primary mb-10" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              {h.craftLabel}
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }} className="mb-10">
              <span className="block text-[10vw] md:text-[5vw] font-bold tracking-tight">{h.craftHeading1}</span>
              <span className="block text-[5vw] md:text-[2.5vw] font-light italic text-muted-foreground tracking-wide">{h.craftHeading2}</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-12" style={{ fontFamily: "var(--font-sans)", maxWidth: "52ch" }}>
              <RevealWords delay={80}>{h.craftBody}</RevealWords>
            </p>
            <Link
              href={`/${lang}/over-ons`}
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-primary border-b border-primary pb-1 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {h.craftLink} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MATERIALEN BAND
      ══════════════════════════════════════════ */}
      <section className="border-t border-b border-border overflow-hidden" style={{ backgroundColor: "oklch(0.97 0.01 152)" }}>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <BackgroundImage
            src="/images/materialen-band.jpg.png"
            className="md:col-span-2 min-h-[320px] md:min-h-0"
          />
          <div className="md:col-span-3 px-8 md:px-16 py-24 md:py-36">
            <div className="grid grid-cols-1 gap-14 max-w-xl">
              {MATERIALS.map((item, index) => (
                <div key={item.nr}>
                  <FadeUp delay={index * 120}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-px bg-primary" />
                      <span className="text-[10px] text-primary tracking-[0.3em]" style={{ fontFamily: "var(--font-sans)" }}>
                        {item.nr}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.titel}
                    </h3>
                  </FadeUp>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-sans)", maxWidth: "42ch" }}>
                    <RevealWords delay={index * 120 + 80}>{item.tekst}</RevealWords>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE SPLIT 2 — OP MAAT
      ══════════════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-8 md:px-16 py-36 md:py-52">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 items-center">
          <div className="order-2 md:order-1">
            <div className="w-8 h-px bg-primary mb-10" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              {h.customLabel}
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }} className="mb-10">
              <span className="block text-[8vw] md:text-[4vw] font-light italic text-muted-foreground tracking-wide">{h.customHeading1}</span>
              <span className="block text-[11vw] md:text-[5.5vw] font-bold tracking-tight">{h.customHeading2}</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-12" style={{ fontFamily: "var(--font-sans)", maxWidth: "52ch" }}>
              <RevealWords delay={80}>{h.customBody}</RevealWords>
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-primary border-b border-primary pb-1 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {h.customLink} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div
            className="relative aspect-[4/5] overflow-hidden order-1 md:order-2"
            style={{
              backgroundImage: "url(/images/op-maat.jpg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          KLANTFOTO GRID
      ══════════════════════════════════════════ */}
      <section className="pb-36 md:pb-52">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-5" style={{ fontFamily: "var(--font-sans)" }}>
                {h.customersLabel}
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }}>
                <span className="block text-[7vw] md:text-[3.5vw] font-light text-muted-foreground tracking-wide italic">{h.customersHeading1}</span>
                <span className="block text-[9vw] md:text-[4.5vw] font-bold tracking-tight">{h.customersHeading2}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-5">
            <div className="row-span-2 min-h-[400px] md:min-h-0 overflow-hidden">
              <img src={KLANTFOTOS[0]} alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={KLANTFOTOS[1]} alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={KLANTFOTOS[2]} alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={KLANTFOTOS[3]} alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={KLANTFOTOS[4]} alt="" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUOTE
      ══════════════════════════════════════════ */}
      <section className="bg-primary text-primary-foreground py-36 md:py-48 overflow-hidden" data-cursor="light">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="text-[20vw] leading-none text-primary-foreground/10 select-none" style={{ fontFamily: "var(--font-serif)" }} aria-hidden>
            &quot;
          </div>
          <blockquote className="-mt-[6vw] text-[5vw] md:text-[3vw] font-light leading-snug" style={{ fontFamily: "var(--font-serif)", maxWidth: "22ch" }}>
            {h.quoteText}
          </blockquote>
          <div className="w-8 h-px bg-primary-foreground/40 mt-14 mb-6" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50" style={{ fontFamily: "var(--font-sans)" }}>
            {h.quoteAuthor}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NIEUWSBRIEF
      ══════════════════════════════════════════ */}
      <NewsletterBanner />

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-52">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-10" style={{ fontFamily: "var(--font-sans)" }}>
            {h.ctaLabel}
          </p>
          <div style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }} className="mb-16">
            <span className="block text-[4vw] md:text-[2vw] font-light italic text-muted-foreground tracking-wide mb-3">{h.ctaHeading1}</span>
            <span className="block text-[12vw] md:text-[6vw] font-bold tracking-tight">{h.ctaHeading2}</span>
          </div>
          <FillButton href={`/${lang}/verkooppunten`}>{h.ctaButton}</FillButton>
        </div>
      </section>
    </>
  );
}
