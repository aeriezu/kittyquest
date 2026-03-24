import { useRef } from "react";
import { SHOP } from "../data/constants";

const PET_STYLES = {
  tabby:  { fur:"#9aa0a0", furDark:"#5a6565", skin:"#ffb0c0", whisker:"#888"    },
  orange: { fur:"#e89050", furDark:"#b85e20", skin:"#ffa080", whisker:"#c87840" },
  black:  { fur:"#111318", furDark:"#080a0c", skin:"#ff9ab0", whisker:"#333"    },
  white:  { fur:"#f5f5f8", furDark:"#c8ccd0", skin:"#ffb8cc", whisker:"#bbb"   },
  calico: { fur:"#e8c888", furDark:"#a06828", skin:"#ffb090", whisker:"#c8a060" },
  tuxedo: { fur:"#1a1a20", furDark:"#0a0a10", skin:"#f0f0f0", whisker:"#444"   },
};

// ─── Background Scene Components ─────────────────────────────────────────────

function BgCozyLibrary({ size }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position:"absolute", inset:0, borderRadius:12 }}>
      {/* warm room bg */}
      <rect width="100" height="100" fill="#f5e6c8"/>
      {/* floor */}
      <rect y="78" width="100" height="22" fill="#c8a870"/>
      {/* rug */}
      <ellipse cx="50" cy="82" rx="35" ry="6" fill="#b85c3a" opacity="0.5"/>
      <ellipse cx="50" cy="82" rx="28" ry="4" fill="#c97d4e" opacity="0.4"/>
      {/* bookshelf */}
      <rect x="5" y="20" width="22" height="58" fill="#8b6340" rx="1"/>
      <rect x="5" y="20" width="22" height="3" fill="#6b4a28" rx="1"/>
      {/* books */}
      <rect x="7"  y="24" width="4" height="18" fill="#4a7fa0" rx="1"/>
      <rect x="12" y="26" width="3" height="16" fill="#b85c3a" rx="1"/>
      <rect x="16" y="25" width="5" height="17" fill="#4a8a5a" rx="1"/>
      <rect x="7"  y="46" width="5" height="14" fill="#c9a84e" rx="1"/>
      <rect x="13" y="44" width="3" height="16" fill="#7a4fa0" rx="1"/>
      <rect x="17" y="45" width="5" height="15" fill="#c97d4e" rx="1"/>
      <rect x="7"  y="64" width="4" height="12" fill="#4a7fa0" rx="1"/>
      <rect x="12" y="65" width="5" height="11" fill="#b85c3a" rx="1"/>
      <rect x="18" y="63" width="4" height="13" fill="#4a8a5a" rx="1"/>
      {/* right bookshelf */}
      <rect x="73" y="20" width="22" height="58" fill="#8b6340" rx="1"/>
      <rect x="73" y="20" width="22" height="3" fill="#6b4a28" rx="1"/>
      <rect x="75" y="24" width="4" height="16" fill="#7a4fa0" rx="1"/>
      <rect x="80" y="25" width="5" height="15" fill="#c97d4e" rx="1"/>
      <rect x="86" y="24" width="4" height="16" fill="#4a7fa0" rx="1"/>
      <rect x="75" y="44" width="5" height="14" fill="#4a8a5a" rx="1"/>
      <rect x="81" y="45" width="4" height="13" fill="#c9a84e" rx="1"/>
      <rect x="86" y="43" width="5" height="15" fill="#b85c3a" rx="1"/>
      {/* window with warm light */}
      <rect x="35" y="10" width="30" height="28" fill="#f8e8b0" rx="3" opacity="0.9"/>
      <rect x="35" y="10" width="30" height="28" fill="none" stroke="#8b6340" strokeWidth="2" rx="3"/>
      <line x1="50" y1="10" x2="50" y2="38" stroke="#8b6340" strokeWidth="1.5"/>
      <line x1="35" y1="24" x2="65" y2="24" stroke="#8b6340" strokeWidth="1.5"/>
      {/* warm glow */}
      <ellipse cx="50" cy="24" rx="12" ry="10" fill="#f8c840" opacity="0.15"/>
      {/* small candle */}
      <rect x="60" y="70" width="3" height="8" fill="#f5e8d0" rx="1"/>
      <ellipse cx="61.5" cy="69" rx="1.5" ry="2" fill="#f8a820" opacity="0.9"/>
      <ellipse cx="61.5" cy="68" rx="0.8" ry="1.5" fill="#fff" opacity="0.7"/>
    </svg>
  );
}

