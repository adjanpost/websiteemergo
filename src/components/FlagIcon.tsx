type FlagLocale = "nl" | "en" | "de" | "fr";

export function FlagIcon({ locale, size = 16 }: { locale: FlagLocale; size?: number }) {
  const h = size;
  const w = Math.round(size * 1.5);

  if (locale === "nl") {
    return (
      <svg width={w} height={h} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
        <rect width="3" height="0.667" y="0" fill="#AE1C28" />
        <rect width="3" height="0.667" y="0.667" fill="#FFFFFF" />
        <rect width="3" height="0.667" y="1.333" fill="#21468B" />
      </svg>
    );
  }

  if (locale === "de") {
    return (
      <svg width={w} height={h} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
        <rect width="3" height="0.667" y="0" fill="#000000" />
        <rect width="3" height="0.667" y="0.667" fill="#DD0000" />
        <rect width="3" height="0.667" y="1.333" fill="#FFCE00" />
      </svg>
    );
  }

  if (locale === "fr") {
    return (
      <svg width={w} height={h} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
        <rect width="1" height="2" x="0" fill="#002395" />
        <rect width="1" height="2" x="1" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" fill="#ED2939" />
      </svg>
    );
  }

  // en — Union Jack
  return (
    <svg width={w} height={h} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
      <rect width="60" height="30" fill="#012169" />
      {/* diagonals white */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      {/* diagonals red */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      {/* cross white */}
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      {/* cross red */}
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
