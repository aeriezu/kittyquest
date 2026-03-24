import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "../firebase";
import PixelCat from "./PixelCat";
import { C, px, PET_OPTIONS, SUBJECT_PALETTE } from "../data/constants";

const INVITE_CODE = process.env.REACT_APP_INVITE_CODE || "studyquest2025";

const DEFAULT_SUBJECTS = [
  { name:"", color:"#4a7fa0", bg:"#dceaf5" },
];

export default function Onboarding({ onDone }) {
  const [step,     setStep]     = useState(1);
  const [mode,     setMode]     = useState("signup");
  const [invite,   setInvite]   = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [petName,  setPetName]  = useState("");
  const [petId,    setPetId]    = useState("tabby");
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const checkInvite = () => {
    if (invite.trim().toLowerCase() === INVITE_CODE.toLowerCase()) {
      setStep(2); setError("");
    } else {
      setError("Wrong invite code!");
    }
  };

  const handleAuth = async () => {
    setError(""); setLoading(true);
    try {
      if (mode === "signup") {
        if (!username.trim()) { setError("Username required"); setLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(db, `usernames/${username.trim().toLowerCase()}`), cred.user.uid);
        setLoading(false);
        setStep(3);
      } else {
        // ── Login: load meta from Firebase then call onDone ──
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const uid  = cred.user.uid;
        const snap = await get(ref(db, `users/${uid}/meta`));
        if (snap.exists()) {
          const meta = snap.val();
          // Cache username to localStorage so it's available immediately on next load
          localStorage.setItem("sq-username", meta.username || "");
          localStorage.setItem("sq-petId",    meta.petId    || "tabby");
          localStorage.setItem("sq-petName",  meta.petName  || "");
          onDone(uid, meta.username, meta.petId, meta.petName, meta.subjects || []);
        } else {
          // No meta found — send to cat setup
          setLoading(false);
          setStep(3);
        }
      }
    } catch (e) {
      setError(e.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)/, ""));
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    if (!petName.trim()) { setError("Name your cat!"); return; }
    const validSubjects = subjects.filter(s => s.name.trim());
    if (validSubjects.length === 0) { setError("Add at least one subject!"); return; }
    const uid = auth.currentUser?.uid;
    const uname = username.trim();
    await set(ref(db, `users/${uid}/meta`), {
      username: uname,
      petId,
      petName: petName.trim(),
      subjects: validSubjects,
    });
    // Cache to localStorage
    localStorage.setItem("sq-username", uname);
    localStorage.setItem("sq-petId",    petId);
    localStorage.setItem("sq-petName",  petName.trim());
    onDone(uid, uname, petId, petName.trim(), validSubjects);
  };

  const addSubject = () => {
    const idx = subjects.length % SUBJECT_PALETTE.length;
    setSubjects(prev => [...prev, { name:"", ...SUBJECT_PALETTE[idx] }]);
  };
  const updateSubject = (i, name) =>
    setSubjects(prev => prev.map((s, idx) => idx === i ? { ...s, name } : s));
  const removeSubject = (i) =>
    setSubjects(prev => prev.filter((_, idx) => idx !== i));

  const inputStyle = {
    padding:"8px 14px", borderRadius:8,
    border:`2px solid ${C.surface2}`, background:C.surface,
    color:C.text, fontFamily:"inherit", fontSize:"0.85rem",
    width:"100%", boxSizing:"border-box",
  };
  const btnPrimary = {
    padding:"9px 28px", borderRadius:8, border:"none",
    background:C.primary, color:"#fff",
    fontFamily:"inherit", fontSize:"0.82rem", fontWeight:700, cursor:"pointer",
  };

  return (
    <div style={{
      ...px, background:C.bg, minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:24, gap:14,
    }}>
      <div style={{ fontSize:"1.2rem", fontWeight:700, color:C.text, marginBottom:4 }}>
        🐱 Study Quest
      </div>

      {step === 1 && <>
        <div style={{ fontSize:"0.85rem", color:C.muted }}>Enter your invite code</div>
        <input value={invite} onChange={e => setInvite(e.target.value)}
          onKeyDown={e => e.key === "Enter" && checkInvite()}
          placeholder="invite code..." style={inputStyle} />
        {error && <div style={{ fontSize:"0.72rem", color:C.red }}>{error}</div>}
        <button onClick={checkInvite} style={btnPrimary}>Enter</button>
        <button onClick={() => { setMode("login"); setStep(2); }}
          style={{ background:"none", border:"none", color:C.muted, fontFamily:"inherit", fontSize:"0.72rem", cursor:"pointer" }}>
          Already have an account? Log in
        </button>
      </>}

      {step === 2 && <>
        <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.text }}>
          {mode === "signup" ? "Create your account" : "Welcome back!"}
        </div>
        {mode === "signup" && (
          <input value={username} onChange={e => setUsername(e.target.value)}
            placeholder="username (visible to friends)" style={inputStyle} />
        )}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="email" style={inputStyle} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAuth()}
          placeholder="password" style={inputStyle} />
        {error && <div style={{ fontSize:"0.72rem", color:C.red, maxWidth:280, textAlign:"center" }}>{error}</div>}
        <button onClick={handleAuth} disabled={loading}
          style={{ ...btnPrimary, opacity:loading ? 0.7 : 1 }}>
          {loading ? "..." : mode === "signup" ? "Create Account" : "Log In"}
        </button>
      </>}

      {step === 3 && <>
        <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.text }}>Pick your cat!</div>
        <PixelCat mood="neutral" petId={petId} size={120} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:7, width:"100%", maxWidth:320 }}>
          {PET_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => setPetId(opt.id)} style={{
              padding:"8px 6px", borderRadius:10,
              border:`2px solid ${petId === opt.id ? C.primary : C.surface2}`,
              background: petId === opt.id ? C.primary : C.surface,
              color: petId === opt.id ? "#fff" : C.text,
              fontFamily:"inherit", fontSize:"0.68rem", fontWeight:700, cursor:"pointer",
            }}>
              <div style={{
                width:14, height:14, borderRadius:"50%", background:opt.color,
                margin:"0 auto 3px", border:"2px solid rgba(0,0,0,0.15)"
              }} />
              {opt.label}
            </button>
          ))}
        </div>
        <input value={petName} onChange={e => setPetName(e.target.value)}
          placeholder="cat's name..." style={{ ...inputStyle, width:200, textAlign:"center" }} />
        <button onClick={() => petName.trim() ? setStep(4) : setError("Name your cat!")} style={btnPrimary}>
          Next
        </button>
        {error && <div style={{ fontSize:"0.72rem", color:C.red }}>{error}</div>}
      </>}

      {step === 4 && <>
        <div style={{ fontSize:"0.9rem", fontWeight:700, color:C.text }}>Add your subjects</div>
        <div style={{ fontSize:"0.72rem", color:C.muted, textAlign:"center", maxWidth:280 }}>
          These become your task categories. You can add/edit them later!
        </div>
        <div style={{ width:"100%", maxWidth:320, display:"flex", flexDirection:"column", gap:6 }}>
          {subjects.map((s, i) => (
            <div key={i} style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{
                width:12, height:12, borderRadius:"50%", background:s.color,
                flexShrink:0, border:"2px solid rgba(0,0,0,0.15)"
              }} />
              <input value={s.name} onChange={e => updateSubject(i, e.target.value)}
                placeholder={`Subject ${i + 1}...`} style={{ ...inputStyle, flex:1 }} />
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(i)} style={{
                  background:"none", border:"none", color:C.muted,
                  cursor:"pointer", fontSize:"0.9rem", padding:"0 4px"
                }}>✕</button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addSubject} style={{
          padding:"6px 16px", borderRadius:8, border:`2px dashed ${C.surface2}`,
          background:"none", color:C.muted, fontFamily:"inherit", fontSize:"0.75rem", cursor:"pointer"
        }}>+ Add Subject</button>
        {error && <div style={{ fontSize:"0.72rem", color:C.red }}>{error}</div>}
        <button onClick={handleFinish} style={btnPrimary}>Start studying!</button>
      </>}
    </div>
  );
}
