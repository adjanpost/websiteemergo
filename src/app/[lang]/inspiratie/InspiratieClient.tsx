"use client";

import { useState, useEffect } from "react";
import { NewsletterBanner } from "@/components/NewsletterBanner";

const FOTOS = [
  { src: "/images/shelter-hero.jpg.png", alt: "EMERGO Belvedere in verzorgde tuin" },
  { src: "/images/kennel-hero.png", alt: "EMERGO Cortile met donkergroen staal" },
  { src: "/images/klant-1.jpg.png", alt: "Klantenverblijf" },
  { src: "/images/klant-2.jpg.png", alt: "Klantenverblijf" },
  { src: "/images/klant-3.jpg.png", alt: "Klantenverblijf" },
  { src: "/images/kennel-1.jpg", alt: "Kennel detail" },
  { src: "/images/shelter-1.jpg", alt: "Shelter buiten" },
  { src: "/images/klant-4.jpg.png", alt: "Klantenverblijf" },
  { src: "/images/klant-5.jpg.png", alt: "Klantenverblijf" },
  { src: "/images/huis-craft.jpg.png", alt: "Ambachtelijk vakmanschap" },
  { src: "/images/op-maat.jpg.png", alt: "Op maat gemaakt verblijf" },
  { src: "/images/coming-soon-hero.jpg.png", alt: "EMERGO buitenverblijf" },
];

const ARTIKELEN = [
  {
    src: "/images/materialen-hout.jpg.png",
    cat: "Materialen",
    titel: "Douglas of larch: welk hout past bij uw tuin?",
    datum: "12 april 2025",
  },
  {
    src: "/images/materialen-staal.jpg.png",
    cat: "Materialen",
    titel: "Donkergroen staal: waarom RAL 6009 de juiste keuze is",
    datum: "3 maart 2025",
  },
  {
    src: "/images/nieuwsbrief-hond.jpg.png",
    cat: "Welzijn",
    titel: "Wat uw hond nodig heeft in een buitenverblijf",
    datum: "18 februari 2025",
  },
  {
    src: "/images/kennel-2.jpg",
    cat: "Ontwerp",
    titel: "Hoe een kennel deel wordt van de tuin",
    datum: "9 januari 2025",
  },
  {
    src: "/images/kennel-3.jpg",
    cat: "Op maat",
    titel: "Van schets tot oplevering: het maatproces bij EMERGO",
    datum: "22 december 2024",
  },
  {
    src: "/images/materialen-band.jpg.png",
    cat: "Onderhoud",
    titel: "Seizoensonderhoud: zo houdt u uw verblijf in topconditie",
    datum: "5 november 2024",
  },
];

