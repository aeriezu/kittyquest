import { useState, useCallback } from "react";
import { ACHIEVEMENTS, EMPTY_EQ, SHOP } from "../data/constants";

const STORAGE_KEY = "studyquest-v5";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { /* storage full */ }
}

// ─── XP System ───────────────────────────────────────────────────────────────
export const XP_LEVELS = [
  { level:1,  xp:0,     title:"Drowsy Student"        },
  { level:2,  xp:100,   title:"Caffeine Dependent"     },
  { level:3,  xp:250,   title:"Highlighted Notes"      },
  { level:4,  xp:450,   title:"Library Regular"        },
  { level:5,  xp:700,   title:"All-Nighter Veteran"    },
  { level:6,  xp:1000,  title:"Deadline Destroyer"     },
  { level:7,  xp:1400,  title:"Exam Season Survivor"   },
  { level:8,  xp:1900,  title:"Study Grinder"          },
  { level:9,  xp:2500,  title:"Grind Arc Unlocked"     },
  { level:10, xp:3200,  title:"Academic Machine"       },
  { level:11, xp:4000,  title:"Note-Taking Ninja"      },
  { level:12, xp:5000,  title:"Coffee Blood Type"      },
  { level:13, xp:6200,  title:"Highlighter Hoarder"    },
  { level:14, xp:7600,  title:"Flashcard Fanatic"      },
  { level:15, xp:9200,  title:"Tab Collector"          },
  { level:16, xp:11000, title:"Pomodoro Master"        },
  { level:17, xp:13000, title:"Margin Annotator"       },
  { level:18, xp:15500, title:"Syllabus Speedrunner"   },
  { level:19, xp:18500, title:"Peak Study Form"        },
  { level:20, xp:22000, title:"Academic Weapon"        },
  { level:21, xp:26000, title:"GPA Protector"          },
  { level:22, xp:30500, title:"Thesis Whisperer"       },
  { level:23, xp:35500, title:"Research Rabbit"        },
  { level:24, xp:41000, title:"Citation Machine"       },
  { level:25, xp:47000, title:"Dean's List Regular"    },
  { level:30, xp:80000, title:"Legendary Bookworm"     },
  { level:40, xp:160000,title:"Scholar Supreme"        },
  { level:50, xp:300000,title:"Mythic Academic"        },
];

export function getXpLevel(totalXp) {
  let current = XP_LEVELS[0];
  for (const l of XP_LEVELS) {
    if (totalXp >= l.xp) current = l;
    else break;
  }
  // next level
  const idx = XP_LEVELS.indexOf(current);
  const next = XP_LEVELS[idx + 1] || null;
  const progress = next
    ? ((totalXp - current.xp) / (next.xp - current.xp)) * 100
    : 100;
  return { level: current.level, title: current.title, nextXp: next?.xp || null, progress };
}

export function calcTaskXp(label, streak = 0) {
  const len = (label || "").length;
  let base = len < 20 ? 10 : len < 50 ? 15 : 20;
  const bonus = Math.min(streak * 2, 20); // cap streak bonus at 20
  return base + bonus;
}

// ─── Default state shape ─────────────────────────────────────────────────────
function defaultState() {
  return {
    coins:        0,
    owned:        [],
    equipped:     EMPTY_EQ,
    freeTime:     0,
    streak:       0,
    lastDate:     null,
    achievements: [],
    spinCount:    0,
    cheerCount:   0,
    rareWon:      false,
    sessionTasks: 0,
    happiness:    80,
    questDone:    {},
    totalXp:      0,
    checked:      {},
  };
}

