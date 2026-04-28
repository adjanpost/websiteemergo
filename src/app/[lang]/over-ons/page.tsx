import type { Metadata } from "next";
import Link from "next/link";
import { FillButton } from "@/components/fill-button";
import { RevealWords } from "@/components/reveal-words";
import { EUFlagMicro } from "@/components/EUFlagMicro";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "EMERGO is ontstaan uit een eenvoudige overtuiging: een hond verdient een buitenverblijf dat even mooi is als de tuin eromheen. Lees het verhaal achter het merk.",
};

const overtuigingen = [
  {
    titel: "Materiaal gaat voor snelheid",
    tekst:
      "Douglas en larch uit Europese bossen. Geen geïmpregneerd hout, geen goedkope alternatieven. Als het hout niet goed genoeg is, gaat het niet de werkplaats uit.",
  },
  {
    titel: "Ontwerp is geen bijzaak",
    tekst:
      "Een kennel staat in uw tuin, naast uw huis. Hij moet er over tien jaar nog net zo goed uitzien als op dag één. Dat vraagt om scherpe lijnen, tijdloze kleuren en geen compromissen in de finish.",
  },
  {
    titel: "Klein houden is een keuze",
    tekst:
      "We bouwen niet voor volume. We bouwen voor eigenaren die weten wat ze willen en bereid zijn te investeren in iets dat een leven meegaat. Dat bepaalt hoe we werken, niet hoeveel.",
  },
];

const waarden = [
  {
    titel: "Duurzaamheid",
    tekst: "Europees gecertificeerd hout, RVS verbindingen, geen chemische behandelingen. Gebouwd om te blijven.",
  },
  {
    titel: "Vakmanschap",
    tekst: "Elk scharnier, elke verbinding, elke millimeter wordt gecontroleerd voor het onze werkplaats verlaat.",
  },
  {
    titel: "Eerlijkheid",
    tekst: "We zijn een jong merk. We zeggen wat we kunnen, leveren wat we beloven en staan achter elk product met onze naam.",
  },
  {
    titel: "Schoonheid",
    tekst: "Een buitenverblijf hoeft geen compromis te zijn tussen functie en esthetiek. Wij weigeren dat onderscheid te maken.",
  },
];

