import {
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Download } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./language-switcher";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { Button } from "@/components/ui";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { YoutubeIcon } from "../pages/mentorship/Mentorship";
import SearchBar from "../components/SearchBar";

function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isReadyToInstall, setIsReadyToInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsReadyToInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install prompt outcome:", outcome);

    setDeferredPrompt(null);
    setIsReadyToInstall(false);
  };

  if (!isReadyToInstall) return null;

  return (
    <Button onClick={installApp} className="gap-1 flex bg-[#1272ba] hover:bg-[#1260ba] cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200">
      <Download />
      Install App
    </Button>
  );
}

export function HeaderModernised({ dark, onToggle, isPaid }) {
  const { t } = useTranslation();

  const NAV = [
    { label: t("mentorship.nav.overview"), href: "#mission" },
    { label: t("mentorship.nav.whatYouGet"), href: "#program" },
    { label: t("mentorship.nav.howItWorks"), href: "#process" },
    { label: t("mentorship.nav.faqs"), href: "#faqs" },
    { label: "Youtube", href: "https://www.youtube.com/@ExamRojgaar", icon: <YoutubeIcon size={18} />, target: "_blank" },
  ];

  return (
    <header className="fixed top-3 left-3 right-3 z-50 rounded-2xl border border-black/8 bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-200 ring-1 ring-black/5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:h-16 sm:px-5">
        <Link className="flex items-center gap-2 sm:gap-3 min-w-0" to="/">
          <div className="w-9 h-9 shrink-0 bg-gray-100 border border-border rounded-full flex items-center justify-center sm:w-12 sm:h-12">
            <img src="/logo.png" alt="examrojgar-logo" className="grid size-8 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-foreground shadow-glow sm:size-10" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight sm:text-lg">
            Exam Rojgaar
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.icon && <span className="text-[#FF0000]">{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:h-9 sm:w-9"
          >
            {dark ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </Button>
          {/* {isPaid ?
            <Link
              to={TARGET_SERIES}
              className="rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {t("mentorship.header.targetSeries")}
            </Link>
            :
            <a
              href={APPLY_URL}
              className="rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] backdrop-blur-sm shadow-md whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {t("mentorship.header.applyNow")}
            </a>
          } */}
        </div>
      </div>
    </header>
  );
}


export const Header = () => {
  const { user, isSignedIn } = useUser();
  const isAdmin = user?.publicMetadata?.roles?.includes("admin");
  const { darkMode, toggleDarkMode, handleLanguageChange } =
    useContext(ThemeContext);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <>
      {/* Admin Banner */}
      {isAdmin && (
        <div className="fixed top-0 left-0 w-full h-[30px] bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-xs font-semibold py-1 text-center shadow-md z-[999999]">
          Admin Panel — Full Access
        </div>
      )}


      {/* Header */}
      <header
        className={`fixed hidden h-[60px] border-b border-[#DFE4E8] dark:border-[#262626] ${
          isAdmin ? "top-[30px]" : "top-0"
        } left-[60px] bg-[#F1F4F6] z-50 px-4 lg:flex items-center justify-between gap-4 dark:bg-[#262626]`}
        style={{ width: "calc(100% - 60px)" }}
      >
        {/* Left — logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link className="flex items-center gap-3" to="/">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="examrojgar-logo" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-800 dark:text-white">
                Exam Rojgaar
              </h1>
            </div>
          </Link>
        </div>

        {/* Centre — search bar */}
        <div className="flex-1 max-w-xl">
          <SearchBar placeholder="Search tests, quizzes, topics…" />
        </div>

        {/* Right — controls */}
        <div className="flex gap-2 items-center shrink-0">
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />

          <InstallPWAButton />
          <LanguageSwitcher
            onChange={handleLanguageChange}
            currentLanguage={language}
          />

          {isSignedIn ? (
            <>
              <UserButton />
            </>
          ) : (
            <SignInButton mode="modal">
              <Button className="cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200">
                Log In
              </Button>
            </SignInButton>
          )}
        </div>
      </header>
      
    </>
  );
};

