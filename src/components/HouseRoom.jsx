import { SHOP } from "../data/constants";

// ─── Wallpaper Scenes ─────────────────────────────────────────────────────────

function WallpaperSakura() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes sakuraPetal { 0%{transform:translateY(-10px) rotate(0deg);opacity:0.8} 100%{transform:translateY(105%) rotate(360deg);opacity:0} }
        .sp { position:absolute; width:6px; height:6px; border-radius:50% 50% 50% 0; background:#f4b8c8; animation:sakuraPetal ease-in infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        <rect width="300" height="160" fill="#fce8f0"/>
        <rect width="300" height="160" fill="#f8d0e8" opacity="0.4"/>
        {/* soft clouds */}
        <ellipse cx="60"  cy="30" rx="40" ry="18" fill="#f8e0ec" opacity="0.6"/>
        <ellipse cx="200" cy="20" rx="50" ry="20" fill="#f8e0ec" opacity="0.5"/>
        <ellipse cx="270" cy="40" rx="35" ry="15" fill="#f8e0ec" opacity="0.4"/>
        {/* sun */}
        <circle cx="250" cy="35" r="18" fill="#fce8a0" opacity="0.4"/>
        <circle cx="250" cy="35" r="12" fill="#fcd870" opacity="0.5"/>
        {/* decorative blossoms on wall */}
        {[[30,50],[80,30],[150,60],[220,35],[270,55],[50,90],[180,80]].map(([x,y],i) => (
          <g key={i} opacity="0.3">
            <circle cx={x} cy={y} r="8" fill="#f4a8b8"/>
            <circle cx={x} cy={y} r="4" fill="#f8d0dc"/>
            <circle cx={x} cy={y} r="1.5" fill="#f4a0b0"/>
          </g>
        ))}
      </svg>
      {[...Array(8)].map((_,i) => (
        <div key={i} className="sp" style={{ left:`${i*13}%`, animationDuration:`${3+i*0.4}s`, animationDelay:`${i*0.5}s`, top:0 }}/>
      ))}
    </div>
  );
}

function WallpaperStarry() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.9} 50%{opacity:0.2} }
        .tw { position:absolute; border-radius:50%; background:#fff; animation:twinkle ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        <rect width="300" height="160" fill="#0a0a2a"/>
        <rect width="300" height="160" fill="#1a0a3a" opacity="0.6"/>
        {/* moon */}
        <circle cx="240" cy="35" r="20" fill="#f8e890" opacity="0.6"/>
        <circle cx="248" cy="30" r="16" fill="#0a0a2a"/>
        {/* nebula */}
        <ellipse cx="80" cy="60" rx="60" ry="40" fill="#3a1a6a" opacity="0.3"/>
        <ellipse cx="200" cy="80" rx="70" ry="45" fill="#1a2a6a" opacity="0.2"/>
        {/* stars */}
        {[[20,15],[45,30],[70,10],[100,25],[130,8],[160,20],[190,12],[220,28],[260,15],[280,35],
          [35,55],[90,45],[140,60],[200,50],[250,65],[15,80],[75,90],[160,75],[230,85],[285,70]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i%3===0?1.5:0.8} fill="#fff" opacity={0.4+i%3*0.2}/>
        ))}
        {/* shooting star */}
        <line x1="50" y1="20" x2="90" y2="40" stroke="#fff" strokeWidth="1" opacity="0.3"/>
      </svg>
      {[[10,15],[25,8],[45,20],[60,5],[80,18],[100,10],[120,22],[150,6],[170,16],[200,9],[220,20],[250,12],[270,25],[290,8]].map(([l,t],i) => (
        <div key={i} className="tw" style={{ left:`${l}%`, top:`${t}%`, width:i%3===0?3:2, height:i%3===0?3:2, animationDuration:`${1.5+i*0.2}s`, animationDelay:`${i*0.3}s` }}/>
      ))}
    </div>
  );
}

