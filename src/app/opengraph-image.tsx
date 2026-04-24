import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1a2e1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px 96px",
          position: "relative",
        }}
      >
        {/* Decoratieve verticale lijn rechtsboven */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 96,
            width: 1,
            height: 120,
            background: "rgba(196,149,106,0.4)",
          }}
        />

        {/* Houtkleurige accentlijn */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "#c4956a",
            marginBottom: 24,
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c4956a",
            marginBottom: 20,
          }}
        >
          Handgemaakt in Europa
        </div>

        {/* Merknaam */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 88,
            fontWeight: 300,
            color: "#f8f5f0",
            letterSpacing: "0.08em",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          EMERGO
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            fontWeight: 300,
            color: "rgba(248,245,240,0.55)",
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          Premium buitenverblijven van massief Europees hout.
          Duurzaam, geïsoleerd, tijdloos mooi.
        </div>

        {/* URL rechtsonder */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 96,
            fontFamily: "sans-serif",
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "rgba(248,245,240,0.3)",
            textTransform: "uppercase",
          }}
        >
          emergo.nl
        </div>
      </div>
    ),
    { ...size }
  );
}
