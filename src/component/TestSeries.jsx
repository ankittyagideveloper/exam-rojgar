import { useUser } from "@clerk/clerk-react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../components/ui";

/**
 * TestSeries — Railway CBT-style mock test component
 *
 * Required prop shape:
 * {
 *   title: string,          // e.g. "Latest Pattern Railway Sectional Mock"
 *   paperName: string,      // e.g. "Round 1 Challenge Series"
 *   subject: string,        // e.g. "Sectional Mock"
 *   category: string,       // e.g. "Quantitative Aptitude"
 *   duration: number,       // minutes
 *   marksCorrect: number,   // e.g. 2
 *   marksWrong: number,     // e.g. 0.5  (absolute value, will be shown as negative)
 *   telegramLink: string,   // e.g. "https://t.me/ExamRojgaar"
 *   storageKey: string,     // unique key for localStorage (history + saved Qs)
 *   questions: Array<{
 *     id: number | string,
 *     eng: string,          // question text in English
 *     hin: string,          // question text in Hindi
 *     optE: string[],       // 4 English options
 *     optH: string[],       // 4 Hindi options
 *     ans: number,          // 0-based index of correct option
 *     solE: string,         // English solution
 *     solH: string,         // Hindi solution
 *   }>
 * }
 */

const SCREENS = { HOME: "home", COUNTDOWN: "countdown", TEST: "test", RESULT: "result" };
const STATUS = { NOT_VISITED: 0, NOT_ANSWERED: 1, ANSWERED: 2, MARKED: 3, ANS_MARKED: 4 };

// ─── tiny helpers ────────────────────────────────────────────────────────────
const pad2 = (n) => String(n).padStart(2, "0");
const formatTime = (sec) => `${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)}`;
const todayStr = () => {
  const d = new Date();
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
};

function makeFreshState(count) {
  return Array(count)
    .fill(null)
    .map(() => ({ status: STATUS.NOT_VISITED, selectedOption: null, timeSpent: 0 }));
}

// ─── storage helpers ─────────────────────────────────────────────────────────
function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw || raw === "undefined" || raw === "null") return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* silent */ }
}

// ─── palette Button class ────────────────────────────────────────────────────
function paletteClass(status, active) {
  const base =
    "w-10 h-10 flex items-center justify-center font-semibold text-sm cursor-pointer transition-all relative select-none ";
  const highlight = active ? "ring-2 ring-blue-600 scale-110 shadow-lg " : "";
  if (status === STATUS.NOT_VISITED) return base + highlight + "bg-gray-200 text-gray-700 border border-gray-300 rounded";
  if (status === STATUS.NOT_ANSWERED) return base + highlight + "bg-red-500 text-white rounded-br-2xl";
  if (status === STATUS.ANSWERED) return base + highlight + "bg-green-500 text-white rounded-tl-2xl";
  if (status === STATUS.MARKED) return base + highlight + "bg-purple-500 text-white rounded-full";
  if (status === STATUS.ANS_MARKED) return base + highlight + "bg-purple-500 text-white rounded-full";
  return base;
}