export function useGameState(totalTasks) {
  const saved = load() || defaultState();
  // migrate old saves that don't have totalXp
  if (saved.totalXp === undefined) saved.totalXp = 0;
  if (saved.questDone === undefined) saved.questDone = {};
  const [state, setStateRaw] = useState(saved);

  const setState = useCallback(updater => {
    setStateRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      save(next);
      return next;
    });
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const done = Object.values(state.checked).filter(Boolean).length;

  // ── Achievement checker ───────────────────────────────────────────────────
  const checkAchievements = useCallback((s, overrides = {}) => {
    const merged = { ...s, ...overrides };
    const doneCnt = Object.values(merged.checked || {}).filter(Boolean).length;
    const context = {
      done:         doneCnt,
      total:        totalTasks,
      sessionTasks: merged.sessionTasks || 0,
      streak:       merged.streak       || 0,
      ownedCount:   (merged.owned || []).length,
      spins:        merged.spinCount    || 0,
      cheers:       merged.cheerCount   || 0,
      rareWon:      merged.rareWon      || false,
    };
    const current  = merged.achievements || [];
    const unlocked = ACHIEVEMENTS.filter(a => !current.includes(a.id) && a.check(context));
    return { unlocked, newAchs: [...current, ...unlocked.map(a => a.id)] };
  }, [totalTasks]);

  // ── Toggle a task checkbox ────────────────────────────────────────────────
  const toggleTask = useCallback((id, label, onPopup, onAchievement, onLevelUp) => {
    setState(prev => {
      const was = !!prev.checked[id];
      const checked = { ...prev.checked, [id]: !was };
      let coins        = prev.coins;
      let freeTime     = prev.freeTime;
      let streak       = prev.streak;
      let lastDate     = prev.lastDate;
      let sessionTasks = prev.sessionTasks;
      let happiness    = Math.min(100, prev.happiness + (was ? 0 : 5));
      let totalXp      = prev.totalXp || 0;

      if (!was) {
        // coins + free time
        coins    += 1;
        freeTime += 6;
        sessionTasks += 1;

        // XP
        const xpGained = calcTaskXp(label, streak);
        totalXp += xpGained;

        // check level up
        const oldLevel = getXpLevel(prev.totalXp || 0).level;
        const newLevel = getXpLevel(totalXp).level;
        if (newLevel > oldLevel) {
          const { title } = getXpLevel(totalXp);
          onLevelUp?.({ level: newLevel, title });
        }

        onPopup?.(`+1 coin  +${xpGained} XP  +6 min!`);

        // streak
        const today = new Date().toDateString();
        if (lastDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          streak   = lastDate === yesterday ? streak + 1 : 1;
          lastDate = today;
          if (streak > 1) {
            coins += streak;
            onPopup?.(`${streak} day streak! +${streak} bonus coins`);
          }
        }
      }

      const next = { ...prev, checked, coins, freeTime, streak, lastDate, sessionTasks, happiness, totalXp };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  // ── Complete a quest ──────────────────────────────────────────────────────
  const completeQuest = useCallback((quest, onPopup, onAchievement) => {
    setState(prev => {
      if (prev.questDone[quest.id]) return prev; // already done
      const coins  = prev.coins + quest.reward;
      const totalXp = (prev.totalXp || 0) + 25; // 25 XP per quest
      const questDone = { ...prev.questDone, [quest.id]: true };
      onPopup?.(`Quest done! +${quest.reward} coins +25 XP`);
      const next = { ...prev, coins, totalXp, questDone };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  // ── Spin the wheel ────────────────────────────────────────────────────────
  const handleSpin = useCallback((result, onPopup, onAchievement) => {
    setState(prev => {
      let coins    = prev.coins - 5;
      let freeTime = prev.freeTime;
      let owned    = prev.owned;
      let rareWon  = prev.rareWon;
      let totalXp  = (prev.totalXp || 0) + 5; // 5 XP for spinning
      const spinCount = prev.spinCount + 1;

      if (result.type === "coins")   coins += result.value;
      if (result.type === "free")    freeTime += result.value;
      if (result.type === "rare") {
        const rares = SHOP.filter(s => s.rare && !owned.includes(s.id));
        if (rares.length > 0) {
          const r = rares[Math.floor(Math.random() * rares.length)];
          owned   = [...owned, r.id];
          rareWon = true;
          onPopup?.(`Rare: ${r.emoji} ${r.label}!`);
        } else {
          coins += 15;
        }
      }

      const next = { ...prev, coins, freeTime, owned, rareWon, spinCount, totalXp };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  // ── Buy from shop ─────────────────────────────────────────────────────────
  const buyItem = useCallback((item, onAchievement) => {
    setState(prev => {
      if (prev.coins < item.cost || prev.owned.includes(item.id) || item.rare) return prev;
      const next = { ...prev, coins: prev.coins - item.cost, owned: [...prev.owned, item.id] };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  // ── Equip / unequip ───────────────────────────────────────────────────────
  const equipItem = useCallback((type, id) => {
    setState(prev => ({
      ...prev,
      equipped: { ...prev.equipped, [type]: prev.equipped[type] === id ? null : id }
    }));
  }, [setState]);

  // ── Cash out free time ────────────────────────────────────────────────────
  const cashOut = useCallback((onPopup) => {
    setState(prev => {
      if (prev.freeTime < 15) return prev;
      onPopup?.(`Enjoy ${prev.freeTime} min of free time!`);
      return { ...prev, freeTime: 0 };
    });
  }, [setState]);

  // ── Happiness decay ───────────────────────────────────────────────────────
  const tickHappiness = useCallback(() => {
    setState(prev => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) }));
  }, [setState]);

  // ── Increment cheer count ─────────────────────────────────────────────────
  const incrementCheers = useCallback((onAchievement) => {
    setState(prev => {
      const next = { ...prev, cheerCount: prev.cheerCount + 1 };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  return {
    state,
    done,
    toggleTask,
    handleSpin,
    buyItem,
    equipItem,
    cashOut,
    tickHappiness,
    incrementCheers,
    completeQuest,
    setState,
  };
}