export function InspiratieClient({ lang: _lang }: { lang: string }) {
  const [activeFoto, setActiveFoto] = useState<number | null>(null);
  const [hoveredFoto, setHoveredFoto] = useState<number | null>(null);
  const [hoveredArtikel, setHoveredArtikel] = useState<number | null>(null);

  useEffect(() => {
    if (activeFoto === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveFoto(null);
      if (e.key === "ArrowRight")
        setActiveFoto((p) => (p !== null ? (p + 1) % FOTOS.length : null));
      if (e.key === "ArrowLeft")
        setActiveFoto((p) => (p !== null ? (p - 1 + FOTOS.length) % FOTOS.length : null));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeFoto]);

  return (
    <div className="pt-20">

      {/* ══════════════════════════════════════════
          MINI-HERO
      ══════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: "#1a2e1a", minHeight: 380 }}
        className="flex items-center justify-center text-center"
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-28">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-8"
            style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
          >
            EMERGO · Inspiratie
          </p>
          <h1
            className="font-light leading-[1.05] text-white mb-7"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            }}
          >
            Sfeerbeelden &amp; verhalen
            <br />
            <em className="italic text-white/60">over het buitenleven</em>
          </h1>
          <p
            className="mx-auto font-light leading-relaxed text-white/60"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              maxWidth: "52ch",
            }}
          >
            Laat u inspireren door echte verblijven, ambachtelijke details en artikelen
            over hondenwelzijn, materialen en de kunst van het buitenleven.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MASONRY FOTOGRID
      ══════════════════════════════════════════ */}
      <section className="py-28" style={{ backgroundColor: "#faf8f5" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-14"
            style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
          >
            Sfeerbeelden
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {FOTOS.map((foto, i) => (
              <div
                key={i}
                onClick={() => setActiveFoto(i)}
                onMouseEnter={() => setHoveredFoto(i)}
                onMouseLeave={() => setHoveredFoto(null)}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1.5rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    transition: "transform 0.6s ease",
                    transform: hoveredFoto === i ? "scale(1.04)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor:
                      hoveredFoto === i ? "rgba(26,46,26,0.22)" : "rgba(26,46,26,0)",
                    transition: "background-color 0.4s ease",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {hoveredFoto === i && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f8f5f0"
                      strokeWidth="0.8"
                      style={{ width: 36, height: 36, opacity: 0.9 }}
                    >
                      <rect x="3" y="3" width="18" height="18" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════ */}
      {activeFoto !== null && (
        <div
          onClick={() => setActiveFoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(8,16,8,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveFoto(null)}
            aria-label="Sluiten"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f8f5f0",
              opacity: 0.6,
              padding: "0.5rem",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ width: 28, height: 28 }}>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setActiveFoto((p) => (p !== null ? (p - 1 + FOTOS.length) % FOTOS.length : null)); }}
            aria-label="Vorige foto"
            style={{
              position: "absolute",
              left: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f8f5f0",
              opacity: 0.5,
              padding: "0.75rem",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.5")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 36, height: 36 }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={FOTOS[activeFoto].src}
            alt={FOTOS[activeFoto].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "86vh",
              maxWidth: "88vw",
              objectFit: "contain",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            }}
          />

          <button
            onClick={(e) => { e.stopPropagation(); setActiveFoto((p) => (p !== null ? (p + 1) % FOTOS.length : null)); }}
            aria-label="Volgende foto"
            style={{
              position: "absolute",
              right: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f8f5f0",
              opacity: 0.5,
              padding: "0.75rem",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.5")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 36, height: 36 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <p
            style={{
              position: "absolute",
              bottom: "1.75rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "rgba(248,245,240,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            {activeFoto + 1} / {FOTOS.length}
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════
          QUOTE DIVIDER
      ══════════════════════════════════════════ */}
      <section className="py-28 text-center" style={{ backgroundColor: "#1a2e1a" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div style={{ width: 1, height: 64, backgroundColor: "#c4956a", margin: "0 auto 3rem" }} />
          <blockquote
            className="font-light italic text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
              lineHeight: 1.5,
              maxWidth: "28ch",
              margin: "0 auto",
            }}
          >
            &ldquo;Een verblijf dat past bij het huis.
            <br />
            Een hond die thuis is in de tuin.&rdquo;
          </blockquote>
          <div style={{ width: 1, height: 64, backgroundColor: "#c4956a", margin: "3rem auto 0" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTIKELEN GRID
      ══════════════════════════════════════════ */}
      <section className="py-28" style={{ backgroundColor: "#f8f5f0" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
          >
            Artikelen
          </p>
          <h2
            className="font-light leading-tight mb-16"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#1a2e1a",
            }}
          >
            Kennis &amp; inspiratie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ARTIKELEN.map((art, i) => (
              <article
                key={i}
                onMouseEnter={() => setHoveredArtikel(i)}
                onMouseLeave={() => setHoveredArtikel(null)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ overflow: "hidden", aspectRatio: "3/2" }}>
                  <img
                    src={art.src}
                    alt={art.titel}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                      transform: hoveredArtikel === i ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                </div>
                <div style={{ paddingTop: "1.25rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#c4956a",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {art.cat}
                  </p>
                  <h3
                    className="font-light leading-snug mb-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      color: "#1a2e1a",
                    }}
                  >
                    {art.titel}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {art.datum}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NIEUWSBRIEF
      ══════════════════════════════════════════ */}
      <NewsletterBanner />
    </div>
  );
}
