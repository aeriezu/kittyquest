import { useState, useEffect, useCallback, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "./firebase";
import { C, px, EMPTY_EQ, SHOP, QUEST_TEMPLATES, getLevel, SUBJECT_PALETTE } from "./data/constants";
import { useGameState } from "./hooks/useGameState";
import { usePublishProfile, usePublishTasks, usePublishTodayDone } from "./hooks/useMultiplayer";
import PixelCat from "./components/PixelCat";
import SpinWheel from "./components/SpinWheel";
import FriendsTab from "./components/FriendsTab";
import Onboarding from "./components/Onboarding";

function ImportSchedule({ subjects, onImport }) {
  const [open, setOpen] = useState(false);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const handle = () => {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data)) throw new Error("Must be an array of days");
      // validate shape
      data.forEach((d, i) => {
        if (!d.date) throw new Error(`Day ${i} missing "date"`);
        if (!Array.isArray(d.tasks)) throw new Error(`Day ${i} missing "tasks" array`);
      });
      onImport(data);
      setOpen(false);
      setJson("");
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{
      width:"100%", padding:"8px 0", borderRadius:10, marginBottom:8,
      border:`2px dashed ${C.primary}`, background:"none",
      color:C.primary, fontFamily:"inherit", fontSize:"0.75rem",
      fontWeight:700, cursor:"pointer"
    }}>📥 Import Schedule (JSON)</button>
  );

  return (
    <div style={{
      background:C.surface, borderRadius:10, padding:12,
      border:`2px solid ${C.primary}`, marginBottom:8
    }}>
      <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.text, marginBottom:6 }}>
        Paste your schedule JSON
      </div>
      <textarea
        value={json} onChange={e => setJson(e.target.value)}
        placeholder={`[\n  {\n    "date": "Mon Mar 23",\n    "group": "Week 1",\n    "tasks": [\n      { "subject": "Lin. Alg.", "label": "3.5 Notes Pt.1" }\n    ]\n  }\n]`}
        style={{
          width:"100%", height:160, padding:"8px 10px", borderRadius:7,
          border:`1px solid ${C.surface2}`, background:C.bg,
          color:C.text, fontFamily:"inherit", fontSize:"0.68rem",
          resize:"vertical", boxSizing:"border-box", marginBottom:6
        }}
      />
      {error && <div style={{ fontSize:"0.68rem", color:C.red, marginBottom:6 }}>{error}</div>}
      <div style={{ display:"flex", gap:6 }}>
        <button onClick={handle} style={{
          flex:1, padding:"7px 0", borderRadius:7, border:"none",
          background:C.primary, color:"#fff",
          fontFamily:"inherit", fontSize:"0.75rem", fontWeight:700, cursor:"pointer"
        }}>Import</button>
        <button onClick={() => { setOpen(false); setJson(""); setError(""); }} style={{
          flex:1, padding:"7px 0", borderRadius:7,
          border:`1px solid ${C.surface2}`, background:C.surface,
          color:C.muted, fontFamily:"inherit", fontSize:"0.75rem", cursor:"pointer"
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── TasksTab ─────────────────────────────────────────────────────────────────
function TasksTab({ days, subjects, checked, onToggle, onAddTask, onDeleteTask, onImport, onDeleteDay }) {
  const [filter,    setFilter]    = useState("all");
  const [collapsed, setCollapsed] = useState({});
  const [newTask,   setNewTask]   = useState({ subject:"", label:"" });
  const [addingTo,  setAddingTo]  = useState(null); // date string

  const allTasks = days.flatMap(d => d.tasks);
  const visible  = filter === "all" ? days : days.filter(d => d.group === filter);
  const groups   = [...new Set(days.map(d => d.group).filter(Boolean))];

  return (
    <div>
      <ImportSchedule subjects={subjects} onImport={onImport} />
      {/* Subject progress mini-bars */}
      {subjects.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, marginBottom:10 }}>
          {subjects.map(s => {
            const st = allTasks.filter(t => t.subject === s.name);
            const sd = st.filter(t => checked[t.id]).length;
            return (
              <div key={s.name} style={{
                background:C.surface, borderRadius:8, padding:"6px 9px",
                borderLeft:`3px solid ${s.color}`
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, color:C.text }}>{s.name}</span>
                  <span style={{ fontSize:"0.62rem", color:s.color }}>{sd}/{st.length}</span>
                </div>
                <div style={{ background:C.surface2, borderRadius:4, height:4, overflow:"hidden" }}>
                  <div style={{
                    background:s.color,
                    width:`${st.length ? (sd / st.length) * 100 : 0}%`,
                    height:"100%", transition:"width 0.3s"
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Group filter */}
      {groups.length > 0 && (
        <div style={{ display:"flex", gap:4, marginBottom:10 }}>
          <button onClick={() => setFilter("all")} style={{
            flex:1, padding:"4px 0", borderRadius:6, border:"none",
            background: filter === "all" ? C.text : C.surface2,
            color: filter === "all" ? "#fff" : C.muted,
            fontFamily:"inherit", fontSize:"0.68rem", fontWeight:700, cursor:"pointer"
          }}>All</button>
          {groups.map(g => (
            <button key={g} onClick={() => setFilter(g)} style={{
              flex:1, padding:"4px 0", borderRadius:6, border:"none",
              background: filter === g ? C.text : C.surface2,
              color: filter === g ? "#fff" : C.muted,
              fontFamily:"inherit", fontSize:"0.68rem", fontWeight:700, cursor:"pointer"
            }}>{g}</button>
          ))}
        </div>
      )}

      {/* Days */}
      {visible.map(({ date, tasks }) => {
        const d = tasks.filter(t => checked[t.id]).length;
        const allDone = d === tasks.length && tasks.length > 0;
        const isCol = collapsed[date];
        const subjectMap = Object.fromEntries(subjects.map(s => [s.name, s]));

        return (
          <div key={date} style={{
            background:C.surface, borderRadius:10, marginBottom:7,
            overflow:"hidden", border:`1px solid ${C.surface2}`
          }}>
            <div
              onClick={() => setCollapsed(c => ({ ...c, [date]: !c[date] }))}
              style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"8px 11px", cursor:"pointer",
                background: allDone ? "#d4edd4" : C.surface,
              }}
            >
              <span style={{ flex:1, fontSize:"0.78rem", fontWeight:700, color: allDone ? C.green : C.text }}>
                {allDone ? "✅ " : ""}{date}
              </span>
              <span style={{ fontSize:"0.65rem", color:C.muted }}>{d}/{tasks.length}</span>
              {/* ── ADD THIS ── */}
              <button
                onClick={e => { e.stopPropagation(); onDeleteDay(date); }}
                style={{
                  background:"none", border:"none", color:C.muted,
                  fontSize:"0.7rem", cursor:"pointer", padding:"0 4px"
                }}
              >🗑️</button>
              <span style={{ fontSize:"0.6rem", color:C.muted }}>{isCol ? "▶" : "▼"}</span>
            </div>

            {!isCol && (
              <div style={{ padding:"5px 9px 9px" }}>
                {tasks.map(task => {
                  const s = subjectMap[task.subject] || { color:C.muted, bg:C.surface };
                  return (
                    <label key={task.id} style={{
                      display:"flex", alignItems:"flex-start", gap:7,
                      padding:"4px 7px", borderRadius:6, marginBottom:2,
                      cursor:"pointer",
                      background: checked[task.id] ? s.bg : "#fafaf8",
                      opacity: checked[task.id] ? 0.6 : 1,
                      borderLeft:`3px solid ${s.color}`,
                    }}>
                      <input
                        type="checkbox" checked={!!checked[task.id]}
                        onChange={() => onToggle(task.id)}
                        style={{ marginTop:2, accentColor:s.color, width:12, height:12, flexShrink:0 }}
                      />
                      <div style={{ flex:1 }}>
                        <span style={{
                          fontSize:"0.75rem", color:C.text,
                          textDecoration: checked[task.id] ? "line-through" : "none"
                        }}>{task.label}</span>
                        {task.subject && (
                          <span style={{
                            display:"inline-block", fontSize:"0.58rem", fontWeight:700,
                            background:s.bg, color:s.color,
                            borderRadius:3, padding:"0px 4px", marginLeft:4
                          }}>{task.subject}</span>
                        )}
                      </div>
                      <button onClick={e => { e.preventDefault(); onDeleteTask(date, task.id); }} style={{
                        background:"none", border:"none", color:C.muted,
                        fontSize:"0.7rem", cursor:"pointer", padding:"0 2px"
                      }}>✕</button>
                    </label>
                  );
                })}

                {/* Add task to this day */}
                {addingTo === date ? (
                  <div style={{ display:"flex", gap:5, marginTop:6 }}>
                    <select
                      value={newTask.subject}
                      onChange={e => setNewTask(t => ({ ...t, subject:e.target.value }))}
                      style={{
                        padding:"4px 6px", borderRadius:6,
                        border:`1px solid ${C.surface2}`, background:C.surface,
                        color:C.text, fontFamily:"inherit", fontSize:"0.7rem"
                      }}
                    >
                      <option value="">No subject</option>
                      {subjects.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                    <input
                      value={newTask.label}
                      onChange={e => setNewTask(t => ({ ...t, label:e.target.value }))}
                      onKeyDown={e => {
                        if (e.key === "Enter" && newTask.label.trim()) {
                          onAddTask(date, newTask.label.trim(), newTask.subject);
                          setNewTask({ subject:"", label:"" });
                          setAddingTo(null);
                        }
                      }}
                      placeholder="task name..."
                      style={{
                        flex:1, padding:"4px 8px", borderRadius:6,
                        border:`1px solid ${C.surface2}`, background:C.surface,
                        color:C.text, fontFamily:"inherit", fontSize:"0.7rem"
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (newTask.label.trim()) {
                          onAddTask(date, newTask.label.trim(), newTask.subject);
                          setNewTask({ subject:"", label:"" });
                          setAddingTo(null);
                        }
                      }}
                      style={{
                        padding:"4px 8px", borderRadius:6, border:"none",
                        background:C.primary, color:"#fff",
                        fontFamily:"inherit", fontSize:"0.7rem", cursor:"pointer"
                      }}
                    >+</button>
                    <button
                      onClick={() => { setAddingTo(null); setNewTask({ subject:"", label:"" }); }}
                      style={{
                        padding:"4px 8px", borderRadius:6,
                        border:`1px solid ${C.surface2}`, background:C.surface,
                        color:C.muted, fontFamily:"inherit", fontSize:"0.7rem", cursor:"pointer"
                      }}
                    >✕</button>
                  </div>
                ) : (
                  <button onClick={() => setAddingTo(date)} style={{
                    background:"none", border:`1px dashed ${C.surface2}`,
                    borderRadius:6, padding:"3px 10px", width:"100%",
                    color:C.muted, fontFamily:"inherit", fontSize:"0.68rem",
                    cursor:"pointer", marginTop:4
                  }}>+ add task</button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Add a new day */}
      <AddDayButton subjects={subjects} onAdd={onAddTask} existingDates={days.map(d => d.date)} />
    </div>
  );
}

function AddDayButton({ subjects, onAdd, existingDates }) {
  const [open, setOpen]     = useState(false);
  const [date, setDate]     = useState("");
  const [group, setGroup]   = useState("");

  const handleAdd = () => {
    if (!date.trim()) return;
    onAdd(date.trim(), null, null, group.trim() || null); // null task = just creates the day
    setOpen(false); setDate(""); setGroup("");
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{
      width:"100%", padding:"8px 0", borderRadius:10,
      border:`2px dashed ${C.surface2}`, background:"none",
      color:C.muted, fontFamily:"inherit", fontSize:"0.75rem", cursor:"pointer"
    }}>+ Add Day</button>
  );

  return (
    <div style={{
      background:C.surface, borderRadius:10, padding:12,
      border:`1px solid ${C.surface2}`, marginBottom:8
    }}>
      <input value={date} onChange={e => setDate(e.target.value)}
        placeholder="Date label (e.g. Mon Apr 14)"
        style={{
          width:"100%", padding:"6px 10px", borderRadius:7, marginBottom:6,
          border:`1px solid ${C.surface2}`, background:C.bg,
          color:C.text, fontFamily:"inherit", fontSize:"0.75rem", boxSizing:"border-box"
        }}
      />
      <input value={group} onChange={e => setGroup(e.target.value)}
        placeholder="Week/group label (optional, e.g. Week 2)"
        style={{
          width:"100%", padding:"6px 10px", borderRadius:7, marginBottom:6,
          border:`1px solid ${C.surface2}`, background:C.bg,
          color:C.text, fontFamily:"inherit", fontSize:"0.75rem", boxSizing:"border-box"
        }}
      />
      <div style={{ display:"flex", gap:6 }}>
        <button onClick={handleAdd} style={{
          flex:1, padding:"6px 0", borderRadius:7, border:"none",
          background:C.primary, color:"#fff",
          fontFamily:"inherit", fontSize:"0.75rem", fontWeight:700, cursor:"pointer"
        }}>Add</button>
        <button onClick={() => setOpen(false)} style={{
          flex:1, padding:"6px 0", borderRadius:7,
          border:`1px solid ${C.surface2}`, background:C.surface,
          color:C.muted, fontFamily:"inherit", fontSize:"0.75rem", cursor:"pointer"
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── PetTab ───────────────────────────────────────────────────────────────────
function PetTab({ petId, petName, mood, happiness, level, title, equipped, owned, onEquip }) {
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{
        background:C.surface, borderRadius:16, padding:20, marginBottom:10,
        border:`2px solid ${C.surface2}`, display:"inline-block"
      }}>
        <PixelCat mood={mood} hat={equipped.hat} outfit={equipped.outfit}
          bg={equipped.bg} comp={equipped.comp} petId={petId} size={140} />
      </div>
      <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.text, marginBottom:2 }}>
        {petName} — Lv.{level} {title}
      </div>
      <div style={{
        background:C.surface, borderRadius:10, padding:"8px 14px",
        marginBottom:10, border:`1px solid ${C.surface2}`
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
          <span style={{ fontSize:"0.68rem", fontWeight:700, color:C.pink }}>
            {happiness > 70 ? "😸 Happy!" : happiness > 40 ? "😺 Content" : "😿 Needs tasks!"}
          </span>
          <span style={{ fontSize:"0.65rem", color:C.muted }}>{happiness}/100</span>
        </div>
        <div style={{ background:C.surface2, borderRadius:4, height:6, overflow:"hidden" }}>
          <div style={{
            background: happiness > 70 ? C.green : happiness > 40 ? C.yellow : C.red,
            width:`${happiness}%`, height:"100%", transition:"width 0.5s"
          }} />
        </div>
      </div>
      {owned.length > 0 && (
        <div style={{ background:C.surface, borderRadius:10, padding:10, border:`1px solid ${C.surface2}` }}>
          <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:7 }}>YOUR ITEMS</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center" }}>
            {SHOP.filter(s => owned.includes(s.id)).map(item => (
              <button key={item.id} onClick={() => onEquip(item.type, item.id)} style={{
                padding:"4px 8px", borderRadius:7, fontSize:"0.68rem", fontWeight:700,
                border:`2px solid ${equipped[item.type] === item.id ? C.primary : C.surface2}`,
                background: equipped[item.type] === item.id ? C.primary : C.bg,
                color: equipped[item.type] === item.id ? "#fff" : C.text,
                cursor:"pointer", fontFamily:"inherit"
              }}>{item.emoji} {item.label}{item.rare?" ✨":""}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QuestsTab ────────────────────────────────────────────────────────────────
function QuestsTab({ coins, achievements, onSpin, dailyQuests, questDone }) {
  return (
    <div>
      <div style={{
        background:C.surface, borderRadius:12, padding:12,
        marginBottom:12, border:`1px solid ${C.surface2}`, textAlign:"center"
      }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:4 }}>🎰 Spin the Wheel</div>
        <div style={{ fontSize:"0.68rem", color:C.muted, marginBottom:8 }}>Costs 5 coins · Win coins, free time, or rare items!</div>
        <button onClick={onSpin} style={{
          padding:"8px 20px", borderRadius:10, border:"none",
          background: coins >= 5 ? C.primary : C.surface2,
          color: coins >= 5 ? "#fff" : C.muted,
          fontFamily:"inherit", fontSize:"0.78rem", fontWeight:700,
          cursor: coins >= 5 ? "pointer" : "default"
        }}>{coins >= 5 ? "Spin! (5 coins)" : "Need 5 coins to spin"}</button>
      </div>

      <div style={{ background:C.surface, borderRadius:12, padding:12, marginBottom:12, border:`1px solid ${C.surface2}` }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:8 }}>Daily Quests</div>
        {dailyQuests.map(q => {
          const isDone = questDone[q.id];
          return (
            <div key={q.id} style={{
              background: isDone ? "#d4edd4" : C.bg, borderRadius:8,
              padding:"8px 10px", marginBottom:6,
              border:`1px solid ${isDone ? C.green : C.surface2}`,
              display:"flex", alignItems:"center", gap:8,
            }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.75rem", fontWeight:700, color: isDone ? C.green : C.text, textDecoration: isDone ? "line-through" : "none" }}>{q.label}</div>
                <div style={{ fontSize:"0.62rem", color:C.muted }}>+{q.reward} coins</div>
              </div>
              {isDone ? <span>✅</span> : <span style={{ fontSize:"0.68rem", color:C.muted }}>+{q.reward}</span>}
            </div>
          );
        })}
      </div>

      <div style={{ background:C.surface, borderRadius:12, padding:12, border:`1px solid ${C.surface2}` }}>
        <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:8 }}>
          Achievements ({achievements.length}/10)
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
          {achievements.map(({ ach, unlocked }) => (
            <div key={ach.id} style={{
              background: unlocked ? C.bg : C.surface2, borderRadius:10,
              padding:"8px 10px", opacity: unlocked ? 1 : 0.5,
              border:`1px solid ${unlocked ? C.yellow : C.surface2}`
            }}>
              <div style={{ fontSize:"1.2rem", textAlign:"center" }}>{unlocked ? ach.emoji : "🔒"}</div>
              <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.text, textAlign:"center" }}>{ach.label}</div>
              <div style={{ fontSize:"0.6rem", color:C.muted, textAlign:"center" }}>{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ShopTab ──────────────────────────────────────────────────────────────────
function ShopTab({ coins, owned, equipped, onBuy, onEquip }) {
  return (
    <div>
      <div style={{ fontSize:"0.7rem", color:C.muted, marginBottom:10, textAlign:"center" }}>
        Earn coins by completing tasks · ✨ = rare, win from wheel only
      </div>
      {["hat","outfit","bg","comp"].map(type => {
        const labels = { hat:"Hats", outfit:"Outfits", bg:"Backgrounds", comp:"Companions" };
        return (
          <div key={type} style={{ marginBottom:12 }}>
            <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:5, letterSpacing:"0.08em" }}>
              {labels[type].toUpperCase()}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5 }}>
              {SHOP.filter(s => s.type === type).map(item => {
                const isOwned = owned.includes(item.id);
                const canBuy  = coins >= item.cost && !isOwned && !item.rare;
                return (
                  <div key={item.id} style={{
                    background: isOwned ? "#d4edd4" : item.rare ? "#f5f0ff" : C.surface,
                    borderRadius:10, padding:"9px 10px",
                    border:`1px solid ${isOwned ? C.green : item.rare ? C.purple : C.surface2}`,
                    display:"flex", flexDirection:"column", gap:3,
                  }}>
                    <div style={{ fontSize:"1.3rem", textAlign:"center" }}>{item.emoji}</div>
                    <div style={{ fontSize:"0.7rem", fontWeight:700, color:C.text, textAlign:"center" }}>
                      {item.label}{item.rare?" ✨":""}
                    </div>
                    {item.rare && !isOwned && (
                      <div style={{ fontSize:"0.6rem", color:C.purple, textAlign:"center" }}>Win from wheel!</div>
                    )}
                    {isOwned && (
                      <button onClick={() => onEquip(item.type, item.id)} style={{
                        padding:"3px 0", borderRadius:6, border:"none",
                        fontSize:"0.65rem", fontWeight:700,
                        background: equipped[item.type] === item.id ? C.primary : C.green,
                        color:"#fff", cursor:"pointer", fontFamily:"inherit"
                      }}>
                        {equipped[item.type] === item.id ? "✓ Equipped" : "Equip"}
                      </button>
                    )}
                    {!item.rare && !isOwned && (
                      <button onClick={() => onBuy(item)} disabled={!canBuy} style={{
                        padding:"3px 0", borderRadius:6, border:"none",
                        fontSize:"0.65rem", fontWeight:700,
                        background: canBuy ? C.primary : C.surface2,
                        color: canBuy ? "#fff" : C.muted,
                        cursor: canBuy ? "pointer" : "default", fontFamily:"inherit"
                      }}>{item.cost} coins</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [authReady,  setAuthReady]  = useState(false);
  const [uid,        setUid]        = useState(null);
  const [username, setUsername] = useState(
    localStorage.getItem("sq-username") || ""
  );
  const [petId,   setPetId]   = useState(localStorage.getItem("sq-petId")   || "tabby");
  const [petName, setPetName] = useState(localStorage.getItem("sq-petName") || "");
  const [subjects,   setSubjects]   = useState([]);
  const [days,       setDays]       = useState([]); // [{ date, group, tasks: [{id,label,subject,done}] }]
  const [tab,        setTab]        = useState("tasks");
  const [popup,      setPopup]      = useState(null);
  const [newAch,     setNewAch]     = useState(null);
  const [showSpin,   setShowSpin]   = useState(false);
  const [dailyQuests, setDailyQuests] = useState([]);
  const safeUsername = username || "";

  const allTasks = days.flatMap(d => d.tasks);
  const {
    state, done,
    toggleTask, handleSpin, buyItem, equipItem, cashOut,
    tickHappiness, incrementCheers, setState,
  } = useGameState(allTasks.length);

  const actualDone = allTasks.filter(t => state.checked[t.id]).length;

  // ── Auth listener ─────────────────────────────────────────────────────────
  useEffect(() => {
    return onAuthStateChanged(auth, async user => {
      if (user) {
        setUid(user.uid);
        // Load user meta from Firebase
        const snap = await get(ref(db, `users/${user.uid}/meta`));
        if (snap.exists()) {
          const meta = snap.val();
          setUsername(meta.username || "");
          localStorage.setItem("sq-username", meta.username || "");
          setPetId(meta.petId || "tabby");
          setPetName(meta.petName || "");
          setSubjects(meta.subjects || []);
        }
       // after loading meta, also load days
      const stateSnap = await get(ref(db, `users/${user.uid}/gameState`));
      if (stateSnap.exists()) {
        setState(prev => ({ ...prev, ...stateSnap.val() }));
      }
      const daysSnap = await get(ref(db, `users/${user.uid}/days`));
      if (daysSnap.exists()) {
        setDays(daysSnap.val());
      } else {
      // fall back to localStorage
        const savedDays = JSON.parse(localStorage.getItem("studyquest-days") || "null");
        if (savedDays) setDays(savedDays);
        }
      }
      setAuthReady(true);
    });
  }, []);

  // ── Persist days whenever they change ────────────────────────────────────
  useEffect(() => {
    if (days.length > 0) {
      localStorage.setItem("studyquest-days", JSON.stringify(days));
      // also save to Firebase
      if (uid) set(ref(db, `users/${uid}/days`), days);
    }
  }, [days, uid]);

  useEffect(() => {
    if (!uid || !state) return;
    // Strip any checked keys with invalid Firebase characters
    const safeChecked = Object.fromEntries(
      Object.entries(state.checked || {}).filter(([k]) => !k.includes("."))
    );
    set(ref(db, `users/${uid}/gameState`), { ...state, checked: safeChecked });
  }, [uid, state]);

  // ── Happiness decay ───────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(tickHappiness, 60000);
    return () => clearInterval(t);
  }, [tickHappiness]);

  // ── Daily quests ──────────────────────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toDateString();
    try {
      const q = JSON.parse(localStorage.getItem("studyquest-quests") || "{}");
      if (q.date === today) { setDailyQuests(q.quests || []); return; }
    } catch {}
    const quests = [...QUEST_TEMPLATES].sort(() => Math.random() - 0.5).slice(0, 3);
    setDailyQuests(quests);
    localStorage.setItem("studyquest-quests", JSON.stringify({ date:today, quests }));
  }, []);

  // ── Multiplayer publish ───────────────────────────────────────────────────
  const todayDone = allTasks.filter(t => {
    const today = new Date().toDateString();
    return state.checked[t.id] && state.lastDate === today;
  }).length;

  usePublishProfile(uid, username, petId, petName, actualDone, allTasks.length, state.coins, state.equipped);
  usePublishTasks(uid, allTasks.map(t => ({ ...t, done: !!state.checked[t.id] })));
  usePublishTodayDone(uid, todayDone, state.streak);

  // ── Onboarding done ───────────────────────────────────────────────────────
  const handleOnboardingDone = (newUid, uname, pid, pname, subs) => {
    setUid(newUid);
    if (uname) { 
      setUsername(uname);
      localStorage.setItem("sq-username", uname);
      setPetId(pid); 
      setPetName(pname); 
      setSubjects(subs || []); }
  };

  const showPopup = msg => { setPopup(msg); setTimeout(() => setPopup(null), 1800); };
  const showAchievement = ach => { setNewAch(ach); setTimeout(() => setNewAch(null), 3000); };

  // ── Task mutations ────────────────────────────────────────────────────────
  const handleToggle = id => toggleTask(id, showPopup, showAchievement);

  const handleAddTask = (date, label, subject, group = null) => {
    setDays(prev => {
      const existing = prev.find(d => d.date === date);
      const newTask = label ? { id:`t_${Date.now()}_${Math.random().toString(36).substr(2,9)}`, label, subject: subject || "", done:false } : null;
      if (existing) {
        return prev.map(d => d.date === date
          ? { ...d, tasks: newTask ? [...d.tasks, newTask] : d.tasks }
          : d
        );
      }
      return [...prev, { date, group: group || null, tasks: newTask ? [newTask] : [] }];
    });
  };

  const handleDeleteTask = (date, taskId) => {
    setDays(prev => prev.map(d =>
      d.date === date ? { ...d, tasks: d.tasks.filter(t => t.id !== taskId) } : d
    ));
    setState(prev => {
      const checked = { ...prev.checked };
      delete checked[taskId];
      return { ...prev, checked };
    });
  };

  const handleDeleteDay = (date) => {
    setDays(prev => prev.filter(d => d.date !== date));
  };

  const handleImport = (data) => {
    const imported = data.map(d => ({
      date:  d.date,
      group: d.group || null,
      tasks: d.tasks.map((t, i) => ({
        id: `imported_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,
        label:   t.label,
        subject: t.subject || "",
        done:    false,
      }))
    }));
    setDays(imported);
  };

  // ── Derived display ───────────────────────────────────────────────────────
  const { level, title, mood: rawMood } = getLevel(actualDone, allTasks.length);
  const mood = state.happiness < 30 ? "sleepy" : state.happiness > 70 ? rawMood : "neutral";
  const lvlThresholds = [0, 0.08, 0.22, 0.40, 0.60, 0.80, 1.0];
  const pct = allTasks.length > 0 ? actualDone / allTasks.length : 0;
  const lvlStart = lvlThresholds[level - 1] || 0;
  const lvlEnd   = lvlThresholds[level]     || 1;
  const lvlPct   = lvlEnd > lvlStart ? ((pct - lvlStart) / (lvlEnd - lvlStart)) * 100 : 100;

  const { ACHIEVEMENTS: ACH_LIST } = require("./data/constants");
  const achDisplay = ACH_LIST.map(a => ({ ach: a, unlocked: state.achievements.includes(a.id) }));

  if (!authReady) return (
    <div style={{ ...px, background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:C.muted, fontSize:"0.85rem" }}>
      Loading...
    </div>
  );

  if (!uid || !username) return <Onboarding onDone={handleOnboardingDone} />;

  return (
    <div style={{ ...px, background:C.bg, minHeight:"100vh", padding:16, maxWidth:480, margin:"0 auto" }}>

      {popup && (
        <div style={{
          position:"fixed", top:60, right:16,
          background:C.primary, color:"#fff",
          borderRadius:20, padding:"6px 14px",
          fontSize:"0.82rem", fontWeight:700, zIndex:999
        }}>{popup}</div>
      )}

      {newAch && (
        <div style={{
          position:"fixed", top:100, left:"50%", transform:"translateX(-50%)",
          background:"#fff", borderRadius:16, padding:"12px 20px",
          boxShadow:"0 4px 20px rgba(0,0,0,0.2)", zIndex:1000, textAlign:"center",
          border:`2px solid ${C.yellow}`
        }}>
          <div style={{ fontSize:"1.5rem" }}>{newAch.emoji}</div>
          <div style={{ fontSize:"0.8rem", fontWeight:700, color:C.text }}>Achievement Unlocked!</div>
          <div style={{ fontSize:"0.72rem", color:C.muted }}>{newAch.label}</div>
        </div>
      )}

      {showSpin && (
        <SpinWheel
          coins={state.coins}
          onSpin={r => handleSpin(r, showPopup, showAchievement)}
          onClose={() => setShowSpin(false)}
        />
      )}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <div>
          <span style={{ fontSize:"0.95rem", fontWeight:700, color:C.text }}>{username}</span>
          <span style={{ fontSize:"0.65rem", color:C.muted, marginLeft:6 }}>Lv.{level} {title}</span>
        </div>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {state.streak > 0 && (
            <span style={{ fontSize:"0.7rem", fontWeight:700, color:C.red }}>🔥{state.streak}</span>
          )}
          <div style={{
            background:C.surface, borderRadius:20, padding:"3px 10px",
            fontSize:"0.75rem", fontWeight:700, color:C.primary,
            border:`2px solid ${C.primary}`
          }}>🪙 {state.coins}</div>
        </div>
      </div>

      {/* XP bar */}
      <div style={{
        background:C.surface, borderRadius:4, height:7, marginBottom:4,
        overflow:"hidden", border:`1px solid ${C.surface2}`
      }}>
        <div style={{ background:C.primary, width:`${Math.min(100, Math.max(0, lvlPct))}%`, height:"100%", transition:"width 0.4s" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.6rem", color:C.muted, marginBottom:10 }}>
        <span>Lv.{level}</span>
        <span>{actualDone}/{allTasks.length} tasks</span>
        <span>Lv.{Math.min(level + 1, 6)}</span>
      </div>

      {/* Free time bar */}
      <div style={{
        background:C.surface, borderRadius:10, padding:"8px 12px",
        marginBottom:12, border:`1px solid ${C.surface2}`,
        display:"flex", alignItems:"center", gap:8
      }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
            <span style={{ fontSize:"0.68rem", fontWeight:700, color:C.green }}>Free Time</span>
            <span style={{ fontSize:"0.68rem", color:C.muted }}>{state.freeTime} min earned</span>
          </div>
          <div style={{ background:C.surface2, borderRadius:4, height:6, overflow:"hidden" }}>
            <div style={{
              background:C.green,
              width:`${Math.min(100, (state.freeTime / 120) * 100)}%`,
              height:"100%", transition:"width 0.3s"
            }} />
          </div>
        </div>
        <button
          onClick={() => cashOut(showPopup)}
          disabled={state.freeTime < 15}
          style={{
            padding:"4px 10px", borderRadius:8, border:"none",
            fontSize:"0.68rem", fontWeight:700,
            background: state.freeTime >= 15 ? C.green : C.surface2,
            color: state.freeTime >= 15 ? "#fff" : C.muted,
            fontFamily:"inherit", cursor: state.freeTime >= 15 ? "pointer" : "default"
          }}
        >Cash out!</button>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", gap:4, marginBottom:14 }}>
        {[["tasks","📋"],["pet","🐱"],["quests","⚡"],["friend","👯"],["shop","🛍️"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} style={{
            flex:1, padding:"6px 0", borderRadius:6,
            border:`2px solid ${tab === v ? C.primary : C.surface2}`,
            background: tab === v ? C.primary : C.surface,
            color: tab === v ? "#fff" : C.text,
            fontFamily:"inherit", fontSize:"0.7rem", fontWeight:700, cursor:"pointer"
          }}>{l}</button>
        ))}
      </div>

      {tab === "tasks" && (
        <TasksTab
          days={days} subjects={subjects}
          checked={state.checked}
          onToggle={handleToggle}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onDeleteDay={handleDeleteDay}
          onImport={handleImport}
        />
      )}

      {tab === "pet" && (
        <PetTab
          petId={petId} petName={petName} mood={mood}
          happiness={state.happiness} level={level} title={title}
          equipped={state.equipped} owned={state.owned}
          onEquip={equipItem}
        />
      )}

      {tab === "quests" && (
        <QuestsTab
          coins={state.coins}
          achievements={achDisplay}
          onSpin={() => setShowSpin(true)}
          dailyQuests={dailyQuests}
          questDone={state.questDone}
        />
      )}

      {tab === "friend" && (
        <FriendsTab
          uid={uid} username={username}
          myTasks={allTasks.map(t => ({ ...t, done: !!state.checked[t.id] }))}
        />
      )}

      {tab === "shop" && (
        <ShopTab
          coins={state.coins} owned={state.owned} equipped={state.equipped}
          onBuy={item => buyItem(item, showAchievement)}
          onEquip={equipItem}
        />
      )}
    </div>
  );
}
