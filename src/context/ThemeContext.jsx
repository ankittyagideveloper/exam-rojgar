import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") || false;
    }
    return false;
  });

  useEffect(() => {
    // Save theme to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeContext, ThemeProvider };
