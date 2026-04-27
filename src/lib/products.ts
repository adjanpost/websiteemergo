export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  cardTagline: string;
  overviewImage: string;
  intro: string;
  description: string[];
  specs: ProductSpec[];
  images: string[];
  quote: string;
};

export const products: Product[] = [
  {
    slug: "kennel",
    name: "EMERGO Kennel",
    tagline: "Het klassieke buitenverblijf.",
    cardTagline:
      "Het klassieke buitenverblijf — architectonisch, geïsoleerd, tijdloos.",
    overviewImage: "/images/kennel-hero.jpg",
    intro:
      "De EMERGO Kennel is ontworpen voor eigenaren die geen compromis willen sluiten. Volledig gesloten, optimaal geïsoleerd en gebouwd om decennialang mooi te blijven.",
    description: [
      "De Kennel combineert massief Douglas of larchhout met donkergroen gepoedercoat staal. De dubbele wanden met mineraalwol isolatie zorgen voor een comfortabele temperatuur het hele jaar door — warm in de winter, koel in de zomer.",
      "Elk detail is doordacht: RVS scharnieren, een verhoogde vloer voor ventilatie en hygiëne, en een dak met EPDM afdichting dat geen druppel doorlaat. De Kennel is verkrijgbaar in drie maten en volledig op maat leverbaar.",
    ],
    specs: [
      { label: "Herkomst", value: "Ontworpen & gemaakt in Europa" },
      { label: "Beschikbare maten", value: "S · M · L · Op maat" },
      { label: "Houtsoort", value: "Douglas of Larchhout" },
      { label: "Staalwerk", value: "Poedercoat RAL 6009 donkergroen" },
      { label: "Isolatie", value: "Mineraalwol spouwisolatie" },
      { label: "Verbindingen", value: "Roestvrij staal (RVS)" },
      { label: "Dak", value: "EPDM afdichting" },
      { label: "Garantie", value: "10 jaar op constructie" },
      { label: "Levering", value: "4–6 weken, volledig gemonteerd" },
    ],
    images: [
      "/images/kennel-hero.jpg",
      "/images/kennel-1.jpg",
      "/images/kennel-2.jpg",
      "/images/kennel-3.jpg",
    ],
    quote: "Gebouwd voor comfort.\nOntworpen voor de tuin.",
  },
  {
    slug: "shelter",
    name: "EMERGO Shelter",
    tagline: "Half open, volledig beschermd.",
    cardTagline:
      "Half open, volledig beschermd — voor de hond die van buiten houdt.",
    overviewImage: "/images/shelter-hero.jpg",
    intro:
      "De EMERGO Shelter is voor de hond die graag buiten is maar altijd een droge, warme plek wil hebben. Half open van voren, volledig beschermd aan de zijkanten en achterkant.",
    description: [
      "De Shelter heeft een semi-open voorzijde waardoor uw hond vrij zicht heeft op de tuin, terwijl wind en regen worden tegengehouden door de gesloten zij- en achterwanden van verticale larchhout latten in EMERGO groen.",
      "Het dak heeft een lichte overstekrand voor extra bescherming en de verhoogde vloer zorgt voor ventilatie en droge poten. De Shelter is modulair opgebouwd en europallet-proof — eenvoudig te plaatsen, te verplaatsen en uit te breiden.",
    ],
    specs: [
      { label: "Herkomst", value: "Ontworpen & gemaakt in Europa" },
      { label: "Beschikbare maten", value: "S · M · L · Op maat" },
      { label: "Houtsoort", value: "Larchhout (geschaafd)" },
      { label: "Staalwerk", value: "Poedercoat RAL 6009 donkergroen" },
      { label: "Constructie", value: "Modulair, europallet-proof" },
      { label: "Dak", value: "EPDM afdichting met overstek" },
      { label: "Verbindingen", value: "Roestvrij staal (RVS)" },
      { label: "Garantie", value: "10 jaar op constructie" },
      { label: "Levering", value: "4–6 weken, volledig gemonteerd" },
    ],
    images: [
      "/images/shelter-hero.jpg",
      "/images/shelter-1.jpg",
      "/images/shelter-2.jpg",
      "/images/shelter-3.jpg",
    ],
    quote: "Buiten zijn, maar altijd\neen thuis hebben.",
  },
];
