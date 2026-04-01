import { useState } from "react";
import { C, px } from "../data/constants";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Try to parse a date string like "Mon Mar 23" or "Apr 14" into a Date object
function parseTaskDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr + " " + new Date().getFullYear());
    if (!isNaN(d)) return d;
    const d2 = new Date(dateStr);
    if (!isNaN(d2)) return d2;
  } catch {}
  return null;
}

export default function CalendarTab({ days, subjects, checked }) {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(null); // date string key

  const subjectMap = Object.fromEntries((subjects||[]).map(s => [s.name, s]));

  // Build a map of { "YYYY-MM-DD": [tasks...] }
  const tasksByDate = {};
  (days||[]).forEach(day => {
    const parsed = parseTaskDate(day.date);
    if (!parsed) return;
    const key = `${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,"0")}-${String(parsed.getDate()).padStart(2,"0")}`;
    if (!tasksByDate[key]) tasksByDate[key] = { date: day.date, tasks: [] };
    (day.tasks||[]).filter(Boolean).forEach(t => tasksByDate[key].tasks.push(t));
  });

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); setSelected(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0);  setYear(y => y+1); } else setMonth(m => m+1); setSelected(null); };

  const todayKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  const selectedData = selected ? tasksByDate[selected] : null;

  return (
    <div style={px}>
      {/* Month nav */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <button onClick={prevMonth} style={{ background:"none", border:`1px solid ${C.surface2}`, borderRadius:8, padding:"4px 10px", color:C.muted, fontFamily:"inherit", fontSize:"0.8rem", cursor:"pointer" }}>‹</button>
        <div style={{ fontSize:"0.85rem", fontWeight:700, color:C.text }}>{MONTHS[month]} {year}</div>
        <button onClick={nextMonth} style={{ background:"none", border:`1px solid ${C.surface2}`, borderRadius:8, padding:"4px 10px", color:C.muted, fontFamily:"inherit", fontSize:"0.8rem", cursor:"pointer" }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:2, marginBottom:4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign:"center", fontSize:"0.58rem", fontWeight:700, color:C.muted, padding:"2px 0" }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:2, marginBottom:12 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i}/>;
          const key = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const data = tasksByDate[key];
          const isToday = key === todayKey;
          const isSelected = key === selected;
          const total = data?.tasks?.length || 0;
          const done = data?.tasks?.filter(t => checked[t.id]).length || 0;
          const allDone = total > 0 && done === total;

          // get subject colors for dots
          const subjectColors = [];
          if (data) {
            const seen = new Set();
            data.tasks.forEach(t => {
              if (t.subject && !seen.has(t.subject)) {
                seen.add(t.subject);
                const s = subjectMap[t.subject];
                if (s) subjectColors.push(s.color);
              }
            });
          }

          return (
            <div key={i} onClick={() => data && setSelected(isSelected ? null : key)}
              style={{
                minHeight:44, borderRadius:8, padding:"4px 3px",
                background: isSelected ? C.primary : isToday ? C.surface2 : allDone ? "#d4edd4" : data ? C.surface : "transparent",
                border: isToday ? `2px solid ${C.primary}` : isSelected ? `2px solid ${C.primary}` : `1px solid ${data ? C.surface2 : "transparent"}`,
                cursor: data ? "pointer" : "default",
                transition:"all 0.15s",
              }}>
              {/* day number */}
              <div style={{ fontSize:"0.65rem", fontWeight: isToday||isSelected ? 700 : 400, color: isSelected?"#fff": isToday ? C.primary : allDone ? C.green : C.text, textAlign:"center", marginBottom:2 }}>
                {allDone ? "✅" : day}
              </div>
              {/* task count */}
              {total > 0 && (
                <div style={{ fontSize:"0.5rem", textAlign:"center", color: isSelected?"rgba(255,255,255,0.85)":C.muted, marginBottom:2 }}>
                  {done}/{total}
                </div>
              )}
              {/* subject color dots */}
              {subjectColors.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:1.5, justifyContent:"center" }}>
                  {subjectColors.slice(0,4).map((color,ci) => (
                    <div key={ci} style={{ width:5, height:5, borderRadius:"50%", background: isSelected?"rgba(255,255,255,0.8)":color }}/>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selectedData && (
        <div style={{ background:C.surface, borderRadius:12, padding:12, border:`1px solid ${C.surface2}`, marginBottom:10 }}>
          <div style={{ fontSize:"0.78rem", fontWeight:700, color:C.text, marginBottom:8 }}>
            📅 {selectedData.date}
          </div>
          {selectedData.tasks.length === 0
            ? <div style={{ fontSize:"0.7rem", color:C.muted }}>No tasks for this day</div>
            : selectedData.tasks.map((task, i) => {
              const s = subjectMap[task.subject] || { color:C.muted, bg:C.surface };
              const isDone = !!checked[task.id];
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 8px", borderRadius:7, marginBottom:4, background: isDone ? s.bg : "#fafaf8", opacity: isDone ? 0.65 : 1, borderLeft:`3px solid ${s.color}` }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", flexShrink:0, background: isDone ? C.green : C.surface2, border:`1.5px solid ${isDone ? C.green : C.surface2}` }}/>
                  <span style={{ flex:1, fontSize:"0.73rem", color:C.text, textDecoration: isDone?"line-through":"none" }}>{task.label}</span>
                  {task.subject && (
                    <span style={{ fontSize:"0.58rem", fontWeight:700, background:s.bg, color:s.color, borderRadius:3, padding:"1px 5px" }}>{task.subject}</span>
                  )}
                  {isDone && <span style={{ fontSize:"0.6rem" }}>✅</span>}
                </div>
              );
            })
          }
        </div>
      )}

      {/* Month summary */}
      <div style={{ background:C.surface, borderRadius:12, padding:12, border:`1px solid ${C.surface2}` }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.muted, marginBottom:8 }}>MONTH SUMMARY</div>
        {(() => {
          let monthTotal = 0, monthDone = 0;
          Object.entries(tasksByDate).forEach(([key, data]) => {
            const [y, m] = key.split("-").map(Number);
            if (y === year && m === month+1) {
              monthTotal += data.tasks.length;
              monthDone  += data.tasks.filter(t => checked[t.id]).length;
            }
          });
          const pct = monthTotal > 0 ? (monthDone/monthTotal)*100 : 0;
          return (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:"0.7rem", color:C.text }}>{monthDone} / {monthTotal} tasks completed</span>
                <span style={{ fontSize:"0.7rem", fontWeight:700, color:C.primary }}>{Math.round(pct)}%</span>
              </div>
              <div style={{ background:C.surface2, borderRadius:4, height:8, overflow:"hidden" }}>
                <div style={{ background: pct===100 ? C.green : C.primary, width:`${pct}%`, height:"100%", transition:"width 0.4s", borderRadius:4 }}/>
              </div>
              {monthTotal === 0 && (
                <div style={{ fontSize:"0.68rem", color:C.muted, marginTop:6, textAlign:"center" }}>No tasks scheduled this month</div>
              )}
            </>
          );
        })()}

        {/* subject breakdown */}
        {subjects && subjects.length > 0 && (
          <div style={{ marginTop:10 }}>
            <div style={{ fontSize:"0.65rem", fontWeight:700, color:C.muted, marginBottom:6 }}>BY SUBJECT</div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {subjects.map(s => {
                let sDone = 0, sTotal = 0;
                Object.entries(tasksByDate).forEach(([key, data]) => {
                  const [y, m] = key.split("-").map(Number);
                  if (y === year && m === month+1) {
                    data.tasks.forEach(t => {
                      if (t.subject === s.name) {
                        sTotal++;
                        if (checked[t.id]) sDone++;
                      }
                    });
                  }
                });
                if (sTotal === 0) return null;
                return (
                  <div key={s.name}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                      <span style={{ fontSize:"0.62rem", fontWeight:700, color:s.color }}>{s.name}</span>
                      <span style={{ fontSize:"0.6rem", color:C.muted }}>{sDone}/{sTotal}</span>
                    </div>
                    <div style={{ background:C.surface2, borderRadius:3, height:5, overflow:"hidden" }}>
                      <div style={{ background:s.color, width:`${sTotal>0?(sDone/sTotal)*100:0}%`, height:"100%", transition:"width 0.3s" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
