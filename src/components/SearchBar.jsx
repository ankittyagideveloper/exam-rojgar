import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { searchData } from "../data/searchData";

// ── Type badge colours ────────────────────────────────────────────────────────
const TYPE_STYLES = {
  Test:    "bg-blue-100   text-blue-700   dark:bg-blue-900/40  dark:text-blue-300",
  Quiz:    "bg-green-100  text-green-700  dark:bg-green-900/40 dark:text-green-300",
  Topic:   "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  PDF:     "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

const MAX_RESULTS = 8;

// ── Pure search function (no hooks) ──────────────────────────────────────────
function filterResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchData
    .filter(({ title, type, category, exam, keywords }) => {
      const haystack = [
        title,
        type,
        category,
        exam,
        ...(keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, MAX_RESULTS);
}

// ── Highlight matching text ───────────────────────────────────────────────────
function Highlight({ text, query }) {
  const q = query.trim();
  if (!q) return <span>{text}</span>;

  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <span>{text}</span>;

  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 dark:bg-yellow-700/60 text-inherit rounded-sm px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SearchBar({ className = "", placeholder = "Search tests, quizzes, topics…" }) {
  const [query, setQuery]       = useState("");
  const [open, setOpen]         = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const inputRef    = useRef(null);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  // ── Filtered results (only recalculated when query changes) ────────────────
  const results = useMemo(() => filterResults(query), [query]);

  // ── Close dropdown on outside click ────────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Reset active index whenever results change ──────────────────────────────
  useEffect(() => {
    setActiveIdx(-1);
  }, [results]);

  // ── Navigate to a result ────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (url) => {
      setOpen(false);
      setQuery("");
      setActiveIdx(-1);
      navigate(url);
    },
    [navigate]
  );

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIdx((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIdx((i) => Math.max(i - 1, -1));
          break;
        case "Enter":
          if (activeIdx >= 0 && results[activeIdx]) {
            e.preventDefault();
            handleSelect(results[activeIdx].url);
          }
          break;
        case "Escape":
          setOpen(false);
          setActiveIdx(-1);
          inputRef.current?.blur();
          break;
        default:
          break;
      }
    },
    [open, activeIdx, results, handleSelect]
  );

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(val.trim().length > 0);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* ── Input ── */}
      <div className="relative flex items-center">
        {/* Search icon */}
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls={showDropdown ? "search-dropdown" : undefined}
          aria-activedescendant={
            activeIdx >= 0 ? `search-result-${activeIdx}` : undefined
          }
          className={[
            "w-full rounded-xl border border-[#DFE4E8] bg-white dark:bg-[#1b1b1b] dark:border-[#363636]",
            "py-2.5 pl-9 pr-9 text-sm text-gray-800 dark:text-gray-100",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-[#2279be]/40 focus:border-[#2279be]",
            "transition-colors duration-150",
            // hide the native clear button injected by some browsers
            "[&::-webkit-search-cancel-button]:appearance-none",
          ].join(" ")}
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div
          id="search-dropdown"
          ref={dropdownRef}
          role="listbox"
          aria-label="Search results"
          className={[
            "absolute left-0 right-0 top-full z-[9999] mt-1.5",
            "rounded-xl border border-[#DFE4E8] dark:border-[#363636]",
            "bg-white dark:bg-[#1b1b1b]",
            "shadow-lg shadow-black/10 dark:shadow-black/40",
            "max-h-[360px] overflow-y-auto",
            "divide-y divide-[#F1F4F6] dark:divide-[#262626]",
          ].join(" ")}
        >
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No results found
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Try a different keyword
              </p>
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                id={`search-result-${idx}`}
                role="option"
                aria-selected={idx === activeIdx}
                onMouseDown={(e) => {
                  // prevent input from losing focus before click registers
                  e.preventDefault();
                  handleSelect(item.url);
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={[
                  "w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-100 cursor-pointer",
                  idx === activeIdx
                    ? "bg-[#F1F4F6] dark:bg-[#262626]"
                    : "hover:bg-[#F8FAFB] dark:hover:bg-[#222]",
                ].join(" ")}
              >
                {/* Type badge */}
                <span
                  className={[
                    "mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    TYPE_STYLES[item.type] ?? "bg-gray-100 text-gray-600",
                  ].join(" ")}
                >
                  {item.type}
                </span>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    <Highlight text={item.title} query={query.trim()} />
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {item.category}
                    {item.exam ? ` · ${item.exam}` : ""}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