function WallpaperForest() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes leafSway { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        .ls { animation:leafSway ease-in-out infinite; transform-origin:bottom center; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        <rect width="300" height="160" fill="#d4f0d4"/>
        <rect width="300" height="80" fill="#a8d8a8" opacity="0.3"/>
        {/* trees background */}
        {[[20,160],[60,160],[100,160],[140,160],[180,160],[220,160],[260,160],[300,160]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x-4} y={y-60} width="8" height="60" fill="#6b4a20" rx="2"/>
            <ellipse cx={x} cy={y-65} rx={18+i%3*4} ry={22+i%2*6} fill={["#4a8a4a","#3a7a3a","#5a9a5a"][i%3]} opacity="0.7"/>
            <ellipse cx={x} cy={y-75} rx={14+i%3*3} ry={16+i%2*4} fill={["#5a9a5a","#4a8a4a","#6aaa6a"][i%3]} opacity="0.8"/>
          </g>
        ))}
        {/* sunbeams */}
        <line x1="150" y1="0" x2="100" y2="160" stroke="#f8f840" strokeWidth="8" opacity="0.06"/>
        <line x1="200" y1="0" x2="150" y2="160" stroke="#f8f840" strokeWidth="6" opacity="0.05"/>
        {/* small flowers */}
        {[[40,130],[90,140],[160,125],[210,135],[270,128]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={["#f8d820","#f8a8c8","#f8f8a8"][i%3]} opacity="0.7"/>
            <circle cx={x} cy={y} r="2" fill="#fff" opacity="0.8"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

function WallpaperBrick() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        <rect width="300" height="160" fill="#c8a888"/>
        {/* brick pattern */}
        {[0,1,2,3,4,5,6,7,8,9].map(row => (
          [0,1,2,3,4,5].map(col => {
            const x = col * 52 + (row % 2 === 0 ? 0 : 26);
            const y = row * 18;
            return (
              <g key={`${row}-${col}`}>
                <rect x={x} y={y} width="50" height="16" fill={row%3===0?"#b89878":row%3===1?"#c8a888":"#b08878"} rx="1"/>
                <rect x={x} y={y} width="50" height="16" fill="none" stroke="#a87858" strokeWidth="0.8" rx="1" opacity="0.5"/>
              </g>
            );
          })
        ))}
        {/* warm overlay */}
        <rect width="300" height="160" fill="#f8c880" opacity="0.08"/>
        {/* ivy vines */}
        <path d="M0 40 Q20 30 15 60 Q10 80 30 75 Q50 70 45 100" fill="none" stroke="#4a8a4a" strokeWidth="2" opacity="0.5"/>
        <ellipse cx="15" cy="55" rx="8" ry="6" fill="#5a9a5a" opacity="0.4" transform="rotate(-20 15 55)"/>
        <ellipse cx="30" cy="78" rx="7" ry="5" fill="#4a8a4a" opacity="0.4" transform="rotate(15 30 78)"/>
        <path d="M280 20 Q260 35 265 65 Q270 90 250 85" fill="none" stroke="#4a8a4a" strokeWidth="2" opacity="0.5"/>
        <ellipse cx="263" cy="50" rx="8" ry="6" fill="#5a9a5a" opacity="0.4" transform="rotate(20 263 50)"/>
      </svg>
    </div>
  );
}

