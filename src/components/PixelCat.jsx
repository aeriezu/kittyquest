import { useRef } from "react";
import { SHOP } from "../data/constants";

const PET_STYLES = {
  tabby:  { fur:"#9aa0a0", furDark:"#5a6565", skin:"#ffb0c0", whisker:"#888"    },
  orange: { fur:"#e89050", furDark:"#b85e20", skin:"#ffa080", whisker:"#c87840" },
  black:  { fur:"#111318", furDark:"#080a0c", skin:"#ff9ab0", whisker:"#333"    },
  white:  { fur:"#f5f5f8", furDark:"#c8ccd0", skin:"#ffb8cc", whisker:"#bbb"   },
  calico: { fur:"#e8c888", furDark:"#a06828", skin:"#ffb090", whisker:"#c8a060" },
  tuxedo: { fur:"#1a1a20", furDark:"#0a0a10", skin:"#f0f0f0", whisker:"#444"   },
  dragon: { fur:"#5a9a6a", furDark:"#2a6a3a", skin:"#a0e8a0", whisker:"#2a6a3a" },
};

// ─── Wide Animated Background Scenes ─────────────────────────────────────────
// All backgrounds use viewBox="0 0 300 100" (3:1 ratio)
// SVG uses width="100%" height="auto" so the full scene is always visible

