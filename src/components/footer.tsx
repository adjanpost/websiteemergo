import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="text-xl font-bold tracking-widest uppercase">EMERGO</span>
            <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
              Premium buitenverblijven voor honden. Ontworpen met vakmanschap, gebouwd om te duren.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigatie</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link href="/producten" className="hover:text-primary-foreground transition-colors">Producten</Link></li>
              <li><Link href="/over-ons" className="hover:text-primary-foreground transition-colors">Over ons</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>info@emergo.nl</li>
              <li>+31 (0)6 00 00 00 00</li>
              <li>Nederland</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} EMERGO. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacybeleid</Link>
            <Link href="/voorwaarden" className="hover:text-primary-foreground transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
