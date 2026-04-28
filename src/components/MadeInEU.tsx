import React from "react";

interface MadeInEUProps {
  variant?: "card" | "detail";
  style?: React.CSSProperties;
  label?: string;
}

export function MadeInEU({ variant = "card", style, label = "Handgemaakt in Europa" }: MadeInEUProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: variant === "detail" ? "0.6rem" : "0.55rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        color: style ? "rgba(248,245,240,0.75)" : "#c4956a",
        background: "rgba(196,149,106,0.08)",
        border: "0.5px solid rgba(196,149,106,0.35)",
        padding: variant === "detail" ? "5px 12px" : "4px 10px",
        display: "inline-block",
        ...style,
      }}
    >
      {label}
    </span>
  );
}
