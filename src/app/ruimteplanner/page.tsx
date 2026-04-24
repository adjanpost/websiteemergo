import type { Metadata } from "next";
import { RuimtePlanner } from "@/components/RuimtePlanner";

export const metadata: Metadata = {
  title: "Ruimteplanner",
  description:
    "Plan uw EMERGO kennel in uw eigen tuin. Stel de tuinafmetingen in en sleep de modellen op de juiste plek.",
};

export default function RuimteplannerPage() {
  return (
    <div className="pt-20">

      {/* ── Mini-hero ── */}
      <section
        className="flex items-center justify-center text-center"
        style={{ backgroundColor: "#1a2e1a", minHeight: 320 }}
        data-cursor="light"
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Interactieve planner
          </p>
          <h1
            className="font-light text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Plan uw kennel
            <br />
            <em className="italic">in uw eigen tuin</em>
          </h1>
          <p
            className="font-light leading-relaxed mx-auto"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
            }}
          >
            Stel de afmetingen van uw tuin in, sleep de modellen op de juiste plek
            en zie direct wat past.
          </p>
        </div>
      </section>

      {/* ── Planner ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <RuimtePlanner />
        </div>
      </section>

    </div>
  );
}
