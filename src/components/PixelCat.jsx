import { useRef } from "react";
import { SHOP } from "../data/constants";

// Background tints per bg item id
const BG_COLORS = {
  bg1:"#c4b49a", bg2:"#a0b8c8", bg3:"#c8a870", bg4:"#3a2820", bg5:"#f0d8e8"
};

const PET_STYLES = {
  tabby:  { fur:"#9aa0a0", furDark:"#5a6565", skin:"#ffb0c0", whisker:"#888"    },
  orange: { fur:"#e89050", furDark:"#b85e20", skin:"#ffa080", whisker:"#c87840" },
  black:  { fur:"#111318", furDark:"#080a0c", skin:"#ff9ab0", whisker:"#333"    },
  white:  { fur:"#f5f5f8", furDark:"#c8ccd0", skin:"#ffb8cc", whisker:"#bbb"   },
  calico: { fur:"#e8c888", furDark:"#a06828", skin:"#ffb090", whisker:"#c8a060" },
  tuxedo: { fur:"#1a1a20", furDark:"#0a0a10", skin:"#f0f0f0", whisker:"#444"   },
};

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
.${id} .scarf{width:130%;height:14%;background:#c97d4e;border-radius:2em;top:-2%;left:50%;translate:-50%;z-index:5;}
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
      {bg && (
        <div style={{
          position:"absolute", inset:0,
          background: BG_COLORS[bg] || "transparent",
          borderRadius:12, opacity:0.45, zIndex:0, pointerEvents:"none"
        }} />
      )}
      <style>{css}</style>
      <article className={`${id} ${moodCls} ${petId}`} style={{ position:"relative", zIndex:1 }}>
        <div className="shadow" />
        <div className="tail" />
        <div className="body">
          <div className="leg" />
          <div className="leg" />
          <div className="paw" />
          <div className="paw" />
          {outfitEl}
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
