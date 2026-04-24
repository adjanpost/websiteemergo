/**
 * Gravure-stijl lijntekening — EMERGO Duo open shelter.
 * 3/4 perspectief: open voorkant recht, LINKERZIJDE zichtbaar (diepte gaat links-omhoog).
 * Gebaseerd op de echte productfoto: breed dakoversteksel, open front,
 * verticale houten planken, groen accentpaneel, breed terrasplatform.
 */
export function KennelEngraving({
  className = "",
  color = "currentColor",
  opacity = 1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const sw  = 0.9;
  const swH = 0.35;
  const c   = color;

  // ── Perspectief: diepte gaat naar links-omhoog ───────────────────
  const dx = -68, dy = -38;   // links-zijde offset

  // ── Voorvlak (open voorkant) ─────────────────────────────────────
  const fx1 = 158, fy1 = 110;   // top-left
  const fx2 = 378, fy2 = 110;   // top-right  (fy2 = fy1)
  const fy3 = 210;               // bottom y
  const fW  = fx2 - fx1;        // 220px breed
  const postW = 14;

  // ── Dak ─────────────────────────────────────────────────────────
  const rH   = 14;               // dakdikte
  const rOvX = 24;               // oversteksel links/rechts
  const rOvY = fy1 - rH;        // dakbovenkant (= 96)

  // Dakblad bovenvlak (parallelogram, visible left+top):
  const rFL = { x: fx1 - rOvX,      y: rOvY };            // front-left
  const rFR = { x: fx2 + rOvX,      y: rOvY };            // front-right
  const rBL = { x: fx1 - rOvX + dx, y: rOvY + dy };       // back-left  (= ~66, 58)
  const rBR = { x: fx2 + rOvX + dx, y: rOvY + dy };       // back-right

  // ── Binnenwand (zichtbaar door open voorkant, iets teruggelegen) ─
  const bx1 = fx1 + dx * 0.95;   // ~93
  const bx2 = fx2 + dx * 0.95;   // ~313
  const by1 = fy1 + dy * 0.95;   // ~74
  const by3 = fy3 + dy * 0.95;   // ~174

  // ── Platform ────────────────────────────────────────────────────
  const platH  = 13;
  const platOv = 20;

  // ── Linkerzijwand ────────────────────────────────────────────────
  const sidePoints = `${fx1},${fy1} ${fx1+dx},${fy1+dy} ${fx1+dx},${fy3+dy} ${fx1},${fy3}`;

  // ── Groene accentpaneel: achterste ~30% van zijwand ──────────────
  const gT  = 0.68;                              // start op 68% van diepte
  const gpx1 = fx1 + dx * gT;                   // ~111
  const gpy1 = fy1 + dy * gT;                   // ~84
  const gpx2 = fx1 + dx;                         // = 90
  const gpy2 = fy1 + dy;                         // = 72
  const greenSide = `${gpx1},${gpy1} ${gpx2},${gpy2} ${gpx2},${fy3+dy} ${gpx1},${fy3+dy*(gT/1)+(fy3-fy1)*(1-gT)}`;

  void fW; void fy2;

  return (
    <svg
      viewBox="0 0 420 255"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EMERGO Duo shelter gravure"
      style={{ opacity }}
    >
      <defs>
        <clipPath id="eg2-rooftop">
          <polygon points={`${rFL.x},${rFL.y} ${rFR.x},${rFR.y} ${rBR.x},${rBR.y} ${rBL.x},${rBL.y}`} />
        </clipPath>
        <clipPath id="eg2-side">
          <polygon points={sidePoints} />
        </clipPath>
        <clipPath id="eg2-inner">
          <rect x={fx1 + postW + 4} y={fy1} width={fx2 - fx1 - (postW + 4) * 2} height={fy3 - fy1} />
        </clipPath>
        <clipPath id="eg2-green">
          <polygon points={greenSide} />
        </clipPath>
      </defs>

      {/* ════════════════════════════════════════════════════════
          1. LINKERZIJWAND (meest prominent in dit perspectief)
      ════════════════════════════════════════════════════════ */}
      <polygon points={sidePoints} fill="white" fillOpacity={0.04} stroke={c} strokeWidth={sw} />
      {/* Verticale planken */}
      <g clipPath="url(#eg2-side)">
        {Array.from({ length: 11 }, (_, i) => {
          const t  = (i + 1) / 12;
          const x  = fx1 + dx * t;
          const y0 = fy1 + dy * t;
          const y1b = fy3 + dy * t;
          return <line key={i} x1={x} y1={y0} x2={x} y2={y1b} stroke={c} strokeWidth={swH * 1.1} />;
        })}
        {/* Lichte diagonale hatching voor diepteschaduw */}
        {Array.from({ length: 22 }, (_, i) => {
          const step = 6;
          const ofs  = i * step - 20;
          const x1a  = fx1 + ofs;
          const x2a  = fx1 + ofs + (fy3 - fy1);
          const inX1 = Math.max(x1a, fx1 + dx);
          const inX2 = Math.min(x2a, fx1);
          if (inX1 >= inX2) return null;
          return (
            <line key={i}
              x1={inX1} y1={inX1 < x1a ? fy1 + (x1a - inX1) : fy1}
              x2={inX2} y2={inX2 > x2a ? fy3 - (inX2 - x2a) : fy3}
              stroke={c} strokeWidth={swH * 0.55}
            />
          );
        })}
      </g>

      {/* Groen accentpaneel — achterste deel van zijwand */}
      <polygon points={greenSide} fill="white" fillOpacity={0.03} stroke={c} strokeWidth={sw * 0.7} />
      <g clipPath="url(#eg2-green)">
        {Array.from({ length: 12 }, (_, i) => {
          const t  = gT + (i + 0.5) / 12 * (1 - gT);
          const x  = fx1 + dx * t;
          const y0 = fy1 + dy * t;
          const y1b = fy3 + dy * t;
          return <line key={i} x1={x} y1={y0} x2={x} y2={y1b} stroke={c} strokeWidth={swH * 2.2} />;
        })}
      </g>

      {/* ════════════════════════════════════════════════════════
          2. BINNENWAND — zichtbaar door open voorkant
      ════════════════════════════════════════════════════════ */}
      <polygon
        points={`${bx1},${by1} ${bx2},${by1} ${bx2},${by3} ${bx1},${by3}`}
        fill="white" fillOpacity={0.05}
        stroke={c} strokeWidth={swH}
      />
      {/* Planken */}
      <g clipPath="url(#eg2-inner)">
        {Array.from({ length: 14 }, (_, i) => {
          const x = bx1 + 6 + (i + 1) * ((bx2 - bx1 - 12) / 15);
          return <line key={i} x1={x} y1={by1} x2={x} y2={by3} stroke={c} strokeWidth={swH} />;
        })}
        {/* Schaduw binnenwand: diagonaal */}
        {Array.from({ length: 18 }, (_, i) => {
          const x = bx1 + i * 8 - 20;
          const h = by3 - by1;
          return <line key={i} x1={Math.max(x, bx1)} y1={x < bx1 ? by1 + (bx1 - x) : by1}
            x2={Math.min(x + h, bx2)} y2={x + h > bx2 ? by3 - (x + h - bx2) : by3}
            stroke={c} strokeWidth={swH * 0.5} />;
        })}
      </g>
      {/* EMERGO label gegraveerd */}
      <text x={bx1 + (bx2 - bx1) / 2 - 18} y={by1 + 17}
        fontSize="6.5" letterSpacing="2.5" fill={c} opacity={0.5}
        fontFamily="var(--font-sans), system-ui, sans-serif">EMERGO</text>

      {/* ════════════════════════════════════════════════════════
          3. DAKBLAD BOVENVLAK
      ════════════════════════════════════════════════════════ */}
      <polygon
        points={`${rFL.x},${rFL.y} ${rFR.x},${rFR.y} ${rBR.x},${rBR.y} ${rBL.x},${rBL.y}`}
        fill="white" fillOpacity={0.05}
      />
      <g clipPath="url(#eg2-rooftop)">
        {Array.from({ length: 38 }, (_, i) => {
          const step = 5;
          const s = i * step - 60;
          const H = rFL.y - rBL.y;
          return (
            <line key={i}
              x1={rFL.x + s}          y1={rFL.y}
              x2={rFL.x + s + H * 1.2} y2={rBL.y - 5}
              stroke={c} strokeWidth={swH}
            />
          );
        })}
      </g>
      <polygon
        points={`${rFL.x},${rFL.y} ${rFR.x},${rFR.y} ${rBR.x},${rBR.y} ${rBL.x},${rBL.y}`}
        stroke={c} strokeWidth={sw * 1.1} fill="none"
      />

      {/* ════════════════════════════════════════════════════════
          4. DAKBLAD VOORKANT (dikke lip — meest zichtbaar)
      ════════════════════════════════════════════════════════ */}
      <polygon
        points={`${rFL.x},${rFL.y} ${rFR.x},${rFR.y} ${rFR.x},${fy1} ${rFL.x},${fy1}`}
        fill="white" stroke={c} strokeWidth={sw}
      />
      <line x1={rFL.x + 3} y1={rFL.y + 4} x2={rFR.x - 3} y2={rFL.y + 4}
        stroke={c} strokeWidth={swH} />
      <line x1={rFL.x + 3} y1={rFL.y + 8} x2={rFR.x - 3} y2={rFL.y + 8}
        stroke={c} strokeWidth={swH * 0.6} />

      {/* Dakblad linkerzijde (verbindt voorkant met achterkant, perspectief) */}
      <polygon
        points={`${rFL.x},${rFL.y} ${rBL.x},${rBL.y} ${rBL.x},${rBL.y + rH} ${rFL.x},${rFL.y + rH}`}
        fill="white" fillOpacity={0.04} stroke={c} strokeWidth={sw}
      />
      {/* Hatching dakzijkant */}
      {Array.from({ length: 7 }, (_, i) => {
        const t = (i + 0.5) / 8;
        const x = rFL.x + (rBL.x - rFL.x) * t;
        const y = rFL.y + (rBL.y - rFL.y) * t;
        return <line key={i} x1={x} y1={y} x2={x} y2={y + rH} stroke={c} strokeWidth={swH} />;
      })}

      {/* ════════════════════════════════════════════════════════
          5. HOEKBALKEN / PALEN
      ════════════════════════════════════════════════════════ */}
      {/* Linkerpaal */}
      <rect x={fx1 + 2} y={fy1} width={postW} height={fy3 - fy1}
        fill="white" stroke={c} strokeWidth={sw} />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={fx1 + 3} y1={fy1 + 10 + i * 18}
          x2={fx1 + postW} y2={fy1 + 10 + i * 18}
          stroke={c} strokeWidth={swH * 0.7} />
      ))}

      {/* Rechterpaal */}
      <rect x={fx2 - postW - 2} y={fy1} width={postW} height={fy3 - fy1}
        fill="white" stroke={c} strokeWidth={sw} />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={fx2 - postW} y1={fy1 + 10 + i * 18}
          x2={fx2 - 3} y2={fy1 + 10 + i * 18}
          stroke={c} strokeWidth={swH * 0.7} />
      ))}

      {/* ════════════════════════════════════════════════════════
          6. TERRASPLATFORM
      ════════════════════════════════════════════════════════ */}
      {/* Voorzijde */}
      <rect x={fx1 - platOv} y={fy3} width={fW + platOv * 2} height={platH}
        fill="white" stroke={c} strokeWidth={sw} />
      {/* Nerf op platform */}
      {[0.3, 0.6].map((t) => (
        <line key={t}
          x1={fx1 - platOv + 4} y1={fy3 + platH * t}
          x2={fx2 + platOv - 4} y2={fy3 + platH * t}
          stroke={c} strokeWidth={swH * 0.6} />
      ))}
      {/* Linkerzijkant platform (perspectief) */}
      <polygon
        points={`
          ${fx1 - platOv},${fy3}
          ${fx1 - platOv + dx * 0.5},${fy3 + dy * 0.5}
          ${fx1 - platOv + dx * 0.5},${fy3 + platH + dy * 0.5}
          ${fx1 - platOv},${fy3 + platH}
        `}
        fill="white" fillOpacity={0.04} stroke={c} strokeWidth={sw}
      />
      {/* Hatching platformzijkant */}
      {Array.from({ length: 6 }, (_, i) => {
        const t = (i + 0.5) / 7;
        const x = fx1 - platOv + dx * 0.5 * t;
        const y = fy3 + dy * 0.5 * t;
        return <line key={i} x1={x} y1={y} x2={x} y2={y + platH} stroke={c} strokeWidth={swH} />;
      })}

      {/* ════════════════════════════════════════════════════════
          7. POOTJES
      ════════════════════════════════════════════════════════ */}
      {[
        fx1 - platOv + 8,
        fx1 - platOv + 22,
        fx2 + platOv - 22,
        fx2 + platOv - 36,
      ].map((x, i) => (
        <rect key={i} x={x} y={fy3 + platH} width={10} height={9}
          fill="white" stroke={c} strokeWidth={sw * 0.8} />
      ))}

      {/* ════════════════════════════════════════════════════════
          8. KUSSEN / MATRAS
      ════════════════════════════════════════════════════════ */}
      <rect x={fx1 + postW + 20} y={fy3 - 4} width={95} height={10} rx={2.5}
        fill="white" stroke={c} strokeWidth={swH * 1.3} />
      {[0.33, 0.66].map((t) => (
        <line key={t}
          x1={fx1 + postW + 20 + t * 95} y1={fy3 - 4}
          x2={fx1 + postW + 20 + t * 95} y2={fy3 + 6}
          stroke={c} strokeWidth={swH * 0.8} />
      ))}

      {/* ════════════════════════════════════════════════════════
          9. GRONDLIJN + SLAGSCHADUW
      ════════════════════════════════════════════════════════ */}
      <line
        x1={fx1 + dx * 0.5 - 10} y1={fy3 + platH + 9}
        x2={fx2 + platOv + 10}   y2={fy3 + platH + 9}
        stroke={c} strokeWidth={sw}
      />
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={i}
          x1={fx1 + dx * 0.5 - 8 + i * 5} y1={fy3 + platH + 9 + i * 1.6}
          x2={fx2 + platOv + 6 - i * 5}    y2={fy3 + platH + 9 + i * 1.6}
          stroke={c} strokeWidth={swH * (1.1 - i * 0.15)} opacity={1 - i * 0.15}
        />
      ))}
    </svg>
  );
}
