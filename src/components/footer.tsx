import Link from "next/link";
import { EUFlagMicro } from "@/components/EUFlagMicro";

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-border" data-cursor="dark">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-sm font-semibold tracking-[0.3em] uppercase block mb-4">
              EMERGO
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
              Premium buitenverblijven voor honden. Gemaakt met vakmanschap.
            </p>
            <div className="footer-origin">
              <EUFlagMicro />
              <span>Ontworpen &amp; gemaakt in Europa</span>
            </div>
          </div>

          {/* Collectie */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Collectie
            </h3>
            <ul className="space-y-3">
              {["EMERGO Solo", "EMERGO Duo", "EMERGO Suite"].map((item) => (
                <li key={item}>
                  <Link
                    href="/producten"
                    className="text-xs text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Bedrijf
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/over-ons", label: "Over ons" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
                { href: "/voorwaarden", label: "Voorwaarden" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-xs text-foreground/70">
              <li>
                <a href="mailto:info@emergo.nl" className="hover:text-foreground transition-colors">
                  info@emergo.nl
                </a>
              </li>
              <li>
                <a href="tel:+31600000000" className="hover:text-foreground transition-colors">
                  +31 (0)6 00 00 00 00
                </a>
              </li>
              <li>Nederland</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} EMERGO. Alle rechten voorbehouden.
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            Premium Buitenverblijven — Nederland
          </p>
        </div>
      </div>
    </footer>
  );
}
