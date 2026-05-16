"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type DealerType = "showroom" | "dealer";

interface Dealer {
  id: number;
  name: string;
  type: DealerType;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  lat: number;
  lng: number;
}

const dealers: Dealer[] = [
  // Voeg dealers toe zodra beschikbaar:
  // {
  //   id: 1, name: "...", type: "showroom",
  //   address: "...", city: "...", zip: "...", country: "Nederland",
  //   phone: "...", email: "...", website: "https://...",
  //   lat: 52.37, lng: 4.90,
  // },
];

// ── Map placeholder ──────────────────────────
function MapPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "68vh",
        minHeight: 400,
        backgroundColor: "#dde5d8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(26,46,26,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,46,26,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "68px 68px",
        }}
      />
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0 395 Q350 365 700 395 T1400 385" stroke="#afc4a6" strokeWidth="3.5" fill="none"/>
        <path d="M0 275 Q500 248 900 278 T1400 260" stroke="#b8cab0" strokeWidth="2.5" fill="none"/>
        <path d="M0 515 Q250 495 600 524 T1400 505" stroke="#b8cab0" strokeWidth="2" fill="none"/>
        <path d="M0 158 Q700 138 1400 152" stroke="#c3d1bc" strokeWidth="1.2" fill="none"/>
        <path d="M0 638 Q600 618 1400 632" stroke="#c3d1bc" strokeWidth="1.2" fill="none"/>
        <path d="M348 0 Q362 248 352 498 T357 800" stroke="#afc4a6" strokeWidth="3" fill="none"/>
        <path d="M698 0 Q712 198 702 395 T706 800" stroke="#afc4a6" strokeWidth="3.5" fill="none"/>
        <path d="M1048 0 Q1038 248 1046 498 T1042 800" stroke="#afc4a6" strokeWidth="2.5" fill="none"/>
        <path d="M174 0 Q178 298 175 800" stroke="#b8cab0" strokeWidth="1.5" fill="none"/>
        <path d="M524 0 Q528 298 525 800" stroke="#b8cab0" strokeWidth="1.5" fill="none"/>
        <path d="M874 0 Q878 298 875 800" stroke="#b8cab0" strokeWidth="1.5" fill="none"/>
        <path d="M1224 0 Q1228 298 1225 800" stroke="#b8cab0" strokeWidth="1.5" fill="none"/>
      </svg>

      {/* Bottom fade to search section */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, rgba(26,46,26,0.35))" }} />

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          backgroundColor: "white",
          padding: "0.85rem 1.3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        }}
      >
        {[
          { color: "#1a2e1a", label: "Showroom" },
          { color: "#c4956a", label: "Dealer" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#1a2e1a" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dealer card ───────────────────────────────
function DealerCard({ d }: { d: Dealer }) {
  const [hovered, setHovered] = useState(false);
  const [apptHovered, setApptHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#faf7f3" : "#ffffff",
        padding: "2.4rem 2rem",
        transition: "background-color 0.25s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.2rem" }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
          backgroundColor: d.type === "showroom" ? "#1a2e1a" : "#c4956a",
        }} />
        <span style={{
          fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.6rem",
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: d.type === "showroom" ? "#1a2e1a" : "#c4956a",
        }}>
          EMERGO {d.type === "showroom" ? "Showroom" : "Dealer"}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.3rem",
        color: "#1a2e1a", lineHeight: 1.15, marginBottom: "1.5rem",
      }}>
        {d.name}
      </h3>

      {/* Address */}
      <p style={{
        fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.78rem",
        color: "var(--muted-foreground)", lineHeight: 2, marginBottom: "1.2rem",
      }}>
        {d.address}<br />
        {d.zip} {d.city}<br />
        {d.country}
      </p>

      {/* Contact */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.28rem", marginBottom: "auto", paddingBottom: "1.8rem" }}>
        {d.phone && (
          <a href={`tel:${d.phone}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.75rem", color: "var(--muted-foreground)", textDecoration: "none" }}>
            T: {d.phone}
          </a>
        )}
        {d.email && (
          <a href={`mailto:${d.email}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.75rem", color: "var(--muted-foreground)", textDecoration: "none" }}>
            {d.email}
          </a>
        )}
        {d.website && (
          <a href={d.website} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.75rem", color: "var(--muted-foreground)", textDecoration: "none" }}>
            {d.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#e8e3db", marginBottom: "1.4rem" }} />

      {/* CTA */}
      <a
        href={`mailto:${d.email ?? "info@emergo.nl"}`}
        onMouseEnter={() => setApptHovered(true)}
        onMouseLeave={() => setApptHovered(false)}
        style={{
          fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.68rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: apptHovered ? "#1a2e1a" : "#8a9e8a",
          textDecoration: "underline", textUnderlineOffset: "4px",
          transition: "color 0.2s", cursor: "pointer",
        }}
      >
        Maak een afspraak
      </a>
    </div>
  );
}

// ── Search field with label ───────────────────
function SearchField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{
        fontFamily: "var(--font-sans)", fontSize: "0.6rem", fontWeight: 400,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
      }}>
        {label}
      </label>
      <div style={{
        borderBottom: `1px solid ${focused ? "#c4956a" : "rgba(255,255,255,0.25)"}`,
        transition: "border-color 0.25s",
        paddingBottom: "0.75rem",
      }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.95rem",
            color: "white",
          }}
        />
      </div>
    </div>
  );
}

