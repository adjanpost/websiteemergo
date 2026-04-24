"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Model = {
  collectie: string;
  naam: string;
  breedte: number;
  diepte: number;
  prijs: number;
};

type BreedCategory = "klein" | "middel" | "groot" | "xlgroot" | "mix";

type Breed = {
  name: string;
  height: number;
  weight: number;
  category: BreedCategory;
};

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

const BREEDS: Breed[] = [
  { name: "Chihuahua",              height: 18, weight: 2.5,  category: "klein"   },
  { name: "Yorkshire Terrier",      height: 20, weight: 3,    category: "klein"   },
  { name: "Maltezer",               height: 22, weight: 4,    category: "klein"   },
  { name: "Pomeriaan",              height: 22, weight: 3,    category: "klein"   },
  { name: "Dachshund (Teckel)",     height: 22, weight: 8,    category: "klein"   },
  { name: "Shih Tzu",               height: 25, weight: 6,    category: "klein"   },
  { name: "Pug (Mopshond)",         height: 28, weight: 8,    category: "klein"   },
  { name: "Beagle",                 height: 37, weight: 12,   category: "klein"   },
  { name: "Cocker Spaniel",         height: 40, weight: 13,   category: "klein"   },
  { name: "Franse Bulldog",         height: 30, weight: 12,   category: "klein"   },
  { name: "Jack Russell",           height: 30, weight: 6,    category: "klein"   },
  { name: "Cavalier King Charles",  height: 32, weight: 7,    category: "klein"   },
  { name: "Corgi (Pembroke)",       height: 30, weight: 12,   category: "klein"   },
  { name: "Border Collie",          height: 53, weight: 20,   category: "middel"  },
  { name: "Engelse Bulldog",        height: 40, weight: 25,   category: "middel"  },
  { name: "Siberian Husky",         height: 56, weight: 25,   category: "middel"  },
  { name: "Australian Shepherd",    height: 53, weight: 27,   category: "middel"  },
  { name: "Dalmatier",              height: 60, weight: 28,   category: "middel"  },
  { name: "Vizsla",                 height: 60, weight: 28,   category: "middel"  },
  { name: "Boxer",                  height: 60, weight: 32,   category: "middel"  },
  { name: "Springer Spaniel",       height: 50, weight: 22,   category: "middel"  },
  { name: "Weimaraner",             height: 67, weight: 35,   category: "middel"  },
  { name: "Portugese Waterdog",     height: 54, weight: 22,   category: "middel"  },
  { name: "Labrador Retriever",     height: 60, weight: 35,   category: "groot"   },
  { name: "Golden Retriever",       height: 60, weight: 34,   category: "groot"   },
  { name: "Duitse Herder",          height: 65, weight: 38,   category: "groot"   },
  { name: "Rottweiler",             height: 67, weight: 50,   category: "groot"   },
  { name: "Dobermann",              height: 70, weight: 40,   category: "groot"   },
  { name: "Mechelse Herder",        height: 62, weight: 28,   category: "groot"   },
  { name: "Berner Sennenhond",      height: 70, weight: 48,   category: "groot"   },
  { name: "Bouvier",                height: 68, weight: 45,   category: "groot"   },
  { name: "Flat Coated Retriever",  height: 60, weight: 34,   category: "groot"   },
  { name: "Rhodesian Ridgeback",    height: 69, weight: 40,   category: "groot"   },
  { name: "Braque du Bourbonnais",  height: 57, weight: 25,   category: "groot"   },
  { name: "Sint-Bernard",           height: 80, weight: 80,   category: "xlgroot" },
  { name: "Newfoundlander",         height: 71, weight: 65,   category: "xlgroot" },
  { name: "Deense Dog",             height: 85, weight: 70,   category: "xlgroot" },
  { name: "Ierse Wolfshond",        height: 86, weight: 55,   category: "xlgroot" },
  { name: "Leonberger",             height: 77, weight: 65,   category: "xlgroot" },
  { name: "Kaukasische Herder",     height: 75, weight: 70,   category: "xlgroot" },
  { name: "Anatolische Herder",     height: 80, weight: 65,   category: "xlgroot" },
  { name: "Tibetaanse Mastiff",     height: 75, weight: 68,   category: "xlgroot" },
  { name: "Kruising / Mix",         height: 0,  weight: 0,    category: "mix"     },
];

