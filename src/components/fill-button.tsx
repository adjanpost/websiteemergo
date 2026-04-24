"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

interface FillButtonProps {
  href: string;
  children: React.ReactNode;
}

export function FillButton({ href, children }: FillButtonProps) {
  const [on, setOn] = useState(false);

  return (
    <Link
      href={href}
      className="relative inline-flex items-center gap-3 overflow-hidden border border-primary px-12 py-5 text-[10px] tracking-[0.3em] uppercase"
      style={{ fontFamily: "var(--font-sans)" }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* Achtergrond vult van links naar rechts */}
      <span
        aria-hidden
        className="absolute inset-0 bg-primary transition-transform duration-500 ease-in-out origin-left"
        style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
      />
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: on ? "var(--color-primary-foreground)" : "var(--color-primary)" }}
      >
        {children}
      </span>
      <ArrowRight
        className="relative z-10 h-3.5 w-3.5 transition-colors duration-300"
        style={{ color: on ? "var(--color-primary-foreground)" : "var(--color-primary)" }}
      />
    </Link>
  );
}
