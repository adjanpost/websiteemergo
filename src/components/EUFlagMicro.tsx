export function EUFlagMicro() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const cx = 7 + 3.8 * Math.cos(angle);
    const cy = 7 + 3.8 * Math.sin(angle);
    const pts = Array.from({ length: 5 }, (__, j) => {
      const a = (j * 72 - 90) * (Math.PI / 180);
      const b = (j * 72 - 54) * (Math.PI / 180);
      return `${cx + 0.85 * Math.cos(a)},${cy + 0.85 * Math.sin(a)} ${cx + 0.35 * Math.cos(b)},${cy + 0.35 * Math.sin(b)}`;
    }).join(" ");
    return <polygon key={i} points={pts} fill="#FFCC00" />;
  });

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="7" fill="#003399" />
      {stars}
      <circle cx="7" cy="7" r="6.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" fill="none" />
    </svg>
  );
}