const WEIGHT_TO_HEIGHT: { max: number; height: number }[] = [
  { max: 5,   height: 22 },
  { max: 10,  height: 30 },
  { max: 20,  height: 45 },
  { max: 35,  height: 58 },
  { max: 50,  height: 67 },
  { max: 999, height: 80 },
];

const CATEGORY_LABEL: Record<BreedCategory, string> = {
  klein:   "Klein",
  middel:  "Middelgroot",
  groot:   "Groot",
  xlgroot: "Extra groot",
  mix:     "Mix",
};

const MAX_BREEDTE = 220;
const MAX_DIEPTE  = 180;

function formatPrijs(prijs: number): string {
  return `€ ${prijs.toLocaleString("nl-NL")}`;
}

function estimateHeightFromWeight(weight: number): number {
  for (const entry of WEIGHT_TO_HEIGHT) {
    if (weight <= entry.max) return entry.height;
  }
  return 80;
}

function calculateSize(
  breedHeight: number,
  breedWeight: number,
  actualWeight: number,
): { length: number; width: number } {
  const effectiveWeight = Math.max(breedWeight, actualWeight);
  const weightFactor = effectiveWeight > breedWeight * 1.2 ? 1.15 : 1.0;
  const adjustedHeight = breedHeight * weightFactor;
  return {
    length: Math.ceil(adjustedHeight * 2.0),
    width:  Math.ceil(adjustedHeight * 1.5),
  };
}

function findMatches(length: number, width: number): Model[] {
  return MODELLEN
    .filter((m) => m.breedte >= length && m.diepte >= width)
    .sort((a, b) => a.prijs - b.prijs)
    .slice(0, 3);
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.65rem",
  fontWeight: 400,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(26,46,26,0.55)",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  fontWeight: 300,
  color: "#1a2e1a",
  background: "#fff",
  border: "0.5px solid #ddd8cf",
  outline: "none",
  borderRadius: 0,
  boxSizing: "border-box",
};

function BestMatchCard({ model, breedName }: { model: Model; breedName?: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #ddd8cf",
        padding: "2rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {breedName && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c4956a",
          }}
        >
          Geschikt voor {breedName}
        </p>
      )}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.58rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#c4956a",
          marginBottom: "0.1rem",
        }}
      >
        Beste match
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#c4956a",
        }}
      >
        {model.collectie}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          fontWeight: 300,
          color: "#1a2e1a",
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        {model.collectie} {model.naam}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.78rem",
          fontWeight: 300,
          color: "rgba(26,46,26,0.45)",
          letterSpacing: "0.05em",
        }}
      >
        {model.breedte} × {model.diepte} cm
      </p>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.4rem",
          fontWeight: 400,
          color: "#1a2e1a",
          marginTop: "0.25rem",
        }}
      >
        vanaf {formatPrijs(model.prijs)}
      </p>
      {breedName && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 300,
            color: "#2a7040",
          }}
        >
          ✓ Voldoet aan de EMERGO maatrichtlijn voor {breedName}
        </p>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#c4956a",
            color: "#1a2e1a",
            fontFamily: "var(--font-sans)",
            fontSize: "0.625rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            padding: "0.9rem 1.8rem",
            textDecoration: "none",
          }}
        >
          Bekijk dit model →
        </Link>
      </div>
    </div>
  );
}

function SecondaryCard({ model, breedName }: { model: Model; breedName?: string }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        border: "0.5px solid #ddd8cf",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      {breedName && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c4956a",
          }}
        >
          Geschikt voor {breedName}
        </p>
      )}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#c4956a",
        }}
      >
        {model.collectie}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.4rem",
          fontWeight: 300,
          color: "#1a2e1a",
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        {model.collectie} {model.naam}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.72rem",
          fontWeight: 300,
          color: "rgba(26,46,26,0.45)",
        }}
      >
        {model.breedte} × {model.diepte} cm
      </p>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.1rem",
          fontWeight: 400,
          color: "#1a2e1a",
          marginTop: "0.25rem",
        }}
      >
        vanaf {formatPrijs(model.prijs)}
      </p>
    </div>
  );
}

