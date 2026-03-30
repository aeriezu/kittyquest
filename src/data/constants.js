// ─── Theme Colors ────────────────────────────────────────────────────────────
export const C = {
  bg:      "#f0e8dc",
  surface: "#e4d5c3",
  surface2:"#d4bfa8",
  primary: "#c97d4e",
  text:    "#2e1f14",
  muted:   "#7a5c45",
  blue:    "#4a7fa0",
  purple:  "#7a4fa0",
  green:   "#4a8a5a",
  red:     "#b85c3a",
  yellow:  "#c9a84e",
  pink:    "#d4607a",
};

export const px = { fontFamily: "'Courier New', monospace" };

// ─── Pet Options ─────────────────────────────────────────────────────────────
export const PET_OPTIONS = [
  { id:"tabby",  label:"Gray Tabby",  color:"#9aa0a0" },
  { id:"orange", label:"Orange Cat",  color:"#e89050" },
  { id:"black",  label:"Black Cat",   color:"#111318" },
  { id:"white",  label:"White Cat",   color:"#f5f5f8" },
  { id:"calico", label:"Calico",      color:"#e8c888" },
  { id:"tuxedo", label:"Tuxedo",      color:"#1a1a20" },
];

// ─── Shop Items ──────────────────────────────────────────────────────────────
export const SHOP = [
  // ── Hats ──
  { id:"hat1",  cost:3,  type:"hat",    slot:null,        label:"Beanie",          emoji:"🧢", rare:false },
  { id:"hat2",  cost:6,  type:"hat",    slot:null,        label:"Witch Hat",       emoji:"🎩", rare:false },
  { id:"hat3",  cost:10, type:"hat",    slot:null,        label:"Crown",           emoji:"👑", rare:false },
  { id:"hat4",  cost:15, type:"hat",    slot:null,        label:"Grad Cap",        emoji:"🎓", rare:false },
  { id:"hat5",  cost:0,  type:"hat",    slot:null,        label:"Halo",            emoji:"😇", rare:true  },
  // ── Outfits ──
  { id:"out1",  cost:5,  type:"outfit", slot:null,        label:"Scarf",           emoji:"🧣", rare:false },
  { id:"out2",  cost:8,  type:"outfit", slot:null,        label:"Bow Tie",         emoji:"🎀", rare:false },
  { id:"out3",  cost:12, type:"outfit", slot:null,        label:"Cape",            emoji:"🦸", rare:false },
  { id:"out4",  cost:20, type:"outfit", slot:null,        label:"Wizard Robe",     emoji:"🪄", rare:false },
  { id:"out5",  cost:0,  type:"outfit", slot:null,        label:"Star Cloak",      emoji:"✨", rare:true  },
  // ── Backgrounds ──
  { id:"bg1",   cost:8,  type:"bg",     slot:null,        label:"Cozy Library",    emoji:"📚", rare:false },
  { id:"bg2",   cost:8,  type:"bg",     slot:null,        label:"Rainy Window",    emoji:"🌧️", rare:false },
  { id:"bg3",   cost:12, type:"bg",     slot:null,        label:"Autumn Park",     emoji:"🍂", rare:false },
  { id:"bg4",   cost:18, type:"bg",     slot:null,        label:"Night Cafe",      emoji:"☕", rare:false },
  { id:"bg5",   cost:0,  type:"bg",     slot:null,        label:"Cherry Blossoms", emoji:"🌸", rare:true  },
  // ── Companions ──
  { id:"comp1", cost:15, type:"comp",   slot:null,        label:"Tiny Frog",       emoji:"🐸", rare:false },
  { id:"comp2", cost:15, type:"comp",   slot:null,        label:"Mini Ghost",      emoji:"👻", rare:false },
  { id:"comp3", cost:20, type:"comp",   slot:null,        label:"Baby Bunny",      emoji:"🐰", rare:false },
  { id:"comp4", cost:25, type:"comp",   slot:null,        label:"Star Sprite",     emoji:"⭐", rare:false },
  { id:"comp5", cost:0,  type:"comp",   slot:null,        label:"Dragon",          emoji:"🐉", rare:true  },
  // ── Home: Wallpapers ──
  { id:"hw1",   cost:8,  type:"home",   slot:"wallpaper", label:"Sakura Walls",    emoji:"🌸", rare:false },
  { id:"hw2",   cost:8,  type:"home",   slot:"wallpaper", label:"Starry Night",    emoji:"⭐", rare:false },
  { id:"hw3",   cost:10, type:"home",   slot:"wallpaper", label:"Forest Green",    emoji:"🌿", rare:false },
  { id:"hw4",   cost:10, type:"home",   slot:"wallpaper", label:"Warm Brick",      emoji:"🧱", rare:false },
  { id:"hw5",   cost:0,  type:"home",   slot:"wallpaper", label:"Cloud Dream",     emoji:"☁️", rare:true  },
  // ── Home: Floors ──
  { id:"hf1",   cost:6,  type:"home",   slot:"floor",     label:"Wood Planks",     emoji:"🪵", rare:false },
  { id:"hf2",   cost:6,  type:"home",   slot:"floor",     label:"Pastel Tiles",    emoji:"🟦", rare:false },
  { id:"hf3",   cost:8,  type:"home",   slot:"floor",     label:"Grass Mat",       emoji:"🌿", rare:false },
  { id:"hf4",   cost:0,  type:"home",   slot:"floor",     label:"Star Floor",      emoji:"✨", rare:true  },
  // ── Home: Furniture ──
  { id:"fu1",   cost:12, type:"home",   slot:"furniture", label:"Bookshelf",       emoji:"📚", rare:false },
  { id:"fu2",   cost:10, type:"home",   slot:"furniture", label:"Cozy Couch",      emoji:"🛋️", rare:false },
  { id:"fu3",   cost:8,  type:"home",   slot:"furniture", label:"Plant",           emoji:"🪴", rare:false },
  { id:"fu4",   cost:8,  type:"home",   slot:"furniture", label:"Study Desk",      emoji:"🪑", rare:false },
  { id:"fu5",   cost:6,  type:"home",   slot:"furniture", label:"Candle",          emoji:"🕯️", rare:false },
  { id:"fu6",   cost:15, type:"home",   slot:"furniture", label:"Floor Lamp",      emoji:"🌙", rare:false },
  { id:"fu7",   cost:12, type:"home",   slot:"furniture", label:"Tea Set",         emoji:"☕", rare:false },
  { id:"fu8",   cost:18, type:"home",   slot:"furniture", label:"Stuffed Animal",  emoji:"🧸", rare:false },
  { id:"fu9",   cost:0,  type:"home",   slot:"furniture", label:"Magic Cauldron",  emoji:"🪄", rare:true  },
];

