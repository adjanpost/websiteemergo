"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Model = { collectie: string; naam: string; breedte: number; diepte: number; prijs: number };
type BreedCategory = "klein" | "middel" | "groot" | "xlgroot" | "mix";
type Breed = { name: string; height: number; weight: number; category: BreedCategory };
type Locale = "nl" | "en" | "de" | "fr";

const MODELLEN: Model[] = [
  { collectie: "Classic",  naam: "S",  breedte: 80,  diepte: 60,  prijs: 890   },
  { collectie: "Classic",  naam: "M",  breedte: 100, diepte: 80,  prijs: 1290  },
  { collectie: "Classic",  naam: "L",  breedte: 120, diepte: 100, prijs: 1590  },
  { collectie: "Heritage", naam: "M",  breedte: 110, diepte: 90,  prijs: 1890  },
  { collectie: "Heritage", naam: "L",  breedte: 140, diepte: 110, prijs: 2290  },
  { collectie: "Urban",    naam: "M",  breedte: 100, diepte: 80,  prijs: 2190  },
  { collectie: "Urban",    naam: "L",  breedte: 130, diepte: 100, prijs: 2590  },
  { collectie: "Estate",   naam: "M",  breedte: 150, diepte: 120, prijs: 3490  },
  { collectie: "Estate",   naam: "L",  breedte: 180, diepte: 150, prijs: 4290  },
  { collectie: "Estate",   naam: "XL", breedte: 220, diepte: 180, prijs: 5990  },
];

// Breed data without names (names are localized below)
const BREED_DATA: Omit<Breed, "name">[] = [
  { height: 18, weight: 2.5,  category: "klein"   },
  { height: 20, weight: 3,    category: "klein"   },
  { height: 22, weight: 4,    category: "klein"   },
  { height: 22, weight: 3,    category: "klein"   },
  { height: 22, weight: 8,    category: "klein"   },
  { height: 25, weight: 6,    category: "klein"   },
  { height: 28, weight: 8,    category: "klein"   },
  { height: 37, weight: 12,   category: "klein"   },
  { height: 40, weight: 13,   category: "klein"   },
  { height: 30, weight: 12,   category: "klein"   },
  { height: 30, weight: 6,    category: "klein"   },
  { height: 32, weight: 7,    category: "klein"   },
  { height: 30, weight: 12,   category: "klein"   },
  { height: 53, weight: 20,   category: "middel"  },
  { height: 40, weight: 25,   category: "middel"  },
  { height: 56, weight: 25,   category: "middel"  },
  { height: 53, weight: 27,   category: "middel"  },
  { height: 60, weight: 28,   category: "middel"  },
  { height: 60, weight: 28,   category: "middel"  },
  { height: 60, weight: 32,   category: "middel"  },
  { height: 50, weight: 22,   category: "middel"  },
  { height: 67, weight: 35,   category: "middel"  },
  { height: 54, weight: 22,   category: "middel"  },
  { height: 60, weight: 35,   category: "groot"   },
  { height: 60, weight: 34,   category: "groot"   },
  { height: 65, weight: 38,   category: "groot"   },
  { height: 67, weight: 50,   category: "groot"   },
  { height: 70, weight: 40,   category: "groot"   },
  { height: 62, weight: 28,   category: "groot"   },
  { height: 70, weight: 48,   category: "groot"   },
  { height: 68, weight: 45,   category: "groot"   },
  { height: 60, weight: 34,   category: "groot"   },
  { height: 69, weight: 40,   category: "groot"   },
  { height: 57, weight: 25,   category: "groot"   },
  { height: 80, weight: 80,   category: "xlgroot" },
  { height: 71, weight: 65,   category: "xlgroot" },
  { height: 85, weight: 70,   category: "xlgroot" },
  { height: 86, weight: 55,   category: "xlgroot" },
  { height: 77, weight: 65,   category: "xlgroot" },
  { height: 75, weight: 70,   category: "xlgroot" },
  { height: 80, weight: 65,   category: "xlgroot" },
  { height: 75, weight: 68,   category: "xlgroot" },
  { height: 0,  weight: 0,    category: "mix"     },
];

