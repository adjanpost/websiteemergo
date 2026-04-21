import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";

const producten = [
  {
    id: "solo",
    naam: "EMERGO Solo",
    ondertitel: "Compact & stijlvol",
    beschrijving:
      "Het perfecte verblijf voor één hond. Compact van formaat, groot van kwaliteit. Ideaal voor kleinere tuinen.",
    kenmerken: [
      "Geschikt voor honden tot 30 kg",
      "Geïsoleerde wanden en dak",
      "Behandeld douglashout",
      "Afmetingen op maat",
    ],
    badge: null,
    prijs: "Vanaf €895",
  },
  {
    id: "duo",
    naam: "EMERGO Duo",
    ondertitel: "Ruim & comfortabel",
    beschrijving:
      "Onze populairste uitvoering. Ruim genoeg voor grote rassen, met een overdekt terrasje voor uw hond.",
    kenmerken: [
      "Geschikt voor alle hondenrassen",
      "Overdekt terrasgedeelte",
      "Premium geïsoleerd",
      "Geïntegreerde opbergruimte",
    ],
    badge: "Bestseller",
    prijs: "Vanaf €1.495",
  },
  {
    id: "suite",
    naam: "EMERGO Suite",
    ondertitel: "Het ultieme verblijf",
    beschrijving:
      "Voor de hond die alles mag hebben. De EMERGO Suite is het meest complete en luxe buitenverblijf dat wij maken.",
    kenmerken: [
      "Maximale afmetingen op maat",
      "Verwarmingssysteem inbegrepen",
      "Vloerverwarming optioneel",
      "Volledig maatwerk interieur",
    ],
    badge: "Premium",
    prijs: "Vanaf €2.995",
  },
];

export default function ProductenPage() {
  return (
    <>
      <section className="bg-secondary/40 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Onze collectie</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drie series, elk met zijn eigen karakter. Allemaal met het EMERGO kwaliteitsgarantie.
              Elk verblijf wordt op maat gemaakt voor uw hond.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {producten.map((product) => (
              <Card key={product.id} className="flex flex-col border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  {product.badge && (
                    <Badge className="w-fit mb-3 bg-accent text-accent-foreground border-0">
                      {product.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl">{product.naam}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{product.ondertitel}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {product.beschrijving}
                  </p>
                  <ul className="space-y-2">
                    {product.kenmerken.map((kenmerk) => (
                      <li key={kenmerk} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {kenmerk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 pt-6 border-t">
                  <p className="font-bold text-lg">{product.prijs}</p>
                  <Button asChild className="w-full">
                    <Link href="/contact">
                      Offerte aanvragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Niet gevonden wat u zoekt?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Wij maken ook volledig custom verblijven. Neem contact op en vertel ons uw wensen.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Neem contact op</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
