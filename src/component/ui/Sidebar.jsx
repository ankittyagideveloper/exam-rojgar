"use client";
import { cn } from "../utils/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX, IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/react-router";
import { Moon, Sun, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../language-switcher";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { Logo } from "../SidebarDemo";

const SidebarContext = createContext(undefined);

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
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
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
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden w-[16vw]  lg:flex lg:flex-col bg-neutral-100 dark:bg-neutral-800  shrink-0",
          className
        )}
        // animate={{
        //   width: animate ? (open ? "250px" : "60px") : "200px",
        // }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(true)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

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

  const closeSidebar = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className={cn(
          "h-[60px]  flex flex-row  lg:hidden  items-center justify-between  bg-[#F1F4F6] dark:bg-[#121212] w-full dark:border-[#363636] border-1 border-s border-b-[#DFE4E8]"
        )}
        {...props}
      >
        <div className="flex items-center justify-between z-20 w-full h-16 px-5 ">
          <div className="flex flex-row gap-2 items-center ">
            <IconMenu2
              className="text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}
            />
            <Link to="/" className="rounded-full  h-10 w-10">
              <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
            </Link>
          </div>
          <div className="flex items-center gap-1">
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
            {isSignedIn ? (
              <>
                <UserButton />
              </>
            ) : (
              // <SignOutButton>
              //   <button>LogOut</button>
              // </SignOutButton>
              <SignInButton mode="modal">
                <button>LogIn</button>
              </SignInButton>
            )}
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-[66vw] inset-0 bg-[#1B1B1B] text-white p-5  flex flex-col justify-between z-[999]",
                className
              )}
            >
              <div
                className="cursor-pointer text-4xl absolute left-5 top-3 z-50   flex items-center gap-2"
                onClick={closeSidebar}
              >
                <IconX className="text-4xl" />
                <Logo />
              </div>

              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate, setOpen } = useSidebar();
  return (
    <Link
      onClick={() => setOpen(false)}
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2 text-sm",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        // animate={{
        //   display: animate ? (open ? "inline-block" : "none") : "inline-block",
        //   opacity: animate ? (open ? 1 : 0) : 1,
        // }}
        className=" dark:text-neutral-200     group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 text-sm"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