function WallpaperCloud() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes cloudMove { 0%{transform:translateX(0)} 100%{transform:translateX(30px)} }
        .cm { animation:cloudMove ease-in-out infinite alternate; }
        .cm2 { animation:cloudMove ease-in-out infinite alternate-reverse; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        <rect width="300" height="160" fill="#e8f4fc"/>
        <rect width="300" height="160" fill="#d4ecf8" opacity="0.5"/>
        {/* rainbow */}
        <path d="M20 140 Q150 20 280 140" fill="none" stroke="#f8d820" strokeWidth="4" opacity="0.15"/>
        <path d="M30 140 Q150 30 270 140" fill="none" stroke="#f8a820" strokeWidth="4" opacity="0.12"/>
        <path d="M40 140 Q150 40 260 140" fill="none" stroke="#f84820" strokeWidth="4" opacity="0.1"/>
        <path d="M50 140 Q150 50 250 140" fill="none" stroke="#c840f8" strokeWidth="4" opacity="0.1"/>
        <path d="M60 140 Q150 60 240 140" fill="none" stroke="#4080f8" strokeWidth="4" opacity="0.1"/>
      </svg>
      {/* animated clouds */}
      <div className="cm" style={{ position:"absolute", top:"10%", left:"5%", width:80, height:40 }}>
        <svg viewBox="0 0 80 40"><ellipse cx="40" cy="25" rx="35" ry="18" fill="white" opacity="0.9"/><ellipse cx="25" cy="28" rx="20" ry="14" fill="white" opacity="0.9"/><ellipse cx="55" cy="28" rx="22" ry="14" fill="white" opacity="0.9"/><ellipse cx="40" cy="18" rx="22" ry="15" fill="white" opacity="0.9"/></svg>
      </div>
      <div className="cm2" style={{ position:"absolute", top:"25%", left:"55%", width:100, height:50 }}>
        <svg viewBox="0 0 100 50"><ellipse cx="50" cy="32" rx="45" ry="22" fill="white" opacity="0.85"/><ellipse cx="30" cy="35" rx="25" ry="17" fill="white" opacity="0.85"/><ellipse cx="70" cy="35" rx="28" ry="17" fill="white" opacity="0.85"/><ellipse cx="50" cy="22" rx="28" ry="18" fill="white" opacity="0.85"/></svg>
      </div>
      <div className="cm" style={{ position:"absolute", top:"5%", left:"70%", width:70, height:35, animationDuration:"6s" }}>
        <svg viewBox="0 0 70 35"><ellipse cx="35" cy="22" rx="30" ry="15" fill="white" opacity="0.8"/><ellipse cx="20" cy="24" rx="18" ry="12" fill="white" opacity="0.8"/><ellipse cx="50" cy="24" rx="20" ry="12" fill="white" opacity="0.8"/><ellipse cx="35" cy="15" rx="20" ry="13" fill="white" opacity="0.8"/></svg>
      </div>
    </div>
  );
}

// ─── Floor Scenes ─────────────────────────────────────────────────────────────

function FloorWood() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#c8a060"/>
      {[0,1,2,3,4].map(row => (
        [0,1,2,3,4,5].map(col => {
          const x = col * 52 + (row%2===0?0:26);
          const y = row * 10;
          return <rect key={`${row}-${col}`} x={x} y={y} width="50" height="9" fill={row%2===0?"#c8a060":"#b89050"} stroke="#a07840" strokeWidth="0.5" rx="0.5"/>;
        })
      ))}
      {/* shine */}
      <rect width="300" height="40" fill="#f8e8c0" opacity="0.1"/>
    </svg>
  );
}

function FloorTile() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#d8e8f8"/>
      {[0,1,2,3].map(row => (
        [0,1,2,3,4,5,6,7].map(col => {
          const x = col * 40;
          const y = row * 12;
          const colors = ["#d8e8f8","#c8d8f0","#e0eef8","#c0d0e8"];
          return <rect key={`${row}-${col}`} x={x+0.5} y={y+0.5} width="39" height="11" fill={colors[(row+col)%4]} stroke="#b8c8e0" strokeWidth="0.5" rx="1"/>;
        })
      ))}
    </svg>
  );
}

function FloorGrass() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#7ab870"/>
      <rect width="300" height="40" fill="#8ac880" opacity="0.5"/>
      {/* grass blades */}
      {[5,15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="40" x2={x-3} y2={28+i%4*2} stroke="#5a9a5a" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={x+3} y1="40" x2={x+5} y2={26+i%3*3} stroke="#4a8a4a" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      ))}
      {/* small flowers */}
      {[20,60,110,160,200,250,290].map((x,i) => (
        <circle key={i} cx={x} cy={32} r="2.5" fill={["#f8d820","#f8a8c8","#f8f8a8"][i%3]} opacity="0.8"/>
      ))}
    </svg>
  );
}

function FloorStar() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#1a1040"/>
      <rect width="300" height="40" fill="#2a1a60" opacity="0.6"/>
      {/* star pattern */}
      {[20,60,100,140,180,220,260,300].map((x,i) => (
        <g key={i}>
          <circle cx={x} cy={20} r="1.5" fill="#f8e840" opacity="0.8"/>
          <circle cx={x+20} cy={10} r="1" fill="#f8e840" opacity="0.5"/>
          <circle cx={x+10} cy={30} r="1" fill="#fff" opacity="0.4"/>
        </g>
      ))}
      {/* shimmer */}
      <rect width="300" height="40" fill="#8060f8" opacity="0.08"/>
    </svg>
  );
}

