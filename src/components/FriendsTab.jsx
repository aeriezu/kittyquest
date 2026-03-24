import { useState } from "react";
import PixelCat from "./PixelCat";
import { C, px, CHEERS, getLevel } from "../data/constants";
import { useFriendProfiles, useMessages } from "../hooks/useMultiplayer";

export default function FriendsTab({ uid, username, myTasks }) {
  const friends = useFriendProfiles(uid);
  const { messages, sendMessage } = useMessages();
  const [msgInput, setMsgInput] = useState("");
  const [expanded, setExpanded] = useState({});

  return (
    <div style={px}>

      {/* ── Friends ── */}
      {friends.length === 0 ? (
        <div style={{
          background:C.surface, borderRadius:14, padding:20,
          border:`1px solid ${C.surface2}`, textAlign:"center", marginBottom:12,
        }}>
          <div style={{ fontSize:"0.75rem", color:C.muted }}>
            No friends yet 👀<br />
            <span style={{ fontSize:"0.65rem" }}>Share the app link + invite code!</span>
          </div>
        </div>
      ) : (
        friends.map(f => {
          const { level, mood } = getLevel(f.done, f.total);
          const pct = f.total > 0 ? (f.done / f.total) * 100 : 0;
          const isOpen = expanded[f.username];
          return (
            <div key={f.username} style={{
              background:C.surface, borderRadius:14, padding:12,
              border:`1px solid ${C.surface2}`, marginBottom:10,
            }}>
              {/* Cat + progress row */}
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <PixelCat
                  mood={mood}
                  hat={f.equipped?.hat}
                  outfit={f.equipped?.outfit}
                  bg={f.equipped?.bg}
                  comp={f.equipped?.comp}
                  petId={f.petId || "tabby"}
                  size={72}
                />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.8rem", fontWeight:700, color:C.text }}>{f.petName}</div>
                  <div style={{ fontSize:"0.65rem", color:C.muted }}>{f.username} · Lv.{level}</div>
                  <div style={{ fontSize:"0.62rem", color:C.muted, marginTop:2 }}>
                    {f.done}/{f.total} tasks · 🪙{f.coins}
                  </div>
                  <div style={{ background:C.surface2, borderRadius:4, height:4, overflow:"hidden", marginTop:4 }}>
                    <div style={{ background:C.blue, width:`${pct}%`, height:"100%", transition:"width 0.3s" }} />
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(e => ({ ...e, [f.username]: !e[f.username] }))}
                  style={{
                    background:"none", border:`1px solid ${C.surface2}`,
                    borderRadius:8, padding:"3px 8px", color:C.muted,
                    fontFamily:"inherit", fontSize:"0.65rem", cursor:"pointer"
                  }}
                >{isOpen ? "▲" : "▼"}</button>
              </div>

              {/* Tasks dropdown */}
              {isOpen && (
                <div style={{ marginTop:10, borderTop:`1px solid ${C.surface2}`, paddingTop:8 }}>
                  <div style={{ fontSize:"0.68rem", fontWeight:700, color:C.muted, marginBottom:6 }}>
                    {f.username}'s tasks
                  </div>
                  {(!f.tasks || f.tasks.length === 0)
                    ? <div style={{ fontSize:"0.7rem", color:C.muted }}>No tasks added yet</div>
                    : f.tasks.map((task, i) => (
                      <div key={i} style={{
                        display:"flex", alignItems:"center", gap:7,
                        padding:"4px 0", borderBottom:`1px solid ${C.surface2}`,
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
        })
      )}

      {/* ── Cheers ── */}
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
                fontSize:"0.7rem",
                textAlign: m.username === username ? "right" : "left",
              }}>
                <span style={{ fontWeight:700 }}>{m.username}: </span>{m.text}
              </div>
            ))
          }
        </div>

        {/* Quick cheers */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:7 }}>
          {CHEERS.map((c, i) => (
            <button key={i} onClick={() => sendMessage(username, c)} style={{
              padding:"3px 7px", borderRadius:10,
              border:`1px solid ${C.surface2}`, background:C.bg,
              color:C.text, fontFamily:"inherit", fontSize:"0.6rem", cursor:"pointer",
            }}>{c}</button>
          ))}
        </div>

        {/* Custom message */}
        <div style={{ display:"flex", gap:5 }}>
          <input
            value={msgInput}
            onChange={e => setMsgInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && msgInput.trim()) {
                sendMessage(username, msgInput);
                setMsgInput("");
              }
            }}
            placeholder="custom message..."
            style={{
              flex:1, padding:"5px 9px", borderRadius:7,
              border:`1px solid ${C.surface2}`, background:C.bg,
              color:C.text, fontFamily:"inherit", fontSize:"0.7rem",
            }}
          />
          <button
            onClick={() => {
              if (msgInput.trim()) {
                sendMessage(username, msgInput);
                setMsgInput("");
              }
            }}
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