export const EMPTY_EQ = { hat:null, outfit:null, bg:null, comp:null };

export const EMPTY_HOUSE = {
  wallpaper: null,
  floor: null,
  left: null,
  center: null,
  right: null,
};

// ─── Spin Wheel Rewards ──────────────────────────────────────────────────────
export const SPIN_REWARDS = [
  { label:"+5 coins",  type:"coins",   value:5,  emoji:"🪙", color:"#c9a84e" },
  { label:"+10 coins", type:"coins",   value:10, emoji:"🪙", color:"#c9a84e" },
  { label:"+3 coins",  type:"coins",   value:3,  emoji:"🪙", color:"#c9a84e" },
  { label:"+15 min",   type:"free",    value:15, emoji:"⏰", color:"#4a8a5a" },
  { label:"+30 min",   type:"free",    value:30, emoji:"⏰", color:"#4a8a5a" },
  { label:"Rare item!",type:"rare",    value:1,  emoji:"🌟", color:"#d4607a" },
  { label:"+20 coins", type:"coins",   value:20, emoji:"💰", color:"#c9a84e" },
  { label:"Nothing..", type:"nothing", value:0,  emoji:"💨", color:"#7a5c45" },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id:"first",   label:"First Step",      desc:"Complete your first task",       emoji:"🌱", check:(s)=>s.done>=1                               },
  { id:"roll5",   label:"On a Roll",       desc:"5 tasks in one session",         emoji:"🔥", check:(s)=>s.sessionTasks>=5                       },
  { id:"streak3", label:"Hat Trick",       desc:"3 day streak",                   emoji:"🎩", check:(s)=>s.streak>=3                             },
  { id:"streak7", label:"Week Warrior",    desc:"7 day streak",                   emoji:"⚔️", check:(s)=>s.streak>=7                             },
  { id:"shop5",   label:"Shopaholic",      desc:"Buy 5 items",                    emoji:"🛍️", check:(s)=>s.ownedCount>=5                         },
  { id:"half",    label:"Halfway There",   desc:"50% of all tasks done",          emoji:"🌓", check:(s)=>s.total>0&&s.done>=Math.floor(s.total/2) },
  { id:"spin5",   label:"Lucky Cat",       desc:"Spin the wheel 5 times",         emoji:"🎰", check:(s)=>s.spins>=5                              },
  { id:"cheer10", label:"Cheerleader",     desc:"Send 10 cheers",                 emoji:"📣", check:(s)=>s.cheers>=10                            },
  { id:"allcomp", label:"Scholar Supreme", desc:"Complete ALL tasks",             emoji:"👑", check:(s)=>s.total>0&&s.done>=s.total              },
  { id:"rarewin", label:"Fortune's Child", desc:"Win a rare item from the wheel", emoji:"🌟", check:(s)=>s.rareWon                               },
];

