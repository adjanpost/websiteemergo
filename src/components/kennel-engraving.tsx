export function KennelEngraving({
  className = "",
  color = "currentColor",
  opacity = 1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const c = color;
  const sw = 1.0;   // hoofd lijndikte
  const sh = 0.42;  // arcering

  // ── Voorwand ────────────────────────────────────────
  const bx1 = 102, bx2 = 290, by1 = 150, by2 = 244;
  const bW = bx2 - bx1;  // 188
  const bH = by2 - by1;  // 94

  // ── Perspectief (rechterzijde zichtbaar) ────────────
  const dx = 66, dy = -38;

  // ── Puntdak ─────────────────────────────────────────
  const apx = 196, apy = 72;           // daknoknok
  const eL = 78,   eR = 312;           // dakoverstek links/rechts
  const eY = by1;                       // dakvoet = bovenkant wand
  const lipH = 11;                      // dak-lip dikte

  // Achterste dakpunten (perspectief)
  const apBx = apx + dx, apBy = apy + dy;    // achterste nok = (262, 34)
  const eBRx = eR + dx,  eBRy = eY + dy;     // achterste overstek rechts = (378, 112)

  // ── Ingang (boog = rechthoek + halve cirkel) ────────
  const ecx = 192, eaR = 32;                 // middelpunt x, straal
  const eaTotal = 70;                        // totale hoogte ingang
  const eaL = ecx - eaR, eaRx = ecx + eaR;  // links=160, rechts=224
  const eaArchCy = by2 - eaTotal + eaR;      // middelpunt boog = 244-70+32 = 206

  // ── Helpers ─────────────────────────────────────────
  const pts = (arr: number[][]) => arr.map(p => p.join(",")).join(" ");

  return (
    <svg
      viewBox="0 0 400 268"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EMERGO kennel gravure"
      style={{ opacity }}
    >
      {/* ══ 1. RECHTERZIJWAND ══ */}
      <polygon
        points={pts([[bx2,by1],[bx2+dx,by1+dy],[bx2+dx,by2+dy],[bx2,by2]])}
        fill={c} fillOpacity={0.05} stroke={c} strokeWidth={sw}
      />
      {/* Horizontale planken op zijwand */}
      {[0.32, 0.65].map((t, i) => (
        <line key={i}
          x1={bx2}      y1={by1 + t * bH}
          x2={bx2 + dx} y2={by1 + t * bH + dy}
          stroke={c} strokeWidth={sh}
        />
      ))}
      {/* Verticale arceringen zijwand */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = (i + 1) / 10;
        return (
          <line key={i}
            x1={bx2 + dx * t} y1={by1 + dy * t}
            x2={bx2 + dx * t} y2={by2 + dy * t}
            stroke={c} strokeWidth={sh * 0.45}
          />
        );
      })}

      {/* ══ 2. RECHTER DAKVLAK (bovenzijde) ══ */}
      <polygon
        points={pts([[eR,eY],[eBRx,eBRy],[apBx,apBy],[apx,apy]])}
        fill={c} fillOpacity={0.07} stroke={c} strokeWidth={sw}
      />
      {/* Dagtextuur-arcering */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = (i + 1) / 10;
        const x1a = eR   + (apx   - eR)   * t;
        const y1a = eY   + (apy   - eY)   * t;
        const x2a = eBRx + (apBx  - eBRx) * t;
        const y2a = eBRy + (apBy  - eBRy) * t;
        return <line key={i} x1={x1a} y1={y1a} x2={x2a} y2={y2a} stroke={c} strokeWidth={sh * 0.45} />;
      })}

      {/* Daknok achterkant */}
      <line x1={apx} y1={apy} x2={apBx} y2={apBy} stroke={c} strokeWidth={sw * 1.4} />

      {/* ══ 3. VOORWAND ══ */}
      <rect
        x={bx1} y={by1} width={bW} height={bH}
        fill={c} fillOpacity={0.03} stroke={c} strokeWidth={sw}
      />
      {/* Horizontale planken op voorwand */}
      {[0.28, 0.54, 0.78].map((t, i) => (
        <line key={i}
          x1={bx1 + 3} y1={by1 + t * bH}
          x2={bx2 - 3} y2={by1 + t * bH}
          stroke={c} strokeWidth={sh * 0.9}
        />
      ))}

      {/* ══ 4. INGANGSBOOG ══ */}
      <path
        d={`M ${eaL} ${by2} L ${eaL} ${eaArchCy} A ${eaR} ${eaR} 0 0 1 ${eaRx} ${eaArchCy} L ${eaRx} ${by2}`}
        fill={c} fillOpacity={0.12}
        stroke={c} strokeWidth={sw * 1.15}
      />
      {/* Dieptearcering in ingang */}
      {Array.from({ length: 5 }, (_, i) => {
        const t = (i + 1) / 6;
        const iy = eaArchCy + (by2 - eaArchCy) * t;
        const iW = eaR * 2 * (1 - t * 0.25);
        return (
          <line key={i}
            x1={ecx - iW / 2} y1={iy}
            x2={ecx + iW / 2} y2={iy}
            stroke={c} strokeWidth={sh * 0.6} opacity={0.5 + t * 0.3}
          />
        );
      })}

      {/* ══ 5. LINKER DAKHELLING (frontale driehoek) ══ */}
      <polygon
        points={pts([[eL,eY],[apx,apy],[bx1,by1]])}
        fill={c} fillOpacity={0.03} stroke={c} strokeWidth={sw}
      />
      {/* Arceringen linker helling */}
      {Array.from({ length: 5 }, (_, i) => {
        const t = (i + 1) / 6;
        const sx = eL + (apx - eL) * t;
        const sy = eY + (apy - eY) * t;
        const ex2 = bx1 + (apx - bx1) * t;
        return <line key={i} x1={sx} y1={sy} x2={ex2} y2={by1} stroke={c} strokeWidth={sh * 0.45} />;
      })}

      {/* ══ 6. RECHTER DAKHELLING (frontale driehoek) ══ */}
      <polygon
        points={pts([[bx2,by1],[apx,apy],[eR,eY]])}
        fill={c} fillOpacity={0.025} stroke={c} strokeWidth={sw}
      />
      {Array.from({ length: 5 }, (_, i) => {
        const t = (i + 1) / 6;
        const sx = eR  + (apx - eR)  * t;
        const sy = eY  + (apy - eY)  * t;
        const ex2 = bx2 - (bx2 - apx) * t;
        return <line key={i} x1={sx} y1={sy} x2={ex2} y2={by1} stroke={c} strokeWidth={sh * 0.4} />;
      })}

      {/* ══ 7. DAK-LIP (voorkant) ══ */}
      <rect
        x={eL} y={eY} width={eR - eL} height={lipH}
        fill={c} fillOpacity={0.09} stroke={c} strokeWidth={sw}
      />
      {/* Dak-lip rechterzijde (perspectief) */}
      <polygon
        points={pts([[eR,eY],[eBRx,eBRy],[eBRx,eBRy+lipH],[eR,eY+lipH]])}
        fill={c} fillOpacity={0.05} stroke={c} strokeWidth={sw}
      />

      {/* ══ 8. NAAMPLAATJE BOVEN INGANG ══ */}
      <rect
        x={ecx - 26} y={eaArchCy - eaR - 20} width={52} height={13}
        fill={c} fillOpacity={0.07} stroke={c} strokeWidth={sh * 1.1}
      />
      <text
        x={ecx - 17} y={eaArchCy - eaR - 10}
        fontSize="5.5" letterSpacing="2"
        fill={c} opacity={0.45}
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        EMERGO
      </text>

      {/* ══ 9. POOTJES ══ */}
      {[bx1 + 10, bx1 + 24, bx2 - 26, bx2 - 12].map((x, i) => (
        <rect key={i}
          x={x} y={by2} width={12} height={9}
          fill={c} fillOpacity={0.07} stroke={c} strokeWidth={sw * 0.75}
        />
      ))}

      {/* ══ 10. GRONDLIJN + SLAGSCHADUW ══ */}
      <line
        x1={eL - 8} y1={by2 + 9}
        x2={bx2 + dx + 8} y2={by2 + 9}
        stroke={c} strokeWidth={sw}
      />
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={i}
          x1={eL - 5 + i * 5}       y1={by2 + 9 + i * 1.6}
          x2={bx2 + dx + 3 - i * 5} y2={by2 + 9 + i * 1.6}
          stroke={c} strokeWidth={sh * (1.1 - i * 0.15)} opacity={1 - i * 0.18}
        />
      ))}
    </svg>
  );
}
