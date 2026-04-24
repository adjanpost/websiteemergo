"use client";

import { useEffect, useRef, useState } from "react";

interface RevealWordsProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // extra base delay in ms
}

export function RevealWords({ children, className, style, delay = 0 }: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.55s ease ${delay + i * 60}ms, transform 0.55s ease ${delay + i * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
