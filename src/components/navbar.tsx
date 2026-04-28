"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EmergoLogo } from "@/components/emergo-logo";
import { FlagIcon } from "@/components/FlagIcon";
import { cn } from "@/lib/utils";

type Locale = "nl" | "en" | "de" | "fr";

const NO_HERO_SEGMENTS = ["over-ons", "contact", "materialen", "b2b", "producten", "inspiratie", "ruimteplanner"];

const navLabels: Record<Locale, { products: string; materials: string; planner: string; about: string; contact: string; quote: string; discover: string }> = {
  nl: { products: "Producten", materials: "Materialen", planner: "Planner", about: "Over EMERGO", contact: "Contact", quote: "Offerte", discover: "Ontdek collectie" },
  en: { products: "Products", materials: "Materials", planner: "Planner", about: "About EMERGO", contact: "Contact", quote: "Quote", discover: "Discover collection" },
  de: { products: "Produkte", materials: "Materialien", planner: "Planer", about: "Über EMERGO", contact: "Kontakt", quote: "Angebot", discover: "Kollektion entdecken" },
  fr: { products: "Produits", materials: "Matériaux", planner: "Planificateur", about: "À propos d'EMERGO", contact: "Contact", quote: "Devis", discover: "Découvrir" },
};

const langLabels: Record<Locale, string> = { nl: "NL", en: "EN", de: "DE", fr: "FR" };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);

  // Extract locale from pathname: /nl/producten → "nl"
  const segments = pathname.split("/");
  const locale: Locale = (["nl", "en", "de", "fr"].includes(segments[1]) ? segments[1] : "nl") as Locale;
  const t = navLabels[locale];

  const isScrolled = scrolled || NO_HERO_SEGMENTS.some(
    (seg) => pathname.includes(`/${seg}`)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: Locale) {
    setLangOpen(false);
    // Replace locale segment: /nl/producten → /en/producten
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  }

  const lineColor = isScrolled ? "bg-primary" : "bg-white";

  const desktopLinks = [
    { href: `/${locale}/producten`, label: t.products },
    { href: `/${locale}/materialen`, label: t.materials },
    { href: `/${locale}/ruimteplanner`, label: t.planner },
    { href: `/${locale}/over-ons`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  const mobileLinks = [
    { href: `/${locale}/producten`, label: t.products },
    { href: `/${locale}/materialen`, label: t.materials },
    { href: `/${locale}/ruimteplanner`, label: t.planner },
    { href: `/${locale}/over-ons`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6 md:px-12">
          <Link href={`/${locale}`} className="flex items-center">
            <EmergoLogo variant={isScrolled ? "dark" : "light"} size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60 flex items-center gap-1",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                <FlagIcon locale={locale} size={14} />
                {langLabels[locale]}
                <svg viewBox="0 0 10 6" fill="none" style={{ width: 8, height: 8, marginTop: 1 }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 border border-border shadow-sm"
                  style={{ backgroundColor: isScrolled ? "var(--background)" : "#1a2e1a", minWidth: 52 }}
                >
                  {(["nl", "en", "de", "fr"] as Locale[])
                    .filter((l) => l !== locale)
                    .map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={cn(
                          "flex items-center gap-2 w-full text-left px-4 py-2 text-xs tracking-[0.15em] uppercase hover:opacity-60 transition-opacity",
                          isScrolled ? "text-foreground" : "text-white"
                        )}
                      >
                        <FlagIcon locale={l} size={14} />
                        {langLabels[l]}
                      </button>
                    ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/contact`}
              className={cn(
                "text-xs tracking-[0.15em] uppercase border px-5 py-2.5 transition-all duration-300 hover:opacity-70",
                scrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white text-white hover:bg-white/10"
              )}
            >
              {t.quote}
            </Link>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-[14px] shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Menu openen"
          >
            <span className={cn("block w-full h-px transition-all duration-300", lineColor)} style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span className={cn("block w-full h-px transition-all duration-300", lineColor)} style={{ opacity: open ? 0 : 1 }} />
            <span className={cn("block w-full h-px transition-all duration-300", lineColor)} style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[200] flex flex-col md:hidden"
        style={{ backgroundColor: "#1a2e1a", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s ease" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 h-20 shrink-0">
          <EmergoLogo variant="light" size="md" />
          <button onClick={() => setOpen(false)} aria-label="Menu sluiten" className="flex flex-col justify-between w-6 h-[14px]">
            <span className="block w-full h-px bg-white transition-all duration-300" style={{ transform: "translateY(6.5px) rotate(45deg)" }} />
            <span className="block w-full h-px bg-white opacity-0" />
            <span className="block w-full h-px bg-white transition-all duration-300" style={{ transform: "translateY(-6.5px) rotate(-45deg)" }} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-0">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="w-full max-w-xs text-center py-5 text-white/90 hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 300, borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="flex items-center gap-4 pt-8">
            {(["nl", "en", "de", "fr"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => { switchLocale(l); setOpen(false); }}
                className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase transition-opacity"
                style={{ color: l === locale ? "#c4956a" : "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)" }}
              >
                <FlagIcon locale={l} size={14} />
                {langLabels[l]}
              </button>
            ))}
          </div>
        </nav>

        <div className="px-6 pb-12 pt-8 shrink-0">
          <Link
            href={`/${locale}/producten`}
            onClick={() => setOpen(false)}
            className="block text-center py-4 text-xs tracking-[0.3em] uppercase transition-all duration-400 hover:opacity-80"
            style={{ fontFamily: "var(--font-sans)", color: "#c4956a", border: "1px solid #c4956a" }}
          >
            {t.discover}
          </Link>
        </div>
      </div>
    </>
  );
}