const BREED_NAMES: Record<Locale, string[]> = {
  nl: [
    "Chihuahua","Yorkshire Terrier","Maltezer","Pomeriaan","Dachshund (Teckel)",
    "Shih Tzu","Pug (Mopshond)","Beagle","Cocker Spaniel","Franse Bulldog",
    "Jack Russell","Cavalier King Charles","Corgi (Pembroke)",
    "Border Collie","Engelse Bulldog","Siberian Husky","Australian Shepherd",
    "Dalmatier","Vizsla","Boxer","Springer Spaniel","Weimaraner","Portugese Waterdog",
    "Labrador Retriever","Golden Retriever","Duitse Herder","Rottweiler","Dobermann",
    "Mechelse Herder","Berner Sennenhond","Bouvier","Flat Coated Retriever",
    "Rhodesian Ridgeback","Braque du Bourbonnais",
    "Sint-Bernard","Newfoundlander","Deense Dog","Ierse Wolfshond","Leonberger",
    "Kaukasische Herder","Anatolische Herder","Tibetaanse Mastiff","Kruising / Mix",
  ],
  en: [
    "Chihuahua","Yorkshire Terrier","Maltese","Pomeranian","Dachshund",
    "Shih Tzu","Pug","Beagle","Cocker Spaniel","French Bulldog",
    "Jack Russell","Cavalier King Charles","Corgi (Pembroke)",
    "Border Collie","English Bulldog","Siberian Husky","Australian Shepherd",
    "Dalmatian","Vizsla","Boxer","Springer Spaniel","Weimaraner","Portuguese Water Dog",
    "Labrador Retriever","Golden Retriever","German Shepherd","Rottweiler","Dobermann",
    "Belgian Malinois","Bernese Mountain Dog","Bouvier","Flat Coated Retriever",
    "Rhodesian Ridgeback","Braque du Bourbonnais",
    "Saint Bernard","Newfoundland","Great Dane","Irish Wolfhound","Leonberger",
    "Caucasian Shepherd","Anatolian Shepherd","Tibetan Mastiff","Crossbreed / Mix",
  ],
  de: [
    "Chihuahua","Yorkshire Terrier","Malteser","Pomeranian","Dackel",
    "Shih Tzu","Mops","Beagle","Cocker Spaniel","Französische Bulldogge",
    "Jack Russell","Cavalier King Charles","Corgi (Pembroke)",
    "Border Collie","Englische Bulldogge","Siberian Husky","Australian Shepherd",
    "Dalmatiner","Vizsla","Boxer","Springer Spaniel","Weimaraner","Portugiesischer Wasserhund",
    "Labrador Retriever","Golden Retriever","Deutscher Schäferhund","Rottweiler","Dobermann",
    "Malinois","Berner Sennenhund","Bouvier","Flat Coated Retriever",
    "Rhodesian Ridgeback","Braque du Bourbonnais",
    "Bernhardiner","Neufundländer","Deutsche Dogge","Irischer Wolfshund","Leonberger",
    "Kaukasischer Schäferhund","Anatolischer Hirtenhund","Tibetanischer Mastiff","Kreuzung / Mix",
  ],
  fr: [
    "Chihuahua","Yorkshire Terrier","Maltais","Poméranien","Teckel",
    "Shih Tzu","Carlin","Beagle","Cocker Spaniel","Bouledogue Français",
    "Jack Russell","Cavalier King Charles","Corgi (Pembroke)",
    "Border Collie","Bouledogue Anglais","Husky Sibérien","Berger Australien",
    "Dalmatien","Vizsla","Boxer","Springer Spaniel","Braque de Weimar","Chien d'eau Portugais",
    "Labrador Retriever","Golden Retriever","Berger Allemand","Rottweiler","Dobermann",
    "Berger Belge Malinois","Bouvier Bernois","Bouvier","Flat Coated Retriever",
    "Rhodesian Ridgeback","Braque du Bourbonnais",
    "Saint-Bernard","Terre-Neuve","Dogue Allemand","Lévrier Irlandais","Leonberg",
    "Berger du Caucase","Berger d'Anatolie","Dogue du Tibet","Croisement / Mix",
  ],
};

const CATEGORY_LABELS: Record<Locale, Record<BreedCategory, string>> = {
  nl: { klein: "Klein", middel: "Middelgroot", groot: "Groot", xlgroot: "Extra groot", mix: "Mix" },
  en: { klein: "Small", middel: "Medium",      groot: "Large", xlgroot: "Extra large",  mix: "Mix" },
  de: { klein: "Klein", middel: "Mittelgroß",  groot: "Groß",  xlgroot: "Extra groß",   mix: "Mix" },
  fr: { klein: "Petit", middel: "Moyen",        groot: "Grand", xlgroot: "Extra grand",  mix: "Mix" },
};

