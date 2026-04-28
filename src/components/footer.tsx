import Link from "next/link";
import { EUFlagMicro } from "@/components/EUFlagMicro";
import { getDictionary, hasLocale } from "@/app/[lang]/dictionaries";

export async function Footer({ lang = "nl" }: { lang?: string }) {
  const locale = hasLocale(lang) ? lang : "nl";
  const d = await getDictionary(locale);
  const f = d.footer;

  const collection = [
    { href: `/${locale}/producten/kennel`, label: "EMERGO Kennel" },
    { href: `/${locale}/producten/shelter`, label: "EMERGO Shelter" },
  ];

  const company = [
    { href: `/${locale}/over-ons`, label: f.aboutUs },
    { href: `/${locale}/contact`, label: f.contactLabel },
    { href: `/${locale}/privacy`, label: f.privacy },
    { href: `/${locale}/voorwaarden`, label: f.terms },
  ];

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
              {f.tagline}
            </p>
            <div className="footer-origin">
              <EUFlagMicro />
              <span>{f.origin}</span>
            </div>
          </div>

          {/* Collectie */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              {f.collectionLabel}
            </h3>
            <ul className="space-y-3">
              {collection.map((item) => (
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

          {/* Bedrijf */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
              {f.companyLabel}
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
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
              {f.contactLabel}
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
            © {new Date().getFullYear()} EMERGO. {f.copyright}
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            {f.tagline2}
          </p>
        </div>
      </div>
    </footer>
  );
}