// ─── Furniture Items ──────────────────────────────────────────────────────────

const FURNITURE_RENDERS = {
  fu1: ({ size }) => ( // Bookshelf
    <svg width={size} height={size*1.4} viewBox="0 0 60 84">
      <rect x="2" y="2" width="56" height="80" fill="#8b6340" rx="3" stroke="#6b4a28" strokeWidth="1.5"/>
      <rect x="2" y="28" width="56" height="3" fill="#6b4a28"/>
      <rect x="2" y="55" width="56" height="3" fill="#6b4a28"/>
      <rect x="6"  y="6"  width="6"  height="20" fill="#4a7fa0" rx="1"/>
      <rect x="13" y="8"  width="5"  height="18" fill="#b85c3a" rx="1"/>
      <rect x="19" y="6"  width="7"  height="20" fill="#4a8a5a" rx="1"/>
      <rect x="27" y="7"  width="5"  height="19" fill="#c9a84e" rx="1"/>
      <rect x="33" y="6"  width="6"  height="20" fill="#7a4fa0" rx="1"/>
      <rect x="40" y="8"  width="5"  height="18" fill="#c97d4e" rx="1"/>
      <rect x="46" y="6"  width="8"  height="20" fill="#4a7fa0" rx="1"/>
      <rect x="6"  y="33" width="7"  height="18" fill="#c85820" rx="1"/>
      <rect x="14" y="33" width="5"  height="18" fill="#4a7fa0" rx="1"/>
      <rect x="20" y="33" width="6"  height="18" fill="#7a4fa0" rx="1"/>
      <rect x="27" y="35" width="5"  height="16" fill="#4a8a5a" rx="1"/>
      <rect x="33" y="33" width="7"  height="18" fill="#c9a84e" rx="1"/>
      <rect x="41" y="34" width="5"  height="17" fill="#b85c3a" rx="1"/>
      <rect x="47" y="33" width="7"  height="18" fill="#c97d4e" rx="1"/>
      <rect x="6"  y="60" width="8"  height="16" fill="#4a8a5a" rx="1"/>
      <rect x="15" y="62" width="5"  height="14" fill="#7a4fa0" rx="1"/>
      <rect x="21" y="60" width="7"  height="16" fill="#c9a84e" rx="1"/>
      <rect x="29" y="61" width="5"  height="15" fill="#4a7fa0" rx="1"/>
      <rect x="35" y="60" width="6"  height="16" fill="#b85c3a" rx="1"/>
      <rect x="42" y="62" width="5"  height="14" fill="#c85820" rx="1"/>
      <rect x="48" y="60" width="8"  height="16" fill="#4a8a5a" rx="1"/>
    </svg>
  ),
  fu2: ({ size }) => ( // Cozy Couch
    <svg width={size*1.6} height={size} viewBox="0 0 96 60">
      {/* legs */}
      <rect x="8"  y="52" width="6" height="8" fill="#8b6340" rx="2"/>
      <rect x="82" y="52" width="6" height="8" fill="#8b6340" rx="2"/>
      {/* seat */}
      <rect x="4"  y="30" width="88" height="28" fill="#c97d4e" rx="4" stroke="#a06030" strokeWidth="1.5"/>
      {/* cushions */}
      <rect x="8"  y="32" width="36" height="22" fill="#d4906a" rx="3"/>
      <rect x="52" y="32" width="36" height="22" fill="#d4906a" rx="3"/>
      {/* back */}
      <rect x="4"  y="10" width="88" height="24" fill="#c97d4e" rx="4" stroke="#a06030" strokeWidth="1.5"/>
      {/* armrests */}
      <rect x="0"  y="18" width="14" height="40" fill="#b86030" rx="4" stroke="#a06030" strokeWidth="1.5"/>
      <rect x="82" y="18" width="14" height="40" fill="#b86030" rx="4" stroke="#a06030" strokeWidth="1.5"/>
      {/* pillow */}
      <rect x="30" y="12" width="36" height="16" fill="#e8a070" rx="3"/>
      <line x1="48" y1="12" x2="48" y2="28" stroke="#d08060" strokeWidth="1"/>
    </svg>
  ),
  fu3: ({ size }) => ( // Plant
    <svg width={size*0.7} height={size*1.2} viewBox="0 0 42 72">
      {/* pot */}
      <rect x="12" y="52" width="18" height="18" fill="#c97d4e" rx="2" stroke="#a06030" strokeWidth="1.5"/>
      <rect x="10" y="50" width="22" height="5"  fill="#b86030" rx="2"/>
      {/* soil */}
      <ellipse cx="21" cy="52" rx="9" ry="3" fill="#6b4a20" opacity="0.6"/>
      {/* stem */}
      <line x1="21" y1="52" x2="21" y2="25" stroke="#4a8a2a" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="21" y1="40" x2="10" y2="28" stroke="#4a8a2a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="35" x2="32" y2="24" stroke="#4a8a2a" strokeWidth="2" strokeLinecap="round"/>
      {/* leaves */}
      <ellipse cx="21" cy="18" rx="12" ry="10" fill="#5a9a3a" transform="rotate(-10 21 18)"/>
      <ellipse cx="8"  cy="24" rx="10" ry="8"  fill="#4a8a2a" transform="rotate(20 8 24)"/>
      <ellipse cx="34" cy="20" rx="10" ry="8"  fill="#6aaa4a" transform="rotate(-15 34 20)"/>
      <ellipse cx="21" cy="10" rx="9"  ry="8"  fill="#5a9a3a"/>
    </svg>
  ),
  fu4: ({ size }) => ( // Study Desk
    <svg width={size*1.5} height={size} viewBox="0 0 90 60">
      {/* legs */}
      <rect x="6"  y="36" width="6" height="24" fill="#8b6340" rx="2"/>
      <rect x="78" y="36" width="6" height="24" fill="#8b6340" rx="2"/>
      {/* desk surface */}
      <rect x="2"  y="28" width="86" height="10" fill="#c8a060" rx="3" stroke="#a07840" strokeWidth="1.5"/>
      {/* shelf back */}
      <rect x="20" y="4"  width="50" height="26" fill="#d4b070" rx="2" stroke="#a07840" strokeWidth="1"/>
      {/* shelf items */}
      <rect x="24" y="8"  width="6"  height="18" fill="#4a7fa0" rx="1"/>
      <rect x="31" y="10" width="5"  height="16" fill="#b85c3a" rx="1"/>
      <rect x="37" y="8"  width="7"  height="18" fill="#4a8a5a" rx="1"/>
      {/* monitor */}
      <rect x="48" y="6"  width="18" height="14" fill="#1a1a2a" rx="2"/>
      <rect x="50" y="8"  width="14" height="10" fill="#3a6aa0" rx="1"/>
      <rect x="55" y="20" width="4"  height="4"  fill="#2a2a3a" rx="1"/>
      {/* pencil cup */}
      <rect x="8"  y="20" width="10" height="10" fill="#c97d4e" rx="2"/>
      <line x1="11" y1="20" x2="9"  y2="12" stroke="#4a7fa0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="20" x2="13" y2="10" stroke="#b85c3a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="20" x2="16" y2="11" stroke="#4a8a5a" strokeWidth="1.5" strokeLinecap="round"/>
      {/* book on desk */}
      <rect x="60" y="24" width="22" height="6" fill="#7a4fa0" rx="1" transform="rotate(-5 60 24)"/>
    </svg>
  ),
  fu5: ({ size }) => ( // Candle
    <svg width={size*0.5} height={size} viewBox="0 0 30 60">
      <style>{`.cf{animation:candleFlame 1.1s ease-in-out infinite;transform-origin:bottom center;}`}
        {`@keyframes candleFlame{0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(0.85) scaleX(1.1)}}`}
      </style>
      {/* holder */}
      <ellipse cx="15" cy="54" rx="12" ry="5" fill="#c9a84e" stroke="#a08030" strokeWidth="1"/>
      <rect x="9" y="46" width="12" height="10" fill="#c9a84e" rx="2" stroke="#a08030" strokeWidth="1"/>
      {/* candle body */}
      <rect x="10" y="18" width="10" height="30" fill="#f5e8d0" rx="2" stroke="#d0c0a0" strokeWidth="1"/>
      {/* wax drips */}
      <path d="M10 28 Q8 32 9 36" fill="none" stroke="#f5e8d0" strokeWidth="2"/>
      <path d="M20 32 Q22 36 21 40" fill="none" stroke="#f5e8d0" strokeWidth="2"/>
      {/* flame */}
      <g className="cf">
        <ellipse cx="15" cy="14" rx="4"  ry="6"  fill="#f8a820" opacity="0.9"/>
        <ellipse cx="15" cy="12" rx="2.5" ry="4" fill="#f8d820" opacity="0.9"/>
        <ellipse cx="15" cy="10" rx="1.5" ry="3" fill="#fff"    opacity="0.8"/>
      </g>
      {/* glow */}
      <ellipse cx="15" cy="14" rx="8" ry="10" fill="#f8c820" opacity="0.1"/>
      {/* wick */}
      <line x1="15" y1="18" x2="15" y2="16" stroke="#2a2010" strokeWidth="1.5"/>
    </svg>
  ),
  fu6: ({ size }) => ( // Floor Lamp
    <svg width={size*0.6} height={size*1.5} viewBox="0 0 36 90">
      <style>{`.lg{animation:lampGlow 2s ease-in-out infinite;}`}
        {`@keyframes lampGlow{0%,100%{opacity:0.3}50%{opacity:0.6}}`}
      </style>
      {/* base */}
      <ellipse cx="18" cy="86" rx="14" ry="5" fill="#8b6340" stroke="#6b4a28" strokeWidth="1"/>
      <rect x="14" y="78" width="8" height="10" fill="#8b6340" rx="2"/>
      {/* pole */}
      <line x1="18" y1="78" x2="18" y2="22" stroke="#8b6340" strokeWidth="3" strokeLinecap="round"/>
      {/* arm */}
      <line x1="18" y1="22" x2="24" y2="16" stroke="#8b6340" strokeWidth="2.5" strokeLinecap="round"/>
      {/* shade */}
      <polygon points="12,6 30,6 26,20 8,20" fill="#c9a84e" stroke="#a08030" strokeWidth="1.5"/>
      {/* light glow */}
      <ellipse cx="19" cy="20" rx="12" ry="6" fill="#f8c840" opacity="0.3" className="lg"/>
      <polygon points="8,20 26,20 32,50 2,50" fill="#f8e840" opacity="0.06" className="lg"/>
      {/* bulb */}
      <circle cx="19" cy="14" r="3" fill="#f8e890" opacity="0.8"/>
    </svg>
  ),
  fu7: ({ size }) => ( // Tea Set
    <svg width={size*1.2} height={size*0.8} viewBox="0 0 72 48">
      {/* tray */}
      <ellipse cx="36" cy="44" rx="32" ry="5" fill="#c9a84e" stroke="#a08030" strokeWidth="1"/>
      {/* teapot body */}
      <ellipse cx="22" cy="34" rx="14" ry="12" fill="#f5e8d0" stroke="#d0c0a0" strokeWidth="1.5"/>
      {/* teapot lid */}
      <ellipse cx="22" cy="22" rx="8" ry="4" fill="#f5e8d0" stroke="#d0c0a0" strokeWidth="1.5"/>
      <circle  cx="22" cy="19" r="2.5" fill="#c9a84e"/>
      {/* spout */}
      <path d="M36 30 Q44 26 46 30" fill="none" stroke="#d0c0a0" strokeWidth="3" strokeLinecap="round"/>
      {/* handle */}
      <path d="M8 28 Q2 34 8 40" fill="none" stroke="#d0c0a0" strokeWidth="3" strokeLinecap="round"/>
      {/* steam */}
      <path d="M20 20 Q18 14 20 8"  fill="none" stroke="#d0c0a0" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      <path d="M24 20 Q26 14 24 8"  fill="none" stroke="#d0c0a0" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      {/* cups */}
      <rect x="48" y="28" width="12" height="10" fill="#f5e8d0" rx="2" stroke="#d0c0a0" strokeWidth="1"/>
      <ellipse cx="54" cy="28" rx="6" ry="2" fill="#d0c0a0" opacity="0.5"/>
      <path d="M60 30 Q64 30 64 34 Q64 38 60 38" fill="none" stroke="#d0c0a0" strokeWidth="1.5"/>
      {/* tea in cup */}
      <ellipse cx="54" cy="30" rx="4" ry="1.5" fill="#8b5020" opacity="0.4"/>
    </svg>
  ),
  fu8: ({ size }) => ( // Stuffed Animal (bear)
    <svg width={size*0.8} height={size} viewBox="0 0 48 60">
      {/* ears */}
      <circle cx="14" cy="8"  r="8"  fill="#c8a070" stroke="#a08050" strokeWidth="1.5"/>
      <circle cx="34" cy="8"  r="8"  fill="#c8a070" stroke="#a08050" strokeWidth="1.5"/>
      <circle cx="14" cy="8"  r="4"  fill="#d4785a"/>
      <circle cx="34" cy="8"  r="4"  fill="#d4785a"/>
      {/* head */}
      <circle cx="24" cy="20" r="16" fill="#c8a070" stroke="#a08050" strokeWidth="1.5"/>
      {/* face */}
      <ellipse cx="24" cy="24" rx="8"  ry="6" fill="#d4906a" opacity="0.6"/>
      {/* eyes */}
      <circle cx="18" cy="16" r="3"   fill="#2a1a0a"/>
      <circle cx="30" cy="16" r="3"   fill="#2a1a0a"/>
      <circle cx="19" cy="15" r="1"   fill="#fff" opacity="0.7"/>
      <circle cx="31" cy="15" r="1"   fill="#fff" opacity="0.7"/>
      {/* nose */}
      <ellipse cx="24" cy="22" rx="3" ry="2" fill="#2a1a0a"/>
      {/* mouth */}
      <path d="M21 25 Q24 28 27 25" fill="none" stroke="#2a1a0a" strokeWidth="1.5" strokeLinecap="round"/>
      {/* body */}
      <ellipse cx="24" cy="46" rx="14" ry="13" fill="#c8a070" stroke="#a08050" strokeWidth="1.5"/>
      {/* belly */}
      <ellipse cx="24" cy="46" rx="8"  ry="8"  fill="#d4906a" opacity="0.5"/>
      {/* arms */}
      <ellipse cx="8"  cy="40" rx="6"  ry="10" fill="#c8a070" stroke="#a08050" strokeWidth="1" transform="rotate(-20 8 40)"/>
      <ellipse cx="40" cy="40" rx="6"  ry="10" fill="#c8a070" stroke="#a08050" strokeWidth="1" transform="rotate(20 40 40)"/>
      {/* bow */}
      <path d="M18 34 Q24 31 30 34 Q24 37 18 34Z" fill="#d4607a"/>
      <circle cx="24" cy="34" r="2" fill="#b84060"/>
    </svg>
  ),
  fu9: ({ size }) => ( // Magic Cauldron
    <svg width={size} height={size*0.9} viewBox="0 0 60 54">
      <style>{`.mb{animation:magicBubble 1.5s ease-in-out infinite;}`}
        {`@keyframes magicBubble{0%,100%{transform:translateY(0);opacity:0.8}50%{transform:translateY(-8px);opacity:0.3}}`}
      </style>
      {/* legs */}
      <line x1="16" y1="48" x2="12" y2="54" stroke="#2a1a3a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="30" y2="54" stroke="#2a1a3a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="48" x2="48" y2="54" stroke="#2a1a3a" strokeWidth="3" strokeLinecap="round"/>
      {/* cauldron */}
      <path d="M8 20 Q6 48 30 50 Q54 48 52 20Z" fill="#2a1a3a" stroke="#4a2a5a" strokeWidth="2"/>
      {/* rim */}
      <ellipse cx="30" cy="20" rx="22" ry="7" fill="#3a2a4a" stroke="#5a3a6a" strokeWidth="2"/>
      {/* liquid */}
      <ellipse cx="30" cy="20" rx="18" ry="5" fill="#7a20c0" opacity="0.8"/>
      <ellipse cx="30" cy="20" rx="14" ry="3" fill="#9040e0" opacity="0.6"/>
      {/* stars on cauldron */}
      <text x="14" y="40" fontSize="10" fill="#c9a84e" opacity="0.6">✦</text>
      <text x="36" y="38" fontSize="8"  fill="#c9a84e" opacity="0.5">✦</text>
      {/* bubbles */}
      <circle cx="24" cy="16" r="3" fill="#b060e0" opacity="0.7" className="mb" style={{ animationDelay:"0s" }}/>
      <circle cx="34" cy="14" r="2" fill="#c080f0" opacity="0.6" className="mb" style={{ animationDelay:"0.5s" }}/>
      <circle cx="28" cy="12" r="2.5" fill="#9040d0" opacity="0.7" className="mb" style={{ animationDelay:"1s" }}/>
      {/* sparkles */}
      <text x="10" y="12" fontSize="8" fill="#f8d820" opacity="0.8">✨</text>
      <text x="42" y="10" fontSize="7" fill="#f8d820" opacity="0.6">✨</text>
    </svg>
  ),
};

