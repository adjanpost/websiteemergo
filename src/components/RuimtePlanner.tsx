"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Model = {
  collectie: string;
  naam: string;
  breedte: number; // cm
  diepte: number;  // cm
};

type PlacedKennel = {
  id: string;
  model: Model;
  x: number;
  y: number;
  rotated: boolean;
};

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

const COLLECTIES = ["Classic", "Heritage", "Urban", "Estate"] as const;
const CANVAS_W   = 680;
const TOOLBAR_H  = 48;

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
  flex: 1,
  padding: "0.65rem 0.8rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  fontWeight: 300,
  color: "#1a2e1a",
  background: "#fff",
  border: "0.5px solid #ddd8cf",
  outline: "none",
  borderRadius: 0,
  boxSizing: "border-box" as const,
};

export function RuimtePlanner() {
  const [tuinB, setTuinB] = useState(10);
  const [tuinD, setTuinD] = useState(8);
  const [kennels, setKennels] = useState<PlacedKennel[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const scale   = CANVAS_W / tuinB;
  const canvasH = Math.round(tuinD * scale);

  // Overlap detection
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

  const addKennel = (model: Model) => {
    const { w, h } = px(model, false, scale);
    const id = `${model.collectie}-${model.naam}-${Date.now()}`;
    setKennels(prev => [
      ...prev,
      { id, model, x: Math.max(0, (CANVAS_W - w) / 2), y: Math.max(0, (canvasH - h) / 2), rotated: false },
    ]);
    setSelected(id);
  };

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

  const deleteKennel = (id: string) => {
    setKennels(prev => prev.filter(k => k.id !== id));
    if (selected === id) setSelected(null);
  };

  const selectedKennel = kennels.find(k => k.id === selected);

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>

      {/* ── Tuin inputs ── */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 120px" }}>
          <label style={labelSt} htmlFor="rp-b">Tuinbreedte</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input id="rp-b" type="number" min={3} max={50} value={tuinB}
              onChange={e => handleTuinChange("b", Number(e.target.value))}
              style={inputSt}
            />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "rgba(26,46,26,0.38)", flexShrink: 0 }}>m</span>
          </div>
        </div>
        <div style={{ flex: "1 1 120px" }}>
          <label style={labelSt} htmlFor="rp-d">Tuindiepte</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input id="rp-d" type="number" min={3} max={50} value={tuinD}
              onChange={e => handleTuinChange("d", Number(e.target.value))}
              style={inputSt}
            />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "rgba(26,46,26,0.38)", flexShrink: 0 }}>m</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, paddingBottom: "0.05rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.57rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(26,46,26,0.35)", marginBottom: "0.25rem" }}>
            Oppervlakte
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, color: "#1a2e1a", lineHeight: 1 }}>
            {(tuinB * tuinD).toFixed(0)} m²
          </p>
        </div>
      </div>

      {/* ── Hoofd layout ── */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 190, flexShrink: 0, maxHeight: canvasH + TOOLBAR_H, overflowY: "auto" }}>
          {COLLECTIES.map(collectie => {
            const models = MODELLEN.filter(m => m.collectie === collectie);
            return (
              <div key={collectie} style={{ marginBottom: "1.25rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  paddingBottom: "0.4rem",
                  borderBottom: "0.5px solid #ddd8cf",
                }}>
                  <div style={{ width: 14, height: 1, background: "#c4956a", flexShrink: 0 }} />
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.57rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#c4956a",
                    margin: 0,
                  }}>
                    {collectie}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {models.map(m => (
                    <div
                      key={`${m.collectie}-${m.naam}`}
                      style={{
                        background: "#fff",
                        border: "0.5px solid #ddd8cf",
                        padding: "0.7rem 0.8rem",
                      }}
                    >
                      <p style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1rem",
                        fontWeight: 300,
                        color: "#1a2e1a",
                        margin: "0 0 0.15rem",
                        lineHeight: 1.1,
                      }}>
                        {m.collectie} {m.naam}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        color: "rgba(26,46,26,0.38)",
                        margin: "0 0 0.5rem",
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
                          padding: "0.35rem",
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
            );
          })}
        </div>

        {/* ── Canvas gebied ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{
            background: "#1a2e1a",
            padding: "0 1rem",
            height: TOOLBAR_H,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.57rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              flexShrink: 0,
            }}>
              {kennels.length === 0
                ? "Geen kennels"
                : `${kennels.length} kennel${kennels.length !== 1 ? "s" : ""}`}
            </span>

            {selectedKennel && (
              <>
                <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.57rem",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.42)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {selectedKennel.model.collectie} {selectedKennel.model.naam}
                  &nbsp;—&nbsp;
                  {selectedKennel.model.breedte} × {selectedKennel.model.diepte} cm
                </span>
              </>
            )}

            <div style={{ flex: 1 }} />

            {kennels.length > 0 && (
              <button
                onClick={() => { setKennels([]); setSelected(null); }}
                style={{
                  background: "transparent",
                  border: "0.5px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.35rem 0.9rem",
                  cursor: "pointer",
                  borderRadius: 0,
                  flexShrink: 0,
                }}
              >
                Wis alles
              </button>
            )}

            <Link
              href="/contact"
              style={{
                background: "#c4956a",
                color: "#1a2e1a",
                fontFamily: "var(--font-sans)",
                fontSize: "0.57rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                textDecoration: "none",
                display: "inline-block",
                flexShrink: 0,
                fontWeight: 400,
              }}
            >
              Offerte →
            </Link>
          </div>

          {/* Canvas */}
          <div style={{ overflowX: "auto" }}>
            <div
              ref={canvasRef}
              style={{
                position: "relative",
                width: CANVAS_W,
                height: canvasH,
                background: "#1c3018",
                overflow: "hidden",
                userSelect: "none",
                flexShrink: 0,
              }}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onClick={e => { if (e.target === canvasRef.current) setSelected(null); }}
            >
              {/* Grid */}
              {Array.from({ length: Math.ceil(tuinB) - 1 }, (_, i) => (
                <div key={`v${i}`} style={{
                  position: "absolute",
                  left: (i + 1) * scale,
                  top: 0,
                  width: 1,
                  height: canvasH,
                  background: "rgba(255,255,255,0.07)",
                  pointerEvents: "none",
                }} />
              ))}
              {Array.from({ length: Math.ceil(tuinD) - 1 }, (_, i) => (
                <div key={`h${i}`} style={{
                  position: "absolute",
                  left: 0,
                  top: (i + 1) * scale,
                  width: CANVAS_W,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  pointerEvents: "none",
                }} />
              ))}

              {/* Lege staat */}
              {kennels.length === 0 && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  gap: "0.75rem",
                }}>
                  <div style={{ width: 24, height: 1, background: "rgba(196,149,106,0.3)" }} />
                  <p style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.1)",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}>
                    Voeg een model toe
                    <br />
                    <em>via het menu links</em>
                  </p>
                  <div style={{ width: 24, height: 1, background: "rgba(196,149,106,0.3)" }} />
                </div>
              )}

              {/* Kennels */}
              {kennels.map(k => {
                const { w, h } = px(k.model, k.rotated, scale);
                const isSel  = selected === k.id;
                const isOver = overlappingIds.has(k.id);
                const fs     = Math.max(7, Math.min(11, Math.min(w, h) / 3.5));
                const btnSz  = Math.max(16, fs + 6);

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
                      background: isSel
                        ? "rgba(248,245,240,1)"
                        : "rgba(248,245,240,0.87)",
                      border: `${isSel ? "2px" : "1px"} solid ${isOver ? "#e53e3e" : "#c4956a"}`,
                      boxShadow: isSel
                        ? "0 0 0 3px rgba(196,149,106,0.22), 0 6px 20px rgba(0,0,0,0.45)"
                        : "0 2px 10px rgba(0,0,0,0.3)",
                      boxSizing: "border-box",
                      cursor: "grab",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      overflow: "hidden",
                      zIndex: isSel ? 10 : 1,
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <span style={{
                      color: "#1a2e1a",
                      fontSize: fs,
                      fontFamily: "var(--font-serif)",
                      textAlign: "center",
                      lineHeight: 1.25,
                      userSelect: "none",
                      pointerEvents: "none",
                      padding: 2,
                      fontWeight: 300,
                    }}>
                      {k.model.collectie}
                      <br />
                      {k.model.naam}
                    </span>

                    {isSel && (
                      <div style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        display: "flex",
                        gap: 1,
                        zIndex: 20,
                      }}>
                        <button
                          title="Roteer 90°"
                          onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); rotateKennel(k.id); }}
                          style={{
                            width: btnSz,
                            height: btnSz,
                            background: "#1a2e1a",
                            color: "rgba(255,255,255,0.85)",
                            border: "none",
                            fontSize: fs,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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

              {/* Schaalregel */}
              <div style={{
                position: "absolute",
                bottom: 12,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 5,
                pointerEvents: "none",
              }}>
                <div style={{ width: scale, height: 2, background: "rgba(255,255,255,0.28)" }} />
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.28)",
                  userSelect: "none",
                }}>
                  1 m
                </span>
              </div>

              {/* Noord-indicator */}
              <div style={{
                position: "absolute",
                top: 12,
                right: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                pointerEvents: "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.18)",
                  userSelect: "none",
                }}>
                  N
                </span>
                <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.14)" }} />
              </div>
            </div>
          </div>

          {/* Hint */}
          <p style={{
            marginTop: "0.6rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.58rem",
            color: "rgba(26,46,26,0.28)",
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
