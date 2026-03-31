import { SHOP } from "../data/constants";

// ─── Loft Wallpapers ──────────────────────────────────────────────────────────

function WallpaperIndustrialBrick() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes bulbFlicker { 0%,100%{opacity:1} 92%{opacity:0.7} 94%{opacity:1} 96%{opacity:0.8} }
        @keyframes bulbGlow { 0%,100%{opacity:0.15} 50%{opacity:0.25} }
        .bulb-f { animation: bulbFlicker 8s ease-in-out infinite; }
        .bulb-g { animation: bulbGlow 3s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        {/* brick wall background */}
        <rect width="300" height="160" fill="#8b5a3a"/>
        {/* brick rows */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(row => (
          [0,1,2,3,4,5,6,7].map(col => {
            const x = col * 40 + (row % 2 === 0 ? 0 : 20);
            const y = row * 14;
            const colors = ["#9b6a4a","#8b5a3a","#7a4a2a","#a06040"];
            return (
              <g key={`${row}-${col}`}>
                <rect x={x+1} y={y+1} width="37" height="12" fill={colors[(row+col)%4]} rx="1"/>
                <rect x={x+1} y={y+1} width="37" height="12" fill="none" stroke="#5a3020" strokeWidth="0.5" rx="1" opacity="0.4"/>
              </g>
            );
          })
        ))}
        {/* dark ceiling */}
        <rect width="300" height="18" fill="#2a1a0a" opacity="0.8"/>
        {/* metal pipes along ceiling */}
        <rect x="0" y="8" width="300" height="5" fill="#4a4a5a" rx="2"/>
        <rect x="0" y="6" width="300" height="2" fill="#6a6a7a" opacity="0.6"/>
        {/* pipe joints */}
        {[40,80,120,160,200,240].map((x,i) => (
          <g key={i}>
            <rect x={x-4} y="5" width="8" height="9" fill="#5a5a6a" rx="1"/>
            <rect x={x-2} y="14" width="4" height="20" fill="#4a4a5a" rx="1"/>
          </g>
        ))}
        {/* Edison bulbs hanging */}
        {[60,150,240].map((x,i) => (
          <g key={i} className="bulb-f" style={{ animationDelay:`${i*2.5}s` }}>
            {/* wire */}
            <line x1={x} y1="14" x2={x} y2="40" stroke="#2a1a0a" strokeWidth="1.5"/>
            {/* bulb glow */}
            <ellipse cx={x} cy="44" rx="14" ry="14" fill="#f8c840" opacity="0.2" className="bulb-g"/>
            {/* bulb glass */}
            <ellipse cx={x} cy="44" rx="7" ry="9" fill="#f8e890" opacity="0.9"/>
            <ellipse cx={x} cy="40" rx="4" ry="3" fill="#c8a020" opacity="0.8"/>
            {/* filament */}
            <path d={`M${x-3} 44 Q${x} 40 ${x+3} 44`} fill="none" stroke="#f8a020" strokeWidth="0.8" opacity="0.9"/>
          </g>
        ))}
        {/* warm glow pools on floor */}
        {[60,150,240].map((x,i) => (
          <ellipse key={i} cx={x} cy="155" rx="30" ry="8" fill="#f8c840" opacity="0.08" className="bulb-g"/>
        ))}
        {/* dark floor */}
        <rect y="140" width="300" height="20" fill="#1a0f08"/>
        <rect y="138" width="300" height="4" fill="#2a1808" opacity="0.8"/>
      </svg>
    </div>
  );
}

function WallpaperCityWindows() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes windowLight { 0%,100%{opacity:0.6} 50%{opacity:0.9} }
        @keyframes cityLight { 0%,100%{opacity:0.8} 50%{opacity:0.4} }
        .win-l { animation: windowLight 4s ease-in-out infinite; }
        .city-l { animation: cityLight ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        {/* interior wall - warm white */}
        <rect width="300" height="160" fill="#f0ece4"/>
        {/* floor-to-ceiling window frame */}
        <rect x="20" y="0" width="260" height="135" fill="#1a2a3a" rx="2"/>
        {/* sky gradient through window */}
        <rect x="22" y="2" width="256" height="133" fill="#1a1a2a"/>
        <rect x="22" y="2" width="256" height="60" fill="#2a1a3a" opacity="0.8"/>
        {/* golden hour sky */}
        <rect x="22" y="55" width="256" height="40" fill="#c87020" opacity="0.3"/>
        <rect x="22" y="75" width="256" height="30" fill="#f8a020" opacity="0.2"/>
        {/* city skyline silhouette */}
        <rect x="22"  y="80"  width="20" height="55" fill="#0a0a14"/>
        <rect x="25"  y="70"  width="14" height="10" fill="#0a0a14"/>
        <rect x="44"  y="90"  width="15" height="45" fill="#0a0a14"/>
        <rect x="61"  y="75"  width="25" height="60" fill="#0a0a14"/>
        <rect x="68"  y="65"  width="8"  height="12" fill="#0a0a14"/>
        <rect x="88"  y="85"  width="18" height="50" fill="#0a0a14"/>
        <rect x="108" y="72"  width="22" height="63" fill="#0a0a14"/>
        <rect x="112" y="60"  width="6"  height="14" fill="#0a0a14"/>
        <rect x="132" y="88"  width="16" height="47" fill="#0a0a14"/>
        <rect x="150" y="78"  width="28" height="57" fill="#0a0a14"/>
        <rect x="158" y="65"  width="8"  height="15" fill="#0a0a14"/>
        <rect x="180" y="82"  width="20" height="53" fill="#0a0a14"/>
        <rect x="202" y="70"  width="24" height="65" fill="#0a0a14"/>
        <rect x="210" y="58"  width="6"  height="14" fill="#0a0a14"/>
        <rect x="228" y="86"  width="18" height="49" fill="#0a0a14"/>
        <rect x="248" y="76"  width="22" height="59" fill="#0a0a14"/>
        <rect x="252" y="64"  width="6"  height="14" fill="#0a0a14"/>
        <rect x="272" y="84"  width="6"  height="51" fill="#0a0a14"/>
        {/* building windows lit up */}
        {[[65,78],[70,85],[70,92],[115,68],[115,75],[153,84],[153,91],[155,98],[204,75],[204,82],[210,68],[250,82],[250,89]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="4" height="3" fill="#f8e840" opacity="0.7"
            className="city-l" style={{ animationDelay:`${i*0.7}s`, animationDuration:`${2+i*0.4}s` }}/>
        ))}
        {/* window frame dividers */}
        <line x1="150" y1="0" x2="150" y2="135" stroke="#2a2a2a" strokeWidth="3"/>
        <line x1="20"  y1="67" x2="280" y2="67" stroke="#2a2a2a" strokeWidth="3"/>
        {/* window ledge */}
        <rect x="15" y="133" width="270" height="6" fill="#d4c8b0" rx="2"/>
        {/* floor */}
        <rect y="139" width="300" height="21" fill="#3a2810"/>
        {/* hardwood planks */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="0" y={139+i*4} width="300" height="3.5" fill={i%2===0?"#3a2810":"#4a3820"} opacity="0.8"/>
        ))}
        {/* room walls beside window */}
        <rect x="0" y="0" width="22" height="160" fill="#f0ece4"/>
        <rect x="278" y="0" width="22" height="160" fill="#f0ece4"/>
      </svg>
    </div>
  );
}

