import { useState } from "react";
import PixelCat from "./PixelCat";
import HouseRoom from "./HouseRoom";
import { C, px, CHEERS, getLevel } from "../data/constants";
import { useFriendProfiles, useMessages, useLeaderboard } from "../hooks/useMultiplayer";

// ── Leaderboard ───────────────────────────────────────────────────────────────
function Leaderboard() {
  const board = useLeaderboard();
  const [view, setView] = useState("total");
  const sorted = [...board].sort((a, b) => {
    if (view === "today")  return b.todayDone - a.todayDone;
    if (view === "streak") return b.streak    - a.streak;
    return (b.total > 0 ? b.done / b.total : 0) - (a.total > 0 ? a.done / a.total : 0);
  });
  const medals = ["🥇","🥈","🥉"];
  return (
    <div style={{ background:C.surface, borderRadius:12, padding:12, marginBottom:12, border:`1px solid ${C.surface2}` }}>
      <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:8 }}>🏆 Leaderboard</div>
      <div style={{ display:"flex", gap:4, marginBottom:10 }}>
        {[["total","Overall"],["today","Today"],["streak","Streak"]].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)} style={{ flex:1, padding:"4px 0", borderRadius:6, border:"none", background:view===v?C.text:C.surface2, color:view===v?"#fff":C.muted, fontFamily:"inherit", fontSize:"0.65rem", fontWeight:700, cursor:"pointer" }}>{l}</button>
        ))}
      </div>
      {sorted.length === 0
        ? <div style={{ fontSize:"0.72rem", color:C.muted, textAlign:"center", padding:"8px 0" }}>No data yet!</div>
        : sorted.map((u, i) => {
          const val = view==="today"?`${u.todayDone} today`:view==="streak"?`🔥${u.streak}`:`${u.done}/${u.total}`;
          return (
            <div key={u.username} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:`1px solid ${C.surface2}` }}>
              <span style={{ fontSize:"0.9rem", width:20 }}>{medals[i]||`${i+1}`}</span>
              <span style={{ flex:1, fontSize:"0.75rem", fontWeight:700, color:C.text }}>{u.petName} <span style={{ fontWeight:400, color:C.muted }}>({u.username})</span></span>
              <span style={{ fontSize:"0.72rem", color:C.primary, fontWeight:700 }}>{val}</span>
            </div>
          );
        })
      }
    </div>
  );
}