// ── Country select with label ─────────────────
function CountryField({
  label, value, onChange, countries,
}: {
  label: string; value: string; onChange: (v: string) => void; countries: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{
        fontFamily: "var(--font-sans)", fontSize: "0.6rem", fontWeight: 400,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
      }}>
        {label}
      </label>
      <div style={{
        borderBottom: `1px solid ${focused ? "#c4956a" : "rgba(255,255,255,0.25)"}`,
        transition: "border-color 0.25s",
        paddingBottom: "0.75rem",
        position: "relative",
      }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            appearance: "none", cursor: "pointer",
            fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.95rem",
            color: value ? "white" : "rgba(255,255,255,0.45)",
          }}
        >
          <option value="" style={{ color: "#333", backgroundColor: "#1a2e1a" }}>Alle landen</option>
          {countries.map((c) => (
            <option key={c} value={c.toLowerCase()} style={{ color: "#333", backgroundColor: "#fff" }}>{c}</option>
          ))}
        </select>
        <svg viewBox="0 0 10 6" fill="none" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 10, pointerEvents: "none", color: "rgba(255,255,255,0.4)" }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────
export function VerkooppuntenClient({ lang }: { lang: string }) {
  const [locationQuery, setLocationQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");

  const countries = useMemo(
    () => Array.from(new Set(dealers.map((d) => d.country))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = locationQuery.toLowerCase();
    const c = countryQuery.toLowerCase();
    return dealers.filter((d) => {
      const matchesLocation =
        q === "" ||
        d.city.toLowerCase().includes(q) ||
        d.zip.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q);
      const matchesCountry = c === "" || d.country.toLowerCase().includes(c);
      return matchesLocation && matchesCountry;
    });
  }, [locationQuery, countryQuery]);

  return (
    <div className="pt-20">

      {/* ══ MAP ═══════════════════════════════ */}
      <MapPlaceholder />

      {/* ══ ZOEK — dark green bar ══════════════ */}
      <section style={{ backgroundColor: "#1a2e1a" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-16" style={{ padding: "4rem 3rem 4.5rem" }}>

          {/* Heading row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <h1 style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "white", lineHeight: 1.05, margin: 0,
            }}>
              Vind een verkooppunt
            </h1>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.78rem",
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em",
              maxWidth: "28ch", lineHeight: 1.7, margin: 0,
            }}>
              Bezoek een showroom of dealer bij u in de buurt
            </p>
          </div>

          {/* Search fields */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
          }}>
            <SearchField
              label="Locatie"
              value={locationQuery}
              onChange={setLocationQuery}
              placeholder="Stad of postcode"
            />
            <CountryField
              label="Land"
              value={countryQuery}
              onChange={setCountryQuery}
              countries={countries}
            />
          </div>
        </div>
      </section>

      {/* ══ DEALER GRID ═══════════════════════ */}
      <section style={{ backgroundColor: "#f0ebe2", padding: "0 0 6rem" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-16" style={{ paddingTop: "3rem" }}>

          {/* Label + count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.6rem",
              letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted-foreground)",
            }}>
              Verkooppunten
            </p>
            {dealers.length > 0 && (
              <p style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.72rem",
                color: "var(--muted-foreground)",
              }}>
                {filtered.length} {filtered.length === 1 ? "resultaat" : "resultaten"}
              </p>
            )}
          </div>

          {dealers.length === 0 || filtered.length === 0 ? (
            <div style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
              <p style={{
                fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.35rem",
                color: "var(--muted-foreground)", fontStyle: "italic", marginBottom: "0.8rem",
              }}>
                {dealers.length === 0
                  ? "Verkooppunten worden binnenkort toegevoegd."
                  : "Geen resultaten gevonden."}
              </p>
              <p style={{
                fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem",
                color: "var(--muted-foreground)", lineHeight: 1.9, marginBottom: "2rem",
              }}>
                {dealers.length === 0
                  ? "Wilt u EMERGO toch van dichtbij ervaren? Neem contact met ons op."
                  : "Probeer een andere locatie of verwijder uw filters."}
              </p>
              {dealers.length === 0 && (
                <Link
                  href={`/${lang}/contact`}
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.68rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#1a2e1a", textDecoration: "none",
                    border: "1px solid #1a2e1a", padding: "0.9rem 2.5rem",
                  }}
                >
                  Neem contact op
                </Link>
              )}
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2px",
              backgroundColor: "#d8d1c6",
            }}>
              {filtered.map((d) => (
                <DealerCard key={d.id} d={d} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
