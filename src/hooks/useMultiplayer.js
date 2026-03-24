import { useEffect, useRef, useCallback, useState } from "react";
import { ref, set, onValue, off, push, serverTimestamp } from "firebase/database";
import { db } from "../firebase";

// ─── Push this user's public profile (cat, progress, coins, equipped) ────────
export function usePublishProfile(uid, username, petId, petName, done, total, coins, equipped) {
  useEffect(() => {
    if (!uid || !username) return;
    const r = ref(db, `users/${uid}/profile`);
    set(r, {
      username, petId, petName,
      done, total, coins,
      equipped: equipped || {},
      updatedAt: serverTimestamp(),
    });
  }, [uid, username, petId, petName, done, total, coins, equipped]);
}

// ─── Subscribe to all other users' profiles (friends tab) ────────────────────
export function useFriendProfiles(uid) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!uid) return;
    const r = ref(db, "users");
    const handler = snap => {
      const data = snap.val() || {};
      const list = Object.entries(data)
        .filter(([k]) => k !== uid)
        .map(([, v]) => v.profile)
        .filter(Boolean)
        .sort((a, b) => (b.done || 0) - (a.done || 0));
      setFriends(list);
    };
    onValue(r, handler);
    return () => off(r, "value", handler);
  }, [uid]);

  return friends;
}

// ─── Push this user's custom task list (visible to friends) ──────────────────
export function usePublishTasks(uid, tasks) {
  useEffect(() => {
    if (!uid) return;
    const r = ref(db, `users/${uid}/tasks`);
    set(r, tasks || []);
  }, [uid, tasks]);
}

// ─── Subscribe to a specific friend's task list ───────────────────────────────
export function useFriendTasks(friendUid) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (!friendUid) return;
    const r = ref(db, `users/${friendUid}/tasks`);
    const handler = snap => setTasks(snap.val() || []);
    onValue(r, handler);
    return () => off(r, "value", handler);
  }, [friendUid]);
  return tasks;
}

// ─── Global cheer messages ────────────────────────────────────────────────────
export function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const r = ref(db, "messages");
    const handler = snap => {
      const data = snap.val() || {};
      const list = Object.values(data).sort((a, b) => a.ts - b.ts).slice(-30);
      setMessages(list);
    };
    onValue(r, handler);
    return () => off(r, "value", handler);
  }, []);

  const sendMessage = useCallback((username, text) => {
    const r = ref(db, "messages");
    push(r, { username, text, ts: serverTimestamp() });
  }, []);

  return { messages, sendMessage };
}

// ─── Leaderboard: today's completions + streak leaderboard ───────────────────
export function useLeaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const r = ref(db, "users");
    const handler = snap => {
      const data = snap.val() || {};
      const list = Object.values(data)
        .map(u => ({
          username:  u.profile?.username  || "???",
          petName:   u.profile?.petName   || "???",
          petId:     u.profile?.petId     || "tabby",
          equipped:  u.profile?.equipped  || {},
          done:      u.profile?.done      || 0,
          total:     u.profile?.total     || 0,
          coins:     u.profile?.coins     || 0,
          streak:    u.streak             || 0,
          todayDone: u.todayDone          || 0,
        }))
        .sort((a, b) => b.done - a.done);
      setBoard(list);
    };
    onValue(r, handler);
    return () => off(r, "value", handler);
  }, []);

  return board;
}

// ─── Push today's task count (for "most done today" leaderboard) ─────────────
export function usePublishTodayDone(uid, todayDone, streak) {
  useEffect(() => {
    if (!uid) return;
    set(ref(db, `users/${uid}/todayDone`), todayDone);
    set(ref(db, `users/${uid}/streak`),    streak);
  }, [uid, todayDone, streak]);
}
