"use client";

import { useState, useEffect } from "react";
import { EUFlagMicro } from "@/components/EUFlagMicro";
import { EmergoLogo } from "@/components/emergo-logo";

type Status = "idle" | "loading" | "success" | "error";

const SLIDESHOW = [
  "/images/coming-soon-hero.jpg.png",
  "/images/kennel-hero.png",
  "/images/shelter-hero.jpg.png",
  "/images/klant-1.jpg.png",
  "/images/kennel-1.jpg",
  "/images/klant-2.jpg.png",
  "/images/shelter-1.jpg",
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDESHOW.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) { setStatus("error"); return; }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1000);
    // TODO: vervang door echte API integratie
    // fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email, source: 'coming-soon' }) })
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cs-page {
          display: grid;
          grid-template-columns: 45fr 55fr;
          min-height: 100vh;
          overflow: hidden;
        }

        .cs-left {
          background: #1a2e1a;
          padding: 3rem 4rem 3rem 5rem;
          display: flex;
          flex-direction: column;
          color: #f8f5f0;
          position: relative;
          z-index: 1;
        }

        .cs-logo {
          font-family: var(--font-serif), 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f8f5f0;
          text-decoration: none;
          flex-shrink: 0;
        }
        .cs-logo span { color: #c4956a; }

        .cs-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 0;
        }

        .cs-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c4956a;
          margin-bottom: 1.8rem;
        }
        .cs-eyebrow::before {
          content: '';
          display: block;
          width: 36px;
          height: 1px;
          background: #c4956a;
          flex-shrink: 0;
        }

        .cs-title {
          font-family: var(--font-serif), 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 4vw, 4.2rem);
          font-weight: 300;
          line-height: 1.08;
          color: #f8f5f0;
          margin-bottom: 1.6rem;
        }
        .cs-title em {
          font-style: italic;
          color: rgba(248,245,240,0.65);
          display: block;
        }

        .cs-sub {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: rgba(248,245,240,0.52);
          line-height: 2;
          max-width: 36ch;
          margin-bottom: 2.5rem;
        }

        .cs-signature {
          font-family: var(--font-serif), 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          font-style: italic;
          color: #c4956a;
          margin-bottom: 2.5rem;
        }

        .cs-form-wrap { margin-top: 0.5rem; }

        .cs-form-label {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.4);
          margin-bottom: 0.8rem;
        }

        .cs-form { display: flex; height: 48px; }

        .cs-input-wrap { position: relative; flex: 1; }

        .cs-input-wrap svg {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .cs-input {
          width: 100%;
          height: 48px;
          background: rgba(248,245,240,0.06);
          border: 0.5px solid rgba(248,245,240,0.15);
          border-right: none;
          padding: 0 1rem 0 2.5rem;
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.84rem;
          font-weight: 300;
          color: #f8f5f0;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
        }
        .cs-input::placeholder { color: rgba(248,245,240,0.35); }
        .cs-input:focus { border-color: #c4956a; }
        .cs-input-error { border-color: #e57373 !important; }

        .cs-btn {
          height: 48px;
          padding: 0 1.6rem;
          background: #c4956a;
          color: #1a2e1a;
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: color 0.3s;
          flex-shrink: 0;
          border-radius: 0;
        }
        .cs-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f8f5f0;
          transform: translateX(-101%);
          transition: transform 0.35s ease;
        }
        .cs-btn:hover::before { transform: translateX(0); }
        .cs-btn:hover { color: #1a2e1a; }
        .cs-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .cs-btn span { position: relative; z-index: 1; }

        .cs-error {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.72rem;
          color: #e57373;
          margin-top: 0.4rem;
        }

        .cs-success {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          padding: 1rem 1.2rem;
          border-left: 2px solid #c4956a;
          background: rgba(248,245,240,0.05);
        }
        .cs-success svg { color: #c4956a; flex-shrink: 0; margin-top: 2px; }
        .cs-success p {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.84rem;
          font-weight: 300;
          color: rgba(248,245,240,0.7);
          line-height: 1.7;
        }

        .cs-privacy {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.65rem;
          color: rgba(248,245,240,0.25);
          margin-top: 0.8rem;
        }

        .cs-footer { flex-shrink: 0; }
        .cs-footer-line {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          color: rgba(248,245,240,0.3);
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
        }
        .cs-footer-copy {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          color: rgba(248,245,240,0.2);
        }

        .cs-right {
          position: relative;
          overflow: hidden;
        }
        .cs-slide {
          position: absolute;
          inset: 0;
          background-color: #1a2e1a;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1.4s ease;
        }
        .cs-slide.active { opacity: 1; }

        .cs-logo-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          pointer-events: none;
          user-select: none;
          animation: logoPulse 5s ease-in-out 2s infinite;
          z-index: 2;
        }
        .cs-logo-text { opacity: 0.85; filter: drop-shadow(0 2px 20px rgba(26,46,26,0.5)); transform: scale(1.8); display: block; }
        .cs-logo-line {
          width: 40px;
          height: 1px;
          background: rgba(196,149,106,0.5);
          margin: 0.7rem auto 0.5rem;
          animation: logoPulse 5s ease-in-out 2.1s infinite;
        }
        .cs-logo-sub {
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.45);
          margin-top: 0.1rem;
        }
        @keyframes logoPulse {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.97); }
          15%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          40%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          60%  { opacity: 0; transform: translate(-50%, -50%) scale(1.02); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.97); }
        }

        .cs-photo-badge {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0.5px solid rgba(248,245,240,0.2);
          padding: 0.5rem 1rem;
          background: rgba(26,46,26,0.5);
          backdrop-filter: blur(4px);
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.7);
        }

        .cs-side-text {
          position: absolute;
          right: 2rem;
          bottom: 40%;
          font-family: var(--font-sans), 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.25);
          white-space: nowrap;
          transform: rotate(90deg);
          transform-origin: right center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate {
          animation: fadeUp 0.7s ease forwards;
          opacity: 0;
        }
        .cs-right.animate {
          animation: fadeIn 1.2s ease forwards;
          opacity: 0;
          transform: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 768px) {
          .cs-page { grid-template-columns: 1fr; }
          .cs-right { display: none; }
          .cs-left { padding: 2.5rem 1.5rem; min-height: 100vh; }
          .cs-title { font-size: clamp(2.4rem, 8vw, 3.2rem); }
          .cs-form { flex-direction: column; height: auto; gap: 0; }
          .cs-input { border-right: 0.5px solid rgba(248,245,240,0.15); }
          .cs-btn { height: 48px; width: 100%; margin-top: 8px; }
        }
      `}</style>

      <main className="cs-page">

        {/* ── LINKS: donkergroen vlak ── */}
        <div className="cs-left">
          <a href="/" className="animate" style={{ animationDelay: "0s", display: "inline-block" }}>
            <EmergoLogo variant="light" size="md" />
          </a>

          <div className="cs-content">
            <div className="cs-eyebrow animate" style={{ animationDelay: "0.15s" }}>
              Binnenkort beschikbaar
            </div>

            <h1 className="cs-title animate" style={{ animationDelay: "0.3s" }}>
              Gebouwd met trots.
              <em>Bijna klaar.</em>
            </h1>

            <p className="cs-sub animate" style={{ animationDelay: "0.45s" }}>
              EMERGO maakt premium buitenverblijven van massief Europees hout en donkergroen
              staal — ontworpen voor eigenaren die het beste willen voor hun hond en hun tuin.
            </p>

            <p className="cs-signature animate" style={{ animationDelay: "0.55s" }}>
              EMERGO
            </p>

            <div className="cs-form-wrap animate" style={{ animationDelay: "0.7s" }}>
              <p className="cs-form-label">Ontvang een bericht zodra we live gaan</p>

              {status === "success" ? (
                <div className="cs-success">
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
                    <path d="M4.5 8l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Bedankt — u ontvangt een bericht zodra EMERGO live gaat.</p>
                </div>
              ) : (
                <form className="cs-form" onSubmit={handleSubmit}>
                  <div className="cs-input-wrap">
                    <svg viewBox="0 0 14 14" fill="none" style={{ width: 14, height: 14, color: "rgba(248,245,240,0.35)" }}>
                      <rect x="1" y="3" width="12" height="8" stroke="currentColor" strokeWidth="0.8" />
                      <path d="M1 3.5L7 8L13 3.5" stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                      placeholder="Uw e-mailadres"
                      className={`cs-input${status === "error" ? " cs-input-error" : ""}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cs-btn"
                    disabled={status === "loading"}
                  >
                    <span>{status === "loading" ? "···" : "Houd me op de hoogte"}</span>
                  </button>
                </form>
              )}

              {status === "error" && (
                <p className="cs-error">Vul een geldig e-mailadres in.</p>
              )}
              <p className="cs-privacy">Wij respecteren uw privacy en sturen geen spam.</p>
            </div>
          </div>

          <div className="cs-footer animate" style={{ animationDelay: "0.85s" }}>
            <p className="cs-footer-line">Handgemaakt in Nederland · Europees hout · 10 jaar garantie</p>
            <p className="cs-footer-copy">© 2026 EMERGO · info@emergo.nl</p>
          </div>
        </div>

        {/* ── RECHTS: foto vlak ── */}
        <div className="cs-right animate" style={{ animationDelay: "0.2s" }}>
          {SLIDESHOW.map((src, i) => (
            <div
              key={src}
              className={`cs-slide${i === slide ? " active" : ""}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}

          <div className="cs-photo-badge">
            <EUFlagMicro />
            Handgemaakt in Europa
          </div>
          <div className="cs-side-text">
            EMERGO · Premium Outdoor · Binnenkort
          </div>
        </div>

      </main>
    </>
  );
}
