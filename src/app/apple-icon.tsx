import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1a2e1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "serif",
            fontSize: 120,
            fontWeight: 300,
            color: "#c4956a",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          E
        </div>
      </div>
    ),
    { ...size }
  );
}