function BgRainyWindow({ size }) {
  const s = size;
  // animated rain keyframes injected once
  return (
    <div style={{ position:"absolute", inset:0, borderRadius:12, overflow:"hidden" }}>
      <style>{`
        @keyframes rainFall { 0%{transform:translateY(-20px) translateX(0)} 100%{transform:translateY(${s+10}px) translateX(-8px)} }
        @keyframes rainFall2 { 0%{transform:translateY(-20px) translateX(0)} 100%{transform:translateY(${s+10}px) translateX(-6px)} }
        .rain-drop { position:absolute; width:1.5px; border-radius:2px; background:rgba(160,190,220,0.7); animation:rainFall linear infinite; }
        .rain-drop2 { position:absolute; width:1px; border-radius:2px; background:rgba(160,190,220,0.5); animation:rainFall2 linear infinite; }
      `}</style>
      <svg width={s} height={s} viewBox="0 0 100 100" style={{ position:"absolute", inset:0 }}>
        {/* dark cloudy sky */}
        <rect width="100" height="100" fill="#7a9ab0"/>
        {/* darker sky top */}
        <rect width="100" height="50" fill="#5a7a90"/>
        {/* clouds */}
        <ellipse cx="30" cy="18" rx="20" ry="10" fill="#8aabb8"/>
        <ellipse cx="45" cy="14" rx="18" ry="9" fill="#9abbc8"/>
        <ellipse cx="70" cy="20" rx="22" ry="11" fill="#7a9aac"/>
        <ellipse cx="85" cy="15" rx="16" ry="8" fill="#8aaab5"/>
        {/* window frame */}
        <rect x="8" y="8" width="84" height="84" fill="none" stroke="#6b5040" strokeWidth="5" rx="3"/>
        {/* window cross */}
        <line x1="50" y1="8" x2="50" y2="92" stroke="#6b5040" strokeWidth="4"/>
        <line x1="8" y1="50" x2="92" y2="50" stroke="#6b5040" strokeWidth="4"/>
        {/* interior window sill */}
        <rect x="5" y="88" width="90" height="10" fill="#c8a870" rx="2"/>
        {/* rain streaks in SVG for base effect */}
        <line x1="15" y1="0" x2="10" y2="40" stroke="#a0c8e0" strokeWidth="0.8" opacity="0.6"/>
        <line x1="30" y1="0" x2="25" y2="50" stroke="#a0c8e0" strokeWidth="0.8" opacity="0.5"/>
        <line x1="55" y1="0" x2="50" y2="45" stroke="#a0c8e0" strokeWidth="0.8" opacity="0.6"/>
        <line x1="72" y1="0" x2="67" y2="40" stroke="#a0c8e0" strokeWidth="0.8" opacity="0.5"/>
        <line x1="88" y1="0" x2="83" y2="48" stroke="#a0c8e0" strokeWidth="0.8" opacity="0.6"/>
        <line x1="22" y1="0" x2="17" y2="35" stroke="#a0c8e0" strokeWidth="0.5" opacity="0.4"/>
        <line x1="42" y1="0" x2="37" y2="42" stroke="#a0c8e0" strokeWidth="0.5" opacity="0.4"/>
        <line x1="63" y1="0" x2="58" y2="38" stroke="#a0c8e0" strokeWidth="0.5" opacity="0.4"/>
        <line x1="80" y1="0" x2="75" y2="44" stroke="#a0c8e0" strokeWidth="0.5" opacity="0.4"/>
        {/* water droplets on glass */}
        <ellipse cx="20" cy="30" rx="1.5" ry="2.5" fill="#c8e0f0" opacity="0.7"/>
        <ellipse cx="35" cy="55" rx="1" ry="2" fill="#c8e0f0" opacity="0.6"/>
        <ellipse cx="60" cy="25" rx="1.5" ry="2.5" fill="#c8e0f0" opacity="0.7"/>
        <ellipse cx="75" cy="60" rx="1" ry="1.8" fill="#c8e0f0" opacity="0.6"/>
        <ellipse cx="45" cy="40" rx="1.2" ry="2" fill="#c8e0f0" opacity="0.5"/>
        {/* drop trails */}
        <line x1="20" y1="32" x2="19" y2="42" stroke="#c8e0f0" strokeWidth="1" opacity="0.4"/>
        <line x1="60" y1="27" x2="59" y2="38" stroke="#c8e0f0" strokeWidth="1" opacity="0.4"/>
      </svg>
      {/* animated rain drops */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className={i%2===0?"rain-drop":"rain-drop2"} style={{
          left: `${8 + i * 7.5}%`,
          height: `${8 + (i%3)*4}px`,
          animationDuration: `${0.6 + (i%4)*0.15}s`,
          animationDelay: `${(i*0.13)%0.8}s`,
          top: 0,
        }}/>
      ))}
    </div>
  );
}

