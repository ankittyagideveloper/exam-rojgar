import React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/component/utils/utils";

/**
 * A pill-shaped toggle switch for dark / light mode.
 *
 * Props:
 *  - darkMode  {boolean}  – whether dark mode is currently active
 *  - onToggle  {function} – called when the switch is clicked
 *  - className {string}   – optional extra classes on the root element
 */
export function DarkModeToggle({ darkMode, onToggle, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={darkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        darkMode
          ? "border-[#2279be] bg-[#2279be] focus-visible:ring-[#2279be]"
          : "border-slate-300 bg-slate-200 dark:border-neutral-600 dark:bg-neutral-700 focus-visible:ring-slate-400",
        className
      )}
    >
      {/* Sliding knob */}
      <span
        className={cn(
          "pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full shadow-md ring-0 transition-transform duration-300",
          darkMode
            ? "translate-x-[26px] bg-white"
            : "translate-x-0.5 bg-white"
        )}
      >
        {darkMode ? (
          <Moon className="h-3 w-3 text-[#2279be]" />
        ) : (
          <Sun className="h-3 w-3 text-[#FF7D07]" />
        )}
      </span>
    </button>
  );
}