function BgCozyLibrary() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#f0ddb8" }}>
      <style>{`
        @keyframes candleFlicker { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:0.7;transform:scaleY(0.85)} 33%{opacity:0.9;transform:scaleY(1.1)} }
        @keyframes dustFloat { 0%{transform:translateY(0) translateX(0);opacity:0} 20%{opacity:0.6} 80%{opacity:0.4} 100%{transform:translateY(-40px) translateX(15px);opacity:0} }
        @keyframes warmPulse { 0%,100%{opacity:0.12} 50%{opacity:0.22} }
        .candle-flame { animation: candleFlicker 1.2s ease-in-out infinite; transform-origin: bottom center; }
        .dust-mote { position:absolute; width:3px; height:3px; border-radius:50%; background:#f8e8b0; animation: dustFloat ease-in-out infinite; }
        .warm-glow { animation: warmPulse 2s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
        <rect width="300" height="100" fill="#f0ddb8"/>
        <rect y="75" width="300" height="25" fill="#c8a060"/>
        <ellipse cx="150" cy="30" rx="120" ry="60" fill="#f8c840" opacity="0.08" className="warm-glow"/>
        <rect x="0" y="15" width="28" height="85" fill="#8b6340"/>
        <rect x="0" y="15" width="28" height="4" fill="#6b4a28"/>
        <rect x="2" y="22" width="5" height="20" fill="#4a7fa0" rx="1"/>
        <rect x="8" y="24" width="4" height="18" fill="#b85c3a" rx="1"/>
        <rect x="13" y="22" width="6" height="20" fill="#4a8a5a" rx="1"/>
        <rect x="20" y="23" width="5" height="19" fill="#c9a84e" rx="1"/>
        <rect x="2" y="46" width="4" height="15" fill="#7a4fa0" rx="1"/>
        <rect x="7" y="44" width="6" height="17" fill="#c97d4e" rx="1"/>
        <rect x="14" y="45" width="5" height="16" fill="#4a7fa0" rx="1"/>
        <rect x="20" y="46" width="5" height="15" fill="#b85c3a" rx="1"/>
        <rect x="2" y="65" width="6" height="12" fill="#4a8a5a" rx="1"/>
        <rect x="9" y="64" width="4" height="13" fill="#c9a84e" rx="1"/>
        <rect x="14" y="65" width="5" height="12" fill="#7a4fa0" rx="1"/>
        <rect x="20" y="64" width="6" height="13" fill="#c97d4e" rx="1"/>
        <rect x="272" y="15" width="28" height="85" fill="#8b6340"/>
        <rect x="272" y="15" width="28" height="4" fill="#6b4a28"/>
        <rect x="274" y="22" width="5" height="20" fill="#c85820" rx="1"/>
        <rect x="280" y="23" width="4" height="19" fill="#4a7fa0" rx="1"/>
        <rect x="285" y="22" width="6" height="20" fill="#7a4fa0" rx="1"/>
        <rect x="292" y="24" width="5" height="18" fill="#4a8a5a" rx="1"/>
        <rect x="274" y="46" width="6" height="15" fill="#c9a84e" rx="1"/>
        <rect x="281" y="44" width="4" height="17" fill="#b85c3a" rx="1"/>
        <rect x="286" y="45" width="5" height="16" fill="#c97d4e" rx="1"/>
        <rect x="292" y="46" width="5" height="15" fill="#4a7fa0" rx="1"/>
        <rect x="80" y="5" width="140" height="68" fill="#d4eef8" rx="4" opacity="0.9"/>
        <rect x="80" y="5" width="140" height="68" fill="none" stroke="#8b6340" strokeWidth="3" rx="4"/>
        <line x1="150" y1="5" x2="150" y2="73" stroke="#8b6340" strokeWidth="2.5"/>
        <line x1="80" y1="39" x2="220" y2="39" stroke="#8b6340" strokeWidth="2.5"/>
        <rect x="83" y="8" width="64" height="28" fill="#f8e8b0" opacity="0.3"/>
        <rect x="153" y="8" width="64" height="28" fill="#f8e8b0" opacity="0.25"/>
        <ellipse cx="150" cy="82" rx="100" ry="8" fill="#b85c3a" opacity="0.4"/>
        <rect x="240" y="68" width="4" height="9" fill="#f5e8d0" rx="1"/>
        <g className="candle-flame">
          <ellipse cx="242" cy="67" rx="2" ry="3" fill="#f8a820" opacity="0.95"/>
          <ellipse cx="242" cy="66" rx="1" ry="1.5" fill="#fff" opacity="0.8"/>
        </g>
        <rect x="252" y="66" width="4" height="11" fill="#f5e8d0" rx="1"/>
        <g className="candle-flame" style={{ animationDelay:"0.4s" }}>
          <ellipse cx="254" cy="65" rx="2" ry="3" fill="#f8a820" opacity="0.95"/>
          <ellipse cx="254" cy="64" rx="1" ry="1.5" fill="#fff" opacity="0.8"/>
        </g>
        <rect x="55" y="72" width="18" height="3" fill="#4a7fa0" rx="1"/>
        <rect x="57" y="70" width="14" height="4" fill="#3a6a90" rx="1"/>
      </svg>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="dust-mote" style={{ left:`${15+i*10}%`, top:`${20+i*8}%`, animationDuration:`${4+i*0.8}s`, animationDelay:`${i*0.6}s` }}/>
      ))}
    </div>
  );
}

function BgRainyWindow() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#6a8aa0" }}>
      <style>{`
        @keyframes rainFallW { 0%{transform:translateY(-20px) translateX(0)} 100%{transform:translateY(120px) translateX(-10px)} }
        @keyframes rainFallW2 { 0%{transform:translateY(-20px) translateX(0)} 100%{transform:translateY(120px) translateX(-7px)} }
        @keyframes cloudDrift { 0%{transform:translateX(0)} 100%{transform:translateX(20px)} }
        .rain-w { position:absolute; width:1.5px; border-radius:2px; background:rgba(160,190,220,0.7); animation:rainFallW linear infinite; }
        .rain-w2 { position:absolute; width:1px; border-radius:2px; background:rgba(160,190,220,0.5); animation:rainFallW2 linear infinite; }
        .cloud-drift { animation: cloudDrift 8s ease-in-out infinite alternate; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
        <rect width="300" height="100" fill="#6a8aa0"/>
        <rect width="300" height="55" fill="#4a6a80" opacity="0.7"/>
        <g className="cloud-drift">
          <ellipse cx="50" cy="18" rx="35" ry="14" fill="#7a9ab0"/>
          <ellipse cx="75" cy="13" rx="30" ry="12" fill="#8aaac0"/>
          <ellipse cx="30" cy="14" rx="22" ry="10" fill="#7090a8"/>
        </g>
        <g className="cloud-drift" style={{ animationDelay:"2s", animationDuration:"11s" }}>
          <ellipse cx="200" cy="15" rx="40" ry="15" fill="#7a9ab0"/>
          <ellipse cx="230" cy="10" rx="28" ry="11" fill="#8aaac0"/>
          <ellipse cx="175" cy="12" rx="25" ry="10" fill="#6a8aa0"/>
        </g>
        <ellipse cx="130" cy="20" rx="32" ry="12" fill="#8aabb8" opacity="0.6"/>
        <rect x="10" y="5" width="280" height="88" fill="none" stroke="#6b5040" strokeWidth="5" rx="4"/>
        <line x1="150" y1="5" x2="150" y2="93" stroke="#6b5040" strokeWidth="4"/>
        <line x1="10" y1="50" x2="290" y2="50" stroke="#6b5040" strokeWidth="4"/>
        <rect x="5" y="90" width="290" height="10" fill="#c8a870" rx="2"/>
        {[15,35,55,75,95,115,135,165,185,205,225,245,265,285].map((x,i) => (
          <line key={i} x1={x} y1="0" x2={x-5} y2="50" stroke="#a0c8e0" strokeWidth="0.7" opacity="0.5"/>
        ))}
        {[20,45,70,100,130,160,190,220,250,280].map((x,i) => (
          <g key={i}>
            <ellipse cx={x} cy={20+i*6} rx="1.5" ry="2.5" fill="#c8e0f0" opacity="0.6"/>
            <line x1={x} y1={22+i*6} x2={x-1} y2={32+i*6} stroke="#c8e0f0" strokeWidth="1" opacity="0.35"/>
          </g>
        ))}
      </svg>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={i%2===0?"rain-w":"rain-w2"} style={{
          left:`${i*5}%`, height:`${10+(i%3)*5}px`,
          animationDuration:`${0.5+(i%5)*0.12}s`, animationDelay:`${(i*0.09)%0.7}s`, top:0
        }}/>
      ))}
    </div>
  );
}