function BgAutumnPark({ size }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position:"absolute", inset:0, borderRadius:12 }}>
      {/* sky */}
      <rect width="100" height="100" fill="#e8c890"/>
      {/* gradient sky */}
      <rect width="100" height="55" fill="#d4a860" opacity="0.5"/>
      {/* ground */}
      <rect y="72" width="100" height="28" fill="#8b6830"/>
      {/* grass patches */}
      <ellipse cx="50" cy="72" rx="55" ry="6" fill="#a07840"/>
      {/* path */}
      <ellipse cx="50" cy="85" rx="15" ry="5" fill="#c8a060" opacity="0.5"/>
      {/* left tree trunk */}
      <rect x="14" y="40" width="7" height="32" fill="#6b4a20" rx="2"/>
      {/* left tree canopy - autumn colors */}
      <ellipse cx="17" cy="32" rx="16" ry="14" fill="#c85820"/>
      <ellipse cx="10" cy="28" rx="12" ry="10" fill="#d4780a"/>
      <ellipse cx="24" cy="26" rx="13" ry="11" fill="#e8940a"/>
      <ellipse cx="17" cy="22" rx="14" ry="12" fill="#c84a10"/>
      {/* right tree trunk */}
      <rect x="79" y="38" width="7" height="34" fill="#6b4a20" rx="2"/>
      {/* right tree canopy */}
      <ellipse cx="83" cy="30" rx="15" ry="13" fill="#d4780a"/>
      <ellipse cx="76" cy="26" rx="12" ry="10" fill="#c85820"/>
      <ellipse cx="90" cy="28" rx="12" ry="11" fill="#e8940a"/>
      <ellipse cx="83" cy="22" rx="13" ry="11" fill="#b83a08"/>
      {/* falling leaves */}
      <ellipse cx="35" cy="45" rx="3" ry="2" fill="#e8940a" opacity="0.9" transform="rotate(-30 35 45)"/>
      <ellipse cx="55" cy="38" rx="2.5" ry="1.8" fill="#c85820" opacity="0.8" transform="rotate(20 55 38)"/>
      <ellipse cx="68" cy="52" rx="2.5" ry="1.8" fill="#d4780a" opacity="0.9" transform="rotate(-15 68 52)"/>
      <ellipse cx="42" cy="60" rx="3" ry="2" fill="#e8940a" opacity="0.7" transform="rotate(25 42 60)"/>
      <ellipse cx="60" cy="65" rx="2" ry="1.5" fill="#c84a10" opacity="0.8" transform="rotate(-10 60 65)"/>
      <ellipse cx="28" cy="62" rx="2.5" ry="1.8" fill="#d4780a" opacity="0.7" transform="rotate(15 28 62)"/>
      {/* ground leaves */}
      <ellipse cx="40" cy="74" rx="4" ry="2" fill="#c85820" opacity="0.6" transform="rotate(5 40 74)"/>
      <ellipse cx="62" cy="76" rx="3.5" ry="1.8" fill="#e8940a" opacity="0.5" transform="rotate(-8 62 76)"/>
      <ellipse cx="25" cy="77" rx="3" ry="1.5" fill="#d4780a" opacity="0.6"/>
      <ellipse cx="75" cy="75" rx="3" ry="1.5" fill="#c84a10" opacity="0.5"/>
      {/* bench */}
      <rect x="38" y="66" width="24" height="3" fill="#8b6340" rx="1"/>
      <rect x="40" y="69" width="2" height="5" fill="#6b4a20" rx="1"/>
      <rect x="58" y="69" width="2" height="5" fill="#6b4a20" rx="1"/>
      {/* sun */}
      <circle cx="78" cy="14" r="8" fill="#f8b820" opacity="0.8"/>
      <circle cx="78" cy="14" r="6" fill="#fcd840" opacity="0.9"/>
    </svg>
  );
}

