import { useState } from "react";
import { C, px, SPIN_REWARDS } from "../data/constants";

export default function SpinWheel({ coins, onSpin, onClose }) {
  const [spinning, setSpinning] = useState(false);
  const [result,   setResult]   = useState(null);
  const [angle,    setAngle]    = useState(0);

  const doSpin = () => {
    if (spinning || coins < 5) return;
    setSpinning(true);
    setResult(null);
    const idx = Math.floor(Math.random() * SPIN_REWARDS.length);
    const sa = 360 / SPIN_REWARDS.length;
    const spins = (5 + Math.floor(Math.random() * 3)) * 360;
    // aim so the CENTER of the winning segment lands under the pointer
    const target = angle + spins + (SPIN_REWARDS.length - idx) * sa - sa / 2;
    setAngle(target);
    setTimeout(() => {
      setSpinning(false);
      setResult(SPIN_REWARDS[idx]);
      onSpin(SPIN_REWARDS[idx]);
    }, 3000);
  };

  const sa = 360 / SPIN_REWARDS.length;
  const cols = ["#f5e8dc","#e4d5c3","#d4bfa8","#f0e0d0","#e8d4c0","#dcc8b0","#f5e0cc","#ead0b8"];

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
    }}>
      <div style={{
        background:C.bg, borderRadius:20, padding:24,
        maxWidth:340, width:"90%", ...px, textAlign:"center"
      }}>
        <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.text, marginBottom:4 }}>
          Spin the Wheel!
        </div>
        <div style={{ fontSize:"0.7rem", color:C.muted, marginBottom:16 }}>Costs 5 coins</div>

        <div style={{ position:"relative", width:220, height:220, margin:"0 auto 16px" }}>
          <svg
            viewBox="0 0 220 220" width="220" height="220"
            style={{
              transform:`rotate(${angle}deg)`,
              transition: spinning ? "transform 3s cubic-bezier(0.17,0.67,0.12,0.99)" : "none"
            }}
          >
            {SPIN_REWARDS.map((r, i) => {
              const a1 = (i * sa - 90) * Math.PI / 180;
              const a2 = ((i + 1) * sa - 90) * Math.PI / 180;
              const x1 = 110 + 100 * Math.cos(a1), y1 = 110 + 100 * Math.sin(a1);
              const x2 = 110 + 100 * Math.cos(a2), y2 = 110 + 100 * Math.sin(a2);
              const mx = 110 + 65 * Math.cos((a1 + a2) / 2);
              const my = 110 + 65 * Math.sin((a1 + a2) / 2);
              return (
                <g key={i}>
                  <path
                    d={`M 110 110 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={cols[i]} stroke={C.surface2} strokeWidth="1"
                  />
                  <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" fontSize="18">
                    {r.emoji}
                  </text>
                </g>
              );
            })}
            <circle cx="110" cy="110" r="18" fill={C.primary} stroke={C.surface2} strokeWidth="2" />
          </svg>
          <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", fontSize:20 }}>▼</div>
        </div>

        {result && (
          <div style={{
            background:C.surface, borderRadius:12, padding:"10px 16px",
            marginBottom:12, border:`2px solid ${result.color}`
          }}>
            <div style={{ fontSize:"1.5rem" }}>{result.emoji}</div>
            <div style={{ fontSize:"0.82rem", fontWeight:700, color:C.text }}>{result.label}</div>
          </div>
        )}

        <div style={{ display:"flex", gap:8 }}>
          <button
            onClick={doSpin} disabled={spinning || coins < 5}
            style={{
              flex:1, padding:"9px 0", borderRadius:10, border:"none",
              background: coins >= 5 && !spinning ? C.primary : C.surface2,
              color: coins >= 5 && !spinning ? "#fff" : C.muted,
              fontFamily:"inherit", fontSize:"0.8rem", fontWeight:700,
              cursor: coins >= 5 && !spinning ? "pointer" : "default"
            }}
          >
            {spinning ? "Spinning..." : "Spin! (5 coins)"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex:1, padding:"9px 0", borderRadius:10,
              border:`2px solid ${C.surface2}`, background:C.surface,
              color:C.text, fontFamily:"inherit", fontSize:"0.8rem",
              fontWeight:700, cursor:"pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
