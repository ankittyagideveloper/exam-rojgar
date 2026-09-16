import { Users, BookOpen, Sparkles, ArrowRight } from "lucide-react";

export default function TestCard2(props) {
  const { icon, studentCount, title, progress, total, percentage, onGoToTest } =
    props;

  const isCompleted = total > 0 && progress === total;
  const isComingSoon = total === 0;

  return (
    <div className="group relative flex flex-col justify-between w-full max-w-[300px] mx-auto h-full rounded-2xl p-4 bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2e2e2e] shadow-md hover:shadow-xl hover:shadow-[#1272BA]/10 dark:hover:shadow-[#1272BA]/5 hover:border-[#1272BA]/40 dark:hover:border-[#1272BA]/50 transition-all duration-300 overflow-hidden">
      {/* Top subtle decorative ambient gradient highlight */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#1272BA]/10 via-[#FF7D07]/5 to-transparent dark:from-[#1272BA]/20 dark:via-[#FF7D07]/10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Top accent border bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1272BA] via-[#FF7D07] to-[#1272BA] opacity-85 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Header: Icon & Student Count Badge */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#1272BA]/10 to-[#FF7D07]/10 dark:from-[#1272BA]/20 dark:to-[#FF7D07]/20 border border-[#1272BA]/20 dark:border-[#1272BA]/30 p-2 flex items-center justify-center text-[#1272BA] dark:text-blue-400 shadow-sm group-hover:scale-105 transition-transform duration-300">
            {icon ? (
              <img
                src={icon}
                alt={title}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <BookOpen className="w-5 h-5 text-[#1272BA] dark:text-[#FF7D07]" />
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF7D07]/10 dark:bg-[#FF7D07]/20 border border-[#FF7D07]/20 dark:border-[#FF7D07]/30 text-[#FF7D07] dark:text-[#FF7D07] font-medium text-xs">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{studentCount || 0}+ Enrolled</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 dark:text-white font-bold text-base leading-snug line-clamp-2 min-h-[2.75rem] mb-3 group-hover:text-[#1272BA] dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Test count & Progress info */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7D07]" />
              {total} {total === 1 ? "Test" : "Tests"} Available
            </span>
            <span className="text-[#1272BA] dark:text-blue-400">
              {percentage || 0}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-2 mb-4 overflow-hidden p-[1px] border border-gray-200/60 dark:border-neutral-700">
            <div
              className="bg-gradient-to-r from-[#1272BA] to-[#FF7D07] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(percentage || 0, 4))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onGoToTest}
        disabled={isComingSoon}
        className={`relative z-10 w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1272BA] dark:focus:ring-offset-[#1e1e1e] ${
          isComingSoon
            ? "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-neutral-700"
            : isCompleted
            ? "bg-[#1272BA]/10 hover:bg-[#1272BA]/20 text-[#1272BA] dark:text-blue-300 dark:bg-[#1272BA]/20 border border-[#1272BA]/30 cursor-pointer"
            : "bg-[#1272BA] hover:bg-[#0f62a0] text-white hover:shadow-md hover:shadow-[#1272BA]/25 cursor-pointer active:scale-[0.99]"
        }`}
      >
        <span>
          {isComingSoon
            ? "Coming Soon"
            : isCompleted
            ? "Completed!"
            : progress === 0
            ? "Start Test Series"
            : "Continue Tests"}
        </span>
        {!isComingSoon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    </div>
  );
}
