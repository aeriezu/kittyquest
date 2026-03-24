import { useState, useCallback } from "react";
import { ACHIEVEMENTS, EMPTY_EQ, SHOP } from "../data/constants";

const STORAGE_KEY = "studyquest-v4";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { /* storage full */ }
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
    // task state — stored as { [taskId]: true }
    checked:      {},
  };
}

export function useGameState(totalTasks) {
  const saved = load() || defaultState();
  const [state, setStateRaw] = useState(defaultState());

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
    const doneCnt  = Object.values(merged.checked || {}).filter(Boolean).length;
    const context  = {
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
  const toggleTask = useCallback((id, onPopup, onAchievement) => {
    setState(prev => {
      const was = !!prev.checked[id];
      const checked = { ...prev.checked, [id]: !was };
      let coins = prev.coins;
      let freeTime = prev.freeTime;
      let streak = prev.streak;
      let lastDate = prev.lastDate;
      let sessionTasks = prev.sessionTasks;
      let happiness = Math.min(100, prev.happiness + (was ? 0 : 5));

      if (!was) {
        coins += 1;
        freeTime += 6;
        sessionTasks += 1;
        onPopup?.("+1 coin  +6 min free!");

        const today = new Date().toDateString();
        if (lastDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          streak = lastDate === yesterday ? streak + 1 : 1;
          lastDate = today;
          if (streak > 1) {
            coins += streak;
            onPopup?.(`${streak} day streak! +${streak} bonus coins`);
          }
        }
      }

      const next = { ...prev, checked, coins, freeTime, streak, lastDate, sessionTasks, happiness };
      const { unlocked, newAchs } = checkAchievements(next);
      unlocked.forEach(a => onAchievement?.(a));
      return { ...next, achievements: newAchs };
    });
  }, [setState, checkAchievements]);

  // ── Spin the wheel ────────────────────────────────────────────────────────
  const handleSpin = useCallback((result, onPopup, onAchievement) => {
    setState(prev => {
      let coins   = prev.coins - 5;
      let freeTime = prev.freeTime;
      let owned   = prev.owned;
      let rareWon = prev.rareWon;
      const spinCount = prev.spinCount + 1;

      if (result.type === "coins")   coins += result.value;
      if (result.type === "free")    freeTime += result.value;
      if (result.type === "rare") {
        const rares = SHOP.filter(s => s.rare && !owned.includes(s.id));
        if (rares.length > 0) {
          const r = rares[Math.floor(Math.random() * rares.length)];
          owned = [...owned, r.id];
          rareWon = true;
          onPopup?.(`Rare: ${r.emoji} ${r.label}!`);
        } else {
          coins += 15;
        }
      }

      const next = { ...prev, coins, freeTime, owned, rareWon, spinCount };
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

  // ── Happiness decay (call once on mount with setInterval) ────────────────
  const tickHappiness = useCallback(() => {
    setState(prev => ({ ...prev, happiness: Math.max(0, prev.happiness - 1) }));
  }, [setState]);

  // ── Increment cheer count (for achievement tracking) ─────────────────────
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
    setState,
  };
}
