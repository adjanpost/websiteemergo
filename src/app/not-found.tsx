import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description:
    "Deze pagina bestaat niet. Ga terug naar de EMERGO homepage of bekijk onze producten.",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#1a2e1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* Logo linksboven */}
      <a href="/" className="nf-logo">
        EMERG<span>O</span>
      </a>

      {/* Groot decoratief 404 */}
      <div className="nf-bg-number" aria-hidden="true">
        404
      </div>

      {/* Centrale content */}
      <div className="nf-content">
        <div
          className="nf-eyebrow animate"
          style={{ animationDelay: "0.2s" }}
        >
          U bent verdwaald
        </div>

        <h1
          className="nf-title animate"
          style={{ animationDelay: "0.4s" }}
        >
          Dit pad leidt
          <br />
          <em>nergens naartoe</em>
        </h1>

        <p
          className="nf-sub animate"
          style={{ animationDelay: "0.6s" }}
        >
          De pagina die u zoekt bestaat niet of is verplaatst.
          <br />
          Geen zorgen — het mooiste van EMERGO wacht nog steeds op u.
        </p>

        <div className="nf-divider" />

        <div
          className="nf-actions animate"
          style={{ animationDelay: "0.8s" }}
        >
          <a href="/" className="nf-btn-primary">
            <span>Terug naar home →</span>
          </a>
          <a href="/producten" className="nf-btn-ghost">
            Bekijk de producten
          </a>
          <a href="/contact" className="nf-btn-text">
            Neem contact op
          </a>
        </div>
      </div>

      {/* Copyright linksonder */}
      <div className="nf-footer">© 2025 EMERGO</div>
    </main>
  );
}
