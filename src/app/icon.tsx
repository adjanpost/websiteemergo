import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#1a2e1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "serif",
            fontSize: 22,
            fontWeight: 300,
            color: "#c4956a",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          E
        </div>
      </div>
    ),
    { ...size }
  );
}
