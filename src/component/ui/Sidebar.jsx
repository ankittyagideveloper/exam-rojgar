"use client";
import { cn } from "../utils/utils";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/react-router";
import { Download, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../language-switcher";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { Button } from "@/components/ui";

const SidebarContext = createContext(undefined);
const MobileDrawerContext = createContext(false);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
  desktopCollapsed: desktopCollapsedProp,
  setDesktopCollapsed: setDesktopCollapsedProp,
}) => {
  const [openState, setOpenState] = useState(false);
  const [desktopCollapsedState, setDesktopCollapsedState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  const desktopCollapsed =
    desktopCollapsedProp !== undefined
      ? desktopCollapsedProp
      : desktopCollapsedState;
  const setDesktopCollapsed =
    setDesktopCollapsedProp !== undefined
      ? setDesktopCollapsedProp
      : setDesktopCollapsedState;

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, animate, desktopCollapsed, setDesktopCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
  desktopCollapsed,
  setDesktopCollapsed,
}) => {
  return (
    <SidebarProvider
      open={open}
      setOpen={setOpen}
      animate={animate}
      desktopCollapsed={desktopCollapsed}
      setDesktopCollapsed={setDesktopCollapsed}
    >
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { desktopCollapsed } = useSidebar();
  return (
    /* Outer shell — always 60px, always visible, never clips */
    <div
      className="hidden lg:flex fixed top-0 left-0 h-screen z-[60]"
      style={{ width: "60px" }}
    >
      {/* Inner panel — expands to full width over the page */}
      <motion.div
        className={cn(
          "flex flex-col h-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden absolute top-0 left-0",
          className
        )}
        initial={false}
        animate={{ width: desktopCollapsed ? "60px" : "16vw" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

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
    <Button
      onClick={installApp}
      style={{
        padding: "10px 20px",
        background: "#1272ba",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
      }}
    >
      <Download />
    </Button>
  );
}

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isSignedIn, user } = useUser();
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

  const closeSidebar = () => setOpen(!open);
  const handleBackdropClick = () => setOpen(false);

  const isAdmin = user?.publicMetadata?.roles?.includes("admin");

  return (
    <>
      <div
        className={cn(
          `${
            isAdmin ? "mt-[30px]" : ""
          } fixed z-50 h-[60px] flex flex-row lg:hidden items-center justify-between bg-[#F1F4F6] dark:bg-[#121212] w-full dark:border-[#363636] border-1 border-s border-b-[#DFE4E8]`
        )}
        {...props}
      >
        <div className="flex items-center justify-between z-20 w-full h-16 px-5">
          <div className="flex flex-row gap-2 items-center">
            <IconMenu2
              className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            <Link to="/" className="rounded-full h-10 w-10">
              <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleDarkMode}
              className="cursor-pointer flex items-center justify-center w-10 h-10 dark:bg-gray-700 transition-all duration-200"
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
            <LanguageSwitcher onChange={handleLanguageChange} />
            <InstallPWAButton />
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-[#1272ba] hover:bg-[#1260ba] cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200">
                  LogIn
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-[998]"
                onClick={handleBackdropClick}
              />
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  `${isAdmin ? "mt-[30px]" : ""}
                  fixed h-full w-[75vw] max-w-[300px] inset-0 bg-[#1B1B1B] text-white flex flex-col z-[999]`,
                  className
                )}
              >
                {/* Drawer header — close button + logo */}
                <div className="flex items-center gap-3 px-4 h-[60px] shrink-0 border-b border-[#363940]">
                  <button
                    className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-md text-[#86a1ae] hover:bg-[#363940] hover:text-white transition-colors duration-200"
                    onClick={closeSidebar}
                    aria-label="Close sidebar"
                  >
                    <IconX className="w-6 h-6" />
                  </button>
                  <MobileDrawerContext.Provider value={true}>
                    <Logo />
                  </MobileDrawerContext.Provider>
                </div>
                {/* Nav links — scrollable */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <MobileDrawerContext.Provider value={true}>
                    {children}
                  </MobileDrawerContext.Provider>
                </div>
                {/* User profile — pinned to bottom */}
                {isSignedIn && (
                  <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-t border-[#363940]">
                    <UserButton />
                    {user && (
                      <p className="text-sm text-[#86a1ae] truncate">{user?.fullName}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const Logo = () => {
  const { setOpen, desktopCollapsed } = useSidebar();
  const isMobileDrawer = useContext(MobileDrawerContext);

  // Show the app name in the mobile drawer or when desktop is expanded
  const showName = isMobileDrawer || !desktopCollapsed;

  return (
    <Link
      onClick={() => setOpen(false)}
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-md font-normal text-black"
    >
      <div className="rounded-full h-8 w-8 shrink-0">
        <img
          src="/examrojgar-logo-s.png"
          alt="examrojgar-logo-s"
          className="h-8 w-10 object-contain rounded"
        />
      </div>
      {showName && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium whitespace-pre text-white"
        >
          Exam Rojgaar
        </motion.span>
      )}
    </Link>
  );
};

export const SidebarLink = ({ link, className, ...props }) => {
  const location = useLocation();
  const path = location.pathname;
  const { setOpen, desktopCollapsed } = useSidebar();
  const isMobileDrawer = useContext(MobileDrawerContext);

  // On mobile drawer, always show labels; on desktop follow desktopCollapsed
  const showLabel = isMobileDrawer || !desktopCollapsed;

  const isActive = (currMenu) => {
    return path === currMenu || path.startsWith(currMenu);
  };

  return (
    <div className="relative overflow-hidden">
      {link.isFeatured && showLabel && (
        <span
          className="absolute top-[6px] -right-[22px] z-10 pointer-events-none rotate-45 bg-red-500 text-white text-[9px] font-bold tracking-widest px-6 py-[2px] shadow-md uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          NEW
        </span>
      )}
      <Link
        onClick={() => setOpen(false)}
        to={link.href}
        title={!showLabel ? link.label : undefined}
        className={cn(
          `${
            isActive(link.href) ? "bg-[#363940] text-white" : ""
          } hover:bg-[#363940] flex items-center group/sidebar py-3 text-base transition-colors duration-150`,
          showLabel ? "justify-start gap-3 px-6" : "justify-center px-0",
          className
        )}
        {...props}
      >
        <span className="shrink-0">{link.icon}</span>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 text-base overflow-hidden"
          >
            {link.label}
          </motion.span>
        )}
      </Link>
    </div>
  );
};
