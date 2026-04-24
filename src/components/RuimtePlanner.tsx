"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────
type Model = {
  collectie: string;
  naam: string;
  breedte: number; // cm
  diepte: number;  // cm
};

type PlacedKennel = {
  id: string;
  model: Model;
  x: number; // px
  y: number; // px
  rotated: boolean;
};

// ── Data ───────────────────────────────────────────────────────────
const MODELLEN: Model[] = [
  { collectie: "Classic",  naam: "S",  breedte: 80,  diepte: 60  },
  { collectie: "Classic",  naam: "M",  breedte: 100, diepte: 80  },
  { collectie: "Classic",  naam: "L",  breedte: 120, diepte: 100 },
  { collectie: "Heritage", naam: "M",  breedte: 110, diepte: 90  },
  { collectie: "Heritage", naam: "L",  breedte: 140, diepte: 110 },
  { collectie: "Urban",    naam: "M",  breedte: 100, diepte: 80  },
  { collectie: "Urban",    naam: "L",  breedte: 130, diepte: 100 },
  { collectie: "Estate",   naam: "M",  breedte: 150, diepte: 120 },
  { collectie: "Estate",   naam: "L",  breedte: 180, diepte: 150 },
  { collectie: "Estate",   naam: "XL", breedte: 220, diepte: 180 },
];

const CANVAS_W = 680;

// ── Helpers ────────────────────────────────────────────────────────
function px(model: Model, rotated: boolean, scale: number) {
  const w = ((rotated ? model.diepte : model.breedte) / 100) * scale;
  const h = ((rotated ? model.breedte : model.diepte) / 100) * scale;
  return { w, h };
}

function overlaps(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// ── Shared styles ──────────────────────────────────────────────────
const labelSt: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.62rem",
  fontWeight: 400,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(26,46,26,0.55)",
  marginBottom: "0.4rem",
};

const inputSt: React.CSSProperties = {
  padding: "0.6rem 0.75rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  fontWeight: 300,
  color: "#1a2e1a",
  background: "#fff",
  border: "0.5px solid #ddd8cf",
  outline: "none",
  borderRadius: 0,
  width: "100%",
  boxSizing: "border-box" as const,
};

const btnSt: React.CSSProperties = {
  background: "transparent",
  border: "0.5px solid #ddd8cf",
  color: "rgba(26,46,26,0.6)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  padding: "0.45rem 0.9rem",
  cursor: "pointer",
  borderRadius: 0,
};

