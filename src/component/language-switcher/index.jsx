import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
  { code: "hi", label: "हिंदी", shortLabel: "हि", flag: "🇮🇳" },
];

export default function LanguageSwitcher({ onChange, dropUp = false }) {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync selectedLang when i18n.language changes externally
  useEffect(() => {
    const currentLang =
      languages.find((lang) => lang.code === i18n.language) || languages[0];
    setSelectedLang(currentLang);
  }, [i18n.language]);

  // Recalculate position whenever the dropdown opens
  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 160; // w-40 = 10rem = 160px

    if (dropUp) {
      setMenuStyle({
        position: "fixed",
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
        width: menuWidth,
        zIndex: 99999,
      });
    } else {
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: menuWidth,
        zIndex: 99999,
      });
    }
  }, [open, dropUp]);

  // Close dropdown when clicking outside either the button or the portal menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedButton = buttonRef.current?.contains(event.target);
      const clickedMenu = dropdownRef.current?.contains(event.target);
      if (!clickedButton && !clickedMenu) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on scroll so the portal doesn't float away from the button
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  const handleLanguageChange = (lang) => {
    if (lang.code === i18n.language) {
      setOpen(false);
      return;
    }
    i18n.changeLanguage(lang.code);
    setSelectedLang(lang);
    setOpen(false);
    if (onChange) onChange(lang.code);
  };

  const menu = open ? (
    <div
      ref={dropdownRef}
      style={menuStyle}
      className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang)}
          className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-800 dark:text-neutral-200 rounded-md transition ${
            selectedLang.code === lang.code
              ? "bg-blue-100 dark:bg-neutral-700 font-semibold"
              : "hover:bg-gray-100 dark:hover:bg-neutral-700"
          }`}
        >
          <span>{lang.flag}</span>
          <span className="flex-1 text-left">{lang.label}</span>
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-1 py-1 border-none"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={18} className="text-[#86a1ae] dark:text-white" />
        <span className="hidden text-sm sm:inline text-[#86a1ae] dark:text-white">
          {selectedLang.label}
        </span>
        <span className="sm:hidden font-medium text-[#86a1ae] dark:text-white">
          {selectedLang.shortLabel}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#86a1ae] dark:text-white transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown — portalled to <body> so it can never be clipped */}
      {typeof document !== "undefined" && createPortal(menu, document.body)}
    </div>
  );
}