function BgAutumnPark() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#e8c078" }}>
      <style>{`
        @keyframes leafFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:0.9} 50%{transform:translateY(50px) translateX(15px) rotate(180deg);opacity:0.8} 100%{transform:translateY(110px) translateX(-5px) rotate(360deg);opacity:0} }
        @keyframes leafFall2 { 0%{transform:translateY(-10px) rotate(20deg);opacity:0.8} 50%{transform:translateY(55px) translateX(-12px) rotate(200deg);opacity:0.7} 100%{transform:translateY(110px) translateX(8px) rotate(380deg);opacity:0} }
        @keyframes sunPulse { 0%,100%{opacity:0.85} 50%{opacity:1} }
        .leaf { position:absolute; width:8px; height:6px; border-radius:50% 0; animation: leafFall ease-in infinite; }
        .leaf2 { position:absolute; width:6px; height:5px; border-radius:0 50%; animation: leafFall2 ease-in infinite; }
        .sun-pulse { animation: sunPulse 3s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
        <rect width="300" height="100" fill="#e8c078"/>
        <rect width="300" height="60" fill="#d49050" opacity="0.4"/>
        <circle cx="260" cy="18" r="14" fill="#f8c840" opacity="0.7" className="sun-pulse"/>
        <circle cx="260" cy="18" r="10" fill="#fcd840" opacity="0.9" className="sun-pulse"/>
        <rect y="76" width="300" height="24" fill="#8b6020"/>
        <ellipse cx="150" cy="76" rx="160" ry="7" fill="#a07030"/>
        <ellipse cx="150" cy="90" rx="40" ry="6" fill="#c8a050" opacity="0.5"/>
        <rect x="10" y="35" width="10" height="42" fill="#6b4a20" rx="3"/>
        <ellipse cx="15" cy="28" rx="22" ry="18" fill="#c85820"/>
        <ellipse cx="5"  cy="24" rx="16" ry="13" fill="#d4780a"/>
        <ellipse cx="28" cy="22" rx="18" ry="14" fill="#e8940a"/>
        <ellipse cx="15" cy="16" rx="18" ry="14" fill="#c84a10"/>
        <rect x="40" y="42" width="8" height="35" fill="#6b4a20" rx="2"/>
        <ellipse cx="44" cy="34" rx="16" ry="14" fill="#d4780a"/>
        <ellipse cx="34" cy="30" rx="13" ry="11" fill="#c85820"/>
        <ellipse cx="55" cy="31" rx="14" ry="12" fill="#e8940a"/>
        <rect x="252" y="32" width="10" height="45" fill="#6b4a20" rx="3"/>
        <ellipse cx="257" cy="25" rx="22" ry="18" fill="#d4780a"/>
        <ellipse cx="245" cy="22" rx="16" ry="13" fill="#c85820"/>
        <ellipse cx="270" cy="20" rx="18" ry="14" fill="#e8940a"/>
        <ellipse cx="257" cy="14" rx="18" ry="14" fill="#b83a08"/>
        <rect x="275" y="40" width="8" height="37" fill="#6b4a20" rx="2"/>
        <ellipse cx="279" cy="32" rx="16" ry="14" fill="#c85820"/>
        <ellipse cx="268" cy="28" rx="13" ry="11" fill="#d4780a"/>
        <ellipse cx="290" cy="29" rx="14" ry="12" fill="#e8940a"/>
        <rect x="118" y="68" width="64" height="4" fill="#8b6340" rx="2"/>
        <rect x="122" y="72" width="4" height="7" fill="#6b4a20" rx="1"/>
        <rect x="174" y="72" width="4" height="7" fill="#6b4a20" rx="1"/>
        <rect x="118" y="63" width="64" height="3" fill="#a07040" rx="1"/>
        {[20,50,80,110,170,200,230,260].map((x,i) => (
          <ellipse key={i} cx={x} cy={78+i%3*2} rx="4" ry="2" fill={["#c85820","#e8940a","#d4780a","#c84a10"][i%4]} opacity="0.6" transform={`rotate(${i*15} ${x} ${78+i%3*2})`}/>
        ))}
      </svg>
      {[...Array(10)].map((_, i) => (
        <div key={i} className={i%2===0?"leaf":"leaf2"} style={{
          left:`${5+i*9}%`, background:["#c85820","#e8940a","#d4780a","#c84a10"][i%4],
          animationDuration:`${2.5+(i%4)*0.7}s`, animationDelay:`${i*0.4}s`, top:0
        }}/>
      ))}
    </div>
  );
}

function BgNightCafe() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#150c07" }}>
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:0.9} 50%{opacity:0.3} }
        @keyframes steamRise { 0%{transform:translateY(0) scaleX(1);opacity:0.5} 50%{transform:translateY(-8px) scaleX(1.3);opacity:0.3} 100%{transform:translateY(-16px) scaleX(0.8);opacity:0} }
        @keyframes lampGlow { 0%,100%{opacity:0.2} 50%{opacity:0.35} }
        .star-t { animation: starTwinkle ease-in-out infinite; }
        .steam-r { position:absolute; width:2px; border-radius:2px; background:rgba(245,232,208,0.6); animation: steamRise ease-out infinite; }
        .lamp-glow-a { animation: lampGlow 2s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
        <rect width="300" height="100" fill="#150c07"/>
        <rect y="82" width="300" height="18" fill="#1e1008"/>
        <rect x="8" y="8" width="90" height="72" fill="#08121a" rx="4"/>
        <rect x="8" y="8" width="90" height="72" fill="none" stroke="#3a2010" strokeWidth="3" rx="4"/>
        <line x1="53" y1="8" x2="53" y2="80" stroke="#3a2010" strokeWidth="2.5"/>
        <line x1="8" y1="44" x2="98" y2="44" stroke="#3a2010" strokeWidth="2.5"/>
        {[[18,16],[30,12],[42,20],[65,14],[75,22],[85,10],[20,30],[48,8]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.8} fill="#fff" className="star-t" style={{ animationDelay:`${i*0.4}s`, animationDuration:`${1.5+i*0.3}s` }}/>
        ))}
        <circle cx="35" cy="25" r="7" fill="#f8e890" opacity="0.25"/>
        <circle cx="38" cy="23" r="6" fill="#08121a"/>
        <rect x="245" y="5" width="4" height="38" fill="#4a3020"/>
        <polygon points="238,5 258,5 254,22 242,22" fill="#c8a040" opacity="0.95"/>
        <ellipse cx="248" cy="22" rx="14" ry="4" fill="#f8c840" opacity="0.35" className="lamp-glow-a"/>
        <polygon points="238,22 258,22 270,82 226,82" fill="#f8c840" opacity="0.06" className="lamp-glow-a"/>
        <rect x="180" y="70" width="100" height="5" fill="#4a2e18" rx="2"/>
        <rect x="195" y="75" width="5" height="12" fill="#3a2010" rx="1"/>
        <rect x="265" y="75" width="5" height="12" fill="#3a2010" rx="1"/>
        <rect x="218" y="56" width="20" height="16" fill="#f5e8d0" rx="3"/>
        <rect x="218" y="56" width="20" height="4" fill="#d4b890" rx="3"/>
        <ellipse cx="228" cy="60" rx="7" ry="2" fill="#6b3a10" opacity="0.8"/>
        <path d="M238 59 Q245 59 245 64 Q245 69 238 69" fill="none" stroke="#f5e8d0" strokeWidth="2.5"/>
        <rect x="108" y="8" width="24" height="72" fill="#2a1508" rx="1"/>
        <rect x="110" y="12" width="4" height="16" fill="#4a7fa0" rx="1"/>
        <rect x="115" y="13" width="5" height="15" fill="#c85820" rx="1"/>
        <rect x="121" y="12" width="4" height="16" fill="#4a8a5a" rx="1"/>
        <rect x="110" y="32" width="5" height="13" fill="#c9a84e" rx="1"/>
        <rect x="116" y="30" width="4" height="15" fill="#7a4fa0" rx="1"/>
        <rect x="121" y="31" width="4" height="14" fill="#c97d4e" rx="1"/>
        <rect x="110" y="50" width="4" height="12" fill="#4a7fa0" rx="1"/>
        <rect x="115" y="49" width="5" height="13" fill="#b85c3a" rx="1"/>
        <rect x="121" y="50" width="4" height="12" fill="#4a8a5a" rx="1"/>
        <rect width="300" height="100" fill="#c87020" opacity="0.04"/>
      </svg>
      {[0,1,2].map(i => (
        <div key={i} className="steam-r" style={{
          left:`${61+i*1.2}%`, height:`${12+i*4}px`,
          animationDuration:`${1.2+i*0.3}s`, animationDelay:`${i*0.4}s`, bottom:"32%"
        }}/>
      ))}
    </div>
  );
}

function BgCherryBlossoms() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#fce8f0" }}>
      <style>{`
        @keyframes petalW { 0%{transform:translateY(-10px) translateX(0) rotate(0deg);opacity:0.9} 50%{transform:translateY(55px) translateX(20px) rotate(180deg);opacity:0.8} 100%{transform:translateY(120px) translateX(-10px) rotate(360deg);opacity:0} }
        @keyframes petalW2 { 0%{transform:translateY(-10px) translateX(0) rotate(45deg);opacity:0.8} 50%{transform:translateY(60px) translateX(-15px) rotate(210deg);opacity:0.7} 100%{transform:translateY(120px) translateX(10px) rotate(390deg);opacity:0} }
        @keyframes sunriseGlow { 0%,100%{opacity:0.35} 50%{opacity:0.55} }
        .petal-w { position:absolute; width:7px; height:6px; border-radius:50% 50% 50% 0; background:#f4b8c8; animation: petalW ease-in infinite; }
        .petal-w2 { position:absolute; width:6px; height:5px; border-radius:50% 0 50% 50%; background:#f8d0dc; animation: petalW2 ease-in infinite; }
        .sunrise-g { animation: sunriseGlow 3s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }}>
        <rect width="300" height="100" fill="#fce8f0"/>
        <rect width="300" height="65" fill="#f8d0e8" opacity="0.5"/>
        <circle cx="150" cy="22" r="18" fill="#fce8a0" opacity="0.35" className="sunrise-g"/>
        <circle cx="150" cy="22" r="11" fill="#fcd870" opacity="0.55" className="sunrise-g"/>
        <rect y="80" width="300" height="20" fill="#e0c8a0"/>
        <ellipse cx="150" cy="80" rx="160" ry="6" fill="#c8d880" opacity="0.8"/>
        <rect x="8" y="30" width="12" height="55" fill="#7a5535" rx="4"/>
        <line x1="14" y1="35" x2="35" y2="18" stroke="#7a5535" strokeWidth="5" strokeLinecap="round"/>
        <line x1="14" y1="42" x2="0"  y2="22" stroke="#7a5535" strokeWidth="4" strokeLinecap="round"/>
        <line x1="14" y1="38" x2="40" y2="32" stroke="#7a5535" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="35" cy="15" rx="22" ry="17" fill="#f4a8b8" opacity="0.85"/>
        <ellipse cx="20" cy="12" rx="18" ry="14" fill="#f8c0cc" opacity="0.8"/>
        <ellipse cx="48" cy="18" rx="18" ry="14" fill="#f4a0b4" opacity="0.75"/>
        <ellipse cx="28" cy="6"  rx="16" ry="12" fill="#f8d0dc" opacity="0.8"/>
        <ellipse cx="0"  cy="18" rx="14" ry="12" fill="#f4b8c8" opacity="0.75"/>
        <ellipse cx="42" cy="30" rx="14" ry="11" fill="#f8c8d4" opacity="0.7"/>
        <rect x="280" y="25" width="12" height="60" fill="#6b4a30" rx="4"/>
        <line x1="286" y1="30" x2="265" y2="15" stroke="#6b4a30" strokeWidth="5" strokeLinecap="round"/>
        <line x1="286" y1="38" x2="300" y2="18" stroke="#6b4a30" strokeWidth="4" strokeLinecap="round"/>
        <line x1="286" y1="34" x2="258" y2="27" stroke="#6b4a30" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="263" cy="13" rx="22" ry="17" fill="#f8c0cc" opacity="0.85"/>
        <ellipse cx="278" cy="10" rx="18" ry="14" fill="#f4a8b8" opacity="0.8"/>
        <ellipse cx="248" cy="17" rx="18" ry="14" fill="#f8d0dc" opacity="0.75"/>
        <ellipse cx="272" cy="4"  rx="16" ry="12" fill="#f4b8c8" opacity="0.8"/>
        <ellipse cx="300" cy="18" rx="14" ry="12" fill="#f8c0cc" opacity="0.75"/>
        <ellipse cx="252" cy="28" rx="14" ry="11" fill="#f4a0b4" opacity="0.7"/>
        {[[30,14],[42,8],[18,10],[55,20],[265,12],[278,6],[252,16],[290,22]].map(([x,y],i) => (
          <g key={i}><circle cx={x} cy={y} r="3" fill="#f8e0e8"/><circle cx={x} cy={y} r="1.2" fill="#f4a0b0"/></g>
        ))}
        <ellipse cx="150" cy="92" rx="50" ry="5" fill="#d4b890" opacity="0.5"/>
        {[20,50,80,120,160,200,240,270].map((x,i) => (
          <ellipse key={i} cx={x} cy={83+i%2*2} rx="3.5" ry="2" fill={i%2===0?"#f4b8c8":"#f8c8d4"} opacity="0.55" transform={`rotate(${i*20} ${x} ${83+i%2*2})`}/>
        ))}
      </svg>
      {[...Array(14)].map((_, i) => (
        <div key={i} className={i%2===0?"petal-w":"petal-w2"} style={{
          left:`${i*7}%`, animationDuration:`${2.2+(i%5)*0.5}s`, animationDelay:`${i*0.3}s`, top:0
        }}/>
      ))}
    </div>
  );
}