// ── Component ──────────────────────────────────────────────────────
export function RuimtePlanner() {
  const [tuinB, setTuinB] = useState(10);
  const [tuinD, setTuinD] = useState(8);
  const [kennels, setKennels] = useState<PlacedKennel[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const scale   = CANVAS_W / tuinB;
  const canvasH = Math.round(tuinD * scale);

  // ── Overlap detection ──────────────────────────────────────────
  const overlappingIds = new Set<string>();
  for (let i = 0; i < kennels.length; i++) {
    for (let j = i + 1; j < kennels.length; j++) {
      const a = kennels[i], b = kennels[j];
      const sa = px(a.model, a.rotated, scale);
      const sb = px(b.model, b.rotated, scale);
      if (overlaps(a.x, a.y, sa.w, sa.h, b.x, b.y, sb.w, sb.h)) {
        overlappingIds.add(a.id);
        overlappingIds.add(b.id);
      }
    }
  }

  // ── Garden resize (proportional reposition) ────────────────────
  const handleTuinChange = (axis: "b" | "d", raw: number) => {
    const val = Math.max(3, Math.min(50, raw || 3));
    const newB = axis === "b" ? val : tuinB;
    const newD = axis === "d" ? val : tuinD;
    const oldScale = CANVAS_W / tuinB;
    const newScale = CANVAS_W / newB;
    const oldH     = tuinD * oldScale;
    const newH     = newD * newScale;
    setKennels(prev =>
      prev.map(k => {
        const { w, h } = px(k.model, k.rotated, newScale);
        return {
          ...k,
          x: Math.max(0, Math.min(k.x * (newScale / oldScale), CANVAS_W - w)),
          y: Math.max(0, Math.min(k.y * (newH / oldH), Math.round(newH) - h)),
        };
      })
    );
    if (axis === "b") setTuinB(val);
    else setTuinD(val);
  };

  // ── Add kennel (centered) ──────────────────────────────────────
  const addKennel = (model: Model) => {
    const { w, h } = px(model, false, scale);
    const id = `${model.collectie}-${model.naam}-${Date.now()}`;
    setKennels(prev => [
      ...prev,
      { id, model, x: Math.max(0, (CANVAS_W - w) / 2), y: Math.max(0, (canvasH - h) / 2), rotated: false },
    ]);
    setSelected(id);
  };

  // ── Drag ──────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(id);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const k = kennels.find(k => k.id === id);
    if (!k) return;
    drag.current = { id, ox: e.clientX - rect.left - k.x, oy: e.clientY - rect.top - k.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = drag.current;
    if (!d) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setKennels(prev =>
      prev.map(k => {
        if (k.id !== d.id) return k;
        const { w, h } = px(k.model, k.rotated, scale);
        return {
          ...k,
          x: Math.max(0, Math.min(e.clientX - rect.left - d.ox, CANVAS_W - w)),
          y: Math.max(0, Math.min(e.clientY - rect.top - d.oy, canvasH - h)),
        };
      })
    );
  };

  const stopDrag = () => { drag.current = null; };

  // ── Rotate ────────────────────────────────────────────────────
  const rotateKennel = (id: string) => {
    setKennels(prev =>
      prev.map(k => {
        if (k.id !== id) return k;
        const rotated = !k.rotated;
        const { w, h } = px(k.model, rotated, scale);
        return {
          ...k, rotated,
          x: Math.min(k.x, Math.max(0, CANVAS_W - w)),
          y: Math.min(k.y, Math.max(0, canvasH - h)),
        };
      })
    );
  };

  // ── Delete ────────────────────────────────────────────────────
  const deleteKennel = (id: string) => {
    setKennels(prev => prev.filter(k => k.id !== id));
    if (selected === id) setSelected(null);
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>

      {/* Garden size inputs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 110px" }}>
          <label style={labelSt} htmlFor="rp-b">Tuinbreedte (m)</label>
          <input
            id="rp-b"
            type="number"
            min={3}
            max={50}
            value={tuinB}
            onChange={e => handleTuinChange("b", Number(e.target.value))}
            style={inputSt}
          />
        </div>
        <div style={{ flex: "1 1 110px" }}>
          <label style={labelSt} htmlFor="rp-d">Tuindiepte (m)</label>
          <input
            id="rp-d"
            type="number"
            min={3}
            max={50}
            value={tuinD}
            onChange={e => handleTuinChange("d", Number(e.target.value))}
            style={inputSt}
          />
        </div>
      </div>

      {/* Main layout: sidebar + canvas */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* ── Sidebar: model list ────────────────────────────── */}
        <div
          style={{
            width: 190,
            flexShrink: 0,
            maxHeight: canvasH + 40,
            overflowY: "auto",
          }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(26,46,26,0.4)",
            marginBottom: "0.6rem",
            paddingBottom: "0.5rem",
            borderBottom: "0.5px solid #ddd8cf",
          }}>
            Modellen
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {MODELLEN.map(m => (
              <div
                key={`${m.collectie}-${m.naam}`}
                style={{
                  background: "#fff",
                  border: "0.5px solid #ddd8cf",
                  padding: "0.6rem 0.7rem",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.53rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#c4956a",
                  margin: "0 0 0.15rem",
                }}>
                  {m.collectie}
                </p>
                <p style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: "#1a2e1a",
                  margin: "0 0 0.1rem",
                  lineHeight: 1.15,
                }}>
                  {m.collectie} {m.naam}
                </p>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.65rem",
                  color: "rgba(26,46,26,0.38)",
                  margin: "0 0 0.4rem",
                }}>
                  {m.breedte} × {m.diepte} cm
                </p>
                <button
                  onClick={() => addKennel(m)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "0.5px solid #c4956a",
                    color: "#c4956a",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.4rem",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  Plaatsen +
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Canvas area ────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "0.6rem",
            flexWrap: "wrap",
          }}>
            <button
              style={btnSt}
              onClick={() => { setKennels([]); setSelected(null); }}
            >
              Wis alles
            </button>
            <span style={{
              flex: 1,
              fontFamily: "var(--font-sans)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(26,46,26,0.38)",
            }}>
              {kennels.length} kennel{kennels.length !== 1 ? "s" : ""} geplaatst
            </span>
            <Link
              href="/contact"
              style={{
                background: "#c4956a",
                color: "#1a2e1a",
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "0.45rem 1.1rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Offerte aanvragen →
            </Link>
          </div>

          {/* Canvas wrapper (horizontal scroll on small screens) */}
          <div style={{ overflowX: "auto" }}>
            <div
              ref={canvasRef}
              style={{
                position: "relative",
                width: CANVAS_W,
                height: canvasH,
                background: "#e8f0e0",
                border: "1px solid #c4d8a0",
                overflow: "visible",
                userSelect: "none",
                flexShrink: 0,
              }}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onClick={e => { if (e.target === canvasRef.current) setSelected(null); }}
            >
              {/* Vertical grid lines */}
              {Array.from({ length: Math.ceil(tuinB) - 1 }, (_, i) => (
                <div
                  key={`v${i}`}
                  style={{
                    position: "absolute",
                    left: (i + 1) * scale,
                    top: 0,
                    width: 1,
                    height: canvasH,
                    background: "rgba(0,0,0,0.06)",
                    pointerEvents: "none",
                  }}
                />
              ))}
              {/* Horizontal grid lines */}
              {Array.from({ length: Math.ceil(tuinD) - 1 }, (_, i) => (
                <div
                  key={`h${i}`}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: (i + 1) * scale,
                    width: CANVAS_W,
                    height: 1,
                    background: "rgba(0,0,0,0.06)",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Placed kennels */}
              {kennels.map(k => {
                const { w, h } = px(k.model, k.rotated, scale);
                const isSel  = selected === k.id;
                const isOver = overlappingIds.has(k.id);
                const fs     = Math.max(7, Math.min(12, w / 5));
                const btnSz  = Math.max(14, fs + 5);

                return (
                  <div
                    key={k.id}
                    onMouseDown={e => onMouseDown(e, k.id)}
                    style={{
                      position: "absolute",
                      left: k.x,
                      top: k.y,
                      width: w,
                      height: h,
                      background: "#2d4a2d",
                      border: `${isSel ? "2px" : "1.5px"} solid ${isOver ? "#e53e3e" : "#c4956a"}`,
                      boxSizing: "border-box",
                      cursor: "grab",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      overflow: "hidden",
                      zIndex: isSel ? 10 : 1,
                    }}
                  >
                    {/* Label */}
                    <span
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: fs,
                        fontFamily: "var(--font-serif)",
                        textAlign: "center",
                        lineHeight: 1.3,
                        userSelect: "none",
                        pointerEvents: "none",
                        padding: 2,
                      }}
                    >
                      {k.model.collectie}
                      <br />
                      {k.model.naam}
                    </span>

                    {/* Selection controls */}
                    {isSel && (
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          display: "flex",
                          gap: 2,
                          zIndex: 20,
                        }}
                      >
                        <button
                          title="Roteer 90°"
                          onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); rotateKennel(k.id); }}
                          style={{
                            width: btnSz,
                            height: btnSz,
                            background: "#c4956a",
                            color: "#fff",
                            border: "none",
                            fontSize: fs,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            borderRadius: 0,
                          }}
                        >
                          ↻
                        </button>
                        <button
                          title="Verwijder"
                          onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); deleteKennel(k.id); }}
                          style={{
                            width: btnSz,
                            height: btnSz,
                            background: "#b91c1c",
                            color: "#fff",
                            border: "none",
                            fontSize: fs,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            borderRadius: 0,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Scale bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  pointerEvents: "none",
                }}
              >
                <div style={{ width: scale, height: 2, background: "rgba(0,0,0,0.25)" }} />
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  color: "rgba(0,0,0,0.35)",
                  userSelect: "none",
                }}>
                  1 m
                </span>
              </div>
            </div>
          </div>

          {/* Hint */}
          <p style={{
            marginTop: "0.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            color: "rgba(26,46,26,0.3)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Sleep om te verplaatsen &nbsp;·&nbsp; klik om te selecteren &nbsp;·&nbsp;
            ↻ roteren &nbsp;·&nbsp; × verwijderen
          </p>
        </div>
      </div>
    </div>
  );
}