// ─── main component ───────────────────────────────────────────────────────────
const TestSeries = ({ testData }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>;
  }

  // Grab the profile image URL
  const profileImageUrl = user.imageUrl;
  const {
    title = "Railway Sectional Mock",
    paperName = "Round 1 Challenge Series",
    subject = "Sectional Mock",
    category = "Quantitative Aptitude",
    duration = 20,
    marksCorrect = 2,
    marksWrong = 0.5,
    telegramLink = "https://t.me/ExamRojgaar",
    storageKey = "ExamRojgaar_default",
    questions = [],
  } = testData || {};

  const HISTORY_KEY = `${storageKey}_history`;
  const SAVED_KEY = `${storageKey}_saved`;
  const TOTAL = questions.length;
  const MAX_SCORE = TOTAL * marksCorrect;
  const TEST_SECONDS = duration * 60;

  // ── screens ──
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [countdown, setCountdown] = useState(5);

  // ── candidate info ──
  const [candidateName, setCandidateName] = useState("");
  const [isMember, setIsMember] = useState("No");
  const [defaultLang, setDefaultLang] = useState("en");
  const [declaration, setDeclaration] = useState(false);

  // ── test state ──
  const [currentLang, setCurrentLang] = useState("eng");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_SECONDS);
  const [mockStarted, setMockStarted] = useState(false);
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [timerDanger, setTimerDanger] = useState(false);
  const [dangerFlash, setDangerFlash] = useState(false);

  const [userState, setUserState] = useState(() => makeFreshState(TOTAL));
  const qStartTimeRef = useRef(0);

  // ── analysis ──
  const [analysisFilter, setAnalysisFilter] = useState("all");

  // ── history modal ──
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState(() => readStorage(HISTORY_KEY));
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [historyAttempt, setHistoryAttempt] = useState(null);

  // ── current attempt number ──
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState(1);

  // ── saved questions modal ──
  const [showSaved, setShowSaved] = useState(false);
  const [savedList, setSavedList] = useState([]);

  // ─── prevent accidental navigation ───────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (mockStarted && !mockSubmitted) {
        e.preventDefault();
        e.returnValue = "Do you want to leave the test? Progress might be lost.";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [mockStarted, mockSubmitted]);

  // ─── helpers ──────────────────────────────────────────────────────────────
  const triggerDanger = useCallback(() => {
    setTimerDanger(true);
    setDangerFlash(true);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      osc.start(); osc.stop(ctx.currentTime + 1);
    } catch { /* silent */ }
    setTimeout(() => setDangerFlash(false), 2000);
  }, []);

  const recordTime = useCallback(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - qStartTimeRef.current) / 1000);
    if (elapsed > 0) {
      setUserState((prev) => {
        const next = [...prev];
        next[currentQIndex] = { ...next[currentQIndex], timeSpent: next[currentQIndex].timeSpent + elapsed };
        return next;
      });
    }
    qStartTimeRef.current = now;
  }, [currentQIndex]);

  // ─── start flow ───────────────────────────────────────────────────────────
  const validateAndStart = () => {
    if (!candidateName.trim()) { alert("Please enter your Candidate Name to begin."); return; }
    if (!declaration) { alert("Please read and accept the declaration before beginning."); return; }
    setScreen(SCREENS.COUNTDOWN);
    setCountdown(5);
  };

  const beginMock = useCallback(() => {
    const fresh = makeFreshState(TOTAL);
    fresh[0].status = STATUS.NOT_ANSWERED;
    setUserState(fresh);
    setTimeLeft(TEST_SECONDS);
    setMockStarted(true);
    setMockSubmitted(false);
    setCurrentQIndex(0);
    setTimerDanger(false);
    qStartTimeRef.current = Date.now();
    setScreen(SCREENS.TEST);
  }, [TOTAL, TEST_SECONDS]);

  // ─── countdown ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== SCREENS.COUNTDOWN) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown === 1) beginMock();
      else setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [screen, countdown, beginMock]);

  // ─── timer ────────────────────────────────────────────────────────────────
  const autoSubmitRef = useRef(false);
  useEffect(() => {
    if (!mockStarted || mockSubmitted) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { autoSubmitRef.current = true; return 0; }
        if (prev === 181) triggerDanger();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mockStarted, mockSubmitted, triggerDanger]);

  useEffect(() => {
    if (timeLeft === 0 && autoSubmitRef.current && mockStarted && !mockSubmitted) {
      autoSubmitRef.current = false;
      alert("Time is over. Your test has been automatically submitted.");
      finalizeTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, mockStarted, mockSubmitted]);

  // ─── option selection ─────────────────────────────────────────────────────
  const selectOption = (i) => {
    setUserState((prev) => {
      const next = [...prev];
      const cur = { ...next[currentQIndex], selectedOption: i };
      if (cur.status === STATUS.MARKED) cur.status = STATUS.ANS_MARKED;
      else if (cur.status !== STATUS.ANS_MARKED) cur.status = STATUS.ANSWERED;
      next[currentQIndex] = cur;
      return next;
    });
  };

  const clearResponse = () => {
    setUserState((prev) => {
      const next = [...prev];
      const cur = { ...next[currentQIndex], selectedOption: null };
      if (cur.status === STATUS.ANS_MARKED) cur.status = STATUS.MARKED;
      else cur.status = STATUS.NOT_ANSWERED;
      next[currentQIndex] = cur;
      return next;
    });
  };

  const markForReview = () => {
    recordTime();
    setUserState((prev) => {
      const next = [...prev];
      const cur = { ...next[currentQIndex] };
      cur.status = cur.selectedOption !== null ? STATUS.ANS_MARKED : STATUS.MARKED;
      next[currentQIndex] = cur;
      return next;
    });
    goToNext();
  };

  const saveAndNext = () => {
    recordTime();
    setUserState((prev) => {
      const next = [...prev];
      const cur = { ...next[currentQIndex] };
      if (cur.selectedOption !== null && cur.status !== STATUS.ANS_MARKED) {
        cur.status = STATUS.ANSWERED;
      } else if (cur.selectedOption === null) {
        cur.status = STATUS.NOT_ANSWERED;
      }
      next[currentQIndex] = cur;
      return next;
    });

    if (currentQIndex === TOTAL - 1) {
      setShowSubmitPopup(true);
      return;
    }
    goToNext();
  };

  const goToNext = () => {
    const next = currentQIndex + 1;
    if (next < TOTAL) {
      setUserState((prev) => {
        const s = [...prev];
        if (s[next].status === STATUS.NOT_VISITED) s[next] = { ...s[next], status: STATUS.NOT_ANSWERED };
        return s;
      });
      setCurrentQIndex(next);
      qStartTimeRef.current = Date.now();
    }
  };

  const jumpToQuestion = (idx) => {
    recordTime();
    setUserState((prev) => {
      const s = [...prev];
      if (s[idx].status === STATUS.NOT_VISITED) s[idx] = { ...s[idx], status: STATUS.NOT_ANSWERED };
      return s;
    });
    setCurrentQIndex(idx);
    qStartTimeRef.current = Date.now();
    setShowMobilePalette(false);
  };

  // ─── submission ───────────────────────────────────────────────────────────
  const finalizeTest = (stateOverride) => {
    const finalState = stateOverride || userState;
    recordTime();
    setMockSubmitted(true);
    setShowSubmitPopup(false);
    saveAttemptToStorage(finalState);
    setScreen(SCREENS.RESULT);
  };

  // ─── score calc ───────────────────────────────────────────────────────────
  const calcResults = (stateToUse) => {
    const st = stateToUse || userState;
    let correct = 0, wrong = 0, attempted = 0;
    st.forEach((s, idx) => {
      if (s.selectedOption !== null) {
        attempted++;
        if (s.selectedOption === questions[idx].ans) correct++;
        else wrong++;
      }
    });
    const score = correct * marksCorrect - wrong * marksWrong;
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : "0.0";
    return { score: score.toFixed(1), maxScore: MAX_SCORE, attempted, correct, wrong, accuracy };
  };

  // ─── localStorage history ─────────────────────────────────────────────────
  const saveAttemptToStorage = (stateSnapshot) => {
    if (isHistoryMode) return;
    const st = stateSnapshot || userState;
    const r = calcResults(st);
    const attemptNum = historyList.length + 1;
    setCurrentAttemptNumber(attemptNum);
    const attempt = {
      id: Date.now(),
      attemptNumber: attemptNum,
      mockName: paperName,
      subject,
      candidateName: candidateName.trim() || "Aspirant",
      date: todayStr(),
      marks: Number(r.score),
      accuracy: Number(r.accuracy),
      correct: r.correct,
      wrong: r.wrong,
      skipped: TOTAL - r.attempted,
      timeTaken: Math.max(0, TEST_SECONDS - timeLeft),
      answers: JSON.parse(JSON.stringify(st)),
    };
    const history = readStorage(HISTORY_KEY);
    history.push(attempt);
    writeStorage(HISTORY_KEY, history);
  };

  const openHistory = () => {
    setHistoryList(readStorage(HISTORY_KEY));
    setShowHistory(true);
  };

  const loadHistoryAttempt = (id) => {
    const attempt = readStorage(HISTORY_KEY).find((a) => Number(a.id) === Number(id));
    if (!attempt) return;
    const loaded = Array.isArray(attempt.answers)
      ? attempt.answers.map((s) => ({
        status: Number(s.status || 0),
        selectedOption: s.selectedOption === null || s.selectedOption === undefined ? null : Number(s.selectedOption),
        timeSpent: Number(s.timeSpent || 0),
      }))
      : makeFreshState(TOTAL);
    while (loaded.length < TOTAL) loaded.push({ status: 0, selectedOption: null, timeSpent: 0 });
    setUserState(loaded.slice(0, TOTAL));
    setHistoryAttempt(attempt);
    setIsHistoryMode(true);
    setMockStarted(false);
    setMockSubmitted(true);
    setShowHistory(false);
    setAnalysisFilter("all");
    setScreen(SCREENS.RESULT);
  };

  const returnFromHistory = () => {
    setIsHistoryMode(false);
    setHistoryAttempt(null);
    setMockStarted(false);
    setMockSubmitted(false);
    setUserState(makeFreshState(TOTAL));
    setScreen(SCREENS.HOME);
  };

  // ─── saved questions ──────────────────────────────────────────────────────
  const isQuestionSaved = (q) => {
    if (!q) return false;
    return readStorage(SAVED_KEY).some((s) => String(s.id) === String(q.id));
  };

  const toggleSaveQuestion = () => {
    const q = questions[currentQIndex];
    if (!q) return;
    const saved = readStorage(SAVED_KEY);
    const idx = saved.findIndex((s) => String(s.id) === String(q.id));
    if (idx >= 0) saved.splice(idx, 1);
    else saved.push(JSON.parse(JSON.stringify(q)));
    writeStorage(SAVED_KEY, saved);
    // force re-render
    setSavedList(readStorage(SAVED_KEY));
  };

  const openSaved = () => {
    setSavedList(readStorage(SAVED_KEY));
    setShowSaved(true);
  };

  const removeSavedQuestion = (idx) => {
    const list = readStorage(SAVED_KEY);
    list.splice(idx, 1);
    writeStorage(SAVED_KEY, list);
    setSavedList([...list]);
  };

  const clearAllSaved = () => {
    if (!readStorage(SAVED_KEY).length) return;
    if (confirm("Are you sure you want to clear all saved questions?")) {
      try { localStorage.removeItem(SAVED_KEY); } catch { /* silent */ }
      setSavedList([]);
    }
  };

  // ─── palette counts ───────────────────────────────────────────────────────
  const getCounts = () => {
    const c = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, ansMarked: 0 };
    userState.forEach((s) => {
      if (s.status === STATUS.ANSWERED) c.answered++;
      else if (s.status === STATUS.NOT_ANSWERED) c.notAnswered++;
      else if (s.status === STATUS.NOT_VISITED) c.notVisited++;
      else if (s.status === STATUS.MARKED) c.marked++;
      else if (s.status === STATUS.ANS_MARKED) c.ansMarked++;
    });
    return c;
  };

  // ─── result details ───────────────────────────────────────────────────────
  const getResultDetails = () => {
    const st = isHistoryMode && historyAttempt ? (() => {
      const loaded = Array.isArray(historyAttempt.answers)
        ? historyAttempt.answers.map((s) => ({ ...s }))
        : makeFreshState(TOTAL);
      while (loaded.length < TOTAL) loaded.push({ status: 0, selectedOption: null, timeSpent: 0 });
      return loaded.slice(0, TOTAL);
    })() : userState;
    return { r: calcResults(st), st };
  };

  const getFeedback = (score) => {
    const s = parseFloat(score);
    if (s >= 40) return { msg: "Excellent performance! You are on the path of selection.", sub: "Maintain this consistency and aim for higher next time.", color: "bg-green-50" };
    if (s >= 35) return { msg: "Very Good attempt! Selection zone ke paas ho.", sub: "Push for 40+ next time.", color: "bg-blue-50" };
    if (s >= 25) return { msg: "Decent start but needs solid improvement.", sub: "Focus on weak areas and accuracy. Next target: 35+.", color: "bg-yellow-50" };
    return { msg: "No issue, this is your starting point.", sub: "Deeply analyze your mistakes below. Build concepts before speed.", color: "bg-red-50" };
  };

  // ═══════════════════════════ RENDER ══════════════════════════════════════
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col font-sans text-slate-800 antialiased">
      {/* Danger flash overlay */}
      {dangerFlash && (
        <div className="fixed inset-0 bg-red-500/30 pointer-events-none z-[9999] animate-pulse" />
      )}

      {/* ══ HOME SCREEN ══════════════════════════════════════════════════════ */}
      {screen === SCREENS.HOME && (
        <div className="flex flex-col min-h-screen bg-[#e4e9f0] text-[13px] overflow-auto">
          {/* Ticker banner */}
          <div className="bg-black text-center py-1 border-b border-gray-700 shrink-0">
            <span className="font-bold text-sm text-yellow-300 tracking-widest">
              🚩 कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। 🚩
            </span>
          </div>

          {/* Header */}
          <div className="bg-[#1e5086] text-white flex justify-between items-center px-3 md:px-6 py-2 shadow-md border-b-4 border-[#3a78c4] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded flex items-center justify-center font-bold text-[#1e5086] border-2 border-yellow-400 text-[9px] md:text-xs text-center leading-tight p-1 shrink-0">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <img src="/logo.png" alt="examrojgar-logo" />
                </div>
              </div>
              <div className="text-sm md:text-xl font-bold tracking-wide uppercase leading-snug">
                {title}
              </div>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-300">
              <div>System Name:</div>
              <div className="font-bold text-sm text-white">C001</div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row gap-2 p-2 overflow-auto">
            {/* Instructions panel */}
            <div className="flex-[3] bg-white border border-gray-400 shadow-sm flex flex-col overflow-hidden min-h-[300px]">
              <div className="bg-[#3a78c4] text-white py-2 px-4 font-bold text-sm border-b border-gray-400 shrink-0">
                Instructions
              </div>
              <div className="p-4 md:p-5 overflow-y-auto text-[#333] leading-relaxed text-[13px]">
                <h4 className="text-center font-bold text-[15px] mb-4">Please read the instructions carefully</h4>
                <p className="font-bold mb-2 underline">General Instructions:</p>
                <ol className="list-decimal pl-5 space-y-2 mb-5">
                  <li>Total duration of the examination is <strong>{duration} minutes</strong>.</li>
                  <li>The countdown timer in the top right corner will display the remaining time. When the timer reaches zero, the examination will end automatically.</li>
                  <li>The Question Palette shows the status of each question using:
                    <ul className="list-none pl-2 mt-2 space-y-2 font-medium">
                      <li className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-200 border border-gray-300 rounded flex items-center justify-center font-bold text-gray-600 text-xs shrink-0">1</div>
                        Not visited yet.
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-red-500 text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-br-2xl">2</div>
                        Not answered.
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-green-500 text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-tl-2xl">3</div>
                        Answered.
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">4</div>
                        Marked for review.
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs relative shrink-0">
                          5<div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
                        </div>
                        Answered &amp; Marked — will be evaluated.
                      </li>
                    </ul>
                  </li>
                  <li>Marking Scheme: <strong>+{marksCorrect}</strong> for correct, <strong>-{marksWrong}</strong> for wrong.</li>
                </ol>
                <p className="font-bold mb-2 underline">Navigating to a Question:</p>
                <ol className="list-decimal pl-5 space-y-2" start={5}>
                  <li>Click on the question number in the Palette to jump directly. Click <strong>Save &amp; Next</strong> to save your answer and proceed.</li>
                </ol>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex-[1.2] flex flex-col gap-2 min-w-[260px] md:min-w-[280px]">
              {/* Info card */}
              <div className="bg-[#f5f7f8] border border-gray-400 shadow-sm p-4 flex flex-col items-center">
                <div className="w-20 h-24 border-2 border-gray-400 bg-white flex items-center justify-center mb-3 text-gray-300 text-5xl shadow-inner overflow-hidden">
                 <img src={profileImageUrl} alt='user-profile'/>
                </div>
                <div className="w-full text-[13px] space-y-2">
                  {[
                    ["Paper Name", paperName, "text-[#1e5086]"],
                    ["Subject", subject, "text-gray-800"],
                    ["Duration", `${duration} Mins`, "text-[#1e5086]"],
                    ["Date", todayStr(), "text-gray-800"],
                  ].map(([label, value, cls]) => (
                    <div key={label} className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <span className="font-bold text-gray-700">{label}:</span>
                      <span className={`text-right font-bold truncate ml-2 ${cls}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate details */}
              <div className="bg-[#f5f7f8] border border-gray-400 shadow-sm p-4 flex flex-col flex-1">
                <div className="font-bold text-[#1e5086] border-b border-gray-400 pb-2 mb-3">Candidate Details</div>
                <div className="space-y-3 flex-1">
                  <div>
                    <label className="text-[13px] font-bold text-gray-800 block mb-1">
                      Enter Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Ankit Tyagi"
                      className="w-full border border-gray-400 bg-white p-1.5 text-[13px] focus:outline-none focus:border-[#3a78c4] focus:ring-1 focus:ring-[#3a78c4]"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-gray-800 block mb-1">Are you an ExamRojgaar mock group member?</label>
                    <div className="flex gap-6 text-[13px] bg-white p-2 border border-gray-300">
                      {["Yes", "No"].map((v) => (
                        <label key={v} className="flex items-center gap-1.5 cursor-pointer font-medium">
                          <input type="radio" name="is_member" value={v} checked={isMember === v} onChange={() => setIsMember(v)} className="accent-[#1e5086] w-3.5 h-3.5" />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2 border-t border-gray-400 pt-3">
                  <Button onClick={openHistory} className="w-full bg-[#e0e0e0] hover:bg-[#d4d4d4] border border-gray-400 py-1.5 px-3 text-[13px] text-gray-800 font-bold transition-colors flex justify-between items-center">
                    View Previous Attempts <span className="text-[#1e5086]">📋</span>
                  </Button>
                  <Button onClick={openSaved} className="w-full bg-[#e0e0e0] hover:bg-[#d4d4d4] border border-gray-400 py-1.5 px-3 text-[13px] text-gray-800 font-bold transition-colors flex justify-between items-center">
                    Saved Questions Section <span className="text-[#1e5086]">🔖</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-[#f8f9fa] border-t border-gray-400 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
            <div className="flex-1 w-full text-[13px]">
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span className="text-red-600 font-bold">Choose your default language:</span>
                <select
                  value={defaultLang}
                  onChange={(e) => { setDefaultLang(e.target.value); setCurrentLang(e.target.value === "hi" ? "hin" : "eng"); }}
                  className="border border-gray-400 bg-white p-0.5 text-sm focus:outline-none text-gray-800 font-bold"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="decl" checked={declaration} onChange={(e) => setDeclaration(e.target.checked)} className="mt-1 w-4 h-4 cursor-pointer shrink-0" />
                <label htmlFor="decl" className="text-gray-800 cursor-pointer font-medium leading-snug">
                  I have read and understood the instructions. I agree that in case of not adhering to the instructions, I will be disqualified.
                </label>
              </div>
            </div>
            <div className="w-full md:w-auto text-center shrink-0">
              <Button
                onClick={validateAndStart}
                className="bg-[#5cb85c] hover:bg-[#449d44] border border-[#4cae4c] text-white font-bold py-2 px-8 text-[15px] shadow-sm transition-colors w-full md:w-auto uppercase tracking-wide rounded-sm"
              >
                I am ready to begin
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ══ COUNTDOWN ══════════════════════════════════════════════════════ */}
      {screen === SCREENS.COUNTDOWN && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white">
          <h2 className="text-3xl font-bold mb-8">Your Mock Begins In...</h2>
          <div className="text-9xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
            {countdown}
          </div>
        </div>
      )}

      {/* ══ TEST SCREEN ════════════════════════════════════════════════════ */}
      {screen === SCREENS.TEST && (() => {
        const q = questions[currentQIndex];
        const state = userState[currentQIndex];
        const opts = currentLang === "eng" ? q.optE : q.optH;
        const qText = currentLang === "eng" ? q.eng : q.hin;
        const counts = getCounts();
        const saved = isQuestionSaved(q);

        return (
          <div className="flex-1 flex flex-col overflow-hidden bg-white w-full border border-gray-300 md:w-[96vw] md:h-[88vh] md:mx-auto md:my-auto md:shadow-md">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-300 shadow-sm shrink-0 flex flex-col md:flex-row justify-between items-center px-3 md:px-4 py-2 gap-2 z-10">
              <div className="font-bold text-sm md:text-base text-slate-800 truncate hidden md:block">
                {title}
              </div>
              <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 md:gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 font-medium">View In:</span>
                  <select
                    value={currentLang}
                    onChange={(e) => setCurrentLang(e.target.value)}
                    className="border border-gray-300 rounded px-1 py-1 text-xs md:text-sm bg-gray-50 outline-none focus:border-blue-500"
                  >
                    <option value="eng">English</option>
                    <option value="hin">Hindi</option>
                  </select>
                </div>
                <div className={`border px-2 md:px-4 py-1 rounded flex items-center gap-1 md:gap-2 font-mono text-sm md:text-lg font-bold justify-center min-w-[80px] ${timerDanger ? "bg-red-100 border-red-500 text-red-600" : "bg-gray-100 border-gray-300 text-slate-700"}`}>
                  <span>⏱</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <Button
                  onClick={() => setShowSubmitPopup(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 md:py-1.5 px-3 md:px-6 rounded shadow transition-colors text-xs md:text-base shrink-0"
                >
                  SUBMIT
                </Button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
              {/* Question panel */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
                {/* Question header */}
                <div className="border-b border-gray-200 px-3 py-2 md:px-3 md:py-2 bg-gray-50 flex justify-between items-center shrink-0 shadow-sm">
                  <div className="font-bold text-blue-800 text-sm md:text-base flex items-center gap-1">
                    Q. <span className="bg-blue-100 px-2 py-0.5 rounded text-blue-900 border border-blue-200">{currentQIndex + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={toggleSaveQuestion}
                      className={`px-2 py-1.5 text-xs rounded border shadow-sm flex items-center gap-1.5 font-semibold transition ${saved ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-gray-300 text-gray-600 hover:bg-amber-50 hover:border-amber-300"}`}
                    >
                      <span>{saved ? "★" : "☆"}</span>
                      <span className="hidden sm:inline">{saved ? "Saved" : "Save Question"}</span>
                    </Button>
                    <span className="text-xs font-semibold text-gray-600 hidden sm:inline">+{marksCorrect}, -{marksWrong}</span>
                    <Button
                      onClick={() => setShowMobilePalette(true)}
                      className="md:hidden text-blue-600 font-bold flex items-center gap-1 border border-blue-600 px-2 py-1 rounded bg-blue-50 text-xs shadow-sm"
                    >
                      ⊞ Palette
                    </Button>
                  </div>
                </div>

                {/* Question content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-5 text-sm md:text-base">
                  <div className="mb-5 font-medium text-slate-800 leading-relaxed whitespace-pre-wrap">{qText}</div>
                  <div className="space-y-2 max-w-3xl">
                    {opts.map((optText, i) => {
                      const isSelected = state.selectedOption === i;
                      return (
                        <div
                          key={i}
                          onClick={() => selectOption(i)}
                          className={`p-3 rounded flex items-center gap-3 cursor-pointer transition-all border ${isSelected ? "bg-blue-50 border-blue-500" : "border-gray-200 hover:bg-gray-50"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-400"}`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className={`font-medium ${isSelected ? "text-blue-900" : "text-slate-700"}`}>
                            {String.fromCharCode(65 + i)}. {optText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action bar */}
                <div className="w-full bg-white border-t border-gray-300 p-2 md:p-3 flex flex-col sm:flex-row gap-2 justify-between items-center shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button onClick={markForReview} className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 sm:py-2 px-2 md:px-5 rounded text-xs md:text-sm transition-colors">
                      Mark Review
                    </Button>
                    <Button onClick={clearResponse} className="flex-1 sm:flex-none bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-semibold py-2.5 sm:py-2 px-2 md:px-5 rounded text-xs md:text-sm transition-colors">
                      Clear
                    </Button>
                  </div>
                  <Button onClick={saveAndNext} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-2 px-8 rounded text-sm md:text-base shadow-md transition-colors uppercase">
                    Save &amp; Next
                  </Button>
                </div>
              </div>

              {/* Palette sidebar (desktop) / drawer (mobile) */}
              {showMobilePalette && (
                <div
                  className="fixed inset-0 bg-black/40 z-[55] md:hidden"
                  onClick={() => setShowMobilePalette(false)}
                />
              )}
              <div
                className={`fixed inset-y-0 right-0 transform transition-transform duration-300 md:relative md:translate-x-0 w-[85%] max-w-xs md:max-w-none md:w-72 bg-white shadow-xl md:shadow-none md:border-l md:border-gray-300 z-[60] md:z-auto flex flex-col shrink-0 ${showMobilePalette ? "translate-x-0" : "translate-x-full"}`}
              >
                <div className="p-3 bg-blue-600 text-white font-bold flex justify-between items-center shrink-0">
                  <span className="text-sm truncate">{candidateName || "Aspirant"}</span>
                  <Button className="md:hidden text-white text-xl px-1" onClick={() => setShowMobilePalette(false)}>✕</Button>
                </div>

                {/* Legend */}
                <div className="p-3 grid grid-cols-2 gap-2 text-xs border-b border-gray-200 bg-gray-50 shrink-0">
                  {[
                    ["bg-green-500 rounded-tl-2xl", `${counts.answered} Answered`],
                    ["bg-red-500 rounded-br-2xl", `${counts.notAnswered} Not Ans.`],
                    ["bg-gray-200 border border-gray-300 rounded", `${counts.notVisited} Not Visited`],
                    ["bg-purple-500 rounded-full", `${counts.marked + counts.ansMarked} Marked`],
                  ].map(([cls, label]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 shrink-0 ${cls}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="p-3 flex-1 overflow-y-auto bg-blue-50/30">
                  <div className="font-bold text-gray-700 mb-2 border-b pb-1 text-xs uppercase">{category}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {userState.map((s, idx) => (
                      <Button
                        key={idx}
                        onClick={() => jumpToQuestion(idx)}
                        className={paletteClass(s.status, idx === currentQIndex)}
                      >
                        {idx + 1}
                        {s.status === STATUS.ANS_MARKED && (
                          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit popup */}
            {showSubmitPopup && (() => {
              const counts2 = getCounts();
              return (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                    <div className="bg-slate-800 p-4 text-white flex items-center gap-3 rounded-t-xl">
                      <span className="text-yellow-400 text-2xl">⚠</span>
                      <h3 className="text-xl font-bold">Confirm Submission</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-slate-700 text-base mb-2">Are you sure you want to submit the test?</p>
                      <p className="text-sm text-red-600 font-semibold mb-4">Once submitted, you cannot change your answers.</p>
                      <div className="grid grid-cols-2 gap-4 text-center text-sm mb-5 bg-slate-50 p-4 rounded-lg border">
                        <div>
                          <span className="block font-bold text-xl text-green-600">{counts2.answered + counts2.ansMarked}</span>
                          Answered
                        </div>
                        <div>
                          <span className="block font-bold text-xl text-slate-500">{TOTAL - counts2.answered - counts2.ansMarked}</span>
                          Unanswered
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button onClick={() => setShowSubmitPopup(false)}>Cancel</Button>
                        <Button onClick={() => finalizeTest()} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold shadow transition-colors">Yes, Submit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* ══ RESULT SCREEN ═════════════════════════════════════════════════ */}
      {screen === SCREENS.RESULT && (() => {
        const { r, st } = getResultDetails();
        const fb = getFeedback(r.score);

        const filteredQs = questions.filter((q, idx) => {
          const s = st[idx];
          const attempted = s.selectedOption !== null;
          const correct = attempted && s.selectedOption === q.ans;
          if (analysisFilter === "correct") return correct;
          if (analysisFilter === "wrong") return attempted && !correct;
          if (analysisFilter === "skipped") return !attempted;
          return true;
        });

        return (
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-slate-800 text-white p-4 md:p-6 shadow-md shrink-0">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Performance Dashboard</h1>
                  <p className="text-blue-400 font-medium mt-1 text-sm">EXAM ROJGAAR MOCKS · {paperName}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {isHistoryMode && (
                    <Button onClick={returnFromHistory} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded text-sm font-semibold transition-colors">
                      ← Back to Home
                    </Button>
                  )}
                  <a href={telegramLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-700 border border-slate-600 px-3 py-1.5 rounded text-sm font-semibold hover:bg-slate-600 transition-colors">
                    Join ER-UPDATES
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto p-3 md:p-5 space-y-5 pb-20">
              {/* Attempt details */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {[

                    ["Paper Name", isHistoryMode && historyAttempt ? historyAttempt.mockName : paperName, "border-blue-500"],
                    ["Subject", isHistoryMode && historyAttempt ? historyAttempt.subject : subject, "border-indigo-500"],
                    ["Candidate", isHistoryMode && historyAttempt ? historyAttempt.candidateName : candidateName || "Aspirant", "border-emerald-500"],
                    ["Date", isHistoryMode && historyAttempt ? historyAttempt.date : todayStr(), "border-amber-500"],
                  ].map(([label, val, border]) => (
                    <div key={label} className={`border-l-4 ${border} pl-3`}>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</div>
                      <div className="font-bold text-slate-800 mt-0.5 break-words">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback + stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-28 h-28 opacity-10 rounded-bl-full translate-x-8 -translate-y-8 ${fb.color}`} />
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Mentor Review</h2>
                  <div className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-3">{fb.msg}</div>
                  <p className="text-slate-600">{fb.sub}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl shadow-lg p-5 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <span className="absolute top-[-20px] left-[-20px] text-8xl text-white opacity-10 -rotate-12">🏆</span>
                  <div className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-1">{category}</div>
                  <div className="mt-3 pt-3 border-t border-blue-500/50 w-full flex justify-between items-center">
                    <span className="text-sm font-semibold">Percentile</span>
                    <span className="text-xl font-bold text-yellow-300">{r.accuracy}%</span>
                  </div>
                  <div className="mt-2 text-blue-200 text-xs">Accuracy score</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["Final Score", `${r.score} / ${MAX_SCORE}`, "text-slate-800 text-2xl md:text-3xl"],
                  ["Attempted", `${r.attempted} / ${TOTAL}`, "text-blue-600 text-2xl md:text-3xl"],
                  ["Correct / Wrong", null, "text-2xl"],
                  ["Attempt Number", isHistoryMode && historyAttempt ? historyAttempt.attemptNumber : currentAttemptNumber,  "text-yellow-500 text-2xl md:text-3xl"],
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                    <div className="text-slate-500 text-xs font-semibold mb-1">{item[0]}</div>
                    {i === 2 ? (
                      <div className="text-2xl font-bold">
                        <span className="text-green-500">{r.correct}</span>
                        <span className="text-slate-300"> / </span>
                        <span className="text-red-500">{r.wrong}</span>
                      </div>
                    ) : (
                      <div className={`font-bold ${item[2]}`}>{item[1]}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Telegram promo */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-center text-white border border-slate-700">
                <h3 className="text-lg font-bold mb-1">Want to master these questions?</h3>
                <p className="text-slate-300 mb-3 text-sm">Join our discussion group for doubt solving, strategies, and exact exam-level content.</p>
                <a href={telegramLink} target="_blank" rel="noreferrer" className="inline-block bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-2 px-6 rounded-lg shadow transition-colors text-sm">
                  Join ER-UPDATES Group
                </a>
              </div>

              {/* Analysis */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 mt-4">
                  <h3 className="text-xl font-bold text-slate-800">Detailed Question Analysis</h3>
                  <div className="flex gap-2 flex-wrap">
                    {["all", "correct", "wrong", "skipped"].map((f) => (
                      <Button
                        key={f}
                        onClick={() => setAnalysisFilter(f)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${analysisFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"}`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredQs.map((q) => {
                    const idx = questions.indexOf(q);
                    const s = st[idx];
                    const attempted = s.selectedOption !== null;
                    const correct = attempted && s.selectedOption === q.ans;

                    const badge = !attempted
                      ? <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">Skipped</span>
                      : correct
                        ? <span className="bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-bold uppercase">✓ Correct</span>
                        : <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full text-xs font-bold uppercase">✗ Incorrect</span>;

                    return (
                      <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 border-b p-3 md:p-4 flex justify-between items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm">Question {idx + 1}</span>
                          {badge}
                        </div>
                        <div className="p-4 md:p-5">
                          <div className="mb-4">
                            <p className="text-slate-800 font-medium mb-2 whitespace-pre-wrap text-sm">
                              <span className="font-bold text-blue-600">EN:</span> {q.eng}
                            </p>
                            {q.hin && (
                              <p className="text-slate-600 whitespace-pre-wrap text-sm">
                                <span className="font-bold text-blue-600">HI:</span> {q.hin}
                              </p>
                            )}
                          </div>

                          <div className="mb-4 max-w-3xl space-y-2">
                            {q.optE.map((opt, i) => {
                              let cls = "border-slate-200 bg-white";
                              let marker = null;
                              if (i === q.ans) {
                                cls = "border-green-500 bg-green-50 font-bold text-green-900";
                                marker = <span className="ml-auto text-green-500">✓</span>;
                              } else if (attempted && s.selectedOption === i) {
                                cls = "border-red-500 bg-red-50 font-bold text-red-900";
                                marker = <span className="ml-auto text-red-500">✗</span>;
                              }
                              return (
                                <div key={i} className={`p-3 border rounded flex items-center text-sm ${cls}`}>
                                  <span className="mr-2 font-semibold shrink-0">{String.fromCharCode(65 + i)}.</span>
                                  <span>{opt}</span>
                                  {marker}
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3 bg-slate-50 rounded border border-slate-200 flex flex-wrap gap-3 text-sm mb-4">
                            <span><span className="text-slate-500 font-semibold">Your Answer: </span><span className={`font-bold ${correct ? "text-green-600" : attempted ? "text-red-600" : "text-slate-500"}`}>{attempted ? String.fromCharCode(65 + s.selectedOption) : "Not Attempted"}</span></span>
                            <span><span className="text-slate-500 font-semibold">Correct: </span><span className="font-bold text-green-600">{String.fromCharCode(65 + q.ans)}</span></span>
                            <span><span className="text-slate-500 font-semibold">Time: </span><span className="font-bold text-slate-700">{s.timeSpent}s</span></span>
                          </div>

                          <div className="bg-blue-50/50 rounded-lg border border-blue-100 p-4">
                            <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-3 text-sm">
                              📖 Detailed Solution
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-bold text-blue-500 mb-1 uppercase tracking-wider">English</div>
                                <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{q.solE}</div>
                              </div>
                              {q.solH && (
                                <div>
                                  <div className="text-xs font-bold text-blue-500 mb-1 uppercase tracking-wider">Hindi</div>
                                  <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{q.solH}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {filteredQs.length === 0 && (
                    <div className="text-center text-slate-400 py-10 font-medium">No questions match this filter.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ══ HISTORY MODAL ═════════════════════════════════════════════════ */}
      {showHistory && (
        <div className="fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl mt-6 relative border border-slate-600">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h2 className="text-xl font-bold text-amber-300">📋 Previous Attempts</h2>
              <Button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-white text-2xl">✕</Button>
            </div>
            <div className="space-y-4">
              {historyList.length === 0
                ? <div className="text-slate-400 text-center py-10 font-medium">No previous attempts found. Start a mock test!</div>
                : [...historyList].reverse().map((a, i) => (
                  <div key={a.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:bg-slate-700 transition">
                    <div>
                      <div className="text-amber-300 font-bold">{a.mockName} <span className="text-sm font-normal text-amber-200/50">(Attempt #{historyList.length - i})</span></div>
                      <div className="text-slate-300 text-sm mt-1">👤 {a.candidateName || "Aspirant"} · 📅 {a.date}</div>
                    </div>
                    <div className="flex gap-4 text-center">
                      <div><div className="text-xs text-slate-400 uppercase">Score</div><div className="text-lg font-bold text-sky-400">{a.marks}</div></div>
                      <div><div className="text-xs text-slate-400 uppercase">Accuracy</div><div className="text-lg font-bold text-emerald-400">{a.accuracy}%</div></div>
                    </div>
                    <Button onClick={() => loadHistoryAttempt(a.id)} className="px-4 py-2 bg-slate-800 border border-amber-500/50 text-amber-300 rounded-lg hover:bg-slate-900 transition text-sm font-semibold">View Analysis</Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ SAVED QUESTIONS MODAL ════════════════════════════════════════ */}
      {showSaved && (
        <div className="fixed inset-0 z-[10006] bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl mt-4 border border-slate-600">
            <div className="flex justify-between items-center mb-5 border-b border-slate-700 pb-4">
              <h2 className="text-xl font-bold text-amber-300">🔖 Saved Questions Repository</h2>
              <div className="flex gap-3">
                {savedList.length > 0 && (
                  <Button onClick={clearAllSaved} className="text-sm px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition">🗑 Clear All</Button>
                )}
                <Button onClick={() => setShowSaved(false)} className="text-slate-400 hover:text-white text-2xl">✕</Button>
              </div>
            </div>
            <div className="space-y-5">
              {savedList.length === 0
                ? <div className="text-slate-400 text-center py-12 font-medium">No saved questions. Click ☆ during the mock to save questions here.</div>
                : savedList.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative">
                    <Button onClick={() => removeSavedQuestion(index)} className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition text-sm font-medium">🗑 Remove</Button>
                    <div className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">Saved Question {index + 1}</div>
                    <div className="text-slate-800 font-semibold mb-3 text-sm whitespace-pre-wrap pr-16">{q.eng}</div>
                    {q.hin && <div className="text-slate-600 text-sm mb-3 whitespace-pre-wrap"><strong>Hindi:</strong> {q.hin}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {(q.optE || []).map((opt, i) => (
                        <div key={i} className={`p-2 rounded border text-sm ${i === q.ans ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                          {String.fromCharCode(65 + i)}) {opt} {i === q.ans ? "✓" : ""}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-100">
                      💡 <strong>Solution:</strong><br />{q.solE || "No solution provided."}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSeries;