type T = {
  tabMaat: string; tabRas: string;
  labelWidth: string; labelDepth: string; labelBreed: string;
  phWidth: string; phDepth: string; phSearch: string; phWeight: string;
  progressSuffix: string;
  customNote: string; contact: string;
  noBreedFound: string; breedNotListed: string;
  weightModeInfo: string; backToSearch: string;
  labelWeightFor: (n: string) => string; labelWeightGeneral: string;
  avgWeight: (w: number) => string;
  overweightWarning: string; otherWishes: string;
  bestMatch: string; alsoSuitable: string;
  suitableFor: (n: string) => string;
  guidelineMet: (n: string) => string;
  from: string; viewModel: string;
  noMatchTitleBreed: (n: string) => string; noMatchTitleGeneral: string;
  noMatchBodyBreed: (n: string) => string; noMatchBodyGeneral: string;
  noMatchCtaBreed: string; noMatchCtaGeneral: string;
  contextWeightOnly: (w: number, h: number, l: number, b: number) => string;
  contextBreed: (n: string, w: number, l: number, b: number) => string;
  howCalc: string; calcExplain: string;
};

const TRANSLATIONS: Record<Locale, T> = {
  nl: {
    tabMaat: "Ik weet mijn maat", tabRas: "Ik ken mijn ras",
    labelWidth: "Breedte (cm)", labelDepth: "Diepte (cm)", labelBreed: "Hondenras",
    phWidth: "bijv. 100", phDepth: "bijv. 80", phSearch: "Zoek uw hondenras...", phWeight: "bijv. 30",
    progressSuffix: "% van het maximale formaat — Estate XL (220 × 180 cm)",
    customNote: "Andere maat of wensen? Wij bouwen ook volledig op maat.",
    contact: "Neem contact op",
    noBreedFound: "Geen ras gevonden", breedNotListed: "Mijn ras staat er niet bij",
    weightModeInfo: "Ras niet gevonden — wij berekenen de maat op basis van het gewicht.",
    backToSearch: "Terug naar raszoeker",
    labelWeightFor: (n) => `Hoe zwaar is uw ${n}?`, labelWeightGeneral: "Gewicht van uw hond (kg)",
    avgWeight: (w) => `Gemiddeld gewicht voor dit ras: ${w} kg`,
    overweightWarning: "Uw hond is zwaarder dan gemiddeld voor dit ras. Wij adviseren een grotere maat of maatwerk.",
    otherWishes: "Andere wensen of een bijzonder ras? Wij denken graag mee.",
    bestMatch: "Beste match", alsoSuitable: "Ook geschikt",
    suitableFor: (n) => `Geschikt voor ${n}`,
    guidelineMet: (n) => `✓ Voldoet aan de EMERGO maatrichtlijn voor ${n}`,
    from: "vanaf", viewModel: "Bekijk dit model →",
    noMatchTitleBreed: (n) => `Voor ${n} bouwen wij graag een verblijf op maat`,
    noMatchTitleGeneral: "Voor uw maat maken wij een offerte op maat",
    noMatchBodyBreed: (n) => `De benodigde afmetingen voor ${n} vallen buiten ons standaard assortiment. Neem contact op — wij bouwen elk verblijf ook volledig op maat.`,
    noMatchBodyGeneral: "De ingevoerde afmetingen vallen buiten ons standaard assortiment. Neem contact op — wij bouwen elk verblijf ook volledig op maat.",
    noMatchCtaBreed: "Vraag maatwerk aan →", noMatchCtaGeneral: "Neem contact op →",
    contextWeightOnly: (w, h, l, b) => `Op basis van ${w} kg schatten wij een schofthoogte van circa ${h} cm. Wij adviseren een verblijf van minimaal ${l} × ${b} cm.`,
    contextBreed: (n, w, l, b) => `Op basis van ${n} (${w} kg) adviseren wij een verblijf van minimaal ${l} × ${b} cm.`,
    howCalc: "Hoe berekenen wij dit?",
    calcExplain: "Een ideaal verblijf is 2× de schofthoogte in lengte en 1,5× in breedte. Zo heeft uw hond genoeg ruimte om te staan, draaien en comfortabel te liggen.",
  },
  en: {
    tabMaat: "I know my size", tabRas: "I know my breed",
    labelWidth: "Width (cm)", labelDepth: "Depth (cm)", labelBreed: "Dog breed",
    phWidth: "e.g. 100", phDepth: "e.g. 80", phSearch: "Search your dog breed...", phWeight: "e.g. 30",
    progressSuffix: "% of maximum size — Estate XL (220 × 180 cm)",
    customNote: "Other size or wishes? We also build fully custom.",
    contact: "Contact us",
    noBreedFound: "No breed found", breedNotListed: "My breed is not listed",
    weightModeInfo: "Breed not found — we calculate the size based on weight.",
    backToSearch: "Back to breed search",
    labelWeightFor: (n) => `How heavy is your ${n}?`, labelWeightGeneral: "Weight of your dog (kg)",
    avgWeight: (w) => `Average weight for this breed: ${w} kg`,
    overweightWarning: "Your dog is heavier than average for this breed. We recommend a larger size or custom build.",
    otherWishes: "Other wishes or a special breed? We're happy to help.",
    bestMatch: "Best match", alsoSuitable: "Also suitable",
    suitableFor: (n) => `Suitable for ${n}`,
    guidelineMet: (n) => `✓ Meets the EMERGO size guideline for ${n}`,
    from: "from", viewModel: "View this model →",
    noMatchTitleBreed: (n) => `For ${n} we would love to build a custom home`,
    noMatchTitleGeneral: "For your size we create a custom quote",
    noMatchBodyBreed: (n) => `The required dimensions for ${n} fall outside our standard range. Contact us — we build every home fully custom.`,
    noMatchBodyGeneral: "The entered dimensions fall outside our standard range. Contact us — we build every home fully custom.",
    noMatchCtaBreed: "Request custom build →", noMatchCtaGeneral: "Contact us →",
    contextWeightOnly: (w, h, l, b) => `Based on ${w} kg we estimate a shoulder height of approximately ${h} cm. We recommend a home of at least ${l} × ${b} cm.`,
    contextBreed: (n, w, l, b) => `Based on ${n} (${w} kg) we recommend a home of at least ${l} × ${b} cm.`,
    howCalc: "How do we calculate this?",
    calcExplain: "An ideal home is 2× the shoulder height in length and 1.5× in width. This gives your dog enough space to stand, turn and lie comfortably.",
  },
  de: {
    tabMaat: "Ich kenne meine Maße", tabRas: "Ich kenne meine Rasse",
    labelWidth: "Breite (cm)", labelDepth: "Tiefe (cm)", labelBreed: "Hunderasse",
    phWidth: "z.B. 100", phDepth: "z.B. 80", phSearch: "Suchen Sie Ihre Hunderasse...", phWeight: "z.B. 30",
    progressSuffix: "% des maximalen Formats — Estate XL (220 × 180 cm)",
    customNote: "Andere Maße oder Wünsche? Wir bauen auch vollständig nach Maß.",
    contact: "Kontakt aufnehmen",
    noBreedFound: "Keine Rasse gefunden", breedNotListed: "Meine Rasse steht nicht dabei",
    weightModeInfo: "Rasse nicht gefunden — wir berechnen die Größe anhand des Gewichts.",
    backToSearch: "Zurück zur Rassesuche",
    labelWeightFor: (n) => `Wie schwer ist Ihr ${n}?`, labelWeightGeneral: "Gewicht Ihres Hundes (kg)",
    avgWeight: (w) => `Durchschnittsgewicht für diese Rasse: ${w} kg`,
    overweightWarning: "Ihr Hund ist schwerer als der Durchschnitt für diese Rasse. Wir empfehlen eine größere Größe oder Maßanfertigung.",
    otherWishes: "Andere Wünsche oder eine besondere Rasse? Wir helfen Ihnen gerne.",
    bestMatch: "Beste Übereinstimmung", alsoSuitable: "Auch geeignet",
    suitableFor: (n) => `Geeignet für ${n}`,
    guidelineMet: (n) => `✓ Entspricht der EMERGO Größenrichtlinie für ${n}`,
    from: "ab", viewModel: "Dieses Modell ansehen →",
    noMatchTitleBreed: (n) => `Für ${n} bauen wir gerne ein Zuhause nach Maß`,
    noMatchTitleGeneral: "Für Ihre Maße erstellen wir ein individuelles Angebot",
    noMatchBodyBreed: (n) => `Die benötigten Abmessungen für ${n} liegen außerhalb unseres Standardsortiments. Nehmen Sie Kontakt auf — wir bauen jedes Zuhause vollständig nach Maß.`,
    noMatchBodyGeneral: "Die eingegebenen Abmessungen liegen außerhalb unseres Standardsortiments. Nehmen Sie Kontakt auf — wir bauen jedes Zuhause vollständig nach Maß.",
    noMatchCtaBreed: "Maßanfertigung anfragen →", noMatchCtaGeneral: "Kontakt aufnehmen →",
    contextWeightOnly: (w, h, l, b) => `Basierend auf ${w} kg schätzen wir eine Schulterhöhe von ca. ${h} cm. Wir empfehlen ein Zuhause von mindestens ${l} × ${b} cm.`,
    contextBreed: (n, w, l, b) => `Basierend auf ${n} (${w} kg) empfehlen wir ein Zuhause von mindestens ${l} × ${b} cm.`,
    howCalc: "Wie berechnen wir das?",
    calcExplain: "Ein ideales Zuhause ist 2× die Schulterhöhe in der Länge und 1,5× in der Breite. So hat Ihr Hund genug Platz zum Stehen, Drehen und bequemen Liegen.",
  },
  fr: {
    tabMaat: "Je connais ma taille", tabRas: "Je connais ma race",
    labelWidth: "Largeur (cm)", labelDepth: "Profondeur (cm)", labelBreed: "Race de chien",
    phWidth: "ex. 100", phDepth: "ex. 80", phSearch: "Recherchez votre race...", phWeight: "ex. 30",
    progressSuffix: "% de la taille maximale — Estate XL (220 × 180 cm)",
    customNote: "Autre taille ou souhait ? Nous construisons aussi entièrement sur mesure.",
    contact: "Nous contacter",
    noBreedFound: "Aucune race trouvée", breedNotListed: "Ma race n'est pas listée",
    weightModeInfo: "Race non trouvée — nous calculons la taille selon le poids.",
    backToSearch: "Retour à la recherche",
    labelWeightFor: (n) => `Combien pèse votre ${n} ?`, labelWeightGeneral: "Poids de votre chien (kg)",
    avgWeight: (w) => `Poids moyen pour cette race : ${w} kg`,
    overweightWarning: "Votre chien est plus lourd que la moyenne pour cette race. Nous recommandons une taille plus grande ou une construction sur mesure.",
    otherWishes: "Autres souhaits ou race particulière ? Nous sommes heureux de vous aider.",
    bestMatch: "Meilleure correspondance", alsoSuitable: "Également adapté",
    suitableFor: (n) => `Adapté pour ${n}`,
    guidelineMet: (n) => `✓ Répond aux directives de taille EMERGO pour ${n}`,
    from: "à partir de", viewModel: "Voir ce modèle →",
    noMatchTitleBreed: (n) => `Pour ${n} nous serions ravis de construire un habitat sur mesure`,
    noMatchTitleGeneral: "Pour vos dimensions nous créons un devis sur mesure",
    noMatchBodyBreed: (n) => `Les dimensions requises pour ${n} dépassent notre gamme standard. Contactez-nous — nous construisons chaque habitat entièrement sur mesure.`,
    noMatchBodyGeneral: "Les dimensions saisies dépassent notre gamme standard. Contactez-nous — nous construisons chaque habitat entièrement sur mesure.",
    noMatchCtaBreed: "Demander une construction sur mesure →", noMatchCtaGeneral: "Nous contacter →",
    contextWeightOnly: (w, h, l, b) => `Basé sur ${w} kg nous estimons une hauteur au garrot d'environ ${h} cm. Nous recommandons un habitat d'au moins ${l} × ${b} cm.`,
    contextBreed: (n, w, l, b) => `Basé sur ${n} (${w} kg) nous recommandons un habitat d'au moins ${l} × ${b} cm.`,
    howCalc: "Comment calculons-nous ?",
    calcExplain: "Un habitat idéal fait 2× la hauteur au garrot en longueur et 1,5× en largeur. Ainsi votre chien a suffisamment d'espace pour se lever, se retourner et se coucher confortablement.",
  },
};