function WallpaperUrbanJungle() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes leafSway { 0%,100%{transform:rotate(-2deg) translateX(0)} 50%{transform:rotate(3deg) translateX(2px)} }
        @keyframes leafSway2 { 0%,100%{transform:rotate(2deg)} 50%{transform:rotate(-3deg)} }
        .leaf-s { animation: leafSway 4s ease-in-out infinite; transform-origin: bottom; }
        .leaf-s2 { animation: leafSway2 5s ease-in-out infinite; transform-origin: bottom; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        {/* white wall */}
        <rect width="300" height="160" fill="#f8f6f0"/>
        {/* subtle wall texture */}
        <rect width="300" height="160" fill="#f0ece4" opacity="0.3"/>
        {/* light source - diffused window */}
        <rect x="180" y="0" width="120" height="100" fill="#f8f0d8" opacity="0.4"/>
        {/* floor */}
        <rect y="132" width="300" height="28" fill="#c8a060"/>
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={i*44} y="132" width="43" height="28" fill={i%2===0?"#c8a060":"#b89050"} stroke="#a07840" strokeWidth="0.5"/>
        ))}
        {/* large monstera on left */}
        <rect x="8" y="105" width="18" height="30" fill="#8b6340" rx="3"/>
        <ellipse cx="17" cy="105" rx="8" ry="4" fill="#6b4a20" opacity="0.6"/>
        {[
          [17,95,30,18,"#4a8a3a",-15],[8,75,28,16,"#5a9a4a",10],
          [26,80,26,15,"#4a8a3a",-5],[5,60,32,18,"#3a7a2a",20],
          [28,65,24,14,"#5a9a4a",-20],[15,50,30,17,"#4a8a3a",5],
          [0,70,20,12,"#3a7a2a",15]
        ].map(([cx,cy,rx,ry,fill,rot],i) => (
          <g key={i} className={i%2===0?"leaf-s":"leaf-s2"}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} transform={`rotate(${rot} ${cx} ${cy})`}/>
            <line x1={cx} y1={cy} x2={cx} y2={cy+ry*0.8} stroke="#2a6a1a" strokeWidth="1.5" opacity="0.5" transform={`rotate(${rot} ${cx} ${cy})`}/>
          </g>
        ))}
        {/* pothos trailing from shelf on right */}
        <rect x="240" y="55" width="60" height="6" fill="#c8a870" rx="1"/>
        {/* trailing vines */}
        <path d="M255 61 Q250 75 255 90 Q252 105 248 118" fill="none" stroke="#4a8a3a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M265 61 Q270 78 265 95 Q262 110 258 125" fill="none" stroke="#5a9a4a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M275 61 Q278 80 272 100 Q268 115 265 132" fill="none" stroke="#4a8a3a" strokeWidth="2" strokeLinecap="round"/>
        {/* leaves on vines */}
        {[[252,75],[248,92],[244,110],[263,80],[260,97],[255,118],[270,85],[266,105],[262,125]].map(([x,y],i) => (
          <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill={["#4a8a3a","#5a9a4a","#3a7a2a"][i%3]}
            transform={`rotate(${i%2===0?-30:30} ${x} ${y})`} className={i%2===0?"leaf-s":"leaf-s2"}/>
        ))}
        {/* small potted plants on floor */}
        <rect x="130" y="118" width="12" height="14" fill="#c97d4e" rx="2"/>
        <ellipse cx="136" cy="118" rx="6" ry="2" fill="#a06030" opacity="0.7"/>
        <path d="M136 116 Q130 105 128 95" fill="none" stroke="#5a9a4a" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M136 116 Q142 106 144 96" fill="none" stroke="#4a8a3a" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M136 116 Q136 104 136 94" fill="none" stroke="#5a9a4a" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="128" cy="93" rx="9" ry="7" fill="#4a8a3a" className="leaf-s"/>
        <ellipse cx="144" cy="94" rx="9" ry="7" fill="#5a9a4a" className="leaf-s2"/>
        <ellipse cx="136" cy="91" rx="8" ry="6" fill="#3a7a2a"/>
      </svg>
    </div>
  );
}

