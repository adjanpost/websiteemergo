"use client";

import { useState } from "react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 480 }}>

      {/* ── LINKS: foto ── */}
      <div className="relative min-h-[280px] md:min-h-0">
        <img
          src="/images/nieuwsbrief-hond.jpg.png"
          alt="Hond in luxe buitenverblijf"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(26,46,26,0.2)" }} />
        <div
          className="absolute bottom-6 left-6"
          style={{ backgroundColor: "rgba(26,46,26,0.65)", padding: "0.5rem 1rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#f8f5f0",
            }}
          >
            EMERGO · Nieuwsbrief
          </span>
        </div>
      </div>

      {/* ── RECHTS: content ── */}
      <div
        className="flex flex-col justify-center px-6 py-12 md:px-16 md:py-20"
        style={{ backgroundColor: "#f0ebe3" }}
      >
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-5"
          style={{ fontFamily: "var(--font-sans)", color: "#c4956a" }}
        >
          Blijf op de hoogte
        </p>

        <h2
          className="font-light leading-[1.15] mb-5"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)" }}
        >
          Voor eigenaren met
          <br />
          oog voor detail
        </h2>

        <p
          className="mb-6"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "0.86rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.9,
            maxWidth: "38ch",
          }}
        >
          Ontvang als eerste nieuws over nieuwe producten, onderhoudstips per seizoen en
          inspiratie voor de perfecte buitenruimte. Geen reclame — alleen wat relevant is
          voor u en uw hond.
        </p>

        <p
          className="font-light italic"
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#c4956a" }}
        >
          EMERGO
        </p>

        {/* Formulier */}
        <div style={{ marginTop: "2rem" }}>
          {submitted ? (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.88rem",
                color: "#1a2e1a",
              }}
            >
              Dank u — u ontvangt een bevestiging per e-mail.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex">
              {/* E-mailinvoerveld */}
              <div className="relative flex-1">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg viewBox="0 0 14 14" fill="none" style={{ width: 14, height: 14 }}>
                    <rect x="1" y="3" width="12" height="8" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M1 3.5L7 8L13 3.5" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Uw e-mailadres"
                  onFocus={(e) => (e.target.style.borderColor = "#c4956a")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  style={{
                    display: "block",
                    width: "100%",
                    height: 48,
                    border: "0.5px solid var(--border)",
                    backgroundColor: "#ffffff",
                    paddingLeft: "2.5rem",
                    paddingRight: "1rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.84rem",
                    color: "var(--foreground)",
                    outline: "none",
                    borderRadius: 0,
                  }}
                />
              </div>

              {/* Knop */}
              <button
                type="submit"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  height: 48,
                  padding: "0 1.8rem",
                  backgroundColor: btnHovered ? "#c4956a" : "#1a2e1a",
                  color: btnHovered ? "#1a2e1a" : "#f8f5f0",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Inschrijven
              </button>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}
