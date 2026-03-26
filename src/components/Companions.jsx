import { useRef } from "react";

// ─── Tiny Frog ────────────────────────────────────────────────────────────────
function TinyFrog({ id }) {
  return (
    <>
      <style>{`
        @keyframes frogBob-${id} { 0%,100%{transform:translateY(0) scaleY(1)} 50%{transform:translateY(-4px) scaleY(0.95)} }
        @keyframes frogBlink-${id} { 0%,90%,100%{scaleY(1)} 95%{transform:scaleY(0.1)} }
        .frog-${id} { animation: frogBob-${id} 1.4s ease-in-out infinite; }
        .frog-eye-${id} { animation: frogBlink-${id} 3s ease-in-out infinite; }
      `}</style>
      <div className={`frog-${id}`} style={{ position:"relative", width:36, height:36 }}>
        {/* body */}
        <div style={{ position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)", width:28, height:20, background:"#4a9a4a", borderRadius:"50% 50% 40% 40%", border:"1.5px solid #2a6a2a" }}/>
        {/* eyes */}
        <div style={{ position:"absolute", top:4, left:4, width:10, height:10, background:"#4a9a4a", borderRadius:"50%", border:"1.5px solid #2a6a2a" }}>
          <div className={`frog-eye-${id}`} style={{ position:"absolute", top:2, left:2, width:5, height:5, background:"#1a1a1a", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", top:1, left:1, width:2, height:2, background:"#fff", borderRadius:"50%", opacity:0.7 }}/>
        </div>
        <div style={{ position:"absolute", top:4, right:4, width:10, height:10, background:"#4a9a4a", borderRadius:"50%", border:"1.5px solid #2a6a2a" }}>
          <div className={`frog-eye-${id}`} style={{ position:"absolute", top:2, left:2, width:5, height:5, background:"#1a1a1a", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", top:1, left:1, width:2, height:2, background:"#fff", borderRadius:"50%", opacity:0.7 }}/>
        </div>
        {/* mouth */}
        <div style={{ position:"absolute", bottom:7, left:"50%", transform:"translateX(-50%)", width:10, height:4, borderBottom:"2px solid #2a6a2a", borderRadius:"0 0 50% 50%" }}/>
        {/* legs */}
        <div style={{ position:"absolute", bottom:0, left:2, width:10, height:7, background:"#4a9a4a", borderRadius:"4px 4px 6px 6px", border:"1.5px solid #2a6a2a" }}/>
        <div style={{ position:"absolute", bottom:0, right:2, width:10, height:7, background:"#4a9a4a", borderRadius:"4px 4px 6px 6px", border:"1.5px solid #2a6a2a" }}/>
        {/* belly */}
        <div style={{ position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)", width:16, height:10, background:"#a0d0a0", borderRadius:"50%", opacity:0.7 }}/>
      </div>
    </>
  );
}

// ─── Mini Ghost ───────────────────────────────────────────────────────────────
function MiniGhost({ id }) {
  return (
    <>
      <style>{`
        @keyframes ghostFloat-${id} { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-6px) rotate(3deg)} }
        @keyframes ghostWobble-${id} { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(1.08)} }
        .ghost-${id} { animation: ghostFloat-${id} 2s ease-in-out infinite; }
        .ghost-body-${id} { animation: ghostWobble-${id} 2s ease-in-out infinite; }
      `}</style>
      <div className={`ghost-${id}`} style={{ position:"relative", width:32, height:38 }}>
        {/* body */}
        <div className={`ghost-body-${id}`} style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:28, height:28, background:"#f0f0f8", borderRadius:"50% 50% 0 0", border:"1.5px solid #c0c0d0" }}/>
        {/* wavy bottom */}
        <div style={{ position:"absolute", top:24, left:"50%", transform:"translateX(-50%)", width:28, height:12, background:"#f0f0f8", border:"1.5px solid #c0c0d0", borderTop:"none", clipPath:"polygon(0 0,14% 100%,29% 0,43% 100%,57% 0,71% 100%,86% 0,100% 100%,100% 0)" }}/>
        {/* eyes */}
        <div style={{ position:"absolute", top:8, left:6, width:6, height:7, background:"#2a2a3a", borderRadius:"50%", border:"1px solid #1a1a2a" }}/>
        <div style={{ position:"absolute", top:8, right:6, width:6, height:7, background:"#2a2a3a", borderRadius:"50%", border:"1px solid #1a1a2a" }}/>
        {/* eye shine */}
        <div style={{ position:"absolute", top:9, left:7, width:2, height:2, background:"#fff", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", top:9, right:7, width:2, height:2, background:"#fff", borderRadius:"50%" }}/>
        {/* mouth */}
        <div style={{ position:"absolute", top:18, left:"50%", transform:"translateX(-50%)", width:8, height:4, borderBottom:"2px solid #4a4a5a", borderRadius:"0 0 50% 50%" }}/>
      </div>
    </>
  );
}

// ─── Baby Bunny ───────────────────────────────────────────────────────────────
function BabyBunny({ id }) {
  return (
    <>
      <style>{`
        @keyframes bunnyEar-${id} { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(-8deg)} 60%{transform:rotate(8deg)} }
        @keyframes bunnyHop-${id} { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .bunny-${id} { animation: bunnyHop-${id} 1.8s ease-in-out infinite; }
        .bunny-ear-l-${id} { animation: bunnyEar-${id} 2s ease-in-out infinite; transform-origin: bottom center; }
        .bunny-ear-r-${id} { animation: bunnyEar-${id} 2s ease-in-out infinite 0.1s; transform-origin: bottom center; }
      `}</style>
      <div className={`bunny-${id}`} style={{ position:"relative", width:34, height:44 }}>
        {/* left ear */}
        <div className={`bunny-ear-l-${id}`} style={{ position:"absolute", top:0, left:6, width:8, height:18, background:"#f0e8e8", borderRadius:"50% 50% 0 0", border:"1.5px solid #d0c0c0" }}>
          <div style={{ position:"absolute", top:2, left:2, width:4, height:12, background:"#f4a0a0", borderRadius:"50% 50% 0 0", opacity:0.6 }}/>
        </div>
        {/* right ear */}
        <div className={`bunny-ear-r-${id}`} style={{ position:"absolute", top:0, right:6, width:8, height:18, background:"#f0e8e8", borderRadius:"50% 50% 0 0", border:"1.5px solid #d0c0c0" }}>
          <div style={{ position:"absolute", top:2, left:2, width:4, height:12, background:"#f4a0a0", borderRadius:"50% 50% 0 0", opacity:0.6 }}/>
        </div>
        {/* head */}
        <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:24, height:22, background:"#f5f0f0", borderRadius:"50%", border:"1.5px solid #d8d0d0" }}/>
        {/* eyes */}
        <div style={{ position:"absolute", top:18, left:8, width:5, height:5, background:"#d46080", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", top:18, right:8, width:5, height:5, background:"#d46080", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", top:19, left:9, width:2, height:2, background:"#fff", borderRadius:"50%", opacity:0.7 }}/>
        <div style={{ position:"absolute", top:19, right:9, width:2, height:2, background:"#fff", borderRadius:"50%", opacity:0.7 }}/>
        {/* nose */}
        <div style={{ position:"absolute", top:24, left:"50%", transform:"translateX(-50%)", width:4, height:3, background:"#f4a0a0", borderRadius:"50%" }}/>
        {/* body */}
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:22, height:14, background:"#f5f0f0", borderRadius:"50% 50% 40% 40%", border:"1.5px solid #d8d0d0" }}/>
        {/* belly */}
        <div style={{ position:"absolute", bottom:2, left:"50%", transform:"translateX(-50%)", width:14, height:9, background:"#fff", borderRadius:"50%", opacity:0.6 }}/>
      </div>
    </>
  );
}

// ─── Star Sprite ──────────────────────────────────────────────────────────────
function StarSprite({ id }) {
  return (
    <>
      <style>{`
        @keyframes starSpin-${id} { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.1)} 100%{transform:rotate(360deg) scale(1)} }
        @keyframes starGlow-${id} { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.3)} }
        @keyframes starBob-${id} { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .star-spin-${id} { animation: starSpin-${id} 4s linear infinite; }
        .star-glow-${id} { animation: starGlow-${id} 1.5s ease-in-out infinite; }
        .star-bob-${id} { animation: starBob-${id} 2s ease-in-out infinite; }
      `}</style>
      <div className={`star-bob-${id}`} style={{ position:"relative", width:36, height:36 }}>
        {/* glow */}
        <div className={`star-glow-${id}`} style={{ position:"absolute", inset:-4, background:"radial-gradient(circle, #f8e840 0%, transparent 70%)", borderRadius:"50%", opacity:0.5 }}/>
        {/* star shape */}
        <div className={`star-spin-${id}`} style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:32, height:32, background:"#f8d820", clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", filter:"drop-shadow(0 0 3px #f8c820)" }}/>
        </div>
        {/* face */}
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:16, height:10, zIndex:2 }}>
          <div style={{ position:"absolute", top:0, left:1, width:4, height:4, background:"#2a2010", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", top:0, right:1, width:4, height:4, background:"#2a2010", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:6, height:3, borderBottom:"2px solid #2a2010", borderRadius:"0 0 50% 50%" }}/>
        </div>
        {/* sparkles */}
        {[0,72,144,216,288].map((deg,i) => (
          <div key={i} className={`star-glow-${id}`} style={{
            position:"absolute", top:"50%", left:"50%",
            width:4, height:4, background:"#fff",
            borderRadius:"50%", opacity:0.8,
            transform:`rotate(${deg}deg) translateY(-20px)`,
            animationDelay:`${i*0.3}s`
          }}/>
        ))}
      </div>
    </>
  );
}

// ─── Dragon Companion ─────────────────────────────────────────────────────────
function DragonComp({ id }) {
  return (
    <>
      <style>{`
        @keyframes dragonWing-${id} { 0%,100%{transform:rotate(-10deg) scaleY(1)} 50%{transform:rotate(10deg) scaleY(0.8)} }
        @keyframes dragonBob-${id} { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes dragonFire-${id} { 0%,100%{opacity:0.9;transform:scaleX(1)} 50%{opacity:0.6;transform:scaleX(1.2)} }
        .dragon-c-${id} { animation: dragonBob-${id} 1.6s ease-in-out infinite; }
        .dragon-wing-l-${id} { animation: dragonWing-${id} 0.6s ease-in-out infinite; transform-origin: right center; }
        .dragon-wing-r-${id} { animation: dragonWing-${id} 0.6s ease-in-out infinite 0.1s; transform-origin: left center; }
        .dragon-fire-${id} { animation: dragonFire-${id} 0.4s ease-in-out infinite; }
      `}</style>
      <div className={`dragon-c-${id}`} style={{ position:"relative", width:40, height:44 }}>
        {/* left wing */}
        <div className={`dragon-wing-l-${id}`} style={{ position:"absolute", top:8, left:0, width:12, height:18, background:"#3a7a4a", borderRadius:"80% 20% 20% 80%", opacity:0.85, border:"1px solid #2a5a3a" }}/>
        {/* right wing */}
        <div className={`dragon-wing-r-${id}`} style={{ position:"absolute", top:8, right:0, width:12, height:18, background:"#3a7a4a", borderRadius:"20% 80% 80% 20%", opacity:0.85, border:"1px solid #2a5a3a" }}/>
        {/* body */}
        <div style={{ position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)", width:22, height:24, background:"#5a9a6a", borderRadius:"40% 40% 30% 30%", border:"1.5px solid #2a6a3a" }}/>
        {/* belly */}
        <div style={{ position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)", width:14, height:16, background:"#a0e8a0", borderRadius:"40% 40% 30% 30%", opacity:0.7 }}/>
        {/* head */}
        <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)", width:22, height:20, background:"#5a9a6a", borderRadius:"50%", border:"1.5px solid #2a6a3a" }}/>
        {/* horns */}
        <div style={{ position:"absolute", top:2, left:9, width:5, height:8, background:"#2a6a3a", borderRadius:"50% 50% 0 0", transform:"rotate(-15deg)" }}/>
        <div style={{ position:"absolute", top:2, right:9, width:5, height:8, background:"#2a6a3a", borderRadius:"50% 50% 0 0", transform:"rotate(15deg)" }}/>
        {/* eyes */}
        <div style={{ position:"absolute", top:12, left:9, width:5, height:5, background:"#f8c820", borderRadius:"50%", border:"1px solid #2a6a3a" }}>
          <div style={{ position:"absolute", top:1, left:1, width:3, height:3, background:"#1a1a1a", borderRadius:"50%" }}/>
        </div>
        <div style={{ position:"absolute", top:12, right:9, width:5, height:5, background:"#f8c820", borderRadius:"50%", border:"1px solid #2a6a3a" }}>
          <div style={{ position:"absolute", top:1, left:1, width:3, height:3, background:"#1a1a1a", borderRadius:"50%" }}/>
        </div>
        {/* fire breath */}
        <div className={`dragon-fire-${id}`} style={{ position:"absolute", top:18, left:"50%", transform:"translateX(-50%)", width:8, height:5, background:"linear-gradient(90deg,#f84820,#f8c820)", borderRadius:"0 50% 50% 0", opacity:0.8 }}/>
        {/* tail */}
        <div style={{ position:"absolute", bottom:0, right:2, width:10, height:6, background:"#5a9a6a", borderRadius:"0 0 8px 0", border:"1px solid #2a6a3a", transform:"rotate(20deg)" }}/>
      </div>
    </>
  );
}

// ─── Companion renderer ───────────────────────────────────────────────────────
export default function Companion({ compId, size = 40 }) {
  const id = useRef("comp" + Math.random().toString(36).substr(2, 6)).current;
  if (!compId) return null;
  const scale = size / 40;
  return (
    <div style={{ transform:`scale(${scale})`, transformOrigin:"bottom center", display:"inline-block" }}>
      {compId === "comp1" && <TinyFrog id={id} />}
      {compId === "comp2" && <MiniGhost id={id} />}
      {compId === "comp3" && <BabyBunny id={id} />}
      {compId === "comp4" && <StarSprite id={id} />}
      {compId === "comp5" && <DragonComp id={id} />}
    </div>
  );
}
