import fs from 'fs';
import path from 'path';
import { ALL_LEVELS } from '../src/data/levels/index';
import { CHAPTERS } from '../src/data/chapters';
import { ACHIEVEMENTS } from '../src/data/achievements';

const levelsJson = JSON.stringify(ALL_LEVELS);
const chaptersJson = JSON.stringify(CHAPTERS);

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>YES / NO MYSTERY – Ultimate Detective</title>
  <meta name="description" content="An interactive mystery investigation puzzle game with 200 handcrafted cases, 10 chapters, Detective Alex, question-answer engine, hints, and achievements." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #101426;
      --card-bg: #1A2140;
      --card-border: rgba(255, 255, 255, 0.1);
      --purple: #8257FF;
      --purple-dark: #6035FF;
      --gold: #FFC857;
      --green: #35C98B;
      --red: #FF626C;
      --blue: #388BFF;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-title: 'Outfit', sans-serif;
    }
    .light {
      --bg: #F1F5F9;
      --card-bg: #FFFFFF;
      --card-border: rgba(0, 0, 0, 0.08);
      --text: #0F172A;
      --text-muted: #64748B;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      user-select: none;
      -webkit-user-select: none;
      display: flex;
      justify-content: center;
    }
    #app-container {
      width: 100%;
      max-width: 440px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--bg);
      position: relative;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
    }
    h1, h2, h3, .font-display {
      font-family: var(--font-title);
    }
    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      outline: none;
      background: none;
      transition: transform 0.12s ease, filter 0.15s ease, background-color 0.15s ease;
    }
    button:active {
      transform: scale(0.97);
    }
    .btn-purple {
      background: linear-gradient(135deg, #8257FF, #6035FF);
      color: #FFF;
      font-weight: 700;
      border-radius: 16px;
      box-shadow: 0 4px 14px rgba(130, 87, 255, 0.35);
    }
    .btn-gold {
      background: linear-gradient(135deg, #FFC857, #E5AC36);
      color: #101426;
      font-weight: 800;
      border-radius: 16px;
      box-shadow: 0 4px 14px rgba(255, 200, 87, 0.3);
    }
    .btn-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text);
      border-radius: 16px;
    }
    .header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: rgba(16, 20, 38, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--card-border);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .coin-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      background: var(--card-bg);
      border: 1px solid rgba(255, 200, 87, 0.4);
      padding: 4px 10px;
      border-radius: 999px;
      color: var(--gold);
      font-size: 13px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 14px;
      overflow-y: auto;
    }
    .bottom-nav {
      position: sticky;
      bottom: 0;
      z-index: 40;
      background: rgba(16, 20, 38, 0.95);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--card-border);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 6px 8px;
    }
    .nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px 4px;
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      border-radius: 12px;
    }
    .nav-btn.active {
      color: var(--purple);
      background: rgba(130, 87, 255, 0.12);
      font-weight: 700;
    }
    .character-box {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid rgba(130, 87, 255, 0.6);
      background: #1A2140;
      box-shadow: 0 8px 24px rgba(130, 87, 255, 0.25);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .speech-bubble {
      background: var(--card-bg);
      border: 1px solid rgba(130, 87, 255, 0.35);
      padding: 8px 14px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      color: #E2E8F0;
      text-align: center;
      margin-bottom: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      position: relative;
      max-width: 280px;
    }
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px 6px 0;
      border-style: solid;
      border-color: var(--card-bg) transparent;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    .answer-card {
      border-radius: 16px;
      padding: 12px 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      font-weight: 700;
    }
    .answer-YES {
      background: rgba(53, 201, 139, 0.15);
      border: 1px solid rgba(53, 201, 139, 0.5);
      color: #6EE7B7;
    }
    .answer-NO {
      background: rgba(255, 98, 108, 0.15);
      border: 1px solid rgba(255, 98, 108, 0.5);
      color: #FCA5A5;
    }
    .answer-NOT_RELEVANT {
      background: rgba(56, 139, 255, 0.15);
      border: 1px solid rgba(56, 139, 255, 0.5);
      color: #93C5FD;
    }
    .answer-AMBIGUOUS {
      background: rgba(255, 200, 87, 0.15);
      border: 1px solid rgba(255, 200, 87, 0.5);
      color: #FDE68A;
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-box {
      width: 100%;
      max-width: 380px;
      background: #1A2140;
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      max-height: 85vh;
      overflow-y: auto;
    }
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-float {
      animation: floatSlow 3.5s ease-in-out infinite;
    }
    #canvas-confetti {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 200;
    }
  </style>
</head>
<body>
  <canvas id="canvas-confetti"></canvas>
  <div id="app-container">
    <!-- Dynamic Header -->
    <header class="header" id="app-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <button id="btn-back" style="display:none; padding:4px;" aria-label="Back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div id="header-avatar" style="width:34px; height:34px; border-radius:50%; background:#1A2140; border:1px solid #8257FF; overflow:hidden;">
          <svg viewBox="0 0 100 100" width="34" height="34"><circle cx="50" cy="40" r="22" fill="#FFC857"/><path d="M20 90 C20 65 35 55 50 55 C65 55 80 65 80 90 Z" fill="#8257FF"/></svg>
        </div>
        <div style="text-align:left;">
          <div style="font-size:12px; font-weight:700;" id="player-title">Detective</div>
          <div style="font-size:10px; color:#FFC857; font-weight:600;" id="player-rank">Rank 1</div>
        </div>
      </div>

      <div style="text-align:center; flex:1; padding:0 8px; display:none;" id="header-screen-title">
        <h2 style="font-size:14px; font-weight:800;" id="screen-title-text">Cases</h2>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <div class="coin-badge">
          <span>🪙</span>
          <span id="coin-counter">100</span>
        </div>
        <button id="btn-sound-toggle" style="padding:6px; color:#A78BFA;" aria-label="Mute">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        </button>
        <button id="btn-settings" style="padding:6px; color:#94A3B8;" aria-label="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
      </div>
    </header>

    <!-- Main Dynamic Screen Container -->
    <main class="main-content" id="main-view"></main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav" id="bottom-bar">
      <button class="nav-btn active" onclick="navigate('HOME')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </button>
      <button class="nav-btn" onclick="navigate('CHAPTERS')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
        <span>Chapters</span>
      </button>
      <button class="nav-btn" onclick="navigate('REWARDS')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        <span>Rewards</span>
      </button>
      <button class="nav-btn" onclick="navigate('PROFILE')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        <span>Profile</span>
      </button>
    </nav>
  </div>

  <!-- Global Modal Container -->
  <div id="modal-container" style="display:none;"></div>

  <script>
    // Embedded Complete 200 Levels & Chapters Data
    const ALL_LEVELS = ${levelsJson};
    const CHAPTERS = ${chaptersJson};

    // State & Profile System
    const STORAGE_KEY = 'yes_no_mystery_save_v1';
    let profile = {
      name: 'Detective',
      coins: 100,
      highestLevelUnlocked: 1,
      completedLevels: [],
      unlockedHints: {},
      dailyStreak: 0,
      lastDailyDate: null,
      totalQuestionsAsked: 0,
      soundOn: true,
      theme: 'dark'
    };

    function loadSave() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) profile = Object.assign(profile, JSON.parse(raw));
      } catch(e) {}
    }
    function saveProfile() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch(e) {}
      updateHeader();
    }
    loadSave();

    // Audio Engine
    let audioCtx = null;
    function playTone(freq, type, duration, delay = 0) {
      if (!profile.soundOn) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const now = audioCtx.currentTime + delay;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + duration);
      } catch(e) {}
    }
    function soundClick() { playTone(400, 'sine', 0.04); }
    function soundYes() { playTone(523, 'triangle', 0.15); playTone(659, 'triangle', 0.2, 0.08); playTone(783, 'triangle', 0.25, 0.16); }
    function soundNo() { playTone(220, 'sawtooth', 0.15); playTone(160, 'sawtooth', 0.2, 0.08); }
    function soundNotRelevant() { playTone(330, 'sine', 0.08); playTone(330, 'sine', 0.08, 0.1); }
    function soundCoin() { playTone(987, 'sine', 0.2); playTone(1318, 'sine', 0.35, 0.08); }
    function soundVictory() { playTone(523, 'triangle', 0.2); playTone(659, 'triangle', 0.2, 0.12); playTone(783, 'triangle', 0.2, 0.24); playTone(1046, 'triangle', 0.45, 0.38); }

    // Navigation State
    let currentScreen = 'HOME';
    let currentLevel = null;
    let selectedChapter = null;
    let gameplayHistory = [];
    let levelTimerSeconds = 0;
    let levelTimerInterval = null;

    function updateHeader() {
      document.getElementById('coin-counter').textContent = profile.coins.toLocaleString();
      document.getElementById('player-title').textContent = profile.name;
      const rank = Math.min(10, 1 + Math.floor(profile.completedLevels.length / 20));
      document.getElementById('player-rank').textContent = 'Rank ' + rank;
    }

    // QA Engine
    function evaluateQuestion(text, level) {
      const q = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim();
      const tokens = q.split(' ').filter(w => w.length > 1);
      if (tokens.length < 2) return { answer: 'AMBIGUOUS', message: 'Can you ask that in another way, detective?' };

      let yesScore = 0;
      level.positiveFacts.forEach(f => {
        const norm = f.toLowerCase();
        if (q.includes(norm) || norm.includes(q)) yesScore += 3;
        norm.split(' ').forEach(w => { if (tokens.includes(w)) yesScore += 1; });
      });

      let noScore = 0;
      level.negativeFacts.forEach(f => {
        const norm = f.toLowerCase();
        if (q.includes(norm) || norm.includes(q)) noScore += 3;
        norm.split(' ').forEach(w => { if (tokens.includes(w)) noScore += 1; });
      });

      let irrScore = 0;
      level.irrelevantFacts.forEach(f => {
        const norm = f.toLowerCase();
        if (q.includes(norm) || norm.includes(q)) irrScore += 2;
        norm.split(' ').forEach(w => { if (tokens.includes(w)) irrScore += 1; });
      });

      if (level.suggestedQuestions) {
        for (const sq of level.suggestedQuestions) {
          if (q.includes(sq.toLowerCase()) || sq.toLowerCase().includes(q)) {
            return { answer: 'YES', message: 'Excellent question, detective! That is confirmed.' };
          }
        }
      }

      if (yesScore >= 1.5 && yesScore > noScore && yesScore > irrScore) {
        return { answer: 'YES', message: 'Confirmed by verified facts.' };
      }
      if (noScore >= 1.4 && noScore > yesScore && noScore > irrScore) {
        return { answer: 'NO', message: 'The evidence contradicts that statement.' };
      }
      if (irrScore >= 1.2) {
        return { answer: 'NOT_RELEVANT', message: 'NOT RELEVANT. This detail does not affect the case.' };
      }
      return { answer: 'NOT_RELEVANT', message: 'NOT RELEVANT to the mystery solution.' };
    }

    function verifySolution(input, level) {
      const norm = input.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim();
      if (level.id === 200) {
        if (/player|me|i am|myself|you|user/.test(norm)) return true;
      }
      let allMatched = true;
      for (const group of level.solutionKeywords) {
        const matched = group.some(kw => norm.includes(kw.toLowerCase()));
        if (!matched) { allMatched = false; break; }
      }
      return allMatched;
    }

    // Screens Rendering
    const mainView = document.getElementById('main-view');

    function renderHomeScreen() {
      const nextLvl = profile.highestLevelUnlocked;
      mainView.innerHTML = \`
        <div style="text-align:center; padding:10px 0;">
          <div style="display:inline-flex; align-items:center; gap:6px; background:#1A2140; padding:4px 12px; border-radius:999px; border:1px solid rgba(130,87,255,0.3); font-size:11px; font-weight:700; color:#A78BFA; margin-bottom:12px;">
            <span>✨</span><span>DETECTIVE INVESTIGATION</span>
          </div>
          <h1 style="font-size:32px; font-weight:900; line-height:1; letter-spacing:-0.5px;">YES <span style="color:var(--gold);">/</span> NO</h1>
          <h2 style="font-size:24px; font-weight:900; letter-spacing:4px; color:var(--purple); margin-top:2px;">MYSTERY</h2>
          <p style="font-size:11px; font-weight:700; letter-spacing:1px; color:#94A3B8; text-transform:uppercase; margin-top:6px;">THINK. QUESTION. DISCOVER THE TRUTH.</p>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; margin:14px 0;">
          <div class="speech-bubble">"Ready to solve case #\${nextLvl}?"</div>
          <div class="character-box animate-float">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <ellipse cx="50" cy="30" rx="36" ry="12" fill="#202952"/>
              <path d="M26 30 C26 14 36 6 50 6 C64 6 74 14 74 30 Z" fill="#1A2140"/>
              <circle cx="50" cy="46" r="20" fill="#FFC857"/>
              <circle cx="43" cy="44" r="3.5" fill="#101426"/>
              <circle cx="57" cy="44" r="3.5" fill="#101426"/>
              <path d="M44 54 Q50 60 56 54" stroke="#101426" stroke-width="2" fill="none"/>
              <path d="M22 92 C22 68 34 62 50 62 C66 62 78 68 78 92 Z" fill="#1A2140"/>
              <polygon points="50,62 45,74 50,86 55,74" fill="#8257FF"/>
              <circle cx="68" cy="74" r="12" fill="none" stroke="#FFC857" stroke-width="3"/>
              <line x1="77" y1="83" x2="86" y2="92" stroke="#FFC857" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">
            Solved <strong style="color:var(--green)">\${profile.completedLevels.length}</strong> / 200 cases
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; margin-top:auto; padding-bottom:8px;">
          <button class="btn-purple" style="padding:16px; font-size:16px; display:flex; align-items:center; justify-content:space-between; width:100%;" onclick="startPlayLevel(\${nextLvl})">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:20px;">🔍</span>
              <div style="text-align:left;">
                <div style="font-weight:900;">PLAY GAME</div>
                <div style="font-size:11px; font-weight:500; opacity:0.85;">Continue Case #\${nextLvl}</div>
              </div>
            </div>
            <span style="font-size:18px;">▶</span>
          </button>

          <button class="btn-card" style="padding:14px; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:space-between; width:100%;" onclick="navigate('DAILY')">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:18px;">📅</span>
              <div style="text-align:left;">
                <div>DAILY MYSTERY</div>
                <div style="font-size:10px; color:#388BFF; font-weight:500;">Earn +25 Bonus Mystery Coins</div>
              </div>
            </div>
            <span style="color:#FFC857; font-size:11px; background:rgba(255,200,87,0.15); padding:2px 8px; border-radius:999px;">Streak: \${profile.dailyStreak}d</span>
          </button>

          <button class="btn-card" style="padding:14px; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:space-between; width:100%;" onclick="navigate('CHAPTERS')">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:18px;">📖</span>
              <div style="text-align:left;">
                <div>ALL 10 CHAPTERS</div>
                <div style="font-size:10px; color:var(--text-muted); font-weight:500;">200 Handcrafted Levels</div>
              </div>
            </div>
            <span style="color:var(--purple); font-size:12px;">Explore</span>
          </button>
        </div>
      \`;
    }

    function renderChaptersScreen() {
      let html = \`<div style="margin-bottom:12px;"><h2 style="font-size:18px; font-weight:800;">Select Chapter</h2><p style="font-size:11px; color:var(--text-muted);">10 Chapters · 200 Handcrafted Levels</p></div><div style="display:flex; flex-direction:column; gap:10px;">\`;
      CHAPTERS.forEach(ch => {
        const isUnlocked = ch.id === 1 || profile.completedLevels.includes((ch.id - 1) * 20);
        let solved = 0;
        for (let i = ch.levelStart; i <= ch.levelEnd; i++) {
          if (profile.completedLevels.includes(i)) solved++;
        }
        const pct = Math.round((solved / 20) * 100);
        html += \`
          <button class="btn-card" style="padding:14px; opacity:\${isUnlocked ? 1 : 0.6}; border-left:4px solid \${ch.color}; text-align:left; width:100%;" onclick="\${isUnlocked ? \`selectChapter(\${ch.id})\` : 'soundNo()'}" \${!isUnlocked ? 'disabled' : ''}>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="font-size:10px; font-weight:700; color:\${ch.color}; text-transform:uppercase;">Chapter \${ch.id}</span>
                <h3 style="font-size:15px; font-weight:800; margin:2px 0;">\${ch.title}</h3>
                <p style="font-size:11px; color:var(--text-muted);">Cases \${ch.levelStart} - \${ch.levelEnd}</p>
              </div>
              <div style="text-align:right;">
                <div style="font-size:13px; font-weight:800;">\${solved}/20</div>
                <div style="font-size:10px; color:var(--text-muted);">\${pct}%</div>
              </div>
            </div>
          </button>
        \`;
      });
      html += '</div>';
      mainView.innerHTML = html;
    }

    function selectChapter(chId) {
      soundClick();
      selectedChapter = CHAPTERS.find(c => c.id === chId);
      renderLevelsGrid();
    }

    function renderLevelsGrid() {
      let html = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <button style="font-size:12px; color:var(--purple); font-weight:700;" onclick="renderChaptersScreen()">← All Chapters</button>
          <span style="font-size:12px; font-weight:800; color:\${selectedChapter.color};">Chapter \${selectedChapter.id}</span>
        </div>
        <div class="card">
          <h2 style="font-size:16px; font-weight:800;">\${selectedChapter.title}</h2>
          <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">\${selectedChapter.subtitle}</p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; padding-bottom:20px;">
      \`;

      for (let lvlId = selectedChapter.levelStart; lvlId <= selectedChapter.levelEnd; lvlId++) {
        const isDone = profile.completedLevels.includes(lvlId);
        const isCurrent = lvlId === profile.highestLevelUnlocked && !isDone;
        const isUnlocked = lvlId <= profile.highestLevelUnlocked || isDone;

        let bg = 'rgba(255,255,255,0.05)';
        let color = '#64748B';
        let border = '1px solid rgba(255,255,255,0.05)';

        if (isDone) {
          bg = '#35C98B'; color = '#FFF'; border = 'none';
        } else if (isCurrent) {
          bg = '#8257FF'; color = '#FFF'; border = '2px solid #FFC857';
        } else if (isUnlocked) {
          bg = '#1A2140'; color = '#FFF'; border = '1px solid #8257FF';
        }

        html += \`
          <button style="aspect-ratio:1; border-radius:16px; background:\${bg}; color:\${color}; border:\${border}; display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:800; font-size:16px;" onclick="\${isUnlocked ? \`startPlayLevel(\${lvlId})\` : 'soundNo()'}" \${!isUnlocked ? 'disabled' : ''}>
            \${isDone ? '✓' : lvlId}
          </button>
        \`;
      }
      html += '</div>';
      mainView.innerHTML = html;
    }

    function startPlayLevel(lvlId) {
      soundClick();
      currentLevel = ALL_LEVELS.find(l => l.id === lvlId) || ALL_LEVELS[0];
      gameplayHistory = [];
      levelTimerSeconds = 0;
      if (levelTimerInterval) clearInterval(levelTimerInterval);
      levelTimerInterval = setInterval(() => { levelTimerSeconds++; }, 1000);
      renderGameplayScreen();
    }

    function renderGameplayScreen() {
      mainView.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:12px;">
          <button style="color:var(--text-muted); font-weight:700;" onclick="navigate('HOME')">← Exit</button>
          <span style="font-weight:800; color:var(--purple);">Case #\${currentLevel.id}</span>
          <span style="background:rgba(53,201,139,0.15); color:var(--green); padding:2px 8px; border-radius:999px; font-size:10px; font-weight:800;">\${currentLevel.difficulty}</span>
        </div>

        <div class="card" style="border-color:rgba(130,87,255,0.4);">
          <div style="font-size:10px; color:var(--purple); font-weight:800; text-transform:uppercase;">\${currentLevel.chapterName}</div>
          <h2 style="font-size:17px; font-weight:800; margin:4px 0 8px 0;">\${currentLevel.title}</h2>
          <p style="font-size:13px; line-height:1.5; color:#E2E8F0; background:rgba(0,0,0,0.25); padding:10px; border-radius:12px;">\${currentLevel.story}</p>
        </div>

        <div style="margin-bottom:10px;" id="answer-banner-area"></div>

        <div style="margin-bottom:12px;">
          <div style="font-size:11px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">ASK YOUR QUESTIONS</div>
          <div style="display:flex; gap:6px;">
            <input type="text" id="input-question" placeholder="Type your YES/NO question here..." style="flex:1; background:#1A2140; border:1px solid var(--card-border); border-radius:12px; padding:10px 12px; color:#FFF; font-size:13px; outline:none;" onkeydown="if(event.key==='Enter') submitQuestion()" />
            <button class="btn-purple" style="padding:0 16px; font-size:12px; font-weight:800;" onclick="submitQuestion()">ASK</button>
          </div>
        </div>

        <div style="margin-bottom:8px;">
          <div style="font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:4px;">FAST CLUE INQUIRIES:</div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            \${(currentLevel.suggestedQuestions || []).map(sq => \`<button style="background:#1A2140; border:1px solid rgba(130,87,255,0.3); color:#A78BFA; font-size:10px; font-weight:600; padding:4px 8px; border-radius:8px; text-align:left;" onclick="submitQuestion('\${sq.replace(/'/g, "\\\\'")}')">\${sq}</button>\`).join('')}
          </div>
        </div>

        <div class="card" style="flex:1; min-height:120px; max-height:180px; overflow-y:auto; padding:10px;" id="history-box">
          <div style="font-size:10px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">INVESTIGATION HISTORY (\${gameplayHistory.length})</div>
          \${gameplayHistory.length === 0 ? '<div style="font-size:11px; color:#64748B; text-align:center; padding:20px;">Ask anything to discover YES, NO, or NOT RELEVANT facts.</div>' : ''}
          \${gameplayHistory.map(h => \`
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); padding:6px 10px; border-radius:8px; margin-bottom:6px; font-size:11px;">
              <span style="color:#CBD5E1;">Q: \${h.question}</span>
              <span class="answer-\${h.answer}" style="font-size:9px; font-weight:900; padding:2px 6px; border-radius:4px;">\${h.answer.replace('_',' ')}</span>
            </div>
          \`).join('')}
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:auto; padding-top:4px;">
          <button class="btn-card" style="padding:12px; font-size:12px; font-weight:800; color:var(--gold);" onclick="openHintsModal()">💡 HINTS</button>
          <button class="btn-purple" style="padding:12px; font-size:12px; font-weight:800; background:linear-gradient(135deg, #10B981, #059669);" onclick="openSolutionModal()">SUBMIT SOLUTION →</button>
        </div>
      \`;
      const hist = document.getElementById('history-box');
      if (hist) hist.scrollTop = hist.scrollHeight;
    }

    function submitQuestion(fastText) {
      const input = document.getElementById('input-question');
      const text = (fastText || (input ? input.value : '')).trim();
      if (!text) return;
      if (input) input.value = '';

      soundClick();
      profile.totalQuestionsAsked++;
      saveProfile();

      const res = evaluateQuestion(text, currentLevel);
      if (res.answer === 'YES') soundYes();
      else if (res.answer === 'NO') soundNo();
      else soundNotRelevant();

      gameplayHistory.push({ question: text, answer: res.answer, message: res.message });
      renderGameplayScreen();

      const banner = document.getElementById('answer-banner-area');
      if (banner) {
        banner.innerHTML = \`
          <div class="answer-card answer-\${res.answer}">
            <div>\${res.answer === 'YES' ? '✅' : res.answer === 'NO' ? '❌' : 'ℹ️'}</div>
            <div>
              <div style="font-size:12px; font-weight:900;">\${res.answer.replace('_', ' ')}</div>
              <div style="font-size:11px; font-weight:500; opacity:0.9;">\${res.message}</div>
            </div>
          </div>
        \`;
      }
    }

    function openSolutionModal() {
      soundClick();
      const modal = document.getElementById('modal-container');
      modal.style.display = 'flex';
      modal.innerHTML = \`
        <div class="modal-overlay">
          <div class="modal-box">
            <h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">Submit Final Solution</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">In your own words, what actually happened?</p>
            <textarea id="solution-text" rows="4" placeholder="Explain the mystery..." style="width:100%; background:#101426; border:1px solid var(--card-border); border-radius:12px; padding:10px; color:#FFF; font-size:12px; outline:none; resize:none;"></textarea>
            <div id="solution-err" style="color:var(--red); font-size:11px; margin-top:6px; display:none;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:14px;">
              <button class="btn-card" style="padding:10px; font-size:12px;" onclick="closeModal()">Cancel</button>
              <button class="btn-purple" style="padding:10px; font-size:12px; font-weight:800;" onclick="checkSolution()">CHECK</button>
            </div>
          </div>
        </div>
      \`;
    }

    function checkSolution() {
      const val = (document.getElementById('solution-text').value || '').trim();
      if (!val) return;
      const isRight = verifySolution(val, currentLevel);
      if (isRight) {
        soundVictory();
        closeModal();
        if (levelTimerInterval) clearInterval(levelTimerInterval);

        const isFirst = !profile.completedLevels.includes(currentLevel.id);
        let reward = 20;
        if (currentLevel.id > 180) reward = 75;
        else if (currentLevel.id > 100) reward = 45;
        if (currentLevel.id === 200) reward = 1000;

        if (isFirst) {
          profile.coins += reward;
          profile.completedLevels.push(currentLevel.id);
          profile.highestLevelUnlocked = Math.min(200, Math.max(profile.highestLevelUnlocked, currentLevel.id + 1));
          saveProfile();
        }

        renderVictoryScreen(reward, isFirst);
      } else {
        soundNo();
        const err = document.getElementById('solution-err');
        err.style.display = 'block';
        err.textContent = 'Not quite! Look at the clues again or ask more YES/NO questions.';
      }
    }

    function renderVictoryScreen(reward, isFirst) {
      launchConfetti();
      const isFinal = currentLevel.id === 200;
      mainView.innerHTML = \`
        <div style="text-align:center; padding:16px 0;">
          <div style="font-size:42px; margin-bottom:4px;">🏆</div>
          <h1 style="font-size:26px; font-weight:900;">\${isFinal ? 'ULTIMATE DETECTIVE!' : 'MYSTERY SOLVED!'}</h1>
          <p style="font-size:11px; font-weight:700; color:#A78BFA; text-transform:uppercase;">\${isFinal ? 'You conquered all 200 mysteries!' : 'Excellent detective work!'}</p>
        </div>

        <div class="card" style="border-color:rgba(255,200,87,0.4);">
          <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            <span>\${currentLevel.chapterName}</span>
            <span style="color:var(--gold); font-weight:800;">Case #\${currentLevel.id} Solved</span>
          </div>
          <h2 style="font-size:16px; font-weight:800; margin-bottom:8px;">\${currentLevel.title}</h2>
          <div style="background:rgba(53,201,139,0.1); border:1px solid rgba(53,201,139,0.3); border-radius:12px; padding:10px; font-size:12px; color:#E2E8F0; line-height:1.5;">
            <strong style="color:var(--green); display:block; margin-bottom:2px;">The Official Truth:</strong>
            \${currentLevel.solution}
          </div>
          <div style="display:flex; justify-content:space-around; margin-top:12px; text-align:center;">
            <div><div style="font-size:10px; color:var(--text-muted);">Questions</div><div style="font-size:14px; font-weight:800;">\${gameplayHistory.length}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted);">Reward</div><div style="font-size:14px; font-weight:800; color:var(--gold);">+\${isFirst ? reward : 0}🪙</div></div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px; margin-top:auto; padding-bottom:8px;">
          \${!isFinal ? \`
            <button class="btn-gold" style="padding:15px; font-size:15px;" onclick="startPlayLevel(\${currentLevel.id + 1})">
              NEXT LEVEL (CASE #\${currentLevel.id + 1}) →
            </button>
          \` : \`
            <button class="btn-gold" style="padding:15px; font-size:15px;" onclick="navigate('HOME')">
              ULTIMATE DETECTIVE FINISHED! 🎉
            </button>
          \`}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button class="btn-card" style="padding:12px; font-size:12px;" onclick="startPlayLevel(\${currentLevel.id})">Replay Case</button>
            <button class="btn-card" style="padding:12px; font-size:12px;" onclick="navigate('HOME')">Main Menu</button>
          </div>
        </div>
      \`;
    }

    function openHintsModal() {
      soundClick();
      const unlocked = profile.unlockedHints[currentLevel.id] || [];
      const modal = document.getElementById('modal-container');
      modal.style.display = 'flex';
      const prices = { 1: 10, 2: 20, 3: 30 };

      modal.innerHTML = \`
        <div class="modal-overlay">
          <div class="modal-box">
            <h3 style="font-size:16px; font-weight:800; margin-bottom:4px;">💡 Investigation Clues</h3>
            <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">You have <strong style="color:var(--gold)">\${profile.coins}</strong> Mystery Coins.</p>
            \${[1, 2, 3].map(hIndex => {
              const isU = unlocked.includes(hIndex);
              const p = prices[hIndex];
              return \`
                <div style="background:#101426; border-radius:12px; padding:10px; margin-bottom:8px; font-size:12px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="font-size:10px; font-weight:800; color:var(--gold);">CLUE \${hIndex}</span>
                    \${isU ? '<span style="color:var(--green); font-size:10px; font-weight:700;">Unlocked</span>' : \`
                      <button style="background:var(--gold); color:#101426; font-size:10px; font-weight:800; padding:2px 8px; border-radius:6px;" onclick="buyHint(\${hIndex}, \${p})">Unlock (\${p}🪙)</button>
                    \`}
                  </div>
                  <div style="color:\${isU ? '#FFF' : '#64748B'}; font-size:11px;">
                    \${isU ? currentLevel.hints[hIndex - 1] : 'Locked clue.'}
                  </div>
                </div>
              \`;
            }).join('')}
            <button class="btn-card" style="width:100%; padding:10px; font-size:12px; margin-top:10px;" onclick="closeModal()">Close</button>
          </div>
        </div>
      \`;
    }

    function buyHint(index, price) {
      if (profile.coins < price) { alert('Not enough coins!'); return; }
      profile.coins -= price;
      if (!profile.unlockedHints[currentLevel.id]) profile.unlockedHints[currentLevel.id] = [];
      profile.unlockedHints[currentLevel.id].push(index);
      soundCoin();
      saveProfile();
      openHintsModal();
    }

    function closeModal() {
      document.getElementById('modal-container').style.display = 'none';
    }

    function navigate(screen) {
      soundClick();
      currentScreen = screen;
      document.querySelectorAll('.nav-btn').forEach((b, i) => {
        b.classList.toggle('active', ['HOME','CHAPTERS','REWARDS','PROFILE'][i] === screen);
      });
      if (screen === 'HOME') renderHomeScreen();
      else if (screen === 'CHAPTERS') renderChaptersScreen();
      else if (screen === 'REWARDS') renderRewardsScreen();
      else if (screen === 'PROFILE') renderProfileScreen();
      else if (screen === 'DAILY') renderDailyScreen();
    }

    function renderRewardsScreen() {
      mainView.innerHTML = \`
        <div style="margin-bottom:12px;"><h2 style="font-size:18px; font-weight:800;">Detective Badges</h2><p style="font-size:11px; color:var(--text-muted);">Earn honors and bonus coins.</p></div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div><div style="font-size:13px; font-weight:800;">Beginner Detective</div><div style="font-size:10px; color:var(--text-muted);">Solve 10 cases (\${Math.min(10, profile.completedLevels.length)}/10)</div></div>
            <span style="color:\${profile.completedLevels.length >= 10 ? 'var(--green)' : 'var(--text-muted)'}; font-size:11px; font-weight:800;">\${profile.completedLevels.length >= 10 ? 'Unlocked' : '+50🪙'}</span>
          </div>
          <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div><div style="font-size:13px; font-weight:800;">Master Investigator</div><div style="font-size:10px; color:var(--text-muted);">Solve 50 cases (\${Math.min(50, profile.completedLevels.length)}/50)</div></div>
            <span style="color:\${profile.completedLevels.length >= 50 ? 'var(--green)' : 'var(--text-muted)'}; font-size:11px; font-weight:800;">\${profile.completedLevels.length >= 50 ? 'Unlocked' : '+150🪙'}</span>
          </div>
          <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div><div style="font-size:13px; font-weight:800;">Ultimate Detective</div><div style="font-size:10px; color:var(--text-muted);">Solve all 200 cases (\${profile.completedLevels.length}/200)</div></div>
            <span style="color:\${profile.completedLevels.length >= 200 ? 'var(--green)' : 'var(--text-muted)'}; font-size:11px; font-weight:800;">\${profile.completedLevels.length >= 200 ? 'Unlocked' : '+1,000🪙'}</span>
          </div>
        </div>
      \`;
    }

    function renderProfileScreen() {
      mainView.innerHTML = \`
        <div class="card" style="text-align:center; padding:20px;">
          <h2 style="font-size:20px; font-weight:800;">\${profile.name}</h2>
          <div style="font-size:12px; color:var(--gold); font-weight:700; margin-top:2px;">Master Detective Rank \${Math.min(10, 1 + Math.floor(profile.completedLevels.length / 20))}</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:16px;">
            <div style="background:#101426; padding:10px; border-radius:12px;"><div style="font-size:10px; color:var(--text-muted);">Cases Solved</div><div style="font-size:16px; font-weight:900; color:var(--green);">\${profile.completedLevels.length} / 200</div></div>
            <div style="background:#101426; padding:10px; border-radius:12px;"><div style="font-size:10px; color:var(--text-muted);">Mystery Coins</div><div style="font-size:16px; font-weight:900; color:var(--gold);">\${profile.coins}</div></div>
          </div>
        </div>
        <div class="card">
          <h3 style="font-size:13px; font-weight:800; margin-bottom:8px;">Save File & Reset</h3>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button class="btn-card" style="padding:10px; font-size:11px;" onclick="exportSave()">Export Save</button>
            <button class="btn-card" style="padding:10px; font-size:11px; color:var(--red);" onclick="resetSave()">Reset All Data</button>
          </div>
        </div>
      \`;
    }

    function renderDailyScreen() {
      const todayStr = new Date().toISOString().split('T')[0];
      const dailyId = 1 + (todayStr.split('-').reduce((a,c)=>a+parseInt(c), 0) % 200);
      const dailyLevel = ALL_LEVELS[dailyId - 1] || ALL_LEVELS[0];
      mainView.innerHTML = \`
        <div class="card" style="border-color:rgba(56,139,255,0.4);">
          <div style="font-size:10px; color:#388BFF; font-weight:800;">DAILY INVESTIGATION</div>
          <h2 style="font-size:18px; font-weight:800; margin:4px 0;">Case #\${dailyLevel.id}: \${dailyLevel.title}</h2>
          <p style="font-size:13px; color:#E2E8F0; line-height:1.5; margin:8px 0;">\${dailyLevel.story}</p>
          <button class="btn-purple" style="padding:12px; font-size:13px; width:100%; margin-top:8px;" onclick="startPlayLevel(\${dailyLevel.id})">Investigate Today's Mystery</button>
        </div>
        <button class="btn-card" style="padding:12px; font-size:12px; width:100%;" onclick="navigate('HOME')">Back to Menu</button>
      \`;
    }

    function exportSave() {
      const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'yes_no_mystery_save.json';
      a.click();
    }
    function resetSave() {
      if (confirm('Reset all cases and coins to initial state?')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    }

    // Sound toggle in header
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      profile.soundOn = !profile.soundOn;
      saveProfile();
      alert('Sound ' + (profile.soundOn ? 'Enabled' : 'Muted'));
    });
    document.getElementById('btn-settings').addEventListener('click', () => {
      navigate('PROFILE');
    });

    // Lightweight Confetti
    function launchConfetti() {
      const canvas = document.getElementById('canvas-confetti');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height * 0.6,
          vx: (Math.random() - 0.5) * 12,
          vy: -Math.random() * 14 - 4,
          color: ['#FFC857','#8257FF','#35C98B','#FFFFFF'][Math.floor(Math.random()*4)],
          size: Math.random() * 6 + 4,
          alpha: 1
        });
      }
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.alpha -= 0.015;
          if (p.alpha > 0) {
            active = true;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        });
        if (active) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      draw();
    }

    // Initialize Home Screen
    renderHomeScreen();
    updateHeader();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve(process.cwd(), 'public/yes_no_mystery.html'), htmlContent);
console.log('Successfully generated public/yes_no_mystery.html! File size:', (htmlContent.length / 1024).toFixed(1), 'KB');