export default function OverOnsPage() {
  return (
    <div className="pt-20">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        className="py-48 text-center"
        style={{ backgroundColor: "#1a2e1a" }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-10"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Het verhaal achter EMERGO
          </p>
          <h1
            className="text-[11vw] md:text-[5.5vw] font-light leading-[1.05] text-white mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Gebouwd uit overtuiging,
            <br />
            <em className="italic">niet uit gemak</em>
          </h1>
          <p
            className="text-base font-light leading-relaxed mx-auto"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "480px",
            }}
          >
            EMERGO is geen catalogusmerk. Elk verblijf begint met een vraag: wat heeft dit dier
            écht nodig — en hoe maken we dat zo mooi mogelijk?
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. HET WAAROM
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">

            {/* Links: quote */}
            <div>
              <blockquote
                className="font-light italic leading-snug text-foreground"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
              >
                "Ik zocht een mooi buitenverblijf voor mijn hond en vond niets dat bij mijn tuin
                paste. Dus bouwde ik het zelf."
              </blockquote>
              <div
                className="mt-8 mb-5"
                style={{ width: 40, height: 2, backgroundColor: "#c4956a" }}
              />
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {/* INVULLEN */}
                [Naam oprichter] — Oprichter EMERGO
              </p>
            </div>

            {/* Rechts: bodytekst */}
            <div className="space-y-6">
              <p
                className="text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-sans)", maxWidth: "52ch" }}
              >
                <RevealWords delay={60}>
                  EMERGO ontstond uit een eenvoudige frustratie. De markt voor buitenverblijven was
                  verdeeld in twee kampen: goedkope plastic dozen of industriële kooien voor
                  pensions. Nergens was er iets dat paste bij een verzorgde tuin en een hond die
                  deel uitmaakt van het gezin.
                </RevealWords>
              </p>
              <p
                className="text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-sans)", maxWidth: "52ch" }}
              >
                <RevealWords delay={120}>
                  We besloten dat anders te doen. Met massief Europees hout, donkergroen
                  poedercoat staal en een ontwerp dat architectonisch aanvoelt — niet als een
                  accessoire, maar als een statement. Elk verblijf dat onze werkplaats verlaat is
                  handgemaakt, gecontroleerd en voorzien van onze naam. Dat is geen marketingterm.
                  Dat is een belofte.
                </RevealWords>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. DE NAAM EMERGO
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48" style={{ backgroundColor: "oklch(0.96 0.005 80)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">

            {/* Foto met goud kader */}
            <div className="relative order-2 md:order-1" style={{ paddingRight: "1.2rem", paddingBottom: "1.2rem" }}>
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                aria-hidden
                style={{ top: "1.2rem", left: "1.2rem", border: "1px solid #c4956a", zIndex: 0 }}
              />
              {/* Vervang onderstaande URL door je eigen foto van het Zeeuwse wapen of een passend beeld */}
              <div
                className="relative z-10 aspect-[4/3]"
                style={{
                  backgroundImage: "url(/images/zeeland-naam.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#1a2e1a",
                }}
              >
                {/* Tijdelijke fallback als foto ontbreekt */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <p
                    className="font-light italic text-white/30 text-center"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                  >
                    Luctor et Emergo
                  </p>
                  <div style={{ width: 40, height: 1, backgroundColor: "#c4956a" }} />
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase text-white/20"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Zeeland
                  </p>
                </div>
              </div>
            </div>

            {/* Tekst */}
            <div className="order-1 md:order-2">
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                De naam
              </p>
              <h2
                className="font-light leading-none mb-3"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
              >
                EMERGO
              </h2>
              <p
                className="font-light italic mb-10"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "#c4956a" }}
              >
                Luctor et Emergo
              </p>
              <div
                className="space-y-5 text-sm font-light leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-sans)", maxWidth: "52ch" }}
              >
                <p>
                  EMERGO is meer dan een merknaam — het is een statement. De naam is ontleend aan het
                  Zeeuwse provinciewapen, waarop de spreuk{" "}
                  <em className="italic" style={{ fontFamily: "var(--font-serif)" }}>Luctor et Emergo</em>{" "}
                  prijkt. Deze Latijnse uitdrukking —{" "}
                  <em className="italic" style={{ fontFamily: "var(--font-serif)" }}>ik worstel en kom boven</em>{" "}
                  — verwijst naar de eeuwenlange strijd van Zeeland tegen het water, en de veerkracht
                  van een volk dat zich telkens weer wist te herstellen.
                </p>
                <p>
                  Het woord EMERGO —{" "}
                  <em className="italic" style={{ fontFamily: "var(--font-serif)" }}>ik kom boven</em>{" "}
                  — raakte de oprichter direct. Opgegroeid in Zeeland kent hij die mentaliteit van
                  kinds af aan: doorzetten, kwaliteit leveren, en je onderscheiden. Die waarden zijn
                  precies wat EMERGO als merk uitdraagt.
                </p>
                <p>
                  Een luxe buitenmerk dat zich wil optillen boven het gewone. Dat niet buigt voor
                  compromissen in materiaal of ontwerp. Dat boven de massa uitstijgt — net zoals
                  Zeeland dat al eeuwen doet.
                </p>
                <p>
                  De naam draagt dus twee verhalen tegelijk: een persoonlijke herkomst en een
                  merkbelofte. EMERGO is gemaakt om op te vallen, om te blijven, en om te groeien —
                  in Nederland en ver daarbuiten.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. ONZE OVERTUIGINGEN
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="mb-20">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Waar wij in geloven
            </p>
            <h2
              className="font-light leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Drie dingen die wij
              <br />
              <em className="italic">nooit compromitteren</em>
            </h2>
          </div>

          <div className="divide-y divide-border">
            {overtuigingen.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-28 py-12 md:py-16">
                <h3
                  className="font-light italic leading-snug"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {item.titel}
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground self-center"
                  style={{ fontFamily: "var(--font-sans)", maxWidth: "48ch" }}
                >
                  {item.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. DE OPRICHTER
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">

            {/* Links: foto met kader */}
            <div className="relative" style={{ paddingRight: "1.2rem", paddingBottom: "1.2rem" }}>
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                aria-hidden
                style={{
                  top: "1.2rem",
                  left: "1.2rem",
                  border: "1px solid #c4956a",
                  zIndex: 0,
                }}
              />
              <div
                className="relative z-10 aspect-[3/4]"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85)",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />
            </div>

            {/* Rechts: tekst */}
            <div className="flex flex-col justify-center">
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-6"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                De oprichter
              </p>
              <h2
                className="font-light leading-none mb-3"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2rem" }}
              >
                {/* INVULLEN */}
                [Jouw naam]
              </h2>
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                Oprichter &amp; Ambachtsman
              </p>
              <div className="origin-line">
                <EUFlagMicro />
                <span>Europees vakmanschap</span>
              </div>
              <div className="space-y-5 mb-12">
                <p
                  className="text-sm leading-relaxed text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)", maxWidth: "48ch" }}
                >
                  {/* INVULLEN */}
                  [Jouw persoonlijke verhaal — vervang deze tekst door je eigen achtergrond,
                  motivatie en wat je daarvoor deed.]
                </p>
                <p
                  className="text-sm leading-relaxed text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)", maxWidth: "48ch" }}
                >
                  {/* INVULLEN */}
                  [Wat je drijft in dit werk en wat EMERGO voor jou betekent buiten het zakelijke.]
                </p>
              </div>
              <div className="w-full h-px bg-border mb-8" />
              <p
                className="font-light italic"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "#c4956a" }}
              >
                {/* INVULLEN */}
                [Jouw naam]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. DE WERKPLAATS
      ══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{ minHeight: 500 }}
        data-cursor="light"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(26,46,26,0.6)" }}
        />

        <div className="relative z-10 flex flex-col justify-center" style={{ minHeight: 500 }}>
          <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-24 md:py-36 w-full text-center">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Waar het gebeurt
            </p>
            <h2
              className="font-light leading-[1.05] text-white mb-20"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Elke kennel begint hier —{" "}
              <em className="italic">met de hand</em>
            </h2>

            <div
              className="grid grid-cols-3 gap-0 max-w-2xl mx-auto"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              {[
                { getal: "100%", label: "Handwerk" },
                { getal: "Europees", label: "Hout" },
                { getal: "10 jaar", label: "Garantie" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="pt-8 px-6 text-center"
                  style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.15)" } : {}}
                >
                  <div
                    className="text-white font-light mb-2"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
                  >
                    {stat.getal}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase text-white/50"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. WAARDEN GRID
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Onze waarden
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Wat EMERGO drijft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
            {waarden.map((waarde, i) => (
              <div
                key={i}
                className="p-10 md:p-14"
                style={{
                  backgroundColor: "white",
                  borderRight: i % 2 === 0 ? "0.5px solid var(--color-border)" : "none",
                  borderBottom: i < 2 ? "0.5px solid var(--color-border)" : "none",
                }}
              >
                <h3
                  className="font-semibold tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}
                >
                  {waarde.titel}
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)", maxWidth: "40ch" }}
                >
                  {waarde.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48 text-center"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <h2
            className="font-light leading-[1.05] mb-16"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Klaar om het beste
            <br />
            <em className="italic">voor uw hond te kiezen?</em>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <FillButton href="/collecties">Bekijk de collectie</FillButton>
            <Link
              href="/contact"
              className="inline-flex items-center px-12 py-5 border border-foreground/30 text-[10px] tracking-[0.3em] uppercase text-foreground hover:border-foreground transition-colors duration-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
