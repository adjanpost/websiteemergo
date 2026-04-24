import type { Metadata } from "next";
import Link from "next/link";
import { OfferteButton } from "@/components/offerte-button";
import { EUFlagMicro } from "@/components/EUFlagMicro";

export const metadata: Metadata = {
  title: "Materialen",
  description:
    "EMERGO gebruikt uitsluitend Europees gecertificeerd Douglas en Larchout, RAL 6009 poedercoat staal en roestvrij staal. Lees alles over de materialen en constructie.",
};

const houtTypes = [
  {
    naam: "Douglas",
    tekst:
      "Licht van gewicht, hoog van sterkte. Douglas groeit langzaam in Europese bossen en ontwikkelt daardoor een dichte nerving die uitzonderlijk weerbestendig is. Gedroogd op 18% vochtigheid — stabiel in elke temperatuur.",
  },
  {
    naam: "Larch",
    tekst:
      "De hardste naaldhoutsoort die Europa voortbrengt. Larch vormt na verloop van tijd een grijszilveren patina dat de houtstructuur versterkt, niet aantast. Geen behandeling nodig om mooi te blijven.",
  },
];

const procesStappen = [
  {
    nummer: "01",
    titel: "Selectie",
    tekst: "Elk plank wordt handmatig geselecteerd op nerf, vochtigheid en structuur. Afwijkend hout gaat terug.",
  },
  {
    nummer: "02",
    titel: "Zagen & schuren",
    tekst: "Op maat gezaagd, drie keer geschuurd. Geen scherpe randen, geen splinters — ook niet na jaren buiten.",
  },
  {
    nummer: "03",
    titel: "Staalwerk",
    tekst: "Het staalframe wordt gelast, gescandeerd op maatvoering en daarna poedercoat in RAL 6009 aangebracht.",
  },
  {
    nummer: "04",
    titel: "Montage",
    tekst: "Hout en staal worden samengebracht met RVS verbindingen. Elke verbinding wordt met handkracht aangedraaid en gecontroleerd.",
  },
  {
    nummer: "05",
    titel: "Keuring",
    tekst: "Elk verblijf doorloopt een eindcontrole voor het onze werkplaats verlaat. Pas dan gaat onze naam erop.",
  },
];

const rvsBadges = [
  {
    titel: "RVS verbindingen",
    tekst:
      "Alle scharnieren, bouten, moeren en stripverbindingen zijn van roestvast staal 316L. Corrosie is geen optie — ook niet na tien jaar regen.",
  },
  {
    titel: "EPDM dakafdichting",
    tekst:
      "Synthetisch rubber dat zonder naden rond het volledige dakvlak gespannen wordt. UV-bestendig, flexibel bij vorst en getest op 50+ jaar levensduur.",
  },
  {
    titel: "Verhoogde vloer",
    tekst:
      "De vloer ligt 8 cm boven maaiveld op een hardhouten lat-constructie. Geen condensatie van onderaf, geen vochtopname — het verblijf blijft droog van binnenuit.",
  },
  {
    titel: "Spouwisolatie",
    tekst:
      "Mineraalwol in dubbele spouw — zowel in wanden als dak. Thermische isolatiewaarde die ook in een warme zomer een aangenaam binnenklimaat garandeert.",
  },
];

