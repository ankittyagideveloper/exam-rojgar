import { useState, useEffect, useCallback, useRef } from "react";

// ─── Safe localStorage wrapper ──────────────────────────────────────────────
const safeStorage = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* quota / incognito */ } },
  remove: (k) => { try { localStorage.removeItem(k); } catch { /* noop */ } },
};

// ─── Status colour map ────────────────────────────────────────────────────────
const STATUS_STYLES = {
  "not-visited":    "bg-slate-100 text-slate-600 border border-slate-300",
  "not-answered":   "bg-red-500 text-white border-red-500",
  "answered":       "bg-green-500 text-white border-green-500",
  "marked":         "bg-violet-500 text-white border-violet-500",
  "answered-marked":"bg-violet-500 text-white border-violet-500",
};

// ─── Solution renderer ────────────────────────────────────────────────────────
function SolutionBlock({ sol }) {
  if (!sol) return null;
  return (
    <div className="space-y-3 text-sm mt-4">
      <div>
        <div className="font-bold text-[#1e5086] mb-1">👨‍💻 Solution by Admins</div>
        <div className="text-slate-800 bg-blue-50 p-3 rounded-lg border border-blue-100 whitespace-pre-line font-medium leading-relaxed">{sol.adminSol}</div>
      </div>
      <div>
        <div className="font-bold text-amber-600 mb-1">⚡ Best Exam Approach</div>
        <div className="text-slate-700 font-medium">{sol.approach}</div>
      </div>
      <div>
        <div className="font-bold text-emerald-600 mb-1">🧠 Step-by-Step Solution</div>
        <div className="whitespace-pre-line text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">{sol.steps}</div>
      </div>
      {sol.elimination && (
        <div>
          <div className="font-bold text-purple-600 mb-1">🎯 Smart Elimination</div>
          <div className="text-slate-700">{sol.elimination}</div>
        </div>
      )}
      <div className="font-bold text-slate-800 bg-slate-100 inline-block px-4 py-2 rounded-lg border border-slate-300">
        🏁 Final Answer: {sol.answerStr}
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-300 shadow-sm">
        <span className="font-bold text-amber-800">📌 Quick Tip: </span>
        <span className="text-amber-900 font-medium">{sol.tip}</span>
      </div>
      <div className="text-xs text-slate-500 italic pt-3 border-t border-slate-200">
        🔚 For expert doubt solving, join our{" "}
        <a href="https://t.me/ExamRojgaar" target="_blank" rel="noreferrer" className="text-[#3a78c4] font-bold hover:underline">
          ExamRojgaar MOCK Telegram
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * RailwayMockTest
 *
 * Props:
 *   mockData  {object}  – data object matching the railwayMockData shape
 *   onExit    {func}    – optional callback when user leaves the mock (e.g. navigate home)
 */
export default function RailwayMockTest({ mockData, onExit }) {
  const { id: MOCK_ID, title, subtitle, seriesName, category, duration, markingScheme, telegramLink, questions } = mockData;
  const TOTAL_TIME = duration * 60;
  const STORAGE_KEY_PROGRESS = `ExamRojgaar_progress_${MOCK_ID}`;
  const STORAGE_KEY_HISTORY  = `ExamRojgaar_history`;
  const STORAGE_KEY_SAVED    = `ExamRojgaar_saved_questions`;
  const STORAGE_KEY_NAME     = `ExamRojgaar_candidate_name`;
  const STORAGE_KEY_MEMBER   = `ExamRojgaar_member_status`;

  // ── Screens: home | countdown | mock | bouquet | telegram | result ──────────
  const [screen, setScreen] = useState("home");
  const [countdown, setCountdown] = useState(5);

  // ── Candidate ────────────────────────────────────────────────────────────────
  const [candidateName, setCandidateName]   = useState(safeStorage.get(STORAGE_KEY_NAME) || "");
  const [isMember, setIsMember]             = useState(safeStorage.get(STORAGE_KEY_MEMBER) === "Yes" ? "Yes" : "No");
  const [declarationChecked, setDeclaration] = useState(false);
  const [defaultLang, setDefaultLang]        = useState("en");

  // ── Test state ────────────────────────────────────────────────────────────────
  const [lang, setLang]               = useState("en");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft]        = useState(TOTAL_TIME);
  const [answers, setAnswers]          = useState({});
  const [statusArr, setStatusArr]      = useState(() => Array(questions.length).fill("not-visited"));
  const [timeSpent, setTimeSpent]      = useState(() => Array(questions.length).fill(0));
  const [focusScore, setFocusScore]    = useState(100);
  const [isSubmitted, setIsSubmitted]  = useState(false);
  const [isReattempt, setIsReattempt]  = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(questions);

  // ── UI helpers ────────────────────────────────────────────────────────────────
  const [showPalette, setShowPalette]   = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [alertMsg, setAlertMsg]         = useState("");
  const [telegramClicked, setTelegramClicked] = useState(false);

  // ── Result state ──────────────────────────────────────────────────────────────
  const [result, setResult]             = useState(null);
  const [analysisLang, setAnalysisLang] = useState("en");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState({});

  // ── History / saved ────────────────────────────────────────────────────────────
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSavedModal, setShowSavedModal]     = useState(false);
  const [history, setHistory]                   = useState([]);
  const [savedQuestions, setSavedQuestions]     = useState([]);

  const timerRef = useRef(null);
  const tabSwitches = useRef(0);

  // ── Helpers ────────────────────────────────────────────────────────────────────
  const showAlert = useCallback((msg, duration = 1800) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(""), duration);
  }, []);

  const getHistory = useCallback(() => {
    try { const d = safeStorage.get(STORAGE_KEY_HISTORY); return Array.isArray(JSON.parse(d)) ? JSON.parse(d) : []; } catch { return []; }
  }, [STORAGE_KEY_HISTORY]);

  const getSavedQuestions = useCallback(() => {
    try { const d = safeStorage.get(STORAGE_KEY_SAVED); return Array.isArray(JSON.parse(d)) ? JSON.parse(d) : []; } catch { return []; }
  }, [STORAGE_KEY_SAVED]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isQuestionSaved = useCallback((q) => getSavedQuestions().some((sq) => sq.q_en === q.q_en), [getSavedQuestions]);

  // ── Beforeunload guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (screen === "mock" && !isSubmitted) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [screen, isSubmitted]);

  // ── Focus tracking ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onBlur = () => {
      if (screen === "mock" && !isSubmitted) {
        tabSwitches.current++;
        setFocusScore((p) => Math.max(0, p - 10));
        showAlert("Stay focused on the test", 2000);
      }
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [screen, isSubmitted, showAlert]);

  // ── Save progress ──────────────────────────────────────────────────────────────
  const saveProgress = useCallback((override = {}) => {
    if (!isSubmitted && screen === "mock" && !isReattempt) {
      safeStorage.set(STORAGE_KEY_PROGRESS, JSON.stringify({
        mockId: MOCK_ID, currentIndex, timeLeft, answers, statusArr, timeSpent, focusScore, lang, ...override,
      }));
    }
  }, [MOCK_ID, STORAGE_KEY_PROGRESS, answers, currentIndex, focusScore, isReattempt, isSubmitted, lang, screen, statusArr, timeLeft, timeSpent]);

  // ── Timer ────────────────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); handleAutoSubmit(); return 0; }
        return prev - 1;
      });
      setTimeSpent((prev) => { const next = [...prev]; next[currentIndex] = (next[currentIndex] || 0) + 1; return next; });
    }, 1000);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Countdown → mock ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "countdown") return;
    if (countdown <= 0) { setScreen("mock"); startTimer(); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, countdown, startTimer]);

  // Clean up timer
  useEffect(() => () => clearInterval(timerRef.current), []);

  // ── Status helpers ─────────────────────────────────────────────────────────────
  const updateStatus = useCallback((idx, isReview, currentAnswers, currentStatus) => {
    const hasAns = currentAnswers[idx] !== undefined;
    return currentStatus.map((s, i) => {
      if (i !== idx) return s;
      if (isReview) return hasAns ? "answered-marked" : "marked";
      if (s === "marked" || s === "answered-marked") return hasAns ? "answered" : s;
      return hasAns ? "answered" : "not-answered";
    });
  }, []);

  // ── Navigation ──────────────────────────────────────────────────────────────────
  const navigate = useCallback((nextIdx, isReview = false) => {
    setAnswers((prevAns) => {
      setStatusArr((prevStatus) => {
        const updated = updateStatus(currentIndex, isReview, prevAns, prevStatus);
        const next = updated.map((s, i) => (i === nextIdx && s === "not-visited") ? "not-answered" : s);
        saveProgress({ statusArr: next, answers: prevAns });
        return next;
      });
      return prevAns;
    });
    setCurrentIndex(nextIdx);
  }, [currentIndex, saveProgress, updateStatus]);

  const goNext = useCallback((isReview = false) => {
    if (currentIndex < activeQuestions.length - 1) navigate(currentIndex + 1, isReview);
  }, [activeQuestions.length, currentIndex, navigate]);

  const goToQuestion = useCallback((idx) => {
    navigate(idx);
    if (window.innerWidth < 768) setShowPalette(false);
  }, [navigate]);

  const selectOption = useCallback((idx) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  }, [currentIndex]);

  const clearResponse = useCallback(() => {
    setAnswers((prev) => { const next = { ...prev }; delete next[currentIndex]; return next; });
    setStatusArr((prev) => prev.map((s, i) => i === currentIndex ? "not-answered" : s));
  }, [currentIndex]);

  // ── Submit ───────────────────────────────────────────────────────────────────────
  const handleAutoSubmit = useCallback(() => { setShowConfirm(false); doSubmit(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doSubmit = useCallback(() => {
    if (isSubmitted) return;
    clearInterval(timerRef.current);
    setIsSubmitted(true);
    safeStorage.remove(STORAGE_KEY_PROGRESS);
    const r = computeResult(activeQuestions, answers, timeSpent, timeLeft, TOTAL_TIME, markingScheme, focusScore);
    if (!isReattempt) saveAttempt(r);
    setResult(r);
    setScreen("bouquet");
    setTimeout(() => setScreen("telegram"), 1500);
  }, [STORAGE_KEY_PROGRESS, TOTAL_TIME, activeQuestions, answers, candidateName, focusScore, isMember, isReattempt, isSubmitted, markingScheme, timeLeft, timeSpent]); // eslint-disable-line

  const saveAttempt = useCallback((r) => {
    const h = getHistory();
    h.push({ id: Date.now(), mockId: MOCK_ID, mockName: title, date: new Date().toLocaleString(), ...r, answers, timeSpent, statusArr, questions: activeQuestions });
    try { safeStorage.set(STORAGE_KEY_HISTORY, JSON.stringify(h)); } catch { h.shift(); safeStorage.set(STORAGE_KEY_HISTORY, JSON.stringify(h)); }
  }, [MOCK_ID, STORAGE_KEY_HISTORY, activeQuestions, answers, getHistory, statusArr, timeSpent, title]);

  // ── Reattempt ────────────────────────────────────────────────────────────────────
  const startReattempt = useCallback(() => {
    const wrong = activeQuestions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correct);
    if (!wrong.length) return;
    wrong.sort(() => Math.random() - 0.5);
    setActiveQuestions(wrong);
    setAnswers({}); setStatusArr(Array(wrong.length).fill("not-visited")); setTimeSpent(Array(wrong.length).fill(0));
    setTimeLeft(wrong.length * 60); setCurrentIndex(0); setIsSubmitted(false); setIsReattempt(true); setResult(null);
    setStatusArr((s) => s.map((_, i) => i === 0 ? "not-answered" : s[i]));
    setScreen("mock"); startTimer();
  }, [activeQuestions, answers, startTimer]);

  // ── Toggle save question ──────────────────────────────────────────────────────────
  const toggleSave = useCallback((q) => {
    const saved = getSavedQuestions();
    const idx = saved.findIndex((sq) => sq.q_en === q.q_en);
    if (idx > -1) saved.splice(idx, 1); else saved.push(q);
    safeStorage.set(STORAGE_KEY_SAVED, JSON.stringify(saved));
    setSavedQuestions([...saved]);
  }, [STORAGE_KEY_SAVED, getSavedQuestions]);

  // ── Validate & start ──────────────────────────────────────────────────────────────
  const validateAndStart = () => {
    if (!candidateName.trim()) { showAlert("Please enter your Candidate Name to begin.", 2500); return; }
    if (!declarationChecked)   { showAlert("Please check the declaration box.", 2500); return; }
    safeStorage.set(STORAGE_KEY_NAME, candidateName.trim());
    safeStorage.set(STORAGE_KEY_MEMBER, isMember);
    setLang(defaultLang);

    // Resume?
    const saved = safeStorage.get(STORAGE_KEY_PROGRESS);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.mockId === MOCK_ID) {
          setCurrentIndex(p.currentIndex || 0); setTimeLeft(p.timeLeft || TOTAL_TIME);
          setAnswers(p.answers || {}); setStatusArr(p.statusArr || Array(questions.length).fill("not-visited"));
          setTimeSpent(p.timeSpent || Array(questions.length).fill(0)); setFocusScore(p.focusScore || 100);
          setLang(p.lang || "en"); setActiveQuestions(questions);
          setScreen("mock"); startTimer(); return;
        }
      } catch { safeStorage.remove(STORAGE_KEY_PROGRESS); }
    }
    setCountdown(5); setScreen("countdown");
  };

  // ── Compute result ────────────────────────────────────────────────────────────────
  const computeResult = (qs, ans, tSpent, tLeft, totalTime, scheme, fScore) => {
    let correct = 0, wrong = 0, skipped = 0, fastWrong = 0, slowWrong = 0, slowCorrect = 0;
    const topics = {};
    qs.forEach((q, i) => {
      const a = ans[i]; const isCorr = a == q.correct;
      if (a === undefined) skipped++; else if (isCorr) correct++; else wrong++;
      const ideal = q.diff === 1 ? 10 : q.diff === 2 ? 25 : 30;
      const t = tSpent[i] || 0;
      if (a !== undefined && !isCorr && t <= ideal) fastWrong++;
      if (a !== undefined && !isCorr && t > ideal)  slowWrong++;
      if (isCorr && t > ideal) slowCorrect++;
      if (!topics[q.topic]) topics[q.topic] = { tot: 0, att: 0, cor: 0, time: 0 };
      topics[q.topic].tot++; topics[q.topic].time += t;
      if (a !== undefined) topics[q.topic].att++;
      if (isCorr) topics[q.topic].cor++;
    });
    const maxMarks = qs.length * scheme.correct;
    const marks   = correct * scheme.correct + wrong * scheme.wrong;
    const acc     = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
    const timeTaken = totalTime - tLeft;
    const pct = calcPercentile(marks, maxMarks);
    const rank = calcRank(marks, maxMarks);
    let persona = "Balanced Performer";
    if (acc > 90) persona = "Accuracy Master";
    else if ((correct + wrong) > qs.length * 0.8 && acc < 70) persona = "Risk Taker";
    else if (timeTaken < totalTime * 0.7 && acc > 80) persona = "Speed Player";
    let mentorMsg = "";
    if (fastWrong > 2) mentorMsg = `${fastWrong} careless mistakes (fast & wrong). Focus on accuracy first.`;
    else if (slowWrong > 1) mentorMsg = `${slowWrong} questions were slow & wrong. If path unclear in 30s → SKIP.`;
    else if (slowCorrect > 3) mentorMsg = `${slowCorrect} questions were slow & correct. Learn short-tricks!`;
    else if (skipped > qs.length * 0.4) mentorMsg = "You skipped many. Hunt easy questions across the paper first.";
    else if (acc > 90) mentorMsg = "Outstanding! High accuracy with controlled speed. Keep this mindset.";
    else mentorMsg = "Good attempt. Balance speed and accuracy. Analyse solutions thoroughly.";
    return { correct, wrong, skipped, marks, maxMarks, acc, timeTaken, pct, rank, persona, mentorMsg, topics, fastWrong, slowWrong, slowCorrect, focusScore: fScore };
  };

  const calcPercentile = (marks, maxMarks) => {
    const S = marks / maxMarks;
    if (S >= 0.9) return Math.min(100, 99 + (S - 0.9) * 10).toFixed(2);
    if (S >= 0.7) return (85 + (S - 0.7) * 70).toFixed(2);
    if (S >= 0.5) return (60 + (S - 0.5) * 125).toFixed(2);
    if (S >= 0.2) return (30 + (S - 0.2) * 100).toFixed(2);
    return Math.max(0, S * 150).toFixed(2);
  };
  const calcRank = (marks, maxMarks) => {
    const S = marks / maxMarks;
    if (S >= 0.9) return Math.max(1, Math.round(50  - (S - 0.9) * 490));
    if (S >= 0.7) return Math.max(1, Math.round(500 - (S - 0.7) * 2250));
    if (S >= 0.5) return Math.max(1, Math.round(2500 - (S - 0.5) * 10000));
    return Math.max(1, Math.round(4500 - S * 6666));
  };

  // ── Palette counts ─────────────────────────────────────────────────────────────
  const paletteCounts = statusArr.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {});

  // ─────────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  const currentQ = activeQuestions[currentIndex];

  return (
    <div className="font-sans antialiased overflow-x-hidden" style={{ userSelect: "none" }}>

      {/* Alert Toast */}
      {alertMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-100/90 backdrop-blur border border-red-400 text-red-700 px-6 py-3 rounded-full shadow-2xl z-[9999] font-semibold text-sm">
          {alertMsg}
        </div>
      )}

      {/* ── COUNTDOWN ─────────────────────────────────────────────────────── */}
      {screen === "countdown" && (
        <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center">
          <div className="text-8xl md:text-9xl font-bold text-amber-400 animate-pulse">{countdown}</div>
          <div className="text-amber-200 text-xl mt-4 tracking-widest uppercase">Get Ready</div>
        </div>
      )}

      {/* ── HOME ──────────────────────────────────────────────────────────── */}
      {screen === "home" && (
        <div className="min-h-screen bg-[#e4e9f0] flex flex-col text-[13px]">
          {/* Top banner */}
          <div className="bg-black text-center py-1 border-b border-gray-700">
            <span className="font-bold text-[16px] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#e6c27a] via-[#ffeba8] to-[#c5a030]">{subtitle}</span>
          </div>
          {/* Header */}
          <div className="bg-[#1e5086] text-white flex justify-between items-center p-2 md:px-6 shadow-md border-b-[5px] border-[#3a78c4]">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center font-bold text-[#1e5086] border-2 border-[#e6c27a] text-xs text-center leading-tight">
                ExamRojgaar<br />Mocks
              </div>
              <div className="text-lg md:text-2xl font-bold tracking-wide uppercase">{title}</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-2 gap-2">
            {/* Instructions */}
            <div className="flex-[3] bg-white border border-gray-400 shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#3a78c4] text-white py-2 px-4 font-bold text-sm border-b border-gray-400">Instructions</div>
              <div className="p-5 overflow-y-auto text-[#333] leading-relaxed text-[13px]">
                <h4 className="text-center font-bold text-[15px] mb-4">Please read the instructions carefully</h4>
                <p className="font-bold mb-2"><u>General Instructions:</u></p>
                <ol className="list-decimal pl-5 space-y-3 mb-6">
                  <li>Total duration of the examination is <b>{duration} minutes</b>.</li>
                  <li>The countdown timer in the top right corner shows remaining time. When it reaches zero, the exam ends automatically.</li>
                  <li>Question Palette shows each question's status using colours:
                    <ul className="list-none pl-2 mt-3 space-y-3 font-medium">
                      <li className="flex items-center gap-3"><div className="w-8 h-7 bg-slate-100 border border-slate-300 rounded flex items-center justify-center font-bold text-gray-600 text-xs">1</div> Not visited</li>
                      <li className="flex items-center gap-3"><div className="w-8 h-7 bg-red-500 text-white rounded flex items-center justify-center font-bold text-xs">3</div> Not answered</li>
                      <li className="flex items-center gap-3"><div className="w-8 h-7 bg-green-500 text-white rounded flex items-center justify-center font-bold text-xs">5</div> Answered</li>
                      <li className="flex items-center gap-3"><div className="w-8 h-7 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold text-xs">7</div> Marked for review</li>
                    </ul>
                  </li>
                  <li>Click <b>Save &amp; Next</b> to save your answer and move to next question.</li>
                  <li>Click <b>Mark for Review &amp; Next</b> to flag a question and continue.</li>
                </ol>
                <p className="font-bold mb-2"><u>Marking Scheme:</u></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Correct: <span className="text-green-600 font-bold">+{markingScheme.correct}</span></li>
                  <li>Incorrect: <span className="text-red-500 font-bold">{markingScheme.wrong}</span></li>
                  <li>Skipped: <span className="font-bold">0</span></li>
                </ul>
              </div>
            </div>

            {/* Profile Panel */}
            <div className="flex-[1.2] flex flex-col gap-2 min-w-[260px]">
              <div className="bg-[#f5f7f8] border border-gray-400 shadow-sm p-4 flex flex-col items-center">
                <div className="w-20 h-24 border-2 border-gray-400 bg-white flex items-center justify-center mb-4 shadow-inner">
                  <span className="text-5xl text-gray-300">👤</span>
                </div>
                <div className="w-full text-[13px] space-y-2">
                  {[["Paper Name", seriesName], ["Subject", category], ["Duration", `${duration} Mins`]].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <span className="font-bold text-gray-700">{k}:</span>
                      <span className="text-right text-[#1e5086] font-bold truncate ml-2">{v}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                    <span className="font-bold text-gray-700">Date:</span>
                    <span className="font-bold text-gray-800">{new Date().toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f7f8] border border-gray-400 shadow-sm p-4 flex-1 flex flex-col">
                <div className="font-bold text-[#1e5086] border-b border-gray-400 pb-2 mb-4">Candidate Details</div>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="text-[13px] font-bold text-gray-800 block mb-1">Enter Your Name <span className="text-red-500">*</span></label>
                    <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full border border-gray-400 bg-white p-1.5 text-[13px] focus:outline-none focus:border-[#3a78c4]"
                      placeholder="e.g. Rahul Kumar" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-gray-800 block mb-1">Are you an ExamRojgaar mock group member?</label>
                    <div className="flex gap-6 text-[13px] mt-1 bg-white p-2 border border-gray-300">
                      {["Yes", "No"].map((v) => (
                        <label key={v} className="flex items-center gap-1.5 cursor-pointer font-medium">
                          <input type="radio" name="is_member" value={v} checked={isMember === v} onChange={() => setIsMember(v)} className="w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-gray-400 pt-4">
                  <button onClick={() => { setHistory(getHistory()); setShowHistoryModal(true); }}
                    className="w-full bg-[#e0e0e0] hover:bg-[#d4d4d4] border border-gray-400 py-1.5 px-3 text-[13px] text-gray-800 font-bold flex justify-between items-center">
                    View Previous Attempts <span className="text-[#1e5086]">🕐</span>
                  </button>
                  <button onClick={() => { setSavedQuestions(getSavedQuestions()); setShowSavedModal(true); }}
                    className="w-full bg-[#e0e0e0] hover:bg-[#d4d4d4] border border-gray-400 py-1.5 px-3 text-[13px] text-gray-800 font-bold flex justify-between items-center">
                    Saved Questions <span className="text-[#1e5086]">🔖</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-[#f8f9fa] border-t border-gray-400 p-3 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full text-[13px]">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-red-600 font-bold">Language:</span>
                <select value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)}
                  className="ml-2 border border-gray-400 bg-white p-0.5 text-sm focus:outline-none text-gray-800 font-bold">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="declaration" checked={declarationChecked} onChange={(e) => setDeclaration(e.target.checked)} className="mt-1 w-4 h-4 cursor-pointer" />
                <label htmlFor="declaration" className="text-gray-800 cursor-pointer font-medium leading-snug">
                  I have read and understood the instructions. I agree that in case of not adhering to instructions, I will be disqualified.
                </label>
              </div>
            </div>
            <button onClick={validateAndStart}
              className="bg-[#5cb85c] hover:bg-[#449d44] border border-[#4cae4c] text-white font-bold py-2 px-8 rounded text-[15px] shadow-sm uppercase tracking-wide w-full md:w-auto">
              {safeStorage.get(STORAGE_KEY_PROGRESS) ? "Resume Mock" : "I am ready to begin"}
            </button>
          </div>
        </div>
      )}

      {/* ── MOCK SCREEN ───────────────────────────────────────────────────── */}
      {screen === "mock" && currentQ && (
        <div className="flex flex-col bg-white" style={{ height: "100dvh" }}>
          {/* Header */}
          <div className="h-[60px] shrink-0 bg-[#1e5086] text-white flex items-center justify-between px-2 md:px-6 shadow-md border-b-4 border-[#3a78c4]">
            <div className="font-bold text-lg hidden md:block uppercase tracking-wide">{isReattempt ? "REATTEMPT MODE" : title}</div>
            <div className="flex items-center justify-end w-full md:w-auto gap-2 md:gap-4">
              <button onClick={() => setLang((l) => l === "en" ? "hi" : "en")}
                className="flex items-center bg-[#3a78c4] rounded p-1 cursor-pointer hover:bg-[#4a88d4] text-xs md:text-sm px-2 md:px-3 py-1 font-semibold whitespace-nowrap">
                🌐 {lang === "en" ? "Hindi" : "English"}
              </button>
              <div className={`text-sm md:text-xl font-mono font-bold px-2 md:px-4 py-1.5 rounded border flex items-center gap-1 md:gap-2 transition-colors ${timeLeft <= 180 ? "bg-red-50 border-red-500 text-red-500 animate-pulse" : "bg-slate-900/80 border-slate-500 text-[#e6c27a]"}`}>
                ⏰ {formatTime(timeLeft)}
              </div>
              <button onClick={() => setShowConfirm(true)}
                className="px-4 py-1.5 md:px-6 bg-[#5cb85c] hover:bg-[#4cae4c] border border-[#4cae4c] text-white rounded text-sm font-bold uppercase">Submit</button>
              <button onClick={() => setShowPalette((p) => !p)} className="md:hidden text-white text-xl ml-1">⊞</button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden relative">
            {/* Question area */}
            <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white m-2 md:m-4 rounded-xl shadow-sm border border-slate-200">
                {/* Question header */}
                <div className="mb-4 flex justify-between items-center border-b pb-4 border-slate-200">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-[#1e5086] bg-blue-50 px-3 py-1 rounded border border-blue-200">
                      Question {currentIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Marks: <span className="text-green-600">+{markingScheme.correct}</span>, <span className="text-red-500">{markingScheme.wrong}</span>
                    </span>
                  </div>
                  <button onClick={() => toggleSave(currentQ)}
                    className={`px-3 py-1.5 text-sm rounded border shadow-sm flex items-center gap-2 font-medium transition ${isQuestionSaved(currentQ) ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
                    {isQuestionSaved(currentQ) ? "⭐ Saved" : "☆ Save"}
                  </button>
                </div>

                {/* Question text */}
                <div className="text-[15px] text-gray-800 mb-6 leading-relaxed font-semibold whitespace-pre-wrap">
                  {lang === "en" ? currentQ.q_en : currentQ.q_hi}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {(lang === "en" ? currentQ.options_en : currentQ.options_hi).map((opt, idx) => {
                    const isSelected = answers[currentIndex] === idx;
                    return (
                      <label key={idx}
                        className={`flex items-center p-3 rounded-md cursor-pointer border-2 transition-colors ${isSelected ? "border-[#3a78c4] bg-[#f0f9ff]" : "border-gray-200 bg-white hover:bg-blue-50"}`}>
                        <input type="radio" name="q_opt" value={idx} checked={isSelected} onChange={() => selectOption(idx)}
                          className="mr-4 w-4 h-4 accent-[#1e5086]" />
                        <span className="text-gray-800 text-[14px]">{String.fromCharCode(65 + idx)}) {opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Desktop action bar */}
              <div className="hidden md:flex h-[70px] shrink-0 bg-[#f8f9fa] border-t border-gray-300 items-center justify-between px-6">
                <div className="flex gap-3">
                  <button onClick={() => goNext(true)} className="px-6 py-2 bg-white border border-gray-400 rounded font-semibold text-gray-700 hover:bg-gray-100 text-sm">Mark for Review &amp; Next</button>
                  <button onClick={clearResponse}      className="px-6 py-2 bg-white border border-gray-400 rounded font-semibold text-gray-700 hover:bg-gray-100 text-sm">Clear Response</button>
                </div>
                <button onClick={() => goNext(false)} className="px-8 py-2 bg-[#3a78c4] hover:bg-[#2b68b4] text-white rounded font-bold text-sm">Save &amp; Next</button>
              </div>
            </div>

            {/* Palette panel */}
            <div className={`w-[280px] bg-[#f8f9fa] border-l border-gray-300 flex flex-col absolute right-0 top-0 h-full z-30 shadow-2xl md:shadow-none transition-transform duration-300 ${showPalette ? "translate-x-0" : "translate-x-full"} md:relative md:translate-x-0`}>
              <div className="md:hidden flex justify-between items-center p-4 bg-[#1e5086] text-white">
                <span className="font-bold">Question Palette</span>
                <button onClick={() => setShowPalette(false)}>✕</button>
              </div>
              {/* Counts */}
              <div className="p-3 border-b border-gray-300 grid grid-cols-2 gap-2 text-[11px] font-medium text-gray-700 bg-[#e4e9f0]">
                {[["answered","Answered","bg-green-500"],["not-answered","Not Answered","bg-red-500"],["not-visited","Not Visited","bg-slate-100 text-slate-600"],["marked","Marked","bg-violet-500"]].map(([k, label, cls]) => (
                  <div key={k} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded text-center leading-6 text-xs font-bold ${cls} ${cls.includes("slate") ? "" : "text-white"}`}>{paletteCounts[k] || 0}</div>
                    {label}
                  </div>
                ))}
                <div className="flex items-center gap-2 col-span-2">
                  <div className="w-6 h-6 rounded-full text-center leading-6 text-xs font-bold bg-violet-500 text-white relative">{paletteCounts["answered-marked"] || 0}</div>
                  Answered &amp; Marked
                </div>
              </div>
              <div className="p-3 bg-[#3a78c4] text-white text-sm font-bold border-b border-gray-400">{isReattempt ? "Reattempt" : category}</div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="grid grid-cols-5 gap-2">
                  {statusArr.map((s, idx) => (
                    <button key={idx} onClick={() => goToQuestion(idx)}
                      className={`w-9 h-8 rounded text-xs font-bold transition-all ${STATUS_STYLES[s]} ${currentIndex === idx ? "ring-2 ring-[#3a78c4] ring-offset-1 scale-110 shadow-lg" : ""}`}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile palette overlay */}
            {showPalette && <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20" onClick={() => setShowPalette(false)} />}
          </div>

          {/* Mobile action bar */}
          <div className="md:hidden shrink-0 grid grid-cols-3 gap-2 bg-[#f8f9fa] border-t border-gray-300 p-2">
            <button onClick={() => goNext(true)}  className="py-3 bg-white border border-gray-400 rounded text-xs font-bold text-gray-700 leading-tight">Review &amp; Next</button>
            <button onClick={clearResponse}       className="py-3 bg-white border border-gray-400 rounded text-xs font-bold text-gray-700">Clear</button>
            <button onClick={() => goNext(false)} className="py-3 bg-[#3a78c4] text-white rounded text-sm font-bold">Save &amp; Next</button>
          </div>
        </div>
      )}

      {/* ── BOUQUET ───────────────────────────────────────────────────────── */}
      {screen === "bouquet" && (
        <div className="fixed inset-0 z-[10001] bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center">
          <div className="text-9xl drop-shadow-xl animate-bounce">💐</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e5086] text-center mt-8 px-4">Thanks for attempting<br />this mock</h1>
        </div>
      )}

      {/* ── TELEGRAM GATE ─────────────────────────────────────────────────── */}
      {screen === "telegram" && (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-amber-500">
            <div className="text-5xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">One Last Step!</h2>
            <p className="text-slate-600 mb-6 font-medium">For detailed solutions, best approaches, and expert doubt solving, join our Telegram channel.</p>
            <a href={telegramLink} target="_blank" rel="noreferrer"
              onClick={() => setTelegramClicked(true)}
              className="block w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-bold rounded-xl mb-4 text-lg">
              Join ExamRojgaar MOCK
            </a>
            <button onClick={() => { if (!telegramClicked) { alert("Please click the link to join first."); return; } setScreen("result"); }}
              className="text-slate-500 hover:text-amber-600 text-sm font-bold underline underline-offset-4">
              I have joined, show my result
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT ────────────────────────────────────────────────────────── */}
      {screen === "result" && result && (
        <div className="min-h-screen bg-amber-50/30 p-4 md:p-8 pb-20">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-amber-200/50">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Performance Dashboard</h1>
                <p className="text-amber-600 font-medium mt-1">{title}</p>
              </div>
              <button onClick={onExit || (() => window.location.reload())}
                className="mt-4 md:mt-0 px-6 py-3 bg-[#1e5086] text-white font-bold rounded-xl hover:bg-[#153a63]">
                🏠 Home
              </button>
            </div>

            {/* Mentor feedback */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg flex items-start gap-5">
              <div className="text-4xl">🎓</div>
              <div><h3 className="text-lg font-bold mb-1">Smart Insight</h3><p className="text-lg font-semibold leading-snug">{result.mentorMsg}</p></div>
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Score", `${result.marks}/${result.maxMarks}`, "text-amber-600"],
                ["Rank",  result.rank, "text-slate-800"],
                ["Percentile", `${result.pct}%`, "text-emerald-600"],
                ["Accuracy", `${result.acc}%`, "text-amber-700"],
              ].map(([label, value, cls]) => (
                <div key={label} className="bg-white rounded-xl p-5 text-center shadow-sm border border-amber-100">
                  <div className="text-amber-700/70 text-xs font-bold uppercase mb-2">{label}</div>
                  <div className={`text-3xl md:text-4xl font-extrabold ${cls}`}>{value}</div>
                </div>
              ))}
            </div>

            {/* Attempt summary + Topic table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                <h3 className="text-xl font-bold text-slate-800 border-b border-amber-100 pb-4 mb-5">📊 Attempt Summary</h3>
                <div className="space-y-3">
                  {[["Total Questions", activeQuestions.length, "text-slate-800"], ["Attempted", result.correct + result.wrong, "text-amber-700"], ["Correct (+{m})".replace("{m}", markingScheme.correct), result.correct, "text-emerald-700"], ["Incorrect ({m})".replace("{m}", markingScheme.wrong), result.wrong, "text-rose-600"], ["Skipped", result.skipped, "text-slate-600"]].map(([k, v, cls]) => (
                    <div key={k} className="flex justify-between items-center">
                      <span className={`font-medium ${cls}`}>{k}</span>
                      <span className={`font-bold px-3 py-1 rounded-lg bg-slate-50 border ${cls}`}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-amber-100 flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-600">Your Style:</span>
                  <span className="text-[#1e5086] bg-blue-50 px-2 py-1 rounded border border-blue-200 font-bold text-sm">{result.persona}</span>
                </div>
                {result.wrong > 0 && !isReattempt && (
                  <button onClick={startReattempt} className="mt-4 w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-bold shadow-md hover:-translate-y-1 transition-transform">
                    🔄 Reattempt Wrong Questions
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                <h3 className="text-xl font-bold text-slate-800 border-b border-amber-100 pb-4 mb-5">📚 Topic-wise Intelligence</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-amber-50 text-amber-900 font-bold">
                      <tr><th className="p-2">Topic</th><th className="p-2">Att/Tot</th><th className="p-2">Acc</th><th className="p-2">Verdict</th></tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {Object.entries(result.topics).map(([topic, d]) => {
                        const acc = d.att > 0 ? Math.round((d.cor / d.att) * 100) : 0;
                        const v = acc > 80 ? <span className="text-emerald-600 font-bold">Strong</span> : acc > 50 ? <span className="text-amber-600 font-bold">Moderate</span> : <span className="text-rose-600 font-bold">Weak</span>;
                        return <tr key={topic}><td className="p-2 font-semibold">{topic}</td><td className="p-2">{d.att}/{d.tot}</td><td className="p-2 font-bold">{acc}%</td><td className="p-2">{v}</td></tr>;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Question review */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <div className="flex flex-col md:flex-row justify-between items-center border-b border-amber-100 pb-4 mb-4">
                <h3 className="text-xl font-bold text-slate-800">🔍 Deep Question Review</h3>
                <div className="mt-4 md:mt-0 flex gap-2">
                  {["en", "hi"].map((l) => (
                    <button key={l} onClick={() => setAnalysisLang(l)}
                      className={`px-4 py-1.5 rounded text-sm font-semibold transition ${analysisLang === l ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {l === "en" ? "English" : "हिंदी"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Filters */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {["all", "correct", "wrong", "skipped"].map((f) => (
                  <button key={f} onClick={() => setReviewFilter(f)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-bold whitespace-nowrap transition ${reviewFilter === f ? "bg-amber-500 text-white border-amber-500" : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"}`}>
                    {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? activeQuestions.length : f === "correct" ? result.correct : f === "wrong" ? result.wrong : result.skipped})
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {activeQuestions.map((q, idx) => {
                  const ans   = answers[idx];
                  const isCorr = ans === q.correct;
                  const status = ans === undefined ? "skipped" : isCorr ? "correct" : "wrong";
                  if (reviewFilter !== "all" && status !== reviewFilter) return null;
                  const colorCls = status === "correct" ? "text-emerald-600 bg-emerald-50 border-emerald-200" : status === "wrong" ? "text-rose-600 bg-rose-50 border-rose-200" : "text-slate-600 bg-slate-100 border-slate-300";
                  const ideal = q.diff === 1 ? 10 : q.diff === 2 ? 25 : 50;
                  const myTime = timeSpent[idx] || 0;
                  const expanded = expandedCards[idx];
                  const opts = analysisLang === "en" ? q.options_en : q.options_hi;
                  const sol  = analysisLang === "en" ? q.sol_en : q.sol_hi;
                  return (
                    <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                      <div className="bg-slate-50 p-4 cursor-pointer flex justify-between items-center hover:bg-slate-100 transition"
                        onClick={() => setExpandedCards((p) => ({ ...p, [idx]: !p[idx] }))}>
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-white border border-[#3a78c4] text-[#1e5086] rounded-lg flex items-center justify-center font-bold shadow-sm shrink-0 text-sm">Q{idx + 1}</div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm flex items-center gap-2 flex-wrap">
                              {q.topic} <span className={`px-2 py-0.5 rounded text-xs border ${colorCls}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">Time: <span className={`font-bold ${myTime > ideal ? "text-rose-500" : "text-emerald-600"}`}>{myTime}s</span> | Ideal: {ideal}s</div>
                          </div>
                        </div>
                        <span className="text-gray-400">{expanded ? "▲" : "▼"}</span>
                      </div>
                      {expanded && (
                        <div className="p-5 border-t border-gray-200">
                          <div className="mb-4 text-slate-800 font-semibold whitespace-pre-wrap text-[15px]">
                            {analysisLang === "en" ? q.q_en : q.q_hi}
                          </div>
                          <div className="space-y-2 mb-4">
                            {opts.map((o, i) => {
                              const isUser = ans === i; const isAc = q.correct === i;
                              const bg = isUser && isAc ? "bg-emerald-50 border-emerald-300" : isUser && !isAc ? "bg-rose-50 border-rose-300" : isAc ? "bg-emerald-50 border-emerald-300 border-dashed" : "bg-slate-50 border-slate-200";
                              return (
                                <div key={i} className={`p-3 rounded-lg border ${bg} text-sm font-medium text-slate-700`}>
                                  {String.fromCharCode(65 + i)}) {o}
                                  {isUser && <span className="ml-2 text-xs font-bold text-slate-500">(Your Answer)</span>}
                                  {isAc  && <span className="ml-2 text-xs font-bold text-emerald-600">✓ Correct</span>}
                                </div>
                              );
                            })}
                          </div>
                          {status === "correct"
                            ? <div>
                                <div className="text-emerald-700 font-medium text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-200 mb-3">✅ You got this right! Verify your approach below.</div>
                                <button onClick={() => setExpandedCards((p) => ({ ...p, [`sol_${idx}`]: !p[`sol_${idx}`] }))}
                                  className="text-[#3a78c4] text-sm font-bold underline mb-2">
                                  {expandedCards[`sol_${idx}`] ? "Hide Solution" : "Show Expert Solution"}
                                </button>
                                {expandedCards[`sol_${idx}`] && <SolutionBlock sol={sol} />}
                              </div>
                            : <SolutionBlock sol={sol} />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Want to master this mindset?</h3>
              <p className="text-slate-600 mb-6 font-medium">Join our Telegram group for expert mentors and daily guidance.</p>
              <a href={telegramLink} target="_blank" rel="noreferrer"
                className="inline-block px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all text-lg">
                Join ExamRojgaar MOCK →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM SUBMIT MODAL ──────────────────────────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200">
            <div className="text-5xl mb-4">❓</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Submit Test?</h3>
            <p className="text-slate-600 mb-8 font-medium">Once submitted, you cannot change your answers.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setShowConfirm(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl w-full">Cancel</button>
              <button onClick={() => doSubmit()} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl w-full">Yes, Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HISTORY MODAL ─────────────────────────────────────────────────── */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto bg-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl mt-10 border border-slate-600">
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-amber-300">🕐 Previous Attempts</h2>
              <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-white text-3xl">✕</button>
            </div>
            <div className="space-y-4">
              {history.length === 0
                ? <div className="text-slate-400 text-center py-10">No previous attempts found. Start a mock test!</div>
                : [...history].reverse().map((a, i) => (
                    <div key={a.id} className="bg-slate-700/50 border border-slate-600 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div>
                        <div className="text-amber-300 font-bold">{a.mockName} <span className="text-sm font-normal text-amber-200/50">(Attempt #{history.length - i})</span></div>
                        <div className="text-slate-300 text-sm">📅 {a.date}</div>
                      </div>
                      <div className="flex gap-6 text-center">
                        <div><div className="text-xs text-slate-400 uppercase">Score</div><div className="text-xl font-bold text-sky-400">{a.marks}</div></div>
                        <div><div className="text-xs text-slate-400 uppercase">Accuracy</div><div className="text-xl font-bold text-emerald-400">{a.accuracy}%</div></div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ── SAVED QUESTIONS MODAL ────────────────────────────────────────── */}
      {showSavedModal && (
        <div className="fixed inset-0 z-[10006] bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl mt-4 border border-slate-600">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-amber-300">🔖 Saved Questions</h2>
              <div className="flex gap-4">
                <button onClick={() => { safeStorage.remove(STORAGE_KEY_SAVED); setSavedQuestions([]); }}
                  className="text-sm px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold">
                  🗑 Clear All
                </button>
                <button onClick={() => setShowSavedModal(false)} className="text-slate-400 hover:text-white text-3xl">✕</button>
              </div>
            </div>
            <div className="space-y-6">
              {savedQuestions.length === 0
                ? <div className="text-slate-400 text-center py-10">No saved questions. Star questions during the mock!</div>
                : savedQuestions.map((q, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative">
                      <button onClick={() => { const updated = savedQuestions.filter((_, j) => j !== i); setSavedQuestions(updated); safeStorage.set(STORAGE_KEY_SAVED, JSON.stringify(updated)); }}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 text-sm">🗑 Remove</button>
                      <div className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">{q.topic} — {q.subtopic}</div>
                      <div className="text-slate-800 font-semibold mb-4 text-[15px] whitespace-pre-wrap pr-8">{q.q_en}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(q.options_en || []).map((o, j) => (
                          <div key={j} className={`p-3 rounded border text-sm ${q.correct === j ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                            {String.fromCharCode(65 + j)}) {o} {q.correct === j && "✓"}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