function ResultSection({
  matches,
  noMatch,
  breedName,
  contextLabel,
}: {
  matches: Model[];
  noMatch: boolean;
  breedName?: string;
  contextLabel?: string;
}) {
  return (
    <>
      {contextLabel && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            fontWeight: 300,
            color: "rgba(26,46,26,0.65)",
            marginBottom: "1.5rem",
            lineHeight: 1.7,
          }}
        >
          {contextLabel}
        </p>
      )}

      {matches.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <BestMatchCard model={matches[0]} breedName={breedName} />
          {matches.length > 1 && (
            <>
              <div
                style={{
                  paddingTop: "1.5rem",
                  paddingBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ width: 20, height: 1, background: "#c4956a", flexShrink: 0 }} />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(26,46,26,0.45)",
                  }}
                >
                  Ook geschikt
                </p>
              </div>
              <div style={{ display: "flex", gap: "1px", flexWrap: "wrap" }}>
                {matches.slice(1).map((m) => (
                  <SecondaryCard
                    key={`${m.collectie}-${m.naam}`}
                    model={m}
                    breedName={breedName}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {noMatch && (
        <div
          style={{
            background: "#fff",
            border: "0.5px solid #ddd8cf",
            padding: "2rem 2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              fontWeight: 300,
              color: "#1a2e1a",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            {breedName ? (
              <>Voor {breedName} bouwen wij<br /><em>graag een verblijf op maat</em></>
            ) : (
              <>Voor uw maat maken wij<br /><em>een offerte op maat</em></>
            )}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 300,
              color: "rgba(26,46,26,0.55)",
              marginBottom: "1.5rem",
              maxWidth: "42ch",
              lineHeight: 1.8,
            }}
          >
            {breedName
              ? `De benodigde afmetingen voor ${breedName} vallen buiten ons standaard assortiment. Neem contact op — wij bouwen elk verblijf ook volledig op maat.`
              : "De ingevoerde afmetingen vallen buiten ons standaard assortiment. Neem contact op — wij bouwen elk verblijf ook volledig op maat."
            }
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#c4956a",
              color: "#1a2e1a",
              fontFamily: "var(--font-sans)",
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "0.9rem 1.8rem",
              textDecoration: "none",
            }}
          >
            {breedName ? "Vraag maatwerk aan →" : "Neem contact op →"}
          </Link>
        </div>
      )}
    </>
  );
}