function WallpaperArtistLoft() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes paintDrip { 0%{transform:scaleY(1)} 50%{transform:scaleY(1.05)} 100%{transform:scaleY(1)} }
        .paint-d { animation: paintDrip 3s ease-in-out infinite; transform-origin: top; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        {/* concrete wall */}
        <rect width="300" height="160" fill="#c8c0b8"/>
        {/* concrete texture */}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={i} x1="0" y1={i*18} x2="300" y2={i*18+3} stroke="#b8b0a8" strokeWidth="0.5" opacity="0.5"/>
        ))}
        {/* large window top right */}
        <rect x="200" y="0" width="100" height="100" fill="#a0b8c8" opacity="0.4" rx="2"/>
        <rect x="200" y="0" width="100" height="100" fill="none" stroke="#8a8880" strokeWidth="3" rx="2"/>
        <line x1="250" y1="0" x2="250" y2="100" stroke="#8a8880" strokeWidth="2"/>
        <line x1="200" y1="50" x2="300" y2="50" stroke="#8a8880" strokeWidth="2"/>
        {/* light streaming in */}
        <rect x="200" y="0" width="100" height="100" fill="#f8f0d8" opacity="0.15"/>
        {/* canvases leaning against wall */}
        {/* canvas 1 - large */}
        <rect x="18" y="55" width="45" height="60" fill="#f5f0e8" stroke="#8b6340" strokeWidth="2" transform="rotate(-5 40 85)"/>
        <rect x="20" y="58" width="41" height="54" fill="#4a7fa0" opacity="0.8" transform="rotate(-5 40 85)"/>
        <rect x="22" y="62" width="20" height="15" fill="#f8c840" opacity="0.7" transform="rotate(-5 40 85)"/>
        <rect x="34" y="70" width="15" height="30" fill="#c84040" opacity="0.6" transform="rotate(-5 40 85)"/>
        {/* canvas 2 - medium */}
        <rect x="68" y="70" width="35" height="45" fill="#f5f0e8" stroke="#8b6340" strokeWidth="2" transform="rotate(3 85 92)"/>
        <rect x="70" y="72" width="31" height="41" fill="#f8e8d0" opacity="0.9" transform="rotate(3 85 92)"/>
        {/* abstract swirls */}
        <path d="M72 85 Q80 78 88 85 Q82 92 72 85Z" fill="#c97d4e" opacity="0.7" transform="rotate(3 85 92)"/>
        <path d="M75 95 Q85 88 92 95 Q86 102 75 95Z" fill="#7a4fa0" opacity="0.6" transform="rotate(3 85 92)"/>
        {/* canvas 3 - small, front */}
        <rect x="55" y="90" width="25" height="30" fill="#f5f0e8" stroke="#8b6340" strokeWidth="2" transform="rotate(-2 67 105)"/>
        <rect x="57" y="92" width="21" height="26" fill="#1a2a1a" opacity="0.9" transform="rotate(-2 67 105)"/>
        <ellipse cx="67" cy="105" rx="7" ry="9" fill="#f8c840" opacity="0.8" transform="rotate(-2 67 105)"/>
        {/* paint palette on floor */}
        <ellipse cx="160" cy="148" rx="18" ry="12" fill="#8b6340" opacity="0.9"/>
        <ellipse cx="160" cy="148" rx="15" ry="9" fill="#d4b890"/>
        <circle cx="150" cy="145" r="3" fill="#c84040"/>
        <circle cx="157" cy="143" r="3" fill="#f8c840"/>
        <circle cx="164" cy="143" r="3" fill="#4a7fa0"/>
        <circle cx="170" cy="145" r="3" fill="#4a8a4a"/>
        <circle cx="155" cy="151" r="2" fill="#7a4fa0"/>
        <circle cx="165" cy="152" r="2" fill="#c97d4e"/>
        {/* paint tubes scattered */}
        <rect x="178" y="145" width="20" height="5" fill="#c84040" rx="2" transform="rotate(-20 188 147)"/>
        <rect x="185" y="150" width="18" height="5" fill="#4a7fa0" rx="2" transform="rotate(15 194 152)"/>
        {/* paint drips on wall */}
        <rect x="115" y="0" width="4" height="35" fill="#c84040" rx="2" opacity="0.7" className="paint-d"/>
        <rect x="125" y="0" width="3" height="28" fill="#f8c840" rx="2" opacity="0.6" className="paint-d" style={{ animationDelay:"1s" }}/>
        <rect x="133" y="0" width="4" height="42" fill="#4a7fa0" rx="2" opacity="0.7" className="paint-d" style={{ animationDelay:"0.5s" }}/>
        {/* floor */}
        <rect y="132" width="300" height="28" fill="#6a5a4a"/>
        {[0,1,2].map(i => (
          <rect key={i} x="0" y={132+i*9} width="300" height="8" fill={i%2===0?"#6a5a4a":"#5a4a3a"} opacity="0.8"/>
        ))}
      </svg>
    </div>
  );
}

