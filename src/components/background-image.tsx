"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

interface BackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function BackgroundImage({ src, className, style, children }: BackgroundImageProps) {
  const blurSrc = src.split("?")[0] + "?w=20&q=10&blur=10";
  const [bg, setBg] = useState(blurSrc);

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="hidden"
        onLoad={() => setBg(src)}
      />
      {children}
    </div>
  );
}