// ─── Room Renderer ────────────────────────────────────────────────────────────

function RoomWallpaper({ id }) {
  if (id === "hw1") return <WallpaperSakura />;
  if (id === "hw2") return <WallpaperStarry />;
  if (id === "hw3") return <WallpaperForest />;
  if (id === "hw4") return <WallpaperBrick />;
  if (id === "hw5") return <WallpaperCloud />;
  // default empty room
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="160" fill="#e8dcc8"/>
      <rect width="300" height="160" fill="#f0e8d8" opacity="0.5"/>
      {/* baseboard */}
      <rect y="140" width="300" height="8" fill="#c8b090" opacity="0.5"/>
    </svg>
  );
}

function RoomFloor({ id }) {
  if (id === "hf1") return <FloorWood />;
  if (id === "hf2") return <FloorTile />;
  if (id === "hf3") return <FloorGrass />;
  if (id === "hf4") return <FloorStar />;
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#c8a870"/>
      <rect width="300" height="40" fill="#d4b880" opacity="0.4"/>
    </svg>
  );
}

function FurnitureItem({ id, size = 64 }) {
  if (!id) return null;
  const Render = FURNITURE_RENDERS[id];
  if (!Render) return (
    <div style={{ width:size, height:size, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.5 }}>
      {SHOP.find(s => s.id === id)?.emoji || "?"}
    </div>
  );
  return <Render size={size} />;
}

