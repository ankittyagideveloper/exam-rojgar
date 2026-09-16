"use client";

import { Button } from "@/components/ui";
import { useNavigate } from "react-router";
import { ShareTest } from "../components/ui/shareTest";

export function QuizCard({
  title,
  date,
  questions,
  marks,
  duration,
  languages,
  userCount,
  isFree = false,
  isNewInterface = false,
  onStartClick,
  attemptStatus,
  isPaid = false,
  testUrl
}) {
  const isSubmitted = attemptStatus === "SUBMITTED";
  const isInProgress = attemptStatus === "IN_PROGRESS";
  const navigate = useNavigate();

  const statusLabel = isInProgress ? "Resume" : isSubmitted ? "Submitted" : "Start Now";

  const startBtnClass = isSubmitted
    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
    : isInProgress
    ? "bg-[#FF7E08] hover:bg-[#e56e00] text-white shadow-sm shadow-orange-200"
    : "bg-[#1272ba] hover:bg-[#0f62a0] text-white shadow-sm shadow-blue-200";

  return (
    <div
      className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-[#2e2e2e] hover:border-[#1272ba]/40 hover:shadow-lg hover:shadow-[#1272ba]/10 dark:hover:border-[#1272ba]/50 dark:hover:shadow-[#1272ba]/5 focus-within:border-[#1272ba]/40 focus-within:shadow-lg focus-within:shadow-[#1272ba]/10 dark:focus-within:border-[#1272ba]/50 transition-all duration-200 relative overflow-hidden group outline-none"
    >

      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${isFree ? "bg-green-500" : "bg-gradient-to-b from-[#1272ba] to-[#0f62a0]"}`} />

      <div className="pl-4 pr-3 py-3 md:py-3.5">

        {/* ── MOBILE LAYOUT ── */}
        <div className="md:hidden">
          {/* Top row: badges + share */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex gap-1.5">
              <Badge free={isFree} />
              {isNewInterface && <NewBadge />}
            </div>
            <ShareTest
              testTitle={title}
              testUrl={`https://examrojgaar.com${testUrl}` ?? window.location.href}
            />
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-2.5 pr-1">
            {title}
          </h3>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <MetaPill icon="❓" label={`${questions} Qs`} />
            <MetaPill icon="📋" label={`${marks} Marks`} />
            <MetaPill icon="⏱" label={`${duration} Min`} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {!isPaid ? (
              <LockedButton onClick={() => navigate("/target-series#program")} />
            ) : (
              <Button
                disabled={isSubmitted}
                onClick={onStartClick}
                className={`flex-1 cursor-pointer text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272ba] dark:focus:ring-offset-[#1e1e1e] ${startBtnClass}`}
              >
                {isInProgress && <span className="mr-1.5">▶</span>}
                {statusLabel}
              </Button>
            )}
            {isSubmitted && (
              <Button
                onClick={onStartClick}
                className="flex-1 cursor-pointer text-sm font-medium px-4 py-2 rounded-lg border border-[#1272ba] text-[#1272ba] hover:bg-[#1272ba]/5 transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272ba] dark:focus:ring-offset-[#1e1e1e]"
              >
                Last Attempt
              </Button>
            )}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden md:flex items-center gap-4">

          {/* Left: info block */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex items-center gap-1.5 mb-2">
              <Badge free={isFree} />
              {isNewInterface && <NewBadge />}
              {userCount && (
                <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-0.5">
                  <span className="text-yellow-400">⭐</span> {userCount} users
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-2 truncate pr-2">
              {title}
            </h4>

            {/* Meta pills */}
            <div className="flex items-center gap-2">
              <MetaPill icon="❓" label={`${questions} Questions`} />
              <Divider />
              <MetaPill icon="📋" label={`${marks} Marks`} />
              <Divider />
              <MetaPill icon="⏱" label={`${duration} Mins`} />
            </div>
          </div>

          {/* Right: share + buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <ShareTest
              testTitle={title}
              testUrl={`https://examrojgaar.com${testUrl}` ?? window.location.href}
            />

            <div className="flex flex-col gap-1.5">
              {!isPaid ? (
                <LockedButton onClick={() => navigate("/target-series#program")} />
              ) : (
                <Button
                  disabled={isSubmitted}
                  onClick={onStartClick}
                  className={`cursor-pointer text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272ba] dark:focus:ring-offset-[#1e1e1e] ${startBtnClass}`}
                >
                  {isInProgress && <span className="mr-1.5">▶</span>}
                  {statusLabel}
                </Button>
              )}
              {isSubmitted && (
                <Button
                  onClick={() => onStartClick(true)}
                  className="cursor-pointer text-xs font-medium px-5 py-1.5 rounded-lg border border-[#1272ba]/40 text-[#1272ba] hover:bg-[#1272ba]/5 transition-all duration-200 bg-transparent whitespace-nowrap text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272ba] dark:focus:ring-offset-[#1e1e1e]"
                >
                  View Last Attempt
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small reusable pieces ── */

function Badge({ free }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide ${
        free
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-amber-50 text-amber-700 border border-amber-200"
      }`}
    >
      {free ? "✓ FREE" : "⭐ PREMIUM"}
    </span>
  );
}

function NewBadge() {
  return (
    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1272ba]/10 text-[#1272ba] border border-[#1272ba]/20 tracking-wide">
      NEW
    </span>
  );
}

function MetaPill({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <span className="text-[11px]">{icon}</span>
      {label}
    </span>
  );
}

function Divider() {
  return <span className="text-gray-200 dark:text-gray-700 select-none">|</span>;
}

function LockedButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-r from-[#FF7E08] to-amber-500 hover:from-[#e56e00] hover:to-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap shadow-sm shadow-orange-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7E08] dark:focus:ring-offset-[#1e1e1e]"
    >
      🔒 Unlock
    </Button>
  );
}