// ─── Background renderer ──────────────────────────────────────────────────────
function Background({ bgId }) {
  if (!bgId) return null;
  if (bgId === "bg1") return <BgCozyLibrary />;
  if (bgId === "bg2") return <BgRainyWindow />;
  if (bgId === "bg3") return <BgAutumnPark />;
  if (bgId === "bg4") return <BgNightCafe />;
  if (bgId === "bg5") return <BgCherryBlossoms />;
  return null;
}

// ─── PixelCat ─────────────────────────────────────────────────────────────────
export default function PixelCat({ mood, hat, outfit, bg, comp, petId="tabby", size=140, bgOnly=false }) {
  const id  = useRef("c" + Math.random().toString(36).substr(2, 6)).current;
  const p   = PET_STYLES[petId] || PET_STYLES.tabby;
  const fs  = size / 80;
  const compItem = SHOP.find(i => i.id === comp);
  const moodCls  = mood === "sleepy" ? "m-sleepy" : mood === "excited" ? "m-excited" : "m-neutral";

  if (bgOnly) return (
    <div style={{ position:"absolute", inset:0 }}>
      <Background bgId={bg} />
    </div>
  );

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
.${id}.dragon .body{background:repeating-linear-gradient(170deg,var(--fur-dark) 0,var(--fur-dark) 4%,transparent 4%,transparent 14%),radial-gradient(100% 80% at 50% 0,var(--fur-dark) 48%,transparent 52%),var(--fur);}
.${id} .leg{width:165%;height:38%;background:var(--fur);bottom:0;left:50%;translate:-50%;border-radius:8em 8em 100% 100%/10em 10em 16em 16em;scale:1 -1;}
.${id} .paw{width:35%;height:49%;border:0.75em solid #fff;border-top:0;border-radius:0 0 5em 5em;border-bottom:1em solid #fff;top:48%;rotate:-10deg;left:10%;clip-path:polygon(0 20%,100% 30%,100% 100%,0 100%);}
.${id} .paw+.paw{right:7%;height:50%;left:auto;rotate:13deg;scale:-1 1;clip-path:polygon(0 25%,100% 15%,100% 100%,0 100%);}
.${id}.black .paw{border-color:#333;}
.${id}.white .paw{border-color:#ddd;}
.${id} .ear{width:40%;aspect-ratio:1;border:4em solid var(--fur);border-radius:5% 90% 10% 80%;background:var(--skin);}
.${id} .ear+.ear{scale:-1 1;right:0;}
.${id}.dragon .ear{border-color:var(--fur);background:var(--skin);clip-path:polygon(50% 0%,100% 100%,0% 100%);}
.${id}.dragon .ear+.ear{scale:-1 1;right:0;}
.${id} .head{width:80%;aspect-ratio:1.1;background:linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);left:50%;translate:-50%;border-radius:100%/125% 125% 80% 75%;}
.${id}.tuxedo .head{background:radial-gradient(55% 40% at 50% 85%,#f0f0f0 50%,#e8e8e8 65%,transparent 75%),linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);}
.${id}.calico .head{background:radial-gradient(25% 20% at 20% 30%,#c97040 50%,transparent 65%),radial-gradient(20% 15% at 78% 20%,#5a3010 45%,transparent 60%),linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);}
.${id}.white .head{background:linear-gradient(#0001 0%,#0000 30%),var(--fur);}
.${id}.dragon .head{background:radial-gradient(30% 25% at 25% 35%,#3a8a4a 50%,transparent 65%),radial-gradient(25% 20% at 72% 25%,#2a6a3a 45%,transparent 60%),linear-gradient(#0003 0%,#0001 20%,#0000 50%),var(--fur);}
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
.${id} .scarf{width:40%;height:7%;background:#c84a3a;border-radius:2em;top:72%;left:50%;translate:-50%;z-index:10;}
.${id} .bowtie-l{width:9%;height:6%;background:#4a7fa0;clip-path:polygon(0 0,100% 20%,100% 80%,0 100%);top:68%;left:38%;z-index:10;}
.${id} .bowtie-r{width:9%;height:6%;background:#4a7fa0;clip-path:polygon(0 20%,100% 0,100% 100%,0 80%);top:68%;left:53%;z-index:10;}
.${id} .bowtie-c{width:4%;height:4%;background:#3a6a90;border-radius:50%;top:69%;left:50%;translate:-50%;z-index:10;}
.${id} .cape-l{width:55%;height:75%;background:linear-gradient(160deg,#7a1a1a,#4a0a0a);border-radius:0 0 0 6em;top:12%;left:0;z-index:0;opacity:0.7;}
.${id} .cape-r{width:55%;height:75%;background:linear-gradient(200deg,#7a1a1a,#4a0a0a);border-radius:0 0 6em 0;top:12%;right:0;z-index:0;opacity:0.7;}
.${id} .cape-l::before{content:"";position:absolute;width:25%;height:30%;background:#c9a84e;border-radius:0 0 2em 2em;top:0;right:0;}
.${id} .cape-r::before{content:"";position:absolute;width:25%;height:30%;background:#c9a84e;border-radius:0 0 2em 2em;top:0;left:0;}
.${id} .robe{width:110%;height:85%;background:linear-gradient(180deg,#1a4a2a 0%,#0a2a18 100%);border-radius:2em 2em 4em 4em;bottom:0;left:50%;translate:-50%;z-index:0;opacity:0.85;}
.${id} .robe::before{content:"";position:absolute;width:15%;height:55%;background:linear-gradient(180deg,#c9a84e,#a07830);border-radius:1em;top:8%;left:50%;translate:-50%;opacity:0.9;}
.${id} .cloak{width:110%;height:85%;background:linear-gradient(180deg,#1a0a3a 0%,#0a0520 100%);border-radius:2em 2em 4em 4em;bottom:0;left:50%;translate:-50%;z-index:0;opacity:0.85;}
.${id} .cloak::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 25% 25%,#fff3 0%,transparent 25%),radial-gradient(circle at 75% 35%,#fff2 0%,transparent 20%),radial-gradient(circle at 50% 65%,#fff2 0%,transparent 15%),radial-gradient(circle at 30% 70%,#fff2 0%,transparent 18%);border-radius:inherit;}
  `;

  const hatEl = hat === "hat1" ? <div className="hat-beanie" />
    : hat === "hat2" ? <div className="hat-witch" />
    : hat === "hat3" ? <div className="hat-crown" />
    : hat === "hat4" ? <div className="hat-grad" />
    : hat === "hat5" ? <div className="hat-halo" />
    : null;

  return (
    <div style={{ position:"relative", display:"inline-block", width:size, height:size }}>
      <Background bgId={bg} />
      <style>{css}</style>
      <article className={`${id} ${moodCls} ${petId}`} style={{ position:"relative", zIndex:1 }}>
        <div className="shadow" />
        <div className="tail" />
        <div className="body">
          <div className="leg" />
          <div className="leg" />
          <div className="paw" />
          <div className="paw" />
          {outfit === "out3" && <><div className="cape-l" /><div className="cape-r" /></>}
          {outfit === "out4" && <div className="robe" />}
          {outfit === "out5" && <div className="cloak" />}
        </div>
        <div className="ear" />
        <div className="ear" />
        {outfit === "out1" && <div className="scarf" />}
        {outfit === "out2" && <><div className="bowtie-l" /><div className="bowtie-r" /><div className="bowtie-c" /></>}
        <div className="head">
          <div className="whisker" />
          <div className="whisker" />
          <div className="whisker" />
          <div className="whisker" />
          <div className="eye" />
          <div className="eye" />
          <div className="nose" />
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
