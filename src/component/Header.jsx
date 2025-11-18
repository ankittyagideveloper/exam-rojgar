import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { IconUserCircle } from "@tabler/icons-react";
import { Menu } from "lucide-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./language-switcher";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";
import InstallPWAButton from "./utils/InstallPWAbutton";

const Header = () => {
  const { isSignedIn } = useUser();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };
  return (
    <>
      <header className="hidden h-[60px] fixed top-0 left-0 bg-[#F1F4F6] z-50  px-4  lg:flex items-center justify-between w-full dark:bg-[#262626] border-1 border-s border-b-[#DFE4E8]">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <img src="/logo.png" alt="examrojgar-logo" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">
              Exam Rojgaar
            </h1>
            <p className="text-xs text-gray-600">{t("testSeries")}</p>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleDarkMode}
            className=" cursor-pointer flex items-center justify-center w-10 h-10  dark:bg-gray-700  transition-all duration-200"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
          <InstallPWAButton />
          <LanguageSwitcher onChange={handleLanguageChange} />

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </>
  );
};

export default Header;
