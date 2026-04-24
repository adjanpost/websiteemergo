"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const switchTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 150);
  };

  return (
    <div>
      <div
        className="aspect-[4/5] w-full"
        style={{
          backgroundImage: `url(${images[active]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
      <div className="flex gap-2 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => switchTo(i)}
            aria-label={`Foto ${i + 1} van ${name}`}
            style={{
              width: 80,
              height: 80,
              flexShrink: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: i === active ? "2px solid #c4956a" : "2px solid transparent",
              padding: 0,
              cursor: "pointer",
              outline: "none",
              transition: "border-color 0.25s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
