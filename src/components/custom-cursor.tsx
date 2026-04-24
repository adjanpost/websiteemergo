"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let raf: number;
    let rx = -200, ry = -200;
    let mx = -200, my = -200;
    let hovering = false;

    const GREEN = "oklch(0.28 0.09 152)";
    const WHITE = "rgb(255,255,255)";

    const isOnDark = (x: number, y: number): boolean => {
      const els = document.querySelectorAll('[data-cursor="light"]');
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
      }
      return false;
    };

    const setColor = (light: boolean) => {
      ring.style.borderColor = light ? WHITE : GREEN;
    };

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setColor(isOnDark(mx, my));
    };

    const over = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [role='button'], label, input, textarea, select")) {
        if (!hovering) {
          hovering = true;
          ring.style.width   = "36px";
          ring.style.height  = "36px";
          ring.style.opacity = "1";
        }
      }
    };

    const out = (e: MouseEvent) => {
      const t = e.relatedTarget as Element | null;
      if (!t?.closest("a, button, [role='button'], label, input, textarea, select")) {
        hovering = false;
        ring.style.width   = "16px";
        ring.style.height  = "16px";
        ring.style.opacity = "0.5";
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx - 8}px, ${ry - 8}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout",  out);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout",  out);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
      style={{
        width: 16,
        height: 16,
        opacity: 0.5,
        borderColor: "oklch(0.28 0.09 152)",
        transition: "width 0.35s ease, height 0.35s ease, opacity 0.35s ease, border-color 0.2s ease",
      }}
    />
  );
}
