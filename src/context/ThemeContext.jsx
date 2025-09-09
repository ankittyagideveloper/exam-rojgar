import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("darkMode") || "false") || false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);

      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const currMode = !darkMode;
    setDarkMode(currMode);
    localStorage.setItem("darkMode", currMode);
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