function BgNightCafe({ size }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position:"absolute", inset:0, borderRadius:12 }}>
      {/* dark night bg */}
      <rect width="100" height="100" fill="#1a100a"/>
      {/* floor */}
      <rect y="80" width="100" height="20" fill="#2a1a10"/>
      {/* table */}
      <rect x="25" y="68" width="50" height="4" fill="#4a2e18" rx="2"/>
      <rect x="35" y="72" width="4" height="10" fill="#3a2010" rx="1"/>
      <rect x="61" y="72" width="4" height="10" fill="#3a2010" rx="1"/>
      {/* coffee cup */}
      <rect x="43" y="56" width="14" height="12" fill="#f5e8d0" rx="2"/>
      <rect x="43" y="56" width="14" height="3" fill="#d4b890" rx="2"/>
      <ellipse cx="50" cy="59" rx="5" ry="1.5" fill="#6b3a10" opacity="0.8"/>
      {/* cup handle */}
      <path d="M57 59 Q62 59 62 63 Q62 67 57 67" fill="none" stroke="#f5e8d0" strokeWidth="2"/>
      {/* steam */}
      <path d="M47 55 Q46 51 47 47" fill="none" stroke="#f5e8d0" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      <path d="M50 54 Q49 50 50 46" fill="none" stroke="#f5e8d0" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      <path d="M53 55 Q54 51 53 47" fill="none" stroke="#f5e8d0" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      {/* window */}
      <rect x="8" y="10" width="35" height="45" fill="#0a1a2a" rx="3"/>
      <rect x="8" y="10" width="35" height="45" fill="none" stroke="#4a3020" strokeWidth="3" rx="3"/>
      <line x1="25" y1="10" x2="25" y2="55" stroke="#4a3020" strokeWidth="2"/>
      <line x1="8" y1="32" x2="43" y2="32" stroke="#4a3020" strokeWidth="2"/>
      {/* night sky through window */}
      <circle cx="18" cy="20" r="1" fill="#fff" opacity="0.8"/>
      <circle cx="30" cy="16" r="0.8" fill="#fff" opacity="0.6"/>
      <circle cx="35" cy="24" r="0.8" fill="#fff" opacity="0.7"/>
      <circle cx="14" cy="28" r="0.6" fill="#fff" opacity="0.5"/>
      <circle cx="38" cy="18" r="0.6" fill="#fff" opacity="0.6"/>
      {/* moon */}
      <circle cx="22" cy="18" r="5" fill="#f8e890" opacity="0.3"/>
      <circle cx="24" cy="16" r="4" fill="#1a2a3a"/>
      {/* warm lamp */}
      <rect x="70" y="8" width="3" height="30" fill="#4a3020" rx="1"/>
      <polygon points="65,8 80,8 77,22 68,22" fill="#c8a040" opacity="0.9"/>
      <ellipse cx="72" cy="22" rx="9" ry="3" fill="#f8c840" opacity="0.3"/>
      {/* lamp glow on table */}
      <ellipse cx="72" cy="50" rx="20" ry="12" fill="#f8c840" opacity="0.08"/>
      {/* bookshelf on right */}
      <rect x="80" y="10" width="18" height="55" fill="#3a2010" rx="1"/>
      <rect x="82" y="14" width="3" height="12" fill="#4a7fa0" rx="1"/>
      <rect x="86" y="15" width="4" height="11" fill="#c85820" rx="1"/>
      <rect x="82" y="30" width="4" height="10" fill="#4a8a5a" rx="1"/>
      <rect x="87" y="29" width="3" height="11" fill="#c9a84e" rx="1"/>
      <rect x="82" y="45" width="5" height="9" fill="#7a4fa0" rx="1"/>
      <rect x="88" y="44" width="4" height="10" fill="#c97d4e" rx="1"/>
      {/* cozy warm overlay */}
      <rect width="100" height="100" fill="#c87020" opacity="0.05"/>
    </svg>
  );
}