function WallpaperLuxuryLoft() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <style>{`
        @keyframes goldShimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes moodLight { 0%,100%{opacity:0.2} 50%{opacity:0.35} }
        .gold-s { animation: goldShimmer 3s ease-in-out infinite; }
        .mood-l { animation: moodLight 4s ease-in-out infinite; }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
        {/* deep moody wall */}
        <rect width="300" height="160" fill="#1a1520"/>
        {/* marble accent panel center */}
        <rect x="80" y="0" width="140" height="130" fill="#2a2030" rx="2"/>
        {/* marble veining */}
        <path d="M85 10 Q110 30 105 55 Q100 80 120 100 Q135 115 130 130" fill="none" stroke="#3a3040" strokeWidth="2" opacity="0.6"/>
        <path d="M95 5 Q125 25 118 50 Q112 75 128 95 Q140 110 138 130" fill="none" stroke="#4a3850" strokeWidth="1.5" opacity="0.4"/>
        <path d="M160 0 Q145 20 152 45 Q158 70 145 95 Q138 112 148 130" fill="none" stroke="#3a3040" strokeWidth="2" opacity="0.5"/>
        <path d="M195 15 Q180 35 185 60 Q190 85 178 105 Q170 118 175 130" fill="none" stroke="#4a3850" strokeWidth="1.5" opacity="0.4"/>
        {/* gold frame around marble */}
        <rect x="80" y="0" width="140" height="130" fill="none" stroke="#c9a84e" strokeWidth="2" rx="2" className="gold-s"/>
        {/* gold corner accents */}
        {[[80,0],[218,0],[80,128],[218,128]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#c9a84e" className="gold-s"/>
          </g>
        ))}
        {/* sconce lights */}
        {[40,260].map((x,i) => (
          <g key={i}>
            {/* sconce arm */}
            <rect x={i===0?x:x-8} y="30" width="8" height="3" fill="#c9a84e"/>
            <rect x={i===0?x+8:x-8} y="25" width="3" height="12" fill="#c9a84e" rx="1"/>
            {/* shade */}
            <polygon points={i===0?`${x},25 ${x+16},25 ${x+13},42 ${x+3},42`:`${x-16},25 ${x},25 ${x-3},42 ${x-13},42`} fill="#2a1a08" opacity="0.9"/>
            {/* light glow */}
            <ellipse cx={i===0?x+8:x-8} cy="44" rx="20" ry="12" fill="#f8c840" opacity="0.15" className="mood-l"/>
            <ellipse cx={i===0?x+8:x-8} cy="35" rx="8" ry="6" fill="#f8e840" opacity="0.4" className="mood-l"/>
          </g>
        ))}
        {/* moody ambient light */}
        <ellipse cx="150" cy="80" rx="100" ry="70" fill="#7a40a0" opacity="0.06" className="mood-l"/>
        {/* gold skirting board */}
        <rect x="0" y="128" width="300" height="4" fill="#c9a84e" opacity="0.8" className="gold-s"/>
        {/* dark marble floor */}
        <rect y="132" width="300" height="28" fill="#0a0810"/>
        {/* floor veining */}
        <path d="M0 140 Q60 135 120 142 Q180 148 240 138 Q270 134 300 140" fill="none" stroke="#1a1520" strokeWidth="1.5" opacity="0.6"/>
        <path d="M30 148 Q90 144 150 150 Q210 155 270 148" fill="none" stroke="#1a1520" strokeWidth="1" opacity="0.4"/>
        {/* floor reflection */}
        <rect y="132" width="300" height="28" fill="#c9a84e" opacity="0.04" className="gold-s"/>
      </svg>
    </div>
  );
}

// ─── Loft Floors ─────────────────────────────────────────────────────────────

function FloorDarkHardwood() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#2a1808"/>
      {[0,1,2,3].map(row => (
        [0,1,2,3,4,5].map(col => {
          const x = col * 52 + (row%2===0?0:26);
          const y = row * 11;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width="51" height="10" fill={row%2===0?"#2a1808":"#3a2010"} stroke="#1a0f04" strokeWidth="0.5"/>
              <line x1={x+8} y1={y} x2={x+8} y2={y+10} stroke="#1a0f04" strokeWidth="0.3" opacity="0.3"/>
            </g>
          );
        })
      ))}
      <rect width="300" height="40" fill="#f8e8c0" opacity="0.04"/>
    </svg>
  );
}

function FloorPolishedConcrete() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#8a8880"/>
      <rect width="300" height="40" fill="#9a9890" opacity="0.5"/>
      {/* subtle texture lines */}
      {[5,12,19,26,33].map((y,i) => (
        <line key={i} x1="0" y1={y} x2="300" y2={y+1} stroke="#7a7870" strokeWidth="0.5" opacity="0.4"/>
      ))}
      {/* subtle shine */}
      <rect x="60" y="0" width="180" height="40" fill="#fff" opacity="0.04"/>
      <rect x="0" y="0" width="300" height="40" fill="#b8b8c0" opacity="0.06"/>
    </svg>
  );
}

function FloorHerringbone() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#a07840"/>
      {/* herringbone pattern */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
        <g key={i}>
          <rect x={i*22-4} y="0" width="10" height="20" fill={i%2===0?"#a07840":"#b08850"} stroke="#806030" strokeWidth="0.4" transform={`rotate(45 ${i*22+1} 10)`}/>
          <rect x={i*22-4} y="20" width="10" height="20" fill={i%2===0?"#b08850":"#a07840"} stroke="#806030" strokeWidth="0.4" transform={`rotate(-45 ${i*22+1} 30)`}/>
        </g>
      ))}
      <rect width="300" height="40" fill="#f8e8c0" opacity="0.05"/>
    </svg>
  );
}

function FloorWhiteOak() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#e8d8b8"/>
      {[0,1,2,3].map(row => (
        [0,1,2,3,4,5].map(col => {
          const x = col * 52 + (row%2===0?0:26);
          const y = row * 11;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width="51" height="10" fill={row%2===0?"#e8d8b8":"#d8c8a8"} stroke="#c8b890" strokeWidth="0.4"/>
              <line x1={x+15} y1={y} x2={x+15} y2={y+10} stroke="#c8b890" strokeWidth="0.3" opacity="0.4"/>
              <line x1={x+35} y1={y} x2={x+35} y2={y+10} stroke="#c8b890" strokeWidth="0.3" opacity="0.3"/>
            </g>
          );
        })
      ))}
      <rect width="300" height="40" fill="#fff" opacity="0.06"/>
    </svg>
  );
}

// ─── Loft Furniture ───────────────────────────────────────────────────────────
const FURNITURE_RENDERS = {

  fu1: ({ size }) => ( // Floor-to-ceiling bookshelf
    <svg width={size} height={size*1.5} viewBox="0 0 60 90">
      <rect x="2" y="0" width="56" height="90" fill="#2a1a0a" rx="2" stroke="#1a0f04" strokeWidth="1"/>
      <rect x="2" y="28" width="56" height="2" fill="#3a2810"/>
      <rect x="2" y="56" width="56" height="2" fill="#3a2810"/>
      {/* top shelf books */}
      <rect x="5"  y="4"  width="5"  height="22" fill="#4a7fa0" rx="1"/>
      <rect x="11" y="6"  width="4"  height="20" fill="#c84040" rx="1"/>
      <rect x="16" y="4"  width="6"  height="22" fill="#f8c840" rx="1"/>
      <rect x="23" y="5"  width="4"  height="21" fill="#4a8a4a" rx="1"/>
      <rect x="28" y="4"  width="5"  height="22" fill="#7a4fa0" rx="1"/>
      <rect x="34" y="6"  width="4"  height="20" fill="#c97d4e" rx="1"/>
      <rect x="39" y="4"  width="6"  height="22" fill="#1a1a2a" rx="1"/>
      <rect x="46" y="5"  width="5"  height="21" fill="#4a7fa0" rx="1"/>
      <rect x="52" y="4"  width="5"  height="22" fill="#c84040" rx="1"/>
      {/* middle shelf */}
      <rect x="5"  y="32" width="4"  height="22" fill="#c9a84e" rx="1"/>
      <rect x="10" y="32" width="6"  height="22" fill="#7a4fa0" rx="1"/>
      <rect x="17" y="34" width="5"  height="20" fill="#4a7fa0" rx="1"/>
      <rect x="23" y="32" width="4"  height="22" fill="#c84040" rx="1"/>
      {/* small object */}
      <rect x="29" y="42" width="10" height="12" fill="#8b6340" rx="1"/>
      <rect x="40" y="34" width="5"  height="20" fill="#4a8a4a" rx="1"/>
      <rect x="46" y="32" width="6"  height="22" fill="#c97d4e" rx="1"/>
      <rect x="53" y="33" width="4"  height="21" fill="#1a1a2a" rx="1"/>
      {/* bottom shelf */}
      <rect x="5"  y="60" width="6"  height="26" fill="#4a7fa0" rx="1"/>
      <rect x="12" y="62" width="5"  height="24" fill="#7a4fa0" rx="1"/>
      <rect x="18" y="60" width="4"  height="26" fill="#c84040" rx="1"/>
      <rect x="23" y="60" width="6"  height="26" fill="#c9a84e" rx="1"/>
      <rect x="30" y="62" width="5"  height="24" fill="#4a8a4a" rx="1"/>
      <rect x="36" y="60" width="4"  height="26" fill="#1a1a2a" rx="1"/>
      {/* plant on top */}
      <rect x="42" y="55" width="8"  height="8"  fill="#8b6340" rx="1"/>
      <ellipse cx="46" cy="53" rx="7" ry="5" fill="#4a8a3a"/>
      <ellipse cx="40" cy="56" rx="5" ry="4" fill="#5a9a4a"/>
      <ellipse cx="52" cy="56" rx="5" ry="4" fill="#3a7a2a"/>
    </svg>
  ),

  fu2: ({ size }) => ( // Leather sectional sofa
    <svg width={size*1.8} height={size} viewBox="0 0 108 60">
      {/* legs */}
      <rect x="8"  y="52" width="5" height="8" fill="#1a0f04" rx="1"/>
      <rect x="58" y="52" width="5" height="8" fill="#1a0f04" rx="1"/>
      <rect x="95" y="52" width="5" height="8" fill="#1a0f04" rx="1"/>
      {/* main seat */}
      <rect x="4"  y="28" width="66" height="28" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      {/* seat cushions */}
      <rect x="6"  y="30" width="30" height="22" fill="#3a2010" rx="2"/>
      <rect x="38" y="30" width="30" height="22" fill="#3a2010" rx="2"/>
      {/* cushion stitching */}
      <line x1="21" y1="30" x2="21" y2="52" stroke="#2a1808" strokeWidth="0.8"/>
      <line x1="53" y1="30" x2="53" y2="52" stroke="#2a1808" strokeWidth="0.8"/>
      {/* back rest */}
      <rect x="4"  y="14" width="66" height="18" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      <rect x="6"  y="16" width="30" height="14" fill="#3a2010" rx="2"/>
      <rect x="38" y="16" width="30" height="14" fill="#3a2010" rx="2"/>
      {/* armrests */}
      <rect x="0"  y="18" width="8"  height="38" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      <rect x="62" y="18" width="8"  height="38" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      {/* chaise section */}
      <rect x="70" y="28" width="36" height="28" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      <rect x="72" y="30" width="32" height="22" fill="#3a2010" rx="2"/>
      <rect x="100" y="18" width="8"  height="38" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      {/* throw pillow */}
      <rect x="44" y="20" width="14" height="12" fill="#c9a84e" rx="2"/>
      <line x1="44" y1="26" x2="58" y2="26" stroke="#a08030" strokeWidth="0.8"/>
      <line x1="51" y1="20" x2="51" y2="32" stroke="#a08030" strokeWidth="0.8"/>
    </svg>
  ),

  fu3: ({ size }) => ( // Fiddle leaf fig
    <svg width={size*0.7} height={size*1.4} viewBox="0 0 42 84">
      <style>{`.fiddle-sway { animation: fiddleSway 4s ease-in-out infinite; transform-origin: bottom center; } @keyframes fiddleSway { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(2deg)} }`}</style>
      {/* pot */}
      <rect x="12" y="68" width="18" height="16" fill="#8b6340" rx="2" stroke="#6b4a20" strokeWidth="1"/>
      <rect x="10" y="66" width="22" height="5"  fill="#a07040" rx="2"/>
      <ellipse cx="21" cy="68" rx="9" ry="2.5" fill="#6b4a20" opacity="0.5"/>
      {/* trunk */}
      <line x1="21" y1="67" x2="21" y2="30" stroke="#8b6340" strokeWidth="3" strokeLinecap="round"/>
      <line x1="21" y1="50" x2="14" y2="38" stroke="#8b6340" strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="42" x2="28" y2="30" stroke="#8b6340" strokeWidth="2" strokeLinecap="round"/>
      {/* large fiddle leaves */}
      {[
        [21,24,12,9,0,"#3a7a2a"],
        [13,34,11,8,-25,"#4a8a3a"],
        [29,26,11,8,20,"#4a8a3a"],
        [21,16,10,8,5,"#5a9a4a"],
        [10,26,10,7,-15,"#3a7a2a"],
        [32,34,9,7,30,"#5a9a4a"],
      ].map(([cx,cy,rx,ry,rot,fill],i) => (
        <g key={i} className="fiddle-sway" style={{ animationDelay:`${i*0.3}s` }}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} transform={`rotate(${rot} ${cx} ${cy})`}/>
          <line x1={cx} y1={cy+ry*0.8} x2={cx} y2={cy-ry*0.8} stroke="#2a6a1a" strokeWidth="0.8" opacity="0.5" transform={`rotate(${rot} ${cx} ${cy})`}/>
        </g>
      ))}
    </svg>
  ),

  fu4: ({ size }) => ( // Standing desk + monitor
    <svg width={size*1.6} height={size} viewBox="0 0 96 60">
      {/* desk legs */}
      <rect x="4"  y="36" width="4" height="24" fill="#3a3a4a" rx="1"/>
      <rect x="88" y="36" width="4" height="24" fill="#3a3a4a" rx="1"/>
      <rect x="14" y="42" width="4" height="18" fill="#3a3a4a" rx="1"/>
      <rect x="78" y="42" width="4" height="18" fill="#3a3a4a" rx="1"/>
      {/* desk surface */}
      <rect x="2"  y="32" width="92" height="6" fill="#d4b880" rx="2" stroke="#b09060" strokeWidth="1"/>
      {/* monitor */}
      <rect x="28" y="8"  width="40" height="26" fill="#1a1a1a" rx="3"/>
      <rect x="30" y="10" width="36" height="22" fill="#2a3a5a" rx="2"/>
      {/* screen content */}
      <rect x="32" y="12" width="32" height="3" fill="#4a7fa0" opacity="0.7" rx="1"/>
      <rect x="32" y="17" width="24" height="2" fill="#8aaac0" opacity="0.5" rx="1"/>
      <rect x="32" y="21" width="28" height="2" fill="#8aaac0" opacity="0.4" rx="1"/>
      <rect x="32" y="25" width="20" height="2" fill="#8aaac0" opacity="0.3" rx="1"/>
      {/* monitor stand */}
      <rect x="45" y="34" width="6" height="5"  fill="#2a2a2a" rx="1"/>
      <rect x="40" y="38" width="16" height="3" fill="#2a2a2a" rx="1"/>
      {/* keyboard */}
      <rect x="22" y="36" width="38" height="8"  fill="#2a2a2a" rx="2"/>
      {[0,1,2,3].map(row => (
        [0,1,2,3,4,5,6,7,8].map(col => (
          <rect key={`${row}-${col}`} x={24+col*4} y={37+row*2} width="3" height="1.5" fill="#3a3a4a" rx="0.5"/>
        ))
      ))}
      {/* coffee mug */}
      <rect x="72" y="26" width="10" height="12" fill="#f5e8d0" rx="2"/>
      <ellipse cx="77" cy="26" rx="5" ry="1.5" fill="#d4b890" opacity="0.7"/>
      <path d="M82 28 Q87 28 87 32 Q87 36 82 36" fill="none" stroke="#f5e8d0" strokeWidth="1.5"/>
      {/* steam */}
      <path d="M74 24 Q73 20 74 16" fill="none" stroke="#c8c0b8" strokeWidth="0.8" opacity="0.5" strokeLinecap="round"/>
      <path d="M78 24 Q79 20 78 16" fill="none" stroke="#c8c0b8" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
      {/* plant on desk */}
      <rect x="6"  y="24" width="8"  height="10" fill="#7a5535" rx="1"/>
      <ellipse cx="10" cy="22" rx="7" ry="5" fill="#5a9a4a"/>
      <ellipse cx="6"  cy="25" rx="5" ry="4" fill="#4a8a3a"/>
      <ellipse cx="14" cy="25" rx="5" ry="4" fill="#5a9a4a"/>
    </svg>
  ),

  fu5: ({ size }) => ( // Candle cluster
    <svg width={size*0.8} height={size*0.7} viewBox="0 0 48 42">
      <style>{`.cf2{animation:cf2 1.1s ease-in-out infinite;transform-origin:bottom center;} @keyframes cf2{0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(0.88) scaleX(1.1)}}`}</style>
      {/* tray */}
      <ellipse cx="24" cy="38" rx="22" ry="5" fill="#c9a84e" stroke="#a08030" strokeWidth="1"/>
      {/* tall candle */}
      <rect x="10" y="14" width="10" height="26" fill="#f5f0e8" rx="2" stroke="#d0c8b8" strokeWidth="0.5"/>
      {/* medium candle */}
      <rect x="24" y="20" width="9"  height="20" fill="#e8d8c8" rx="2" stroke="#d0c0a8" strokeWidth="0.5"/>
      {/* short candle */}
      <rect x="35" y="24" width="7"  height="16" fill="#f5e8d0" rx="2" stroke="#d0c8b0" strokeWidth="0.5"/>
      {/* very short */}
      <rect x="3"  y="28" width="6"  height="12" fill="#e8d8c0" rx="2" stroke="#c8b8a0" strokeWidth="0.5"/>
      {/* flames */}
      <g className="cf2">
        <ellipse cx="15" cy="12" rx="3" ry="4" fill="#f8a820" opacity="0.95"/>
        <ellipse cx="15" cy="10" rx="1.8" ry="2.5" fill="#f8d820" opacity="0.9"/>
        <ellipse cx="15" cy="8"  rx="1"   ry="1.5" fill="#fff"    opacity="0.8"/>
      </g>
      <g className="cf2" style={{ animationDelay:"0.3s" }}>
        <ellipse cx="28" cy="18" rx="2.5" ry="3.5" fill="#f8a820" opacity="0.95"/>
        <ellipse cx="28" cy="16" rx="1.5" ry="2.2" fill="#f8d820" opacity="0.9"/>
        <ellipse cx="28" cy="14" rx="0.8" ry="1.2" fill="#fff"    opacity="0.8"/>
      </g>
      <g className="cf2" style={{ animationDelay:"0.6s" }}>
        <ellipse cx="38" cy="22" rx="2.5" ry="3.5" fill="#f8a820" opacity="0.95"/>
        <ellipse cx="38" cy="20" rx="1.5" ry="2.2" fill="#f8d820" opacity="0.9"/>
      </g>
      <g className="cf2" style={{ animationDelay:"0.9s" }}>
        <ellipse cx="6"  cy="26" rx="2"   ry="3"   fill="#f8a820" opacity="0.95"/>
        <ellipse cx="6"  cy="24" rx="1.2" ry="2"   fill="#f8d820" opacity="0.9"/>
      </g>
      {/* warm glow on tray */}
      <ellipse cx="24" cy="38" rx="20" ry="4" fill="#f8c840" opacity="0.15"/>
    </svg>
  ),

  fu6: ({ size }) => ( // Record player
    <svg width={size*1.2} height={size*0.8} viewBox="0 0 72 48">
      <style>{`.record-spin{animation:recordSpin 3s linear infinite;transform-origin:36px 26px;} @keyframes recordSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      {/* cabinet base */}
      <rect x="2"  y="28" width="68" height="18" fill="#3a2010" rx="3" stroke="#2a1808" strokeWidth="1"/>
      <rect x="2"  y="28" width="68" height="4"  fill="#4a2818" rx="3"/>
      {/* legs */}
      <rect x="8"  y="44" width="4" height="6" fill="#2a1808" rx="1"/>
      <rect x="60" y="44" width="4" height="6" fill="#2a1808" rx="1"/>
      {/* turntable surface */}
      <rect x="2"  y="8"  width="68" height="22" fill="#2a1808" rx="3" stroke="#1a0f04" strokeWidth="1"/>
      {/* record */}
      <g className="record-spin">
        <circle cx="36" cy="26" r="16" fill="#1a1a1a"/>
        <circle cx="36" cy="26" r="12" fill="#222"/>
        <circle cx="36" cy="26" r="7"  fill="#c84040" opacity="0.9"/>
        <circle cx="36" cy="26" r="4"  fill="#1a1a1a"/>
        <circle cx="36" cy="26" r="1.5" fill="#c84040"/>
        {/* grooves */}
        {[9,11,13,15].map(r => (
          <circle key={r} cx="36" cy="26" r={r} fill="none" stroke="#2a2a2a" strokeWidth="0.3" opacity="0.5"/>
        ))}
      </g>
      {/* tonearm */}
      <line x1="56" y1="10" x2="44" y2="24" stroke="#8b6340" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="56" cy="10" r="3" fill="#6b4a20"/>
      <circle cx="43" cy="25" r="2" fill="#c9a84e"/>
      {/* control knobs */}
      <circle cx="8"  cy="34" r="3" fill="#4a4a5a"/>
      <circle cx="16" cy="34" r="3" fill="#4a4a5a"/>
      <circle cx="60" cy="34" r="3" fill="#c9a84e"/>
      {/* speaker grille on right */}
      {[30,33,36,39,42].map(y => (
        <line key={y} x1="50" y1={y} x2="66" y2={y} stroke="#2a2a2a" strokeWidth="0.5" opacity="0.4"/>
      ))}
    </svg>
  ),

  fu7: ({ size }) => ( // Pour-over coffee station
    <svg width={size*1.1} height={size} viewBox="0 0 66 60">
      <style>{`.steam-c{animation:steamCoffee 1.5s ease-out infinite;} @keyframes steamCoffee{0%{transform:translateY(0) scaleX(1);opacity:0.5}50%{transform:translateY(-8px) scaleX(1.2);opacity:0.25}100%{transform:translateY(-16px) scaleX(0.8);opacity:0}}`}</style>
      {/* wooden counter/shelf */}
      <rect x="0"  y="44" width="66" height="6"  fill="#8b6340" rx="2" stroke="#6b4a20" strokeWidth="1"/>
      <rect x="4"  y="50" width="4"  height="10" fill="#6b4a20" rx="1"/>
      <rect x="58" y="50" width="4"  height="10" fill="#6b4a20" rx="1"/>
      {/* kettle */}
      <ellipse cx="14" cy="36" rx="10" ry="10" fill="#3a3a4a" stroke="#2a2a3a" strokeWidth="1"/>
      <ellipse cx="14" cy="30" rx="6"  ry="3"  fill="#2a2a3a"/>
      <path d="M24 33 Q30 33 30 37 Q30 41 24 40" fill="none" stroke="#3a3a4a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 29 Q12 24 14 22" fill="none" stroke="#3a3a4a" strokeWidth="2" strokeLinecap="round"/>
      {/* kettle steam */}
      <path d="M13 20 Q11 15 13 10" fill="none" stroke="#c8c0b8" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" className="steam-c"/>
      {/* pour over dripper */}
      <polygon points="38,18 54,18 50,34 42,34" fill="#f5f0e8" stroke="#d0c8b8" strokeWidth="1"/>
      <rect x="41" y="22" width="14" height="10" fill="#c8b098" opacity="0.3"/>
      {/* filter lines */}
      <line x1="42" y1="20" x2="50" y2="32" stroke="#d0c0a0" strokeWidth="0.5" opacity="0.4"/>
      <line x1="46" y1="18" x2="46" y2="34" stroke="#d0c0a0" strokeWidth="0.5" opacity="0.4"/>
      <line x1="50" y1="20" x2="42" y2="32" stroke="#d0c0a0" strokeWidth="0.5" opacity="0.4"/>
      {/* carafe */}
      <rect x="39" y="32" width="18" height="14" fill="#f5f5f8" rx="2" stroke="#d0d0d8" strokeWidth="0.8" opacity="0.8"/>
      <rect x="41" y="34" width="14" height="4"  fill="#6b3a10" opacity="0.7" rx="1"/>
      <path d="M57 36 Q62 36 62 40 Q62 44 57 44" fill="none" stroke="#d0d0d8" strokeWidth="1.5"/>
      {/* coffee steam from dripper */}
      <path d="M44 17 Q43 12 44 7"  fill="none" stroke="#c8c0b8" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" className="steam-c" style={{ animationDelay:"0.3s" }}/>
      <path d="M48 17 Q49 12 48 7"  fill="none" stroke="#c8c0b8" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" className="steam-c" style={{ animationDelay:"0.6s" }}/>
      {/* small plant */}
      <rect x="2"  y="38" width="8"  height="8"  fill="#7a5535" rx="1"/>
      <ellipse cx="6"  cy="36" rx="6" ry="4" fill="#4a8a3a"/>
      <ellipse cx="2"  cy="39" rx="4" ry="3" fill="#5a9a4a"/>
      <ellipse cx="10" cy="39" rx="4" ry="3" fill="#3a7a2a"/>
    </svg>
  ),

  fu8: ({ size }) => ( // Cozy cat bed
    <svg width={size*1.1} height={size*0.7} viewBox="0 0 66 42">
      <style>{`
        @keyframes catBreath { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.06)} }
        @keyframes catTailWag { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(12deg)} }
        .cat-breath { animation: catBreath 2.5s ease-in-out infinite; transform-origin: center bottom; }
        .cat-tail-bed { animation: catTailWag 2s ease-in-out infinite; transform-origin: 15% 50%; }
      `}</style>
      {/* bed base */}
      <ellipse cx="33" cy="36" rx="30" ry="7" fill="#c97d4e" stroke="#a05a2a" strokeWidth="1.5"/>
      {/* bed cushion */}
      <ellipse cx="33" cy="34" rx="26" ry="6" fill="#e8c8a8"/>
      <ellipse cx="33" cy="34" rx="22" ry="4" fill="#f0d8b8" opacity="0.8"/>
      {/* bed walls/rim */}
      <path d="M4 34 Q4 14 33 14 Q62 14 62 34" fill="#c97d4e" stroke="#a05a2a" strokeWidth="1.5"/>
      <path d="M8 34 Q8 18 33 18 Q58 18 58 34" fill="#d4906a"/>
      {/* inner cushion */}
      <ellipse cx="33" cy="30" rx="22" ry="10" fill="#f0d0b0"/>
      <ellipse cx="33" cy="30" rx="18" ry="8"  fill="#f8e0c0" opacity="0.8"/>
      {/* sleeping cat */}
      <g className="cat-breath">
        {/* cat body curled */}
        <ellipse cx="33" cy="28" rx="14" ry="7" fill="#9aa0a0"/>
        {/* cat head */}
        <circle cx="44" cy="25" r="6" fill="#9aa0a0"/>
        {/* ears */}
        <polygon points="41,20 43,24 46,20" fill="#9aa0a0"/>
        <polygon points="46,20 48,24 51,20" fill="#9aa0a0"/>
        <polygon points="41.5,20.5 43,23 45.5,20.5" fill="#ffb0c0" opacity="0.7"/>
        <polygon points="46.5,20.5 48,23 50.5,20.5" fill="#ffb0c0" opacity="0.7"/>
        {/* closed sleepy eyes */}
        <path d="M41 25 Q43 23 45 25" fill="none" stroke="#5a6565" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M46 25 Q48 23 50 25" fill="none" stroke="#5a6565" strokeWidth="1.2" strokeLinecap="round"/>
        {/* nose */}
        <ellipse cx="46" cy="27" rx="1.2" ry="0.8" fill="#ffb0c0"/>
        {/* small zzzs */}
        <text x="51" y="20" fontSize="4" fill="#8a9090" opacity="0.7" fontFamily="sans-serif">z</text>
        <text x="54" y="16" fontSize="5" fill="#8a9090" opacity="0.5" fontFamily="sans-serif">z</text>
        <text x="58" y="11" fontSize="6" fill="#8a9090" opacity="0.35" fontFamily="sans-serif">z</text>
      </g>
      {/* tail curled around */}
      <path d="M20 28 Q14 32 16 36 Q18 40 24 38" fill="none" stroke="#8a9090" strokeWidth="3" strokeLinecap="round" className="cat-tail-bed"/>
    </svg>
  ),

  fu9: ({ size }) => ( // Hanging plants cluster (rare)
    <svg width={size*1.2} height={size*1.3} viewBox="0 0 72 78">
      <style>{`
        @keyframes hangSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes hangSway2 { 0%,100%{transform:rotate(2deg)} 50%{transform:rotate(-4deg)} }
        .hang-s { animation: hangSway 5s ease-in-out infinite; transform-origin: top center; }
        .hang-s2 { animation: hangSway2 6s ease-in-out infinite; transform-origin: top center; }
        .hang-s3 { animation: hangSway 4s ease-in-out infinite 1s; transform-origin: top center; }
      `}</style>
      {/* ceiling rod */}
      <rect x="5" y="3" width="62" height="4" fill="#4a4a5a" rx="2"/>
      {/* hooks */}
      <path d="M18 7 Q18 12 18 12" stroke="#3a3a4a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 7 Q36 12 36 12" stroke="#3a3a4a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M54 7 Q54 12 54 12" stroke="#3a3a4a" strokeWidth="2" strokeLinecap="round"/>
      {/* left hanging plant */}
      <g className="hang-s">
        <line x1="18" y1="12" x2="18" y2="28" stroke="#8b6340" strokeWidth="1.5"/>
        <ellipse cx="18" cy="28" rx="9" ry="7" fill="#8b6340" stroke="#6b4a20" strokeWidth="1"/>
        <ellipse cx="18" cy="27" rx="7" ry="5" fill="#6b4a20" opacity="0.5"/>
        {/* trailing vines */}
        <path d="M14 34 Q10 45 12 56 Q10 65 14 72" fill="none" stroke="#4a8a3a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 34 Q18 46 16 58 Q15 67 18 74" fill="none" stroke="#5a9a4a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 34 Q26 46 24 58 Q22 67 24 73" fill="none" stroke="#4a8a3a" strokeWidth="2" strokeLinecap="round"/>
        {[[12,44],[10,56],[14,68],[16,50],[15,62],[18,72],[24,48],[22,60],[23,70]].map(([x,y],i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="4" fill={["#4a8a3a","#5a9a4a","#3a7a2a"][i%3]}
            transform={`rotate(${i%2===0?-25:25} ${x} ${y})`}/>
        ))}
      </g>
      {/* center hanging plant - different type */}
      <g className="hang-s2">
        <line x1="36" y1="12" x2="36" y2="30" stroke="#8b6340" strokeWidth="1.5"/>
        <ellipse cx="36" cy="30" rx="8" ry="6" fill="#7a5535" stroke="#5a3520" strokeWidth="1"/>
        {/* spider plant leaves */}
        {[[-20,-8],[-10,-12],[0,-14],[10,-12],[20,-8],[-15,-4],[15,-4]].map(([dx,dy],i) => (
          <ellipse key={i} cx={36+dx*0.8} cy={30+dy*0.7} rx="4" ry="7"
            fill={i%2===0?"#6aaa5a":"#5a9a4a"} transform={`rotate(${dx*3} ${36+dx*0.8} ${30+dy*0.7})`}/>
        ))}
        {/* hanging babies */}
        <line x1="30" y1="36" x2="28" y2="54" stroke="#5a9a4a" strokeWidth="1"/>
        <line x1="36" y1="36" x2="36" y2="56" stroke="#4a8a3a" strokeWidth="1"/>
        <line x1="42" y1="36" x2="44" y2="52" stroke="#5a9a4a" strokeWidth="1"/>
        <ellipse cx="28" cy="56" rx="5" ry="3" fill="#6aaa5a"/>
        <ellipse cx="36" cy="58" rx="5" ry="3" fill="#5a9a4a"/>
        <ellipse cx="44" cy="54" rx="5" ry="3" fill="#6aaa5a"/>
      </g>
      {/* right hanging plant */}
      <g className="hang-s3">
        <line x1="54" y1="12" x2="54" y2="26" stroke="#8b6340" strokeWidth="1.5"/>
        <ellipse cx="54" cy="26" rx="9" ry="7" fill="#9b6a4a" stroke="#7b4a2a" strokeWidth="1"/>
        <ellipse cx="54" cy="25" rx="7" ry="5" fill="#7b4a2a" opacity="0.4"/>
        {/* ivy trailing */}
        <path d="M50 32 Q46 44 48 56 Q46 66 50 74" fill="none" stroke="#4a8a3a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54 32 Q54 45 52 58 Q51 68 54 76" fill="none" stroke="#5a9a4a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M58 32 Q62 44 60 57 Q58 67 60 74" fill="none" stroke="#3a7a2a" strokeWidth="2" strokeLinecap="round"/>
        {[[48,43],[46,56],[50,70],[52,50],[51,63],[54,74],[60,46],[59,58],[60,70]].map(([x,y],i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="5" fill={["#5a9a4a","#4a8a3a","#6aaa5a"][i%3]}
            transform={`rotate(${i%2===0?-20:20} ${x} ${y})`}/>
        ))}
      </g>
    </svg>
  ),
};

