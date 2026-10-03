import { useState } from "react";
import { useNavigate } from "react-router";

function readHistory(storageKey) {
  try {
    const raw = localStorage.getItem(`${storageKey}_history`);
    if (!raw || raw === "undefined" || raw === "null") return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function AccuracyRing({ pct }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(pct, 100) / 100) * circ;
  const color =
    pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="shrink-0">
      <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor"
        strokeWidth="3" className="text-gray-200 dark:text-[#2e2e2e]" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={color}
        strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.5s ease" }} />
      <text x="18" y="22" textAnchor="middle"
        fontSize="8" fontWeight="700" fill={color}>
        {pct}%
      </text>
    </svg>
  );
}

/**
 * A polished "Previous Attempts" trigger button + modal.
 *
 * Props:
 *   storageKey  {string}  – base storage key; history lives at `${storageKey}_history`.
 *   variant     {"card-mobile"|"card-desktop"}  – layout hint for sizing.
 */
export function ViewPreviousAttemptsButton({ storageKey, variant = "card-mobile", testRoute }) {
  const [open, setOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  const handleOpen = () => {
    setAttempts(readHistory(storageKey));
    setOpen(true);
  };

  const handleViewAnalysis = (attemptId) => {
    if (!testRoute) return;
    setOpen(false);
    navigate(`${testRoute}?attempt=${attemptId}`);
  };

  const isDesktop = variant === "card-desktop";

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={handleOpen}
        className={[
          "group flex items-center gap-1.5 font-medium whitespace-nowrap",
          "border border-[#1272ba]/30 dark:border-[#1272ba]/40",
          "bg-[#1272ba]/5 dark:bg-[#1272ba]/10",
          "hover:bg-[#1272ba]/12 dark:hover:bg-[#1272ba]/20",
          "text-[#1272ba] dark:text-[#5aaef0]",
          "rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272ba] dark:focus:ring-offset-[#1e1e1e]",
          isDesktop
            ? "text-xs px-3 py-1.5 w-full justify-center"
            : "text-xs px-3 py-1.5 w-full justify-center mt-2",
        ].join(" ")}
      >
        {/* Clock icon */}
        <svg
          className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Previous Attempts
        {attempts.length > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1272ba] text-white text-[10px] font-bold leading-none">
            {attempts.length}
          </span>
        )}
      </button>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[10005] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2e2e2e] mt-8 mb-8 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2e2e2e]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1272ba]/10 dark:bg-[#1272ba]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1272ba] dark:text-[#5aaef0]" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    Previous Attempts
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">
                    {attempts.length === 0
                      ? "No attempts yet"
                      : `${attempts.length} attempt${attempts.length > 1 ? "s" : ""} recorded`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2e2e2e] transition-colors focus:outline-none"
                aria-label="Close"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              {attempts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#2e2e2e] flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    No attempts yet
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Complete the mock test to see your history here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {[...attempts].reverse().map((a, i) => {
                    const pct = Number(a.accuracy) || 0;
                    const attemptNum = attempts.length - i;
                    return (
                      <div
                        key={a.id}
                        className="flex flex-col gap-2.5 p-3.5 rounded-xl border border-gray-100 dark:border-[#2e2e2e] bg-gray-50/50 dark:bg-[#242424] hover:border-[#1272ba]/30 dark:hover:border-[#1272ba]/40 hover:bg-[#1272ba]/[0.03] dark:hover:bg-[#1272ba]/5 transition-all duration-150"
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Attempt badge */}
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-[#1272ba]/10 dark:bg-[#1272ba]/20 flex items-center justify-center">
                            <span className="text-[11px] font-bold text-[#1272ba] dark:text-[#5aaef0]">
                              #{attemptNum}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate leading-snug">
                              {a.mockName}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                              {a.candidateName || "Aspirant"} &middot; {a.date}
                            </p>
                          </div>

                          {/* Score */}
                          <div className="shrink-0 text-center px-2">
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide leading-tight">
                              Score
                            </p>
                            <p className="text-sm font-bold text-[#1272ba] dark:text-[#5aaef0] leading-tight">
                              {a.marks}
                            </p>
                          </div>

                          {/* Accuracy ring */}
                          <AccuracyRing pct={pct} />
                        </div>

                        {/* View Analysis button */}
                        {testRoute && (
                          <button
                            onClick={() => handleViewAnalysis(a.id)}
                            className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-[#1272ba]/30 dark:border-[#1272ba]/40 text-[#1272ba] dark:text-[#5aaef0] bg-[#1272ba]/5 dark:bg-[#1272ba]/10 hover:bg-[#1272ba]/12 dark:hover:bg-[#1272ba]/20 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#1272ba] focus:ring-offset-1"
                          >
                            {/* Bar chart icon */}
                            <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="20" x2="18" y2="10" />
                              <line x1="12" y1="20" x2="12" y2="4" />
                              <line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                            View Analysis
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {attempts.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100 dark:border-[#2e2e2e] flex items-center justify-between">
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Best score:{" "}
                  <span className="font-semibold text-gray-600 dark:text-gray-300">
                    {Math.max(...attempts.map((a) => Number(a.marks) || 0))}
                  </span>
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Best accuracy:{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {Math.max(...attempts.map((a) => Number(a.accuracy) || 0))}%
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
