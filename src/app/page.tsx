import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Leaf, Star, Wrench } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Duurzaam & Weerbestendig",
    description:
      "Gebouwd met hoogwaardige materialen die bestand zijn tegen alle weersomstandigheden. Uw hond is altijd beschermd.",
  },
  {
    icon: Leaf,
    title: "Duurzame Materialen",
    description:
      "Wij gebruiken verantwoord gekapt hout en milieuvriendelijke afwerkingen voor een bewuste keuze.",
  },
  {
    icon: Wrench,
    title: "Op Maat Gemaakt",
    description:
      "Elk verblijf wordt op maat gemaakt voor uw hond en uw tuin. Geen twee EMERGO's zijn hetzelfde.",
  },
  {
    icon: Star,
    title: "Premium Vakmanschap",
    description:
      "Ambachtelijk vervaardigd met aandacht voor elk detail. Een verblijf dat uw tuin siert.",
  },
];

const testimonials = [
  {
    name: "Marieke van den Berg",
    location: "Amsterdam",
    text: "Ons EMERGO verblijf is absoluut prachtig. Rex is er dol op en het past perfect bij onze tuin.",
    rating: 5,
  },
  {
    name: "Thomas Bakker",
    location: "Utrecht",
    text: "Uitstekende kwaliteit en fantastische service. De levering en montage verliep vlekkeloos.",
    rating: 5,
  },
  {
    name: "Sandra Jansen",
    location: "Rotterdam",
    text: "Al drie jaar staat het er en het ziet er nog steeds als nieuw uit. Een echte aanrader.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-accent text-accent-foreground border-0 text-xs uppercase tracking-wider px-3 py-1">
              Premium Kwaliteit
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Het beste voor<br />uw trouwe vriend
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed">
              EMERGO ontwerpt en bouwt premium buitenverblijven voor honden. Vakmanschap en stijl
              voor uw hond, schoonheid voor uw tuin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/producten">
                  Bekijk onze collectie
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Link href="/contact">Offerte aanvragen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Waarom EMERGO?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Wij geloven dat uw hond het beste verdient. Elk detail telt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm bg-secondary/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-accent/20 border-y">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Op maat gemaakt voor uw hond</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Vertel ons over uw hond en uw tuin. Wij ontwerpen het perfecte verblijf.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Start uw aanvraag
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Wat klanten zeggen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