// ─── Room Renderer ────────────────────────────────────────────────────────────

function RoomWallpaper({ id }) {
  if (id === "hw1") return <WallpaperIndustrialBrick />;
  if (id === "hw2") return <WallpaperCityWindows />;
  if (id === "hw3") return <WallpaperUrbanJungle />;
  if (id === "hw4") return <WallpaperArtistLoft />;
  if (id === "hw5") return <WallpaperLuxuryLoft />;
  // default empty loft - clean white walls
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="160" fill="#f0ece4"/>
      <rect width="300" height="8" fill="#d4c8b0" opacity="0.5"/>
      <rect y="132" width="300" height="28" fill="#c8a060"/>
    </svg>
  );
}

function RoomFloor({ id }) {
  if (id === "hf1") return <FloorDarkHardwood />;
  if (id === "hf2") return <FloorPolishedConcrete />;
  if (id === "hf3") return <FloorHerringbone />;
  if (id === "hf4") return <FloorWhiteOak />;
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
      <rect width="300" height="40" fill="#a07840"/>
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
export default function HouseRoom({ house, catElement, compact = false }) {
  const h = house || {};
  const roomHeight  = compact ? 180 : 240;
  const floorHeight = compact ? 50  : 65;
  const furnSize    = compact ? 52  : 72;

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
      {/* furniture + cat */}
      <div style={{ position:"absolute", bottom:floorHeight-10, left:0, right:0, display:"flex", alignItems:"flex-end", justifyContent:"space-around", padding:"0 16px", zIndex:2 }}>
        {/* left slot */}
        <div style={{ display:"flex", alignItems:"flex-end", minWidth:furnSize+8 }}>
          {h.left
            ? <FurnitureItem id={h.left} size={furnSize} />
            : <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", color:"#c8b090" }}>+</div>
          }
        </div>
        {/* center slot — cat lives here */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:3 }}>
          {catElement}
          {h.center && !catElement && <FurnitureItem id={h.center} size={furnSize*0.8} />}
          {h.center && catElement && (
            <div style={{ marginTop:-8 }}>
              <FurnitureItem id={h.center} size={furnSize*0.6} />
            </div>
          )}
          {!h.center && !catElement && (
            <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", color:"#c8b090" }}>+</div>
          )}
        </div>
        {/* right slot */}
        <div style={{ display:"flex", alignItems:"flex-end", minWidth:furnSize+8 }}>
          {h.right
            ? <FurnitureItem id={h.right} size={furnSize} />
            : <div style={{ width:furnSize, height:furnSize, border:`2px dashed #c8b090`, borderRadius:8, opacity:0.3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", color:"#c8b090" }}>+</div>
          }
        </div>
      </div>
    </div>
  );
}
