"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { EmergoLogo } from "@/components/emergo-logo";
import { cn } from "@/lib/utils";

const NO_HERO_PATHS = ["/over-ons", "/contact", "/materialen", "/b2b", "/producten", "/inspiratie", "/ruimteplanner"];

const desktopLinks = [
  { href: "/producten", label: "Producten" },
  { href: "/materialen", label: "Materialen" },
  { href: "/ruimteplanner", label: "Planner" },
  { href: "/over-ons", label: "Over EMERGO" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/producten", label: "Producten" },
  { href: "/materialen", label: "Materialen" },
  { href: "/ruimteplanner", label: "Planner" },
  { href: "/b2b", label: "B2B" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isScrolled = scrolled || NO_HERO_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const lineColor = isScrolled ? "bg-primary" : "bg-white";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center">
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
            <Link
              href="/contact"
              className={cn(
                "text-xs tracking-[0.15em] uppercase border px-5 py-2.5 transition-all duration-300 hover:opacity-70",
                scrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white text-white hover:bg-white/10"
              )}
            >
              Offerte
            </Link>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-[14px] shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Menu openen"
          >
            <span
              className={cn("block w-full h-px transition-all duration-300", lineColor)}
              style={{
                transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className={cn("block w-full h-px transition-all duration-300", lineColor)}
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className={cn("block w-full h-px transition-all duration-300", lineColor)}
              style={{
                transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[200] flex flex-col md:hidden"
        style={{
          backgroundColor: "#1a2e1a",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease",
        }}
        aria-hidden={!open}
      >
        {/* Top bar: logo + sluitknop */}
        <div className="flex items-center justify-between px-6 h-20 shrink-0">
          <EmergoLogo variant="light" size="md" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Menu sluiten"
            className="flex flex-col justify-between w-6 h-[14px]"
          >
            <span
              className="block w-full h-px bg-white transition-all duration-300"
              style={{ transform: "translateY(6.5px) rotate(45deg)" }}
            />
            <span className="block w-full h-px bg-white opacity-0" />
            <span
              className="block w-full h-px bg-white transition-all duration-300"
              style={{ transform: "translateY(-6.5px) rotate(-45deg)" }}
            />
          </button>
        </div>

        {/* Links gecentreerd */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-0">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="w-full max-w-xs text-center py-5 text-white/90 hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.5rem",
                fontWeight: 300,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA onderaan */}
        <div className="px-6 pb-12 pt-8 shrink-0">
          <Link
            href="/producten"
            onClick={() => setOpen(false)}
            className="block text-center py-4 text-xs tracking-[0.3em] uppercase transition-all duration-400 hover:opacity-80"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#c4956a",
              border: "1px solid #c4956a",
            }}
          >
            Ontdek collectie
          </Link>
        </div>
      </div>
    </>
  );
}
