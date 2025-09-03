import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
  { code: "hi", label: "हिंदी", shortLabel: "हि", flag: "🇮🇳" },
];

export default function LanguageSwitcher({ onChange }) {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setOpen(false);
    if (onChange) onChange(lang.code);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white shadow-sm hover:shadow-md transition"
        aria-label="Select language"
      >
        <Globe size={18} className="text-gray-600" />
        <span className="hidden sm:inline font-medium">
          {selectedLang.label}
        </span>
        <span className="sm:hidden font-medium">{selectedLang.shortLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 sm:w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition ${
                selectedLang.code === lang.code
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{lang.flag}</span>
              <span className="flex-1 text-left hidden sm:inline">
                {lang.label}
              </span>
              <span className="flex-1 text-left sm:hidden">
                {lang.shortLabel}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
