import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("darkMode") || "false") || false;
    }
    return false;
  });

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentLanguage") || "en";
    }
    return "en";
  });

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);

      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentLanguage", currentLanguage);
      changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const toggleDarkMode = () => {
    const currMode = !darkMode;
    setDarkMode(currMode);
    localStorage.setItem("darkMode", currMode);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("currentLanguage", lang);
    changeLanguage(lang);
  };

  return (
    <div>
      <ThemeContext.Provider
        value={{
          darkMode,
          toggleDarkMode,
          currentLanguage,
          handleLanguageChange,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeContext, ThemeProvider };