const WEIGHT_TO_HEIGHT = [
  { max: 5, height: 22 }, { max: 10, height: 30 }, { max: 20, height: 45 },
  { max: 35, height: 58 }, { max: 50, height: 67 }, { max: 999, height: 80 },
];

const MAX_BREEDTE = 220;
const MAX_DIEPTE  = 180;

function formatPrijs(prijs: number, lang: Locale): string {
  const locale = lang === "nl" ? "nl-NL" : lang === "de" ? "de-DE" : lang === "fr" ? "fr-FR" : "en-GB";
  return `€ ${prijs.toLocaleString(locale)}`;
}

function estimateHeightFromWeight(weight: number): number {
  for (const e of WEIGHT_TO_HEIGHT) if (weight <= e.max) return e.height;
  return 80;
}

function calculateSize(breedHeight: number, breedWeight: number, actualWeight: number) {
  const wf = actualWeight > breedWeight * 1.2 ? 1.15 : 1.0;
  const h  = breedHeight * wf;
  return { length: Math.ceil(h * 2.0), width: Math.ceil(h * 1.5) };
}

function findMatches(length: number, width: number): Model[] {
  return MODELLEN.filter((m) => m.breedte >= length && m.diepte >= width)
    .sort((a, b) => a.prijs - b.prijs).slice(0, 3);
}