export function MaatConfigurator() {
  const [activeTab, setActiveTab] = useState<"maat" | "ras">("maat");

  // Maat tab
  const [breedte, setBreedte] = useState<number | "">("");
  const [diepte, setDiepte] = useState<number | "">("");

  // Ras tab
  const [searchText, setSearchText] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [actualWeight, setActualWeight] = useState<number | "">("");
  const [weightOnlyMode, setWeightOnlyMode] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function switchTab(tab: "maat" | "ras") {
    setActiveTab(tab);
    setBreedte("");
    setDiepte("");
    setSearchText("");
    setSelectedBreed(null);
    setShowDropdown(false);
    setActualWeight("");
    setWeightOnlyMode(false);
  }

  // Maat tab
  const hasMaatInput = breedte !== "" && diepte !== "";
  const maatMatches = hasMaatInput ? findMatches(breedte as number, diepte as number) : [];
  const maatNoMatch = hasMaatInput && maatMatches.length === 0;
  const breedteRatio = breedte !== "" ? Math.min((breedte as number) / MAX_BREEDTE, 1) : 0;
  const diepteRatio  = diepte  !== "" ? Math.min((diepte  as number) / MAX_DIEPTE,  1) : 0;
  const progress     = Math.max(breedteRatio, diepteRatio);

  // Ras tab
  const filteredBreeds =
    searchText.length > 1 && !selectedBreed
      ? BREEDS.filter((b) =>
          b.name.toLowerCase().includes(searchText.toLowerCase())
        ).slice(0, 6)
      : [];

  const isWeightOnly = weightOnlyMode || selectedBreed?.category === "mix";

  let estimatedHeight = 0;
  let calculatedSize: { length: number; width: number } | null = null;
  let rasMatches: Model[] = [];
  let isOverweight = false;
  let contextLabel = "";

  const hasRasInput = (selectedBreed !== null || isWeightOnly) && actualWeight !== "";

  if (hasRasInput) {
    const w = actualWeight as number;

    if (isWeightOnly) {
      estimatedHeight = estimateHeightFromWeight(w);
      calculatedSize = calculateSize(estimatedHeight, w, w);
      contextLabel = `Op basis van ${w} kg schatten wij een schofthoogte van circa ${estimatedHeight} cm. Wij adviseren een verblijf van minimaal ${calculatedSize.length} × ${calculatedSize.width} cm.`;
    } else if (selectedBreed) {
      estimatedHeight = selectedBreed.height;
      isOverweight = w > selectedBreed.weight * 1.5;
      calculatedSize = calculateSize(selectedBreed.height, selectedBreed.weight, w);
      contextLabel = `Op basis van ${selectedBreed.name} (${w} kg) adviseren wij een verblijf van minimaal ${calculatedSize.length} × ${calculatedSize.width} cm.`;
    }

    if (calculatedSize) {
      rasMatches = findMatches(calculatedSize.length, calculatedSize.width);
    }
  }

  const rasNoMatch = hasRasInput && rasMatches.length === 0;
  const breedName =
    !isWeightOnly && selectedBreed ? selectedBreed.name : undefined;

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>

      {/* Tab schakelaar */}
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        {(["maat", "ras"] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              style={{
                flex: 1,
                padding: "0.9rem 1rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: active ? "none" : "0.5px solid #ddd8cf",
                background: active ? "#1a2e1a" : "transparent",
                color: active ? "#fff" : "rgba(26,46,26,0.55)",
                transition: "background 0.3s, color 0.3s",
              }}
            >
              {tab === "maat" ? "Ik weet mijn maat" : "Ik ken mijn ras"}
            </button>
          );
        })}
      </div>

      {/* ── Tab A: Maat invoer ── */}
      {activeTab === "maat" && (
        <>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="mc-breedte">
                Breedte (cm)
              </label>
              <input
                id="mc-breedte"
                type="number"
                min={50}
                max={300}
                value={breedte}
                onChange={(e) =>
                  setBreedte(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="bijv. 100"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle} htmlFor="mc-diepte">
                Diepte (cm)
              </label>
              <input
                id="mc-diepte"
                type="number"
                min={50}
                max={300}
                value={diepte}
                onChange={(e) =>
                  setDiepte(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="bijv. 80"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: hasMaatInput ? "2.5rem" : "0", overflow: "hidden" }}>
            <div
              style={{
                height: 1,
                background: "#e8e3dc",
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progress * 100}%`,
                  background: "#c4956a",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            {hasMaatInput && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6rem",
                  fontWeight: 300,
                  color: "rgba(26,46,26,0.35)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {Math.round(progress * 100)}% van het maximale formaat &mdash; Estate XL (220 × 180 cm)
              </p>
            )}
          </div>

          <ResultSection matches={maatMatches} noMatch={maatNoMatch} />

          {hasMaatInput && (
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 300,
                color: "rgba(26,46,26,0.4)",
                lineHeight: 1.7,
              }}
            >
              Andere maat of wensen? Wij bouwen ook volledig op maat.{" "}
              <Link
                href="/contact"
                style={{
                  color: "#1a2e1a",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Neem contact op
              </Link>
            </p>
          )}
        </>
      )}

      {/* ── Tab B: Ras + gewicht ── */}
      {activeTab === "ras" && (
        <>
          {/* Stap 1: Raszoeker */}
          {!weightOnlyMode && (
            <div style={{ position: "relative", marginBottom: "1.5rem" }} ref={searchContainerRef}>
              <label style={labelStyle} htmlFor="mc-ras">
                Hondenras
              </label>
              <input
                id="mc-ras"
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSelectedBreed(null);
                  setActualWeight("");
                  setShowDropdown(e.target.value.length > 1);
                }}
                onFocus={() => {
                  if (searchText.length > 1 && !selectedBreed) setShowDropdown(true);
                }}
                placeholder="Zoek uw hondenras..."
                style={inputStyle}
                autoComplete="off"
              />

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 2px)",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "0.5px solid #ddd8cf",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    zIndex: 50,
                    maxHeight: 260,
                    overflowY: "auto",
                  }}
                >
                  {filteredBreeds.length === 0 && (
                    <p
                      style={{
                        padding: "1rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 300,
                        color: "rgba(26,46,26,0.45)",
                      }}
                    >
                      Geen ras gevonden
                    </p>
                  )}
                  {filteredBreeds.map((breed) => (
                    <button
                      key={breed.name}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSelectedBreed(breed);
                        setSearchText(breed.name);
                        setShowDropdown(false);
                        setActualWeight("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0.8rem 1rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        color: "#1a2e1a",
                        background: "none",
                        border: "none",
                        borderBottom: "0.5px solid rgba(221,216,207,0.5)",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span>{breed.name}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#c4956a",
                          flexShrink: 0,
                          marginLeft: "0.75rem",
                        }}
                      >
                        {CATEGORY_LABEL[breed.category]}
                      </span>
                    </button>
                  ))}
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setWeightOnlyMode(true);
                      setSelectedBreed(null);
                      setSearchText("");
                      setShowDropdown(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.8rem 1rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      fontWeight: 300,
                      color: "rgba(26,46,26,0.55)",
                      background: "rgba(248,245,240,0.5)",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Mijn ras staat er niet bij
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Weight-only modus header */}
          {weightOnlyMode && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  fontWeight: 300,
                  color: "rgba(26,46,26,0.55)",
                }}
              >
                Ras niet gevonden — wij berekenen de maat op basis van het gewicht.{" "}
                <button
                  onClick={() => {
                    setWeightOnlyMode(false);
                    setActualWeight("");
                  }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    color: "#1a2e1a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    padding: 0,
                  }}
                >
                  Terug naar raszoeker
                </button>
              </p>
            </div>
          )}

          {/* Stap 2: Gewicht invoer */}
          {(selectedBreed !== null || isWeightOnly) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle} htmlFor="mc-gewicht">
                {selectedBreed && !isWeightOnly
                  ? `Hoe zwaar is uw ${selectedBreed.name}?`
                  : "Gewicht van uw hond (kg)"}
              </label>
              <input
                id="mc-gewicht"
                type="number"
                min={1}
                max={120}
                value={actualWeight}
                onChange={(e) =>
                  setActualWeight(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="bijv. 30"
                style={inputStyle}
              />
              {selectedBreed && !isWeightOnly && selectedBreed.weight > 0 && (
                <p
                  style={{
                    marginTop: "0.4rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    fontWeight: 300,
                    color: "rgba(26,46,26,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Gemiddeld gewicht voor dit ras: {selectedBreed.weight} kg
                </p>
              )}
            </div>
          )}

          {/* Overgewicht waarschuwing */}
          {isOverweight && actualWeight !== "" && (
            <div
              style={{
                background: "rgba(255,248,230,0.8)",
                border: "0.5px solid #e8c97a",
                padding: "1rem 1.2rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  color: "#1a2e1a",
                  lineHeight: 1.6,
                }}
              >
                Uw hond is zwaarder dan gemiddeld voor dit ras. Wij adviseren een grotere maat of maatwerk.
              </p>
            </div>
          )}

          {/* Stap 3: Resultaten */}
          <ResultSection
            matches={rasMatches}
            noMatch={rasNoMatch}
            breedName={breedName}
            contextLabel={hasRasInput ? contextLabel : undefined}
          />

          {/* Maat uitlegbox */}
          {hasRasInput && (rasMatches.length > 0 || rasNoMatch) && (
            <div
              style={{
                borderLeft: "2px solid #c4956a",
                padding: "1rem 1.2rem",
                background: "#f0ebe2",
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(26,46,26,0.55)",
                  marginBottom: "0.5rem",
                }}
              >
                Hoe berekenen wij dit?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  color: "rgba(26,46,26,0.65)",
                  lineHeight: 1.7,
                }}
              >
                Een ideaal verblijf is 2× de schofthoogte in lengte en 1,5× in breedte. Zo heeft uw hond genoeg ruimte om te staan, draaien en comfortabel te liggen.
              </p>
            </div>
          )}

          {hasRasInput && (
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 300,
                color: "rgba(26,46,26,0.4)",
                lineHeight: 1.7,
              }}
            >
              Andere wensen of een bijzonder ras? Wij denken graag mee.{" "}
              <Link
                href="/contact"
                style={{
                  color: "#1a2e1a",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Neem contact op
              </Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}