// ─── Daily Quest Templates ────────────────────────────────────────────────────
export const QUEST_TEMPLATES = [
  { id:"q1", label:"Complete 2 tasks today",      reward:3  },
  { id:"q2", label:"Complete 3 tasks today",      reward:5  },
  { id:"q3", label:"Complete 4 tasks today",      reward:7  },
  { id:"q4", label:"Complete 5 tasks today",      reward:8  },
  { id:"q5", label:"Complete 6 tasks today",      reward:10 },
  { id:"q6", label:"Complete 7 tasks today",      reward:12 },
  { id:"q7", label:"Check off 1 task",            reward:2  },
  { id:"q8", label:"Complete a full day's tasks", reward:10 },
];

// ─── Cheer Messages ───────────────────────────────────────────────────────────
export const CHEERS = [
  "You got this! 💪",
  "Keep going!! 🔥",
  "So proud of you! 🌟",
  "Amazing work! ✨",
  "Go go go! 🚀",
  "Rooting for you! 🎉",
  "You're crushing it! 💅",
  "Study buddy power! 🐱",
];

// ─── Level System ─────────────────────────────────────────────────────────────
export const LEVEL_THRESHOLDS_PCT = [0, 0.08, 0.22, 0.40, 0.60, 0.80, 1.0];

export function getLevel(done, total) {
  if (total === 0) return { level:1, title:"Sleepy Scholar", mood:"sleepy" };
  const pct = done / total;
  const levels = [
    { level:1, title:"Sleepy Scholar",  mood:"sleepy"   },
    { level:2, title:"Focused Kitten",  mood:"neutral"  },
    { level:3, title:"Diligent Cat",    mood:"neutral"  },
    { level:4, title:"Studious Feline", mood:"neutral"  },
    { level:5, title:"Academic Wizard", mood:"excited"  },
    { level:6, title:"Scholar Supreme", mood:"excited"  },
  ];
  if (pct < 0.08) return levels[0];
  if (pct < 0.22) return levels[1];
  if (pct < 0.40) return levels[2];
  if (pct < 0.60) return levels[3];
  if (pct < 0.80) return levels[4];
  return levels[5];
}

// ─── Subject Color Palette ────────────────────────────────────────────────────
export const SUBJECT_PALETTE = [
  { color:"#4a7fa0", bg:"#dceaf5" },
  { color:"#7a4fa0", bg:"#ecdcf5" },
  { color:"#4a8a5a", bg:"#dcf0e4" },
  { color:"#c97d4e", bg:"#f5e8dc" },
  { color:"#b85c3a", bg:"#f5dcd8" },
  { color:"#d4607a", bg:"#f5dce4" },
  { color:"#c9a84e", bg:"#f5f0dc" },
  { color:"#5a7a4a", bg:"#e4f0dc" },
];