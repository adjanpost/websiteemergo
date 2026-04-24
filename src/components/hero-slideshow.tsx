"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=85",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=85",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&q=85",
];

const GRADIENT =
  "linear-gradient(to bottom, rgba(26,46,26,0.2) 0%, rgba(26,46,26,0.55) 50%, rgba(26,46,26,0.93) 100%)";

export function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-screen min-h-[640px] flex items-end" data-cursor="light">
      {SLIDES.map((url, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: `${GRADIENT}, url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}

      <div className="absolute top-0 left-0 right-0 h-1 bg-primary z-10" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ga naar foto ${i + 1}`}
            style={{
              width: i === current ? 8 : 6,
              height: i === current ? 8 : 6,
              backgroundColor: i === current ? "#c4956a" : "rgba(255,255,255,0.3)",
              border: "none",
              padding: 0,
              borderRadius: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
