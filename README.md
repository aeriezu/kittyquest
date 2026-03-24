# 🐱 Study Quest

A gamified study tracker with a pixel cat companion, multiplayer friend system, and real-time leaderboards.

---

## Setup (one-time, ~15 min)

### 1. Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `studyquest` → Create
3. In the left sidebar:
   - **Authentication** → Get started → Enable **Email/Password**
   - **Realtime Database** → Create database → Start in **test mode**
4. Go to **Project Settings** (gear icon) → **Your apps** → Click `</>` (Web)
5. Register the app, copy the `firebaseConfig` object values

### 2. Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/studyquest.git
cd studyquest

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Open `.env` and fill in your Firebase values from step 1.
Also set your invite code — share this with friends so they can sign up.

### 3. Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Firebase Hosting

```bash
# Install Firebase CLI (one-time)
npm install -g firebase-tools

# Login
firebase login

# Initialize (point to your project)
firebase init
# Choose: Hosting + Realtime Database
# Public dir: build
# SPA: yes

# Deploy
npm run deploy
```

Your app will be live at `https://YOUR_PROJECT.web.app`

---

## Database Security Rules

Deploy `database.rules.json` so only authenticated users can read/write:

```bash
firebase deploy --only database
```

---

## Adding Your Schedule

After you sign up and log in:

1. Go to **Tasks** tab
2. Click **+ Add Day** to create each day (e.g. "Mon Mar 23", group "Week 1")
3. Inside each day, click **+ add task** and pick a subject

Or — import a JSON schedule by pasting it into `src/data/mySchedule.json` and loading it on first login (see `App.jsx` comment marked `// IMPORT SCHEDULE`).

---

## For Friends

1. Share the deployed URL
2. Share the invite code from your `.env`
3. They sign up, pick their own cat, add their own subjects and tasks
4. You'll see each other in the Friends tab with live progress + leaderboard

---

## File Structure

```
src/
  data/
    constants.js      ← shop items, achievements, colors, level system
  components/
    PixelCat.jsx      ← CSS cat renderer
    SpinWheel.jsx     ← spin wheel modal
    FriendsTab.jsx    ← friend cards, leaderboard, cheers
    Onboarding.jsx    ← signup / login / cat setup
  hooks/
    useGameState.js   ← all coins/streak/achievement logic (localStorage)
    useMultiplayer.js ← Firebase real-time hooks
  firebase.js         ← Firebase init
  App.jsx             ← main app, tabs, task management
```