// ── Friend Card ───────────────────────────────────────────────────────────────
function FriendCard({ f, username }) {
  const { level, mood } = getLevel(f.done, f.total);
  const pct = f.total > 0 ? (f.done / f.total) * 100 : 0;
  const [tab, setTab] = useState("cat"); // "cat" | "house" | "tasks"

  return (
    <div style={{ borderRadius:14, border:`1px solid ${C.surface2}`, marginBottom:10, overflow:"hidden", background:C.surface }}>
      {/* Wide background banner */}
      <div style={{ position:"relative", height:150, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <PixelCat mood={mood} hat={f.equipped?.hat} outfit={f.equipped?.outfit}
            bg={f.equipped?.bg} comp={null} petId={f.petId||"tabby"} size={0} bgOnly={true} />
        </div>
        <div style={{ position:"absolute", inset:0, zIndex:1, display:"flex", alignItems:"flex-end", padding:"0 12px 10px" }}>
          <div style={{ animation:"catBob 2.8s ease-in-out infinite", flexShrink:0 }}>
            <style>{`@keyframes catBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
            <PixelCat mood={mood} hat={f.equipped?.hat} outfit={f.equipped?.outfit}
              bg={null} comp={f.equipped?.comp} petId={f.petId||"tabby"} size={85} />
          </div>
          <div style={{ marginLeft:10, background:"rgba(255,255,255,0.82)", borderRadius:10, padding:"6px 10px", backdropFilter:"blur(4px)", flex:1 }}>
            <div style={{ fontSize:"0.8rem", fontWeight:700, color:C.text }}>{f.petName}</div>
            <div style={{ fontSize:"0.65rem", color:C.muted }}>{f.username} · Lv.{level}</div>
            <div style={{ fontSize:"0.62rem", color:C.muted, marginTop:2 }}>{f.done}/{f.total} tasks · 🪙{f.coins}</div>
            <div style={{ background:C.surface2, borderRadius:4, height:4, overflow:"hidden", marginTop:4 }}>
              <div style={{ background:C.blue, width:`${pct}%`, height:"100%", transition:"width 0.3s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", borderTop:`1px solid ${C.surface2}` }}>
        {[["cat","🐱 Cat"],["house","🏠 House"],["tasks","📋 Tasks"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)} style={{ flex:1, padding:"6px 0", border:"none", borderBottom:`2px solid ${tab===v?C.primary:"transparent"}`, background:"none", color:tab===v?C.primary:C.muted, fontFamily:"inherit", fontSize:"0.65rem", fontWeight:700, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {/* Cat details */}
      {tab==="cat" && (
        <div style={{ padding:12 }}>
          <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:8 }}>EQUIPPED ITEMS</div>
          {["hat","outfit","bg","comp"].some(t => f.equipped?.[t]) ? (
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {["hat","outfit","bg","comp"].filter(t => f.equipped?.[t]).map(t => {
                const { SHOP } = require("../data/constants");
                const item = SHOP.find(s => s.id === f.equipped[t]);
                return item ? (
                  <div key={t} style={{ background:C.bg, borderRadius:7, padding:"3px 8px", fontSize:"0.65rem", color:C.text, border:`1px solid ${C.surface2}` }}>
                    {item.emoji} {item.label}
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div style={{ fontSize:"0.7rem", color:C.muted }}>No items equipped</div>
          )}
        </div>
      )}

      {/* House visit */}
      {tab==="house" && (
        <div style={{ padding:12 }}>
          {f.house && Object.values(f.house).some(Boolean) ? (
            <>
              <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:8 }}>
                {f.username}'s room
              </div>
              <HouseRoom house={f.house} compact={true}
                catElement={
                  <div style={{ animation:"catBob 2.8s ease-in-out infinite" }}>
                    <PixelCat mood={mood} hat={f.equipped?.hat} outfit={f.equipped?.outfit}
                      bg={null} comp={f.equipped?.comp} petId={f.petId||"tabby"} size={70} />
                  </div>
                }
              />
            </>
          ) : (
            <div style={{ fontSize:"0.7rem", color:C.muted, textAlign:"center", padding:"16px 0" }}>
              {f.username} hasn't decorated their room yet 🏚️
            </div>
          )}
        </div>
      )}

      {/* Tasks */}
      {tab==="tasks" && (
        <div style={{ padding:"10px 12px" }}>
          <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:6 }}>{f.username}'s tasks</div>
          {(!f.tasks || f.tasks.length === 0)
            ? <div style={{ fontSize:"0.7rem", color:C.muted }}>No tasks added yet</div>
            : f.tasks.map((task, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7, padding:"4px 0", borderBottom:`1px solid ${C.surface2}` }}>
                <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0, background:task.done?C.green:C.surface2 }} />
                <span style={{ flex:1, fontSize:"0.72rem", color:C.text, textDecoration:task.done?"line-through":"none" }}>{task.label}</span>
                {task.done && <span style={{ fontSize:"0.6rem" }}>✅</span>}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// ── Main FriendsTab ───────────────────────────────────────────────────────────
export default function FriendsTab({ uid, username, myTasks }) {
  const friends = useFriendProfiles(uid);
  const { messages, sendMessage } = useMessages();
  const [msgInput, setMsgInput] = useState("");
  const handleSend = (text) => { if (!text.trim()) return; sendMessage(username || "unknown", text); };

  return (
    <div style={px}>
      <Leaderboard />

      {friends.length === 0 ? (
        <div style={{ background:C.surface, borderRadius:14, padding:20, border:`1px solid ${C.surface2}`, textAlign:"center", marginBottom:12 }}>
          <div style={{ fontSize:"0.75rem", color:C.muted }}>No friends yet 👀<br/><span style={{ fontSize:"0.65rem" }}>Share the app link + invite code!</span></div>
        </div>
      ) : (
        friends.map(f => <FriendCard key={f.username} f={f} username={username} />)
      )}

      {/* Cheers */}
      <div style={{ background:C.surface, borderRadius:12, padding:12, border:`1px solid ${C.surface2}` }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.muted, marginBottom:8 }}>CHEERS 📣</div>
        <div style={{ fontSize:"0.62rem", color:C.muted, marginBottom:6 }}>Sending as: <span style={{ fontWeight:700, color:C.primary }}>{username||"..."}</span></div>
        <div style={{ maxHeight:150, overflowY:"auto", marginBottom:8 }}>
          {messages.length === 0
            ? <div style={{ fontSize:"0.7rem", color:C.muted, textAlign:"center", padding:"8px 0" }}>No cheers yet!</div>
            : [...messages].reverse().map((m, i) => (
              <div key={i} style={{ background:m.username===username?C.primary:C.bg, color:m.username===username?"#fff":C.text, borderRadius:8, padding:"5px 10px", marginBottom:4, fontSize:"0.7rem", textAlign:m.username===username?"right":"left" }}>
                <span style={{ fontWeight:700 }}>{m.username}: </span>{m.text}
              </div>
            ))
          }
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:7 }}>
          {CHEERS.map((c, i) => (
            <button key={i} onClick={() => handleSend(c)} style={{ padding:"3px 7px", borderRadius:10, border:`1px solid ${C.surface2}`, background:C.bg, color:C.text, fontFamily:"inherit", fontSize:"0.6rem", cursor:"pointer" }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:5 }}>
          <input value={msgInput} onChange={e => setMsgInput(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter"&&msgInput.trim()){handleSend(msgInput);setMsgInput("");} }}
            placeholder="custom message..."
            style={{ flex:1, padding:"5px 9px", borderRadius:7, border:`1px solid ${C.surface2}`, background:C.bg, color:C.text, fontFamily:"inherit", fontSize:"0.7rem" }} />
          <button onClick={() => { handleSend(msgInput); setMsgInput(""); }}
            style={{ padding:"5px 10px", borderRadius:7, border:"none", background:C.primary, color:"#fff", fontFamily:"inherit", fontSize:"0.7rem", fontWeight:700, cursor:"pointer" }}>Send</button>
        </div>
      </div>
    </div>
  );
}
