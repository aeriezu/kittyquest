import { useState } from "react";
import PixelCat from "./PixelCat";
import { C, px, CHEERS, getLevel } from "../data/constants";
import { useFriendProfiles, useFriendTasks, useMessages, useLeaderboard } from "../hooks/useMultiplayer";

// ── Friend card with their cat and progress ───────────────────────────────────
function FriendCard({ friend }) {
  const { level, mood } = getLevel(friend.done, friend.total);
  const tasks = useFriendTasks(friend.uid);
  const [expanded, setExpanded] = useState(false);
  const pct = friend.total > 0 ? (friend.done / friend.total) * 100 : 0;

  return (
    <div style={{
      background:C.surface, borderRadius:14, padding:12,
      border:`1px solid ${C.surface2}`, marginBottom:10,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <PixelCat
          mood={mood}
          hat={friend.equipped?.hat}
          outfit={friend.equipped?.outfit}
          bg={friend.equipped?.bg}
          comp={friend.equipped?.comp}
          petId={friend.petId || "tabby"}
          size={72}
        />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"0.8rem", fontWeight:700, color:C.text }}>{friend.petName}</div>
          <div style={{ fontSize:"0.65rem", color:C.muted }}>{friend.username} · Lv.{level}</div>
          <div style={{ fontSize:"0.62rem", color:C.muted, marginTop:2 }}>
            {friend.done}/{friend.total} tasks · 🪙{friend.coins}
          </div>
          <div style={{ background:C.surface2, borderRadius:4, height:4, overflow:"hidden", marginTop:4 }}>
            <div style={{ background:C.blue, width:`${pct}%`, height:"100%", transition:"width 0.3s" }} />
          </div>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            background:"none", border:`1px solid ${C.surface2}`,
            borderRadius:8, padding:"3px 8px", color:C.muted,
            fontFamily:"inherit", fontSize:"0.65rem", cursor:"pointer"
          }}
        >
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {expanded && (
        <div style={{ marginTop:10, borderTop:`1px solid ${C.surface2}`, paddingTop:8 }}>
          <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:6 }}>
            {friend.username}'s tasks
          </div>
          {tasks.length === 0
            ? <div style={{ fontSize:"0.7rem", color:C.muted }}>No tasks added yet</div>
            : tasks.map(task => (
              <div key={task.id} style={{
                display:"flex", alignItems:"center", gap:7, padding:"4px 0",
                borderBottom:`1px solid ${C.surface2}`,
              }}>
                <div style={{
                  width:8, height:8, borderRadius:"50%", flexShrink:0,
                  background: task.done ? C.green : C.surface2,
                }} />
                <span style={{
                  flex:1, fontSize:"0.72rem", color:C.text,
                  textDecoration: task.done ? "line-through" : "none",
                }}>{task.label}</span>
                {task.done && <span style={{ fontSize:"0.6rem" }}>✅</span>}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// ── Leaderboard panel ─────────────────────────────────────────────────────────
function Leaderboard() {
  const board = useLeaderboard();
  const [view, setView] = useState("total"); // total | today | streak

  const sorted = [...board].sort((a, b) => {
    if (view === "today")  return b.todayDone - a.todayDone;
    if (view === "streak") return b.streak    - a.streak;
    return (b.total > 0 ? b.done / b.total : 0) - (a.total > 0 ? a.done / a.total : 0);
  });

  return (
    <div style={{ background:C.surface, borderRadius:12, padding:12, marginBottom:12, border:`1px solid ${C.surface2}` }}>
      <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:8 }}>🏆 Leaderboard</div>
      <div style={{ display:"flex", gap:4, marginBottom:10 }}>
        {[["total","Overall"],["today","Today"],["streak","Streak"]].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)} style={{
            flex:1, padding:"4px 0", borderRadius:6, border:"none",
            background: view === v ? C.text : C.surface2,
            color: view === v ? "#fff" : C.muted,
            fontFamily:"inherit", fontSize:"0.65rem", fontWeight:700, cursor:"pointer",
          }}>{l}</button>
        ))}
      </div>
      {sorted.map((u, i) => {
        const val = view === "today"  ? `${u.todayDone} today`
                  : view === "streak" ? `🔥${u.streak}`
                  : `${u.done}/${u.total}`;
        const medals = ["🥇","🥈","🥉"];
        return (
          <div key={u.username} style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"5px 0", borderBottom:`1px solid ${C.surface2}`,
          }}>
            <span style={{ fontSize:"0.9rem", width:20 }}>{medals[i] || `${i+1}`}</span>
            <span style={{ flex:1, fontSize:"0.75rem", fontWeight:700, color:C.text }}>
              {u.petName} <span style={{ fontWeight:400, color:C.muted }}>({u.username})</span>
            </span>
            <span style={{ fontSize:"0.72rem", color:C.primary, fontWeight:700 }}>{val}</span>
          </div>
        );
      })}
      {sorted.length === 0 && (
        <div style={{ fontSize:"0.72rem", color:C.muted, textAlign:"center", padding:"8px 0" }}>
          No data yet!
        </div>
      )}
    </div>
  );
}