export default function MaterialenPage() {
  return (
    <div className="pt-20">

      {/* ══════════════════════════════════════════
          1. MINI-HERO
      ══════════════════════════════════════════ */}
      <section
        className="flex items-center justify-center text-center"
        style={{ backgroundColor: "#1a2e1a", minHeight: 400 }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Materialen &amp; constructie
          </p>
          <h1
            className="font-light text-white leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            Geen compromissen.
            <br />
            <em className="italic">Geen uitzonderingen.</em>
          </h1>
          <p
            className="font-light leading-relaxed mx-auto"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: 520,
            }}
          >
            Elk EMERGO-verblijf is gebouwd met een kleine set materialen — allemaal zorgvuldig gekozen
            op duurzaamheid, esthetiek en functie. Niets meer, niets minder.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. HOUT
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
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
                className="relative z-10 aspect-[4/5]"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=800&q=85)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* Rechts: tekst + houtkaarten */}
            <div className="flex flex-col justify-start">
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                Europees massief hout
              </p>
              <h2
                className="font-light leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Hout dat
                <br />
                <em className="italic">generaties meegaat</em>
              </h2>
              <p
                className="font-light leading-[1.9] text-muted-foreground mb-12"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", maxWidth: "48ch" }}
              >
                We gebruiken uitsluitend Douglas en Larch uit Europese, FSC-gecertificeerde bossen.
                Beide houtsoorten zijn van nature weerbestendig — zonder chemische impregnering of
                coating. Het hout wordt gedroogd op 18% vochtigheid, waarna het stabiel blijft
                onder alle weersomstandigheden.
              </p>

              <div className="divide-y divide-border">
                {houtTypes.map((hout) => (
                  <div key={hout.naam} className="py-8">
                    <h3
                      className="font-semibold mb-3"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}
                    >
                      {hout.naam}
                    </h3>
                    <p
                      className="font-light text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", maxWidth: "44ch" }}
                    >
                      {hout.tekst}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="mt-8 text-[10px] text-muted-foreground/70"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                * Alle houtsoorten zijn FSC-gecertificeerd en afkomstig uit duurzaam beheerde Europese bossen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. STAAL
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">

            {/* Links: tekst + specbox */}
            <div>
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                Poedercoat staal
              </p>
              <h2
                className="font-light leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                RAL 6009 —{" "}
                <em className="italic">altijd donkergroen</em>
              </h2>
              <p
                className="font-light leading-[1.9] text-muted-foreground mb-12"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", maxWidth: "48ch" }}
              >
                Het staalframe is het ruggengraat van elk verblijf. We kiezen bewust voor één kleur:
                RAL 6009, het donkergroene tint dat tijdloos is en zich voegt naar elke tuinstijl.
                Het poedercoat wordt elektrostatisch aangebracht en gebakken op 200 °C voor maximale
                hechting en slijtvastheid.
              </p>

              {/* Specbox */}
              <div
                className="divide-y"
                style={{ border: "1px solid var(--color-border)" }}
              >
                {[
                  { label: "Kleurcode", value: "RAL 6009 — Tannengrün" },
                  { label: "Applicatie", value: "Elektrostatisch poedercoat" },
                  { label: "Laagdikte", value: "60–80 micron" },
                  { label: "Baktemperatuur", value: "200 °C" },
                  { label: "Finish", value: "Mat" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between px-6 py-4 gap-4"
                  >
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground shrink-0"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {spec.label}
                    </span>
                    <span
                      className="text-sm text-right"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rechts: foto */}
            <div
              className="aspect-[4/5]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. RVS & DETAILS
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "oklch(0.96 0.005 80)" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="mb-16">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-primary mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Details &amp; afwerking
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Elk detail telt
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border">
            {rvsBadges.map((badge, i) => (
              <div
                key={badge.titel}
                className="p-10 md:p-14"
                style={{
                  borderRight: i % 2 === 0 ? "0.5px solid var(--color-border)" : "none",
                  borderBottom: i < 2 ? "0.5px solid var(--color-border)" : "none",
                }}
              >
                <div
                  className="mb-5"
                  style={{ width: 24, height: 1, backgroundColor: "#c4956a" }}
                />
                <h3
                  className="font-semibold mb-4"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}
                >
                  {badge.titel}
                </h3>
                <p
                  className="font-light text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", maxWidth: "38ch" }}
                >
                  {badge.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PRODUCTIEPROCES
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "#1a2e1a" }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="mb-16 text-center">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Van plank tot verblijf
            </p>
            <h2
              className="font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Het productieproces
            </h2>
          </div>

          {/* Tijdlijn */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {procesStappen.map((stap, i) => (
              <div
                key={stap.nummer}
                className="relative pt-8 pb-8 md:pr-8"
                style={
                  i < procesStappen.length - 1
                    ? { borderBottom: "1px solid rgba(255,255,255,0.12)" }
                    : {}
                }
              >
                {/* Connector lijn (desktop) */}
                {i < procesStappen.length - 1 && (
                  <div
                    className="hidden md:block absolute top-12 right-0"
                    aria-hidden
                    style={{
                      width: "1px",
                      top: 0,
                      bottom: 0,
                      right: 0,
                      backgroundColor: "rgba(255,255,255,0.12)",
                    }}
                  />
                )}
                <div
                  className="font-light mb-5"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "3.5rem",
                    color: "#c4956a",
                    lineHeight: 1,
                    opacity: 0.7,
                  }}
                >
                  {stap.nummer}
                </div>
                <h3
                  className="font-semibold mb-3 text-white"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
                >
                  {stap.titel}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.55)",
                    maxWidth: "26ch",
                  }}
                >
                  {stap.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. DUURZAAMHEID
      ══════════════════════════════════════════ */}
      <section className="py-36 md:py-48">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">

            {/* Links: foto */}
            <div
              className="aspect-[4/5]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Rechts: tekst + badges */}
            <div>
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
              >
                Duurzaamheid
              </p>
              <h2
                className="font-light leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Gebouwd voor de{" "}
                <em className="italic">lange termijn</em>
              </h2>
              <p
                className="font-light leading-[1.9] text-muted-foreground mb-12"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", maxWidth: "48ch" }}
              >
                Duurzaamheid is geen marketing bij EMERGO — het is een ontwerpeis. Geen materiaal
                gaat onze werkplaats in dat niet bewijsbaar lang meegaat. Dat betekent geen chemische
                behandelingen, geen goedkope verbindingen en geen shortcuts in de constructie.
                Elke kennel en shelter is ontworpen voor een levensduur van minimaal 15 jaar
                zonder structureel onderhoud.
              </p>

              {/* Inline badges */}
              <div className="divide-y divide-border">
                {[
                  { label: "FSC-gecertificeerd hout", sub: "Europese bossen, verantwoord beheerd" },
                  { label: "Geen chemische impregnering", sub: "Veilig voor dieren, ook van binnenuit" },
                  { label: "10 jaar constructiegarantie", sub: "Op frame, verbindingen en dakdichting" },
                ].map((badge, i) => (
                  <div key={badge.label} className="flex items-start gap-5 py-5">
                    {i > 0 ? (
                      <div
                        className="shrink-0"
                        style={{ width: 20, height: 1, backgroundColor: "#c4956a", marginTop: "0.55rem" }}
                      />
                    ) : (
                      <div className="shrink-0" style={{ marginTop: "0.15rem" }}>
                        <EUFlagMicro />
                      </div>
                    )}
                    <div>
                      {i === 0 ? (
                        <div className="origin-badge mb-1">
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500 }}>
                            {badge.label}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-medium mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                          {badge.label}
                        </p>
                      )}
                      <p className="text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-sans)" }}>
                        {badge.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48 text-center"
        style={{ backgroundColor: "#1a2e1a" }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Overtuigd?
          </p>
          <h2
            className="font-light text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Ontdek wat we bouwen
            <br />
            <em className="italic">met deze materialen</em>
          </h2>
          <p
            className="font-light mb-14"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Bekijk de Kennel en Shelter — of vraag direct een vrijblijvende offerte aan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <OfferteButton href="/contact" />
            <Link
              href="/producten"
              className="inline-flex items-center px-10 py-5 border border-white/30 text-[10px] tracking-[0.3em] uppercase text-white/70 hover:border-white/60 hover:text-white transition-colors duration-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Bekijk de producten
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