// ─── Main HouseRoom ───────────────────────────────────────────────────────────
export default function HouseRoom({ house, petId, petMood, catElement, compact = false }) {
  const h = house || {};
  const roomHeight = compact ? 180 : 240;
  const floorHeight = compact ? 50 : 65;
  const furnSize = compact ? 52 : 72;

  return (
    <div style={{ position:"relative", width:"100%", height:roomHeight, borderRadius:14, overflow:"hidden", border:`2px solid #d4bfa8` }}>
      {/* wallpaper */}
      <div style={{ position:"absolute", inset:0, bottom:floorHeight }}>
        <RoomWallpaper id={h.wallpaper} />
      </div>

      {/* floor */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:floorHeight }}>
        <RoomFloor id={h.floor} />
      </div>

      {/* furniture slots */}
      <div style={{ position:"absolute", bottom:floorHeight-10, left:0, right:0, display:"flex", alignItems:"flex-end", justifyContent:"space-around", padding:"0 16px", zIndex:2 }}>
        {/* left slot */}
        <div style={{ display:"flex", alignItems:"flex-end", minWidth:furnSize+8 }}>
          {h.left ? <FurnitureItem id={h.left} size={furnSize} /> : (
            <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem" }}>+</div>
          )}
        </div>

        {/* center slot — cat lives here */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:3 }}>
          {catElement}
          {h.center && (
            <div style={{ marginTop:-8 }}>
              <FurnitureItem id={h.center} size={furnSize*0.7} />
            </div>
          )}
          {!h.center && !catElement && (
            <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem" }}>+</div>
          )}
        </div>

        {/* right slot */}
        <div style={{ display:"flex", alignItems:"flex-end", minWidth:furnSize+8 }}>
          {h.right ? <FurnitureItem id={h.right} size={furnSize} /> : (
            <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem" }}>+</div>
          )}
        </div>
      </div>
    </div>
  );
}