const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 400,
  letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,46,26,0.55)", marginBottom: "0.5rem",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.95rem",
  fontWeight: 300, color: "#1a2e1a", background: "#fff", border: "0.5px solid #ddd8cf",
  outline: "none", borderRadius: 0, boxSizing: "border-box",
};

function BestMatchCard({ model, breedName, t, lang }: { model: Model; breedName?: string; t: T; lang: Locale }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #ddd8cf", padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {breedName && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4956a" }}>{t.suitableFor(breedName)}</p>}
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4956a", marginBottom: "0.1rem" }}>{t.bestMatch}</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c4956a" }}>{model.collectie}</p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 300, color: "#1a2e1a", lineHeight: 1.05, margin: 0 }}>{model.collectie} {model.naam}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 300, color: "rgba(26,46,26,0.45)", letterSpacing: "0.05em" }}>{model.breedte} × {model.diepte} cm</p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, color: "#1a2e1a", marginTop: "0.25rem" }}>{t.from} {formatPrijs(model.prijs, lang)}</p>
      {breedName && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 300, color: "#2a7040" }}>{t.guidelineMet(breedName)}</p>}
      <div style={{ marginTop: "1rem" }}>
        <Link href={`/${lang}/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#c4956a", color: "#1a2e1a", fontFamily: "var(--font-sans)", fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", padding: "0.9rem 1.8rem", textDecoration: "none" }}>
          {t.viewModel}
        </Link>
      </div>
    </div>
  );
}

function SecondaryCard({ model, breedName, t, lang }: { model: Model; breedName?: string; t: T; lang: Locale }) {
  return (
    <div style={{ flex: 1, background: "#fff", border: "0.5px solid #ddd8cf", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {breedName && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c4956a" }}>{t.suitableFor(breedName)}</p>}
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c4956a" }}>{model.collectie}</p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 300, color: "#1a2e1a", lineHeight: 1.05, margin: 0 }}>{model.collectie} {model.naam}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 300, color: "rgba(26,46,26,0.45)" }}>{model.breedte} × {model.diepte} cm</p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, color: "#1a2e1a", marginTop: "0.25rem" }}>{t.from} {formatPrijs(model.prijs, lang)}</p>
    </div>
  );
}

function ResultSection({ matches, noMatch, breedName, contextLabel, t, lang }: { matches: Model[]; noMatch: boolean; breedName?: string; contextLabel?: string; t: T; lang: Locale }) {
  return (
    <>
      {contextLabel && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(26,46,26,0.65)", marginBottom: "1.5rem", lineHeight: 1.7 }}>{contextLabel}</p>}
      {matches.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <BestMatchCard model={matches[0]} breedName={breedName} t={t} lang={lang} />
          {matches.length > 1 && (
            <>
              <div style={{ paddingTop: "1.5rem", paddingBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 20, height: 1, background: "#c4956a", flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(26,46,26,0.45)" }}>{t.alsoSuitable}</p>
              </div>
              <div style={{ display: "flex", gap: "1px", flexWrap: "wrap" }}>
                {matches.slice(1).map((m) => <SecondaryCard key={`${m.collectie}-${m.naam}`} model={m} breedName={breedName} t={t} lang={lang} />)}
              </div>
            </>
          )}
        </div>
      )}
      {noMatch && (
        <div style={{ background: "#fff", border: "0.5px solid #ddd8cf", padding: "2rem 2.5rem" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 300, color: "#1a2e1a", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            <em>{breedName ? t.noMatchTitleBreed(breedName) : t.noMatchTitleGeneral}</em>
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(26,46,26,0.55)", marginBottom: "1.5rem", maxWidth: "42ch", lineHeight: 1.8 }}>
            {breedName ? t.noMatchBodyBreed(breedName) : t.noMatchBodyGeneral}
          </p>
          <Link href={`/${lang}/contact`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#c4956a", color: "#1a2e1a", fontFamily: "var(--font-sans)", fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", padding: "0.9rem 1.8rem", textDecoration: "none" }}>
            {breedName ? t.noMatchCtaBreed : t.noMatchCtaGeneral}
          </Link>
        </div>
      )}
    </>
  );
}

export function MaatConfigurator({ lang = "nl" }: { lang?: string }) {
  const locale: Locale = (["nl", "en", "de", "fr"].includes(lang) ? lang : "nl") as Locale;
  const t = TRANSLATIONS[locale];
  const catLabels = CATEGORY_LABELS[locale];
  const breedNames = BREED_NAMES[locale];
  const BREEDS: Breed[] = BREED_DATA.map((d, i) => ({ ...d, name: breedNames[i] }));

  const [activeTab, setActiveTab] = useState<"maat" | "ras">("maat");
  const [breedte, setBreedte] = useState<number | "">("");
  const [diepte,  setDiepte]  = useState<number | "">("");
  const [searchText, setSearchText] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [actualWeight, setActualWeight] = useState<number | "">("");
  const [weightOnlyMode, setWeightOnlyMode] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function switchTab(tab: "maat" | "ras") {
    setActiveTab(tab); setBreedte(""); setDiepte(""); setSearchText("");
    setSelectedBreed(null); setShowDropdown(false); setActualWeight(""); setWeightOnlyMode(false);
  }

  const hasMaatInput = breedte !== "" && diepte !== "";
  const maatMatches  = hasMaatInput ? findMatches(breedte as number, diepte as number) : [];
  const maatNoMatch  = hasMaatInput && maatMatches.length === 0;
  const progress     = Math.max(
    breedte !== "" ? Math.min((breedte as number) / MAX_BREEDTE, 1) : 0,
    diepte  !== "" ? Math.min((diepte  as number) / MAX_DIEPTE,  1) : 0,
  );

  const filteredBreeds = searchText.length > 1 && !selectedBreed
    ? BREEDS.filter((b) => b.name.toLowerCase().includes(searchText.toLowerCase())).slice(0, 6)
    : [];

  const isWeightOnly = weightOnlyMode || selectedBreed?.category === "mix";
  const hasRasInput  = (selectedBreed !== null || isWeightOnly) && actualWeight !== "";

  let calculatedSize: { length: number; width: number } | null = null;
  let rasMatches: Model[] = [];
  let isOverweight  = false;
  let contextLabel  = "";

  if (hasRasInput) {
    const w = actualWeight as number;
    if (isWeightOnly) {
      const h = estimateHeightFromWeight(w);
      calculatedSize = calculateSize(h, w, w);
      contextLabel = t.contextWeightOnly(w, h, calculatedSize.length, calculatedSize.width);
    } else if (selectedBreed) {
      isOverweight   = w > selectedBreed.weight * 1.5;
      calculatedSize = calculateSize(selectedBreed.height, selectedBreed.weight, w);
      contextLabel   = t.contextBreed(selectedBreed.name, w, calculatedSize.length, calculatedSize.width);
    }
    if (calculatedSize) rasMatches = findMatches(calculatedSize.length, calculatedSize.width);
  }

  const rasNoMatch = hasRasInput && rasMatches.length === 0;
  const breedName  = !isWeightOnly && selectedBreed ? selectedBreed.name : undefined;

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>

      {/* Tab schakelaar */}
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        {(["maat", "ras"] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <button key={tab} onClick={() => switchTab(tab)} style={{ flex: 1, padding: "0.9rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", border: active ? "none" : "0.5px solid #ddd8cf", background: active ? "#1a2e1a" : "transparent", color: active ? "#fff" : "rgba(26,46,26,0.55)", transition: "background 0.3s, color 0.3s" }}>
              {tab === "maat" ? t.tabMaat : t.tabRas}
            </button>
          );
        })}
      </div>

      {/* Tab A: Maat */}
      {activeTab === "maat" && (
        <>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="mc-breedte">{t.labelWidth}</label>
              <input id="mc-breedte" type="number" min={50} max={300} value={breedte} onChange={(e) => setBreedte(e.target.value === "" ? "" : Number(e.target.value))} placeholder={t.phWidth} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="mc-diepte">{t.labelDepth}</label>
              <input id="mc-diepte" type="number" min={50} max={300} value={diepte} onChange={(e) => setDiepte(e.target.value === "" ? "" : Number(e.target.value))} placeholder={t.phDepth} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: hasMaatInput ? "2.5rem" : "0" }}>
            <div style={{ height: 1, background: "#e8e3dc", width: "100%", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${progress * 100}%`, background: "#c4956a", transition: "width 0.5s ease" }} />
            </div>
            {hasMaatInput && (
              <p style={{ marginTop: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.6rem", fontWeight: 300, color: "rgba(26,46,26,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {Math.round(progress * 100)}{t.progressSuffix}
              </p>
            )}
          </div>

          <ResultSection matches={maatMatches} noMatch={maatNoMatch} t={t} lang={locale} />

          {hasMaatInput && (
            <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 300, color: "rgba(26,46,26,0.4)", lineHeight: 1.7 }}>
              {t.customNote}{" "}
              <Link href={`/${locale}/contact`} style={{ color: "#1a2e1a", textDecoration: "underline", textUnderlineOffset: "3px" }}>{t.contact}</Link>
            </p>
          )}
        </>
      )}

      {/* Tab B: Ras */}
      {activeTab === "ras" && (
        <>
          {!weightOnlyMode && (
            <div style={{ position: "relative", marginBottom: "1.5rem" }} ref={searchContainerRef}>
              <label style={labelStyle} htmlFor="mc-ras">{t.labelBreed}</label>
              <input id="mc-ras" type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value); setSelectedBreed(null); setActualWeight(""); setShowDropdown(e.target.value.length > 1); }} onFocus={() => { if (searchText.length > 1 && !selectedBreed) setShowDropdown(true); }} placeholder={t.phSearch} style={inputStyle} autoComplete="off" />
              {showDropdown && (
                <div style={{ position: "absolute", top: "calc(100% + 2px)", left: 0, right: 0, background: "#fff", border: "0.5px solid #ddd8cf", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 50, maxHeight: 260, overflowY: "auto" }}>
                  {filteredBreeds.length === 0 && <p style={{ padding: "1rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(26,46,26,0.45)" }}>{t.noBreedFound}</p>}
                  {filteredBreeds.map((breed) => (
                    <button key={breed.name} onMouseDown={(e) => { e.preventDefault(); setSelectedBreed(breed); setSearchText(breed.name); setShowDropdown(false); setActualWeight(""); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 300, color: "#1a2e1a", background: "none", border: "none", borderBottom: "0.5px solid rgba(221,216,207,0.5)", cursor: "pointer", textAlign: "left" }}>
                      <span>{breed.name}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4956a", flexShrink: 0, marginLeft: "0.75rem" }}>{catLabels[breed.category]}</span>
                    </button>
                  ))}
                  <button onMouseDown={(e) => { e.preventDefault(); setWeightOnlyMode(true); setSelectedBreed(null); setSearchText(""); setShowDropdown(false); }} style={{ display: "block", width: "100%", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 300, color: "rgba(26,46,26,0.55)", background: "rgba(248,245,240,0.5)", border: "none", cursor: "pointer", textAlign: "left", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    {t.breedNotListed}
                  </button>
                </div>
              )}
            </div>
          )}

          {weightOnlyMode && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 300, color: "rgba(26,46,26,0.55)" }}>
                {t.weightModeInfo}{" "}
                <button onClick={() => { setWeightOnlyMode(false); setActualWeight(""); }} style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "#1a2e1a", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0 }}>
                  {t.backToSearch}
                </button>
              </p>
            </div>
          )}

          {(selectedBreed !== null || isWeightOnly) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle} htmlFor="mc-gewicht">{selectedBreed && !isWeightOnly ? t.labelWeightFor(selectedBreed.name) : t.labelWeightGeneral}</label>
              <input id="mc-gewicht" type="number" min={1} max={120} value={actualWeight} onChange={(e) => setActualWeight(e.target.value === "" ? "" : Number(e.target.value))} placeholder={t.phWeight} style={inputStyle} />
              {selectedBreed && !isWeightOnly && selectedBreed.weight > 0 && (
                <p style={{ marginTop: "0.4rem", fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 300, color: "rgba(26,46,26,0.4)", letterSpacing: "0.05em" }}>{t.avgWeight(selectedBreed.weight)}</p>
              )}
            </div>
          )}

          {isOverweight && actualWeight !== "" && (
            <div style={{ background: "rgba(255,248,230,0.8)", border: "0.5px solid #e8c97a", padding: "1rem 1.2rem", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 300, color: "#1a2e1a", lineHeight: 1.6 }}>{t.overweightWarning}</p>
            </div>
          )}

          <ResultSection matches={rasMatches} noMatch={rasNoMatch} breedName={breedName} contextLabel={hasRasInput ? contextLabel : undefined} t={t} lang={locale} />

          {hasRasInput && (rasMatches.length > 0 || rasNoMatch) && (
            <div style={{ borderLeft: "2px solid #c4956a", padding: "1rem 1.2rem", background: "#f0ebe2", marginTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,46,26,0.55)", marginBottom: "0.5rem" }}>{t.howCalc}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 300, color: "rgba(26,46,26,0.65)", lineHeight: 1.7 }}>{t.calcExplain}</p>
            </div>
          )}

          {hasRasInput && (
            <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 300, color: "rgba(26,46,26,0.4)", lineHeight: 1.7 }}>
              {t.otherWishes}{" "}
              <Link href={`/${locale}/contact`} style={{ color: "#1a2e1a", textDecoration: "underline", textUnderlineOffset: "3px" }}>{t.contact}</Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}
