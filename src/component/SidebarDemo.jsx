import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "./ui/Sidebar";
import {
  IconArrowLeft,
  IconFileTypePdf,
  IconProgressHelp,
  IconClipboard,
  IconChecklist,
  IconHome,
  IconHomeFilled,
  IconClipboardFilled,
  IconHelpHexagonFilled,
  IconHelpHexagon,
  IconFileTextFilled,
  IconFileText,
  IconSquareCheck,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "./utils/utils";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignOutButton,
  UserButton,
  useUser,
  SignInButton,
} from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export default function SidebarDemo({ children }) {
  const { user, isSignedIn } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isActive = (currMenu) => {
    return path === currMenu || path.startsWith(currMenu);
  };

  const links = [
    {
      label: t("homeBtn"),
      href: "/home",
      icon: isActive("/home") ? (
        <IconHomeFilled
          className={`${
            isActive("/home") ? "text-[#0ad0f4] fill-[#0ad0f4]" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconHome className="h-5 w-5 shrink-0 dark:text-neutral-200 " />
      ),
    },
    {
      label: t("testBtn"),
      href: "/test-category",
      icon: isActive("/test-category") ? (
        <IconClipboardFilled
          className={`${
            isActive("/test-category") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconClipboard className={"h-5 w-5 shrink-0 dark:text-neutral-200"} />
      ),
    },
    {
      label: t("quizBtn"),
      href: "/quiz-category",
      icon: isActive("/quiz-category") ? (
        <IconHelpHexagonFilled
          className={`${
            isActive("/quiz-category") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconHelpHexagon
          className={`${
            isActive("/quiz-category") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ),
    },
    {
      label: t("pdfBtn"),
      href: "/pdf-category",
      icon: isActive("/pdf-category") ? (
        <IconFileTextFilled
          className={`${
            isActive("/pdf-category") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconFileText
          className={`${
            isActive("/pdf-category") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ),
    },
    {
      label: t("attemptedTests"),
      href: "/attempted-tests",
      icon: isActive("/attempted-tests") ? (
        <IconSquareCheckFilled
          className={`${
            isActive("/attempted-tests") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconSquareCheck
          className={`${
            isActive("/attempted-tests") ? "text-[#0ad0f4] fill-red" : ""
          } h-5 w-5 shrink-0 dark:text-neutral-200`}
        />
      ),
    },
  ];

  const [open, setOpen] = useState(isDesktopOrLaptop ? true : false);

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isDesktopOrLaptop]);

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden   border-neutral-200 bg-gray-100 md:flex-col lg:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-[#1b1b1b] text-[#86a1ae]">
          <div
            className={`flex flex-1 flex-col overflow-x-hidden overflow-y-auto ${
              isAdmin ? "mt-[30px]" : ""
            }`}
          >
            <div className="mt-12 md:mt-8 flex flex-col  pt-3">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              {isSignedIn ? (
                <SignOutButton className="text-left cursor-pointer px-6">
                  <button>{t("logOutBtn")}</button>
                </SignOutButton>
              ) : (
                <SignInButton
                  className="text-left cursor-pointer px-6"
                  mode="modal"
                >
                  <button>{t("logInBtn")}</button>
                </SignInButton>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            {user && (
              <p className="font-normal text-2xl md:text-sm">
                {user?.fullName}
              </p>
            )}
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard>{children}</Dashboard>
    </div>
  );
}

export const Logo = () => {
  const { setOpen } = useSidebar();
  return (
    <Link
      onClick={() => setOpen(false)}
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-md font-normal text-black"
    >
      <div className="rounded-full h-8 w-8">
        <img
          src="/examrojgar-logo-s.png"
          alt="examrojgar-logo-s"
          className="h-8 w-10 object-contain rounded"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg font-medium whitespace-pre text-white"
      >
        Exam Rojgaar
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="/" className="rounded-full h-8 w-8">
      <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
    </Link>
  );
};

const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-1 overflow-scroll overflow-x-hidden bg-white">
      <div className="flex min-h-screen w-full flex-1 flex-col border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};