// ── Main FriendsTab ───────────────────────────────────────────────────────────
export default function FriendsTab({ uid, username, myTasks }) {
  const friends                = useFriendProfiles(uid);
  const { messages, sendMessage } = useMessages();
  const [msgInput, setMsgInput] = useState("");

  const handleCheer = (text) => {
    sendMessage(username, text);
  };

  return (
    <div style={px}>
      <Leaderboard />

      {/* Friends */}
      {friends.length === 0 ? (
        <div style={{
          background:C.surface, borderRadius:14, padding:20,
          border:`1px solid ${C.surface2}`, textAlign:"center", marginBottom:12,
        }}>
          <div style={{ fontSize:"0.75rem", color:C.muted }}>
            Waiting for friends... 👀<br />
            <span style={{ fontSize:"0.65rem" }}>Share the app link with them!</span>
          </div>
        </div>
      ) : (
        friends.map(f => <FriendCard key={f.username} friend={f} />)
      )}

      {/* Your tasks (visible to friends) */}
      <div style={{
        background:C.surface, borderRadius:12, padding:12,
        marginBottom:12, border:`1px solid ${C.surface2}`
      }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.muted, marginBottom:8 }}>
          YOUR TASKS (visible to friends)
        </div>
        {myTasks.length === 0
          ? <div style={{ fontSize:"0.7rem", color:C.muted, textAlign:"center" }}>
              Add tasks in your Tasks tab!
            </div>
          : myTasks.map(task => (
            <div key={task.id} style={{
              display:"flex", alignItems:"center", gap:7,
              padding:"5px 7px", borderRadius:6, marginBottom:3,
              background: task.done ? "#d4edd4" : "#fafaf8",
              borderLeft:`3px solid ${C.primary}`,
            }}>
              <div style={{
                width:8, height:8, borderRadius:"50%",
                background: task.done ? C.green : C.surface2, flexShrink:0,
              }} />
              <span style={{
                flex:1, fontSize:"0.75rem", color:C.text,
                textDecoration: task.done ? "line-through" : "none",
              }}>{task.label}</span>
            </div>
          ))
        }
      </div>

      {/* Cheers */}
      <div style={{
        background:C.surface, borderRadius:12, padding:12,
        border:`1px solid ${C.surface2}`
      }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.muted, marginBottom:8 }}>
          CHEERS 📣
        </div>
        <div style={{ maxHeight:150, overflowY:"auto", marginBottom:8 }}>
          {messages.length === 0
            ? <div style={{ fontSize:"0.7rem", color:C.muted, textAlign:"center", padding:"8px 0" }}>
                No cheers yet!
              </div>
            : [...messages].reverse().map((m, i) => (
              <div key={i} style={{
                background: m.username === username ? C.primary : C.bg,
                color: m.username === username ? "#fff" : C.text,
                borderRadius:8, padding:"5px 10px", marginBottom:4,
                fontSize:"0.7rem", textAlign: m.username === username ? "right" : "left",
              }}>
                <span style={{ fontWeight:700 }}>{m.username}: </span>{m.text}
              </div>
            ))
          }
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:7 }}>
          {CHEERS.map((c, i) => (
            <button key={i} onClick={() => handleCheer(c)} style={{
              padding:"3px 7px", borderRadius:10,
              border:`1px solid ${C.surface2}`, background:C.bg,
              color:C.text, fontFamily:"inherit", fontSize:"0.6rem", cursor:"pointer",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:5 }}>
          <input
            value={msgInput} onChange={e => setMsgInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && msgInput.trim()) { handleCheer(msgInput); setMsgInput(""); }}}
            placeholder="custom message..."
            style={{
              flex:1, padding:"5px 9px", borderRadius:7,
              border:`1px solid ${C.surface2}`, background:C.bg,
              color:C.text, fontFamily:"inherit", fontSize:"0.7rem",
            }}
          />
          <button
            onClick={() => { if (msgInput.trim()) { handleCheer(msgInput); setMsgInput(""); }}}
            style={{
              padding:"5px 10px", borderRadius:7, border:"none",
              background:C.primary, color:"#fff",
              fontFamily:"inherit", fontSize:"0.7rem", fontWeight:700, cursor:"pointer",
            }}
          >Send</button>
        </div>
      </div>
    </div>
  );
}
