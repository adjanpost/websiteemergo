interface MadeInNLProps {
  variant?: "default" | "detail";
}

export function MadeInNL({ variant = "default" }: MadeInNLProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: variant === "detail" ? "0.6rem" : "0.55rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        color: "#c4956a",
        border: "0.5px solid rgba(196,149,106,0.5)",
        padding: variant === "detail" ? "5px 12px" : "4px 10px",
        display: "inline-block",
      }}
    >
      Handgemaakt in Nederland
    </span>
  );
}
