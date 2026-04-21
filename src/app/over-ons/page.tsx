import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const waarden = [
  {
    titel: "Vakmanschap",
    tekst:
      "Elk EMERGO verblijf wordt met de hand vervaardigd door onze ervaren ambachtslieden. Geen massaproductie, maar zorgvuldig werk waarbij elk detail aandacht krijgt.",
  },
  {
    titel: "Duurzaamheid",
    tekst:
      "Wij gebruiken uitsluitend FSC-gecertificeerd hout en milieuvriendelijke afwerkingen. Goed voor uw hond, goed voor de planeet.",
  },
  {
    titel: "Op maat",
    tekst:
      "Uw hond is uniek. Uw tuin is uniek. Daarom maken wij elk verblijf op maat, zodat het perfect aansluit bij uw wensen en omgeving.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <section className="bg-secondary/40 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Over EMERGO</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wij geloven dat een hond meer verdient dan een standaard hondenhok. EMERGO staat voor
              premium kwaliteit, duurzaamheid en stijl.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Ons verhaal</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  EMERGO is ontstaan vanuit een eenvoudige overtuiging: honden zijn meer dan huisdieren.
                  Ze zijn familieleden. En familieleden verdienen het beste.
                </p>
                <p>
                  Wat begon als een passie voor houtbewerking en een liefde voor honden, groeide uit tot
                  een merk dat staat voor kwaliteit en vakmanschap. Elk verblijf dat wij maken wordt met
                  zorg ontworpen en gebouwd.
                </p>
                <p>
                  Vandaag de dag leveren wij onze premium buitenverblijven door heel Nederland. Van
                  compacte stadstuinen tot grote landgoederen — wij vinden altijd de perfecte oplossing.
                </p>
              </div>
              <Button asChild size="lg" className="mt-8">
                <Link href="/producten">
                  Bekijk onze producten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-secondary/50 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-6xl mb-4">🐕</p>
                <p className="text-sm">Afbeelding volgt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Onze waarden</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {waarden.map((waarde, i) => (
              <div key={waarde.titel}>
                <div className="text-4xl font-bold text-primary/20 mb-3">0{i + 1}</div>
                <h3 className="text-xl font-bold mb-3">{waarde.titel}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{waarde.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