function BgCherryBlossoms({ size }) {
  const s = size;
  return (
    <div style={{ position:"absolute", inset:0, borderRadius:12, overflow:"hidden" }}>
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-10px) translateX(0px) rotate(0deg); opacity:0.9; }
          50%  { transform: translateY(${s*0.5}px) translateX(${s*0.08}px) rotate(180deg); opacity:0.8; }
          100% { transform: translateY(${s+10}px) translateX(-${s*0.05}px) rotate(360deg); opacity:0; }
        }
        @keyframes petalFall2 {
          0%   { transform: translateY(-10px) translateX(0px) rotate(45deg); opacity:0.8; }
          50%  { transform: translateY(${s*0.55}px) translateX(-${s*0.06}px) rotate(200deg); opacity:0.7; }
          100% { transform: translateY(${s+10}px) translateX(${s*0.04}px) rotate(380deg); opacity:0; }
        }
        .blossom-petal { position:absolute; width:6px; height:5px; border-radius:50% 50% 50% 0; background:#f4b8c8; animation: petalFall ease-in infinite; }
        .blossom-petal2 { position:absolute; width:5px; height:4px; border-radius:50% 0 50% 50%; background:#f8d0dc; animation: petalFall2 ease-in infinite; }
      `}</style>
      <svg width={s} height={s} viewBox="0 0 100 100" style={{ position:"absolute", inset:0 }}>
        {/* soft spring sky */}
        <rect width="100" height="100" fill="#fce8f0"/>
        <rect width="100" height="60" fill="#f8d8e8" opacity="0.6"/>
        {/* ground */}
        <rect y="78" width="100" height="22" fill="#e8d0b0"/>
        {/* grass */}
        <ellipse cx="50" cy="78" rx="55" ry="5" fill="#c8d890" opacity="0.8"/>
        {/* left tree trunk */}
        <rect x="8" y="35" width="8" height="45" fill="#6b4a30" rx="3"/>
        {/* left branches */}
        <line x1="12" y1="38" x2="25" y2="25" stroke="#6b4a30" strokeWidth="3" strokeLinecap="round"/>
        <line x1="12" y1="45" x2="2" y2="28" stroke="#6b4a30" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="40" x2="30" y2="35" stroke="#6b4a30" strokeWidth="2" strokeLinecap="round"/>
        {/* left blossom clusters */}
        <ellipse cx="25" cy="22" rx="14" ry="12" fill="#f4a8b8" opacity="0.85"/>
        <ellipse cx="18" cy="18" rx="12" ry="10" fill="#f8c0cc" opacity="0.8"/>
        <ellipse cx="32" cy="20" rx="11" ry="9" fill="#f4a0b4" opacity="0.75"/>
        <ellipse cx="22" cy="14" rx="10" ry="8" fill="#f8d0dc" opacity="0.8"/>
        <ellipse cx="3" cy="25" rx="10" ry="9" fill="#f4b8c8" opacity="0.8"/>
        <ellipse cx="30" cy="32" rx="10" ry="8" fill="#f8c8d4" opacity="0.7"/>
        {/* right tree trunk */}
        <rect x="84" y="30" width="8" height="50" fill="#7a5535" rx="3"/>
        {/* right branches */}
        <line x1="88" y1="33" x2="75" y2="20" stroke="#7a5535" strokeWidth="3" strokeLinecap="round"/>
        <line x1="88" y1="40" x2="98" y2="25" stroke="#7a5535" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="88" y1="38" x2="70" y2="30" stroke="#7a5535" strokeWidth="2" strokeLinecap="round"/>
        {/* right blossom clusters */}
        <ellipse cx="75" cy="18" rx="13" ry="11" fill="#f8c0cc" opacity="0.85"/>
        <ellipse cx="82" cy="14" rx="11" ry="9" fill="#f4a8b8" opacity="0.8"/>
        <ellipse cx="68" cy="22" rx="11" ry="9" fill="#f8d0dc" opacity="0.75"/>
        <ellipse cx="97" cy="23" rx="10" ry="9" fill="#f4b8c8" opacity="0.8"/>
        <ellipse cx="70" cy="30" rx="9" ry="7" fill="#f8c0cc" opacity="0.7"/>
        {/* small blossom flowers on trees */}
        {[
          [20,20],[28,14],[14,16],[35,22],[8,22],
          [78,16],[84,12],[70,20],[96,20],[72,28]
        ].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="2.5" fill="#f8e0e8"/>
            <circle cx={cx} cy={cy} r="1" fill="#f4a0b0"/>
          </g>
        ))}
        {/* petals on ground */}
        <ellipse cx="35" cy="80" rx="3" ry="2" fill="#f4b8c8" opacity="0.6" transform="rotate(-15 35 80)"/>
        <ellipse cx="55" cy="82" rx="2.5" ry="1.8" fill="#f8c8d4" opacity="0.5" transform="rotate(10 55 82)"/>
        <ellipse cx="70" cy="79" rx="2.5" ry="1.8" fill="#f4a8b8" opacity="0.6" transform="rotate(-5 70 79)"/>
        <ellipse cx="20" cy="81" rx="3" ry="2" fill="#f8d0dc" opacity="0.5" transform="rotate(20 20 81)"/>
        {/* soft sun */}
        <circle cx="50" cy="20" r="10" fill="#fce8a0" opacity="0.4"/>
        <circle cx="50" cy="20" r="6" fill="#fce890" opacity="0.5"/>
      </svg>
      {/* animated falling petals */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className={i%2===0?"blossom-petal":"blossom-petal2"} style={{
          left: `${5 + i * 9}%`,
          animationDuration: `${2.5 + (i%4)*0.6}s`,
          animationDelay: `${(i*0.35)%2.5}s`,
          top: 0,
        }}/>
      ))}
    </div>
  );
}

// ─── Background renderer ──────────────────────────────────────────────────────
function Background({ bgId, size }) {
  if (!bgId) return null;
  const props = { size };
  if (bgId === "bg1") return <BgCozyLibrary {...props} />;
  if (bgId === "bg2") return <BgRainyWindow {...props} />;
  if (bgId === "bg3") return <BgAutumnPark {...props} />;
  if (bgId === "bg4") return <BgNightCafe {...props} />;
  if (bgId === "bg5") return <BgCherryBlossoms {...props} />;
  return null;
}

// ─── PixelCat ─────────────────────────────────────────────────────────────────
export default function PixelCat({ mood, hat, outfit, bg, comp, petId="tabby", size=140 }) {
  const id  = useRef("c" + Math.random().toString(36).substr(2, 6)).current;
  const p   = PET_STYLES[petId] || PET_STYLES.tabby;
  const fs  = size / 80;
  const compItem = SHOP.find(i => i.id === comp);
  const moodCls  = mood === "sleepy" ? "m-sleepy" : mood === "excited" ? "m-excited" : "m-neutral";

  const css = `
.${id}{--fur:${p.fur};--fur-dark:${p.furDark};--skin:${p.skin};--wh:${p.whisker};font-size:${fs}px;width:80em;aspect-ratio:1;position:relative;}
.${id} *,.${id} *::before,.${id} *::after{position:absolute;box-sizing:border-box;}
.${id} .shadow{width:80%;height:5%;background:#0002;border-radius:50%/0 0 100% 100%;top:99%;left:50%;translate:-50%;}
.${id} .tail{width:50%;height:50%;border-radius:50%;border:7em solid #0000;border-top-color:var(--fur-dark);border-left-color:var(--fur-dark);clip-path:polygon(100% 0,100% 100%,0 30%,0 0);top:75%;left:52%;}
.${id} .tail::before{content:"";width:7em;aspect-ratio:1;background:var(--fur-dark);border-radius:50%;left:81%;top:-9%;}
.${id} .body{left:50%;translate:-50%;bottom:0;width:35%;height:40%;background:radial-gradient(100% 80% at 50% 0,var(--fur-dark) 48%,transparent 52%),var(--fur);border-radius:100%/200% 200% 20% 20%;}
.${id}.tuxedo .body{background:radial-gradient(60% 70% at 50% 60%,#f0f0f0 40%,#e0e0e0 55%,transparent 70%),radial-gradient(100% 80% at 50% 0,var(--fur-dark) 48%,transparent 52%),var(--fur);}
.${id}.calico .body{background:radial-gradient(40% 50% at 30% 40%,#c97040 60%,transparent 70%),radial-gradient(35% 40% at 70% 60%,#333 50%,transparent 65%),radial-gradient(100% 80% at 50% 0,var(--fur-dark) 48%,transparent 52%),var(--fur);}
.${id}.tabby .body{background:repeating-linear-gradient(175deg,var(--fur-dark) 0,var(--fur-dark) 3%,transparent 3%,transparent 12%),radial-gradient(100% 80% at 50% 0,var(--fur-dark) 48%,transparent 52%),var(--fur);}
.${id} .leg{width:165%;height:38%;background:var(--fur);bottom:0;left:50%;translate:-50%;border-radius:8em 8em 100% 100%/10em 10em 16em 16em;scale:1 -1;}
.${id} .paw{width:35%;height:49%;border:0.75em solid #fff;border-top:0;border-radius:0 0 5em 5em;border-bottom:1em solid #fff;top:48%;rotate:-10deg;left:10%;clip-path:polygon(0 20%,100% 30%,100% 100%,0 100%);}
.${id} .paw+.paw{right:7%;height:50%;left:auto;rotate:13deg;scale:-1 1;clip-path:polygon(0 25%,100% 15%,100% 100%,0 100%);}
.${id}.black .paw{border-color:#333;}
.${id}.white .paw{border-color:#ddd;}
.${id} .ear{width:40%;aspect-ratio:1;border:4em solid var(--fur);border-radius:5% 90% 10% 80%;background:var(--skin);}
.${id} .ear+.ear{scale:-1 1;right:0;}
.${id} .head{width:80%;aspect-ratio:1.1;background:linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);left:50%;translate:-50%;border-radius:100%/125% 125% 80% 75%;}
.${id}.tuxedo .head{background:radial-gradient(55% 40% at 50% 85%,#f0f0f0 50%,#e8e8e8 65%,transparent 75%),linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);}
.${id}.calico .head{background:radial-gradient(30% 25% at 25% 35%,#c97040 55%,transparent 70%),radial-gradient(25% 20% at 72% 25%,#222 50%,transparent 65%),linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);}
.${id}.white .head{background:linear-gradient(#0001 0%,#0000 30%),var(--fur);}
.${id} .whisker{width:30%;height:30%;border-radius:50%;border:2em solid #0000;border-top-color:var(--wh);border-left-color:var(--wh);clip-path:polygon(100% 0,100% 100%,0 30%,0 0);}
.${id} .whisker:nth-child(1){top:70%;translate:-65%;}
.${id} .whisker:nth-child(2){top:80%;translate:-40%;rotate:-20deg;}
.${id} .whisker:nth-child(3){right:0;top:70%;translate:65%;rotate:10deg;}
.${id} .whisker:nth-child(4){right:0;top:80%;translate:40%;rotate:24deg;}
.${id} .nose{width:10%;height:7%;background:var(--skin);border-radius:50%;left:50%;translate:-50% -50%;top:78%;}
.${id} .eye{--pos:25%;--x1:50%;--x2:42%;width:35%;aspect-ratio:1;border-radius:50%;background:radial-gradient(50% 50% at var(--x1) 47%,#fff 23%,#fff4 26%,#0000 28%),radial-gradient(50% 50% at var(--x2) 65%,#fff 10%,#fff4 13%,#0000 15%),radial-gradient(circle at 60% 55%,#000 33%,#0002 36%,#0000 38%),white;top:63%;left:var(--pos);translate:-50% -50%;}
.${id} .eye+.eye{--x1:70%;--x2:78%;left:calc(100% - var(--pos));scale:-1 1;}
.${id}.m-sleepy .eye{clip-path:ellipse(50% 32% at 50% 68%);}
.${id}.m-excited .eye{scale:1.18;}
.${id}.m-excited .eye+.eye{scale:-1.18 1.18;}
.${id} .hat-beanie{width:55%;height:22%;background:#c97d4e;border-radius:5em 5em 0 0;top:-8%;left:50%;translate:-50%;z-index:10;}
.${id} .hat-beanie::before{content:"";width:120%;height:40%;background:#b86d3e;border-radius:2em;bottom:0;left:50%;translate:-50%;}
.${id} .hat-witch{width:38%;height:46%;background:#2a1a3a;border-radius:4em 4em 0 0;top:-40%;left:50%;translate:-50%;z-index:10;}
.${id} .hat-witch::before{content:"";width:170%;height:18%;background:#2a1a3a;border-radius:3em;bottom:-18%;left:50%;translate:-50%;}
.${id} .hat-crown{width:55%;height:22%;background:#c9a84e;top:-15%;left:50%;translate:-50%;z-index:10;clip-path:polygon(0 100%,0 40%,18% 0,50% 55%,82% 0,100% 40%,100% 100%);}
.${id} .hat-grad{width:52%;height:18%;background:#1a1a2e;border-radius:1em;top:-8%;left:50%;translate:-50%;z-index:10;}
.${id} .hat-grad::before{content:"";width:70%;height:100%;background:#1a1a2e;border-radius:2em 2em 0 0;bottom:100%;left:50%;translate:-50%;}
.${id} .hat-grad::after{content:"";width:35%;height:6%;background:#c9a84e;border-radius:1em;top:-22%;left:50%;translate:-50%;}
.${id} .hat-halo{width:68%;height:10%;border:0.4em solid #c9a84e;border-radius:50%;top:-14%;left:50%;translate:-50%;background:transparent;z-index:10;box-shadow:0 0 8px #c9a84e66;}
.${id} .scarf{width:130%;height:14%;background:#c84a3a;border-radius:2em;top:-8%;left:50%;translate:-50%;z-index:5;}
.${id} .bowtie-l{width:18%;height:14%;background:#4a7fa0;clip-path:polygon(0 0,100% 20%,100% 80%,0 100%);top:3%;left:34%;z-index:5;}
.${id} .bowtie-r{width:18%;height:14%;background:#4a7fa0;clip-path:polygon(0 20%,100% 0,100% 100%,0 80%);top:3%;left:52%;z-index:5;}
.${id} .bowtie-c{width:8%;height:8%;background:#3a6a90;border-radius:50%;top:6%;left:50%;translate:-50%;z-index:5;}
.${id} .cape-l{width:60%;height:80%;background:#3a2060;border-radius:0 0 0 8em;top:10%;left:0;z-index:0;opacity:0.5;}
.${id} .cape-r{width:60%;height:80%;background:#3a2060;border-radius:0 0 8em 0;top:10%;right:0;z-index:0;opacity:0.5;}
.${id} .robe{width:130%;height:90%;background:linear-gradient(180deg,#4a1a6f,#2a0a4f);border-radius:0 0 4em 4em;bottom:0;left:50%;translate:-50%;z-index:0;opacity:0.55;}
.${id} .cloak{width:130%;height:90%;background:linear-gradient(135deg,#0a0a3f,#3a0a6f);border-radius:0 0 4em 4em;bottom:0;left:50%;translate:-50%;z-index:0;opacity:0.45;}
  `;

  const hatEl = hat === "hat1" ? <div className="hat-beanie" />
    : hat === "hat2" ? <div className="hat-witch" />
    : hat === "hat3" ? <div className="hat-crown" />
    : hat === "hat4" ? <div className="hat-grad" />
    : hat === "hat5" ? <div className="hat-halo" />
    : null;

  const outfitEl = outfit === "out1" ? <div className="scarf" />
    : outfit === "out2" ? <><div className="bowtie-l" /><div className="bowtie-r" /><div className="bowtie-c" /></>
    : outfit === "out3" ? <><div className="cape-l" /><div className="cape-r" /></>
    : outfit === "out4" ? <div className="robe" />
    : outfit === "out5" ? <div className="cloak" />
    : null;

  return (
    <div style={{ position:"relative", display:"inline-block", width:size, height:size }}>
      <Background bgId={bg} size={size} />
      <style>{css}</style>
      <article className={`${id} ${moodCls} ${petId}`} style={{ position:"relative", zIndex:1 }}>
        <div className="shadow" />
        <div className="tail" />
        <div className="body">
          <div className="leg" />
          <div className="leg" />
          <div className="paw" />
          <div className="paw" />
        </div>
        <div className="ear" />
        <div className="ear" />
        <div className="head">
          <div className="whisker" />
          <div className="whisker" />
          <div className="whisker" />
          <div className="whisker" />
          <div className="eye" />
          <div className="eye" />
          <div className="nose" />
          {outfitEl}
          {hatEl}
        </div>
      </article>
      {comp && (
        <div style={{ position:"absolute", bottom:0, right:0, fontSize:size * 0.15, zIndex:10 }}>
          {compItem?.emoji}
        </div>
      )}
    </div>
  );
}
