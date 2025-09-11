import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { IconUserCircle } from "@tabler/icons-react";
import { Menu } from "lucide-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./language-switcher";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

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
      <header className="hidden   bg-white shadow-sm px-4 py-3 lg:flex items-center justify-between w-full dark:bg-gray-900">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <img src="/logo.png" alt="examrojgar-logo" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">
              Exam Rojgar
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
          <LanguageSwitcher onChange={handleLanguageChange} />
          {/* <button className="p-2">
          <IconUserCircle className="w-6 h-6 text-gray-600" />
        </button> */}
          {isSignedIn ? (
            <SignOutButton className="cursor-pointer">
              <button>{t("logOutBtn")}</button>
            </SignOutButton>
          ) : (
            <SignInButton className="cursor-pointer" mode="modal">
              <button>LogIn</button>
            </SignInButton>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
