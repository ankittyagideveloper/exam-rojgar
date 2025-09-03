import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
  { code: "hi", label: "हिंदी", shortLabel: "हि", flag: "🇮🇳" },
];

export default function LanguageSwitcher({ onChange }) {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync selectedLang when i18n.language changes externally
  useEffect(() => {
    const currentLang =
      languages.find((lang) => lang.code === i18n.language) || languages[0];
    setSelectedLang(currentLang);
  }, [i18n.language]);

  // Close dropdown when clicking outside
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
    if (lang.code === i18n.language) {
      // ✅ Do nothing if user selects the same language
      setOpen(false);
      return;
    }
    i18n.changeLanguage(lang.code);
    setSelectedLang(lang);
    setOpen(false);
    if (onChange) onChange(lang.code);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-1 py-1 rounded-lg border border-gray-300 bg-white shadow-sm hover:shadow-md transition"
        aria-label="Select language"
      >
        <Globe size={18} className="text-gray-600" />
        <span className="hidden text-sm sm:inline">{selectedLang.label}</span>
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
                  ? "bg-blue-100 text-black font-semibold"
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
