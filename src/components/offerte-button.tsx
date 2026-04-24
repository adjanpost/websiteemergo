"use client";

import { useState } from "react";
import Link from "next/link";

interface OfferteButtonProps {
  href?: string;
  fullWidth?: boolean;
}

export function OfferteButton({ href = "/contact", fullWidth }: OfferteButtonProps) {
  const [on, setOn] = useState(false);

  return (
    <Link
      href={href}
      className={`relative overflow-hidden inline-flex items-center justify-center px-10 py-5 ${fullWidth ? "w-full" : ""}`}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.625rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        backgroundColor: "#c4956a",
        color: on ? "#fff" : "#1a2e1a",
        transition: "color 0.5s ease",
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundColor: "#1a2e1a",
          transform: on ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s ease",
        }}
      />
      <span className="relative z-10">Vraag offerte aan</span>
    </Link>
  );
}
