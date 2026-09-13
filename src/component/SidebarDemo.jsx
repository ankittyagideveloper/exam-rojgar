import React, {  useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, Logo } from "./ui/Sidebar";
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
  IconUser,
  IconUserFilled,
  IconBook,
  IconBookFilled,
  IconTarget,
  IconTargetArrow,
  IconFlame,
  IconFlameFilled,
  IconMenu2,
} from "@tabler/icons-react";
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

export default function SidebarDemo({ children }) {
  const { user, isSignedIn } = useUser();

  const isAdmin = user?.publicMetadata?.roles?.includes("admin") ? "admin" : "user";
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();

  const isActive = (currMenu) => {
    return path === currMenu || path.startsWith(currMenu);
  };

  const links = [
    {
      label: t("homeBtn"),
      href: "/home",
      icon: isActive("/home") ? (
        <IconHomeFilled
          className={`${isActive("/home") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconHome className="h-6 w-6 shrink-0 dark:text-neutral-200 " />
      ),
      role: ["user", "admin"],
    },
    {
      label: t("testBtn"),
      href: "/online-test-series",
      icon: isActive("/online-test-series") ? (
        <IconClipboardFilled
          className={`${isActive("/online-test-series") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconClipboard className={"h-6 w-6 shrink-0 dark:text-neutral-200"} />
      ),
      role: ["user", "admin"],
    },
    {
      label: t("freeTestsBtn"),
      href: "/free-tests",
      icon: isActive("/free-tests") ? (
        <IconFlameFilled
          className={`${isActive("/free-tests") ? "text-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconFlame className="h-6 w-6 shrink-0 dark:text-neutral-200" />
      ),
      isFeatured: true,
      role: ["user", "admin"],
    },
    {
      label: t("mentorBtn"),
      href: "/target-series",
      icon: isActive("/target-series") ? (
        <IconTargetArrow
          className={`${isActive("/target-series") ? "text-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconTarget className="h-6 w-6 shrink-0 dark:text-neutral-200" />
      ),
      isFeatured: true,
      role: ["user", "admin"],
    },
    {
      label: t("coursesBtn"),
      href: "/learn",
      icon: isActive("/learn") ? (
        <IconBookFilled
          className={`${isActive("/learn") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconBook
          className={`${isActive("/learn") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ),
      role: ["user", "admin"],
    },
    {
      label: t("quizBtn"),
      href: "/quiz-category",
      icon: isActive("/quiz-category") ? (
        <IconHelpHexagonFilled
          className={`${isActive("/quiz-category") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconHelpHexagon
          className={`${isActive("/quiz-category") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ),
      role: ["user", "admin"],
    },
    {
      label: t("pdfBtn"),
      href: "/pdf-category",
      icon: isActive("/pdf-category") ? (
        <IconFileTextFilled
          className={`${isActive("/pdf-category") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconFileText
          className={`${isActive("/pdf-category") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ),
      role: ["user", "admin"],
    },
    {
      label: t("adminPanel"),
      href: "/admin/tests",
      icon: isActive("/admin-panel") ? (
        <IconUserFilled
          className={`${isActive("/admin-panel") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconUser
          className={`${isActive("/admin-panel") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ),
      role: ["admin"],
    },
    {
      label: t("attemptedTests"),
      href: "/attempted-tests",
      icon: isActive("/attempted-tests") ? (
        <IconSquareCheckFilled
          className={`${isActive("/attempted-tests") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ) : (
        <IconSquareCheck
          className={`${isActive("/attempted-tests") ? "text-[#FF7D07] fill-[#FF7D07]" : ""
            } h-6 w-6 shrink-0 dark:text-neutral-200`}
        />
      ),
      role: ["admin", "user"],
    },
  ];

  const [open, setOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(true);

  return (
    <Sidebar
      open={open}
      setOpen={setOpen}
      animate={true}
      desktopCollapsed={desktopCollapsed}
      setDesktopCollapsed={setDesktopCollapsed}
    >
      <div className="flex w-full flex-1 flex-col min-h-screen bg-gray-100 dark:bg-neutral-800">
        <SidebarBody onBlur={()=>setDesktopCollapsed(true)} className="justify-between bg-[#1b1b1b] text-[#86a1ae]">
          <div
            className={`flex flex-1 flex-col overflow-x-hidden overflow-y-auto`}
          >
            {/* Hamburger toggle — desktop only, top of sidebar */}
            <div className={cn(
              "hidden lg:flex items-center gap-2 h-[60px] shrink-0",
              desktopCollapsed ? "justify-center px-0" : "px-4"
            )}>
              <button
                onClick={() => setDesktopCollapsed((c) => !c)}
                className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-md text-[#86a1ae] hover:bg-[#363940] hover:text-white transition-colors duration-200"
                aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <IconMenu2 className="w-6 h-6" />
              </button>
             {!desktopCollapsed && <Logo/>}
            </div>
            <div className="flex flex-col pt-1">
              {links
                .filter((link) => link.role.includes(isAdmin))
                .map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
            </div>
          </div>
          {/* Desktop-only user profile at bottom of sidebar */}
          <div className={cn("hidden lg:flex items-center gap-4", desktopCollapsed ? "justify-center px-0" : "px-6")}>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {user && !desktopCollapsed && (
              <p className="font-normal text-sm truncate">
                {user?.fullName}
              </p>
            )}
          </div>
        </SidebarBody>

        <Dashboard>
          {children}
        </Dashboard>
      </div>
    </Sidebar>
  );
}

export const LogoIcon = () => {
  return (
    <Link to="/" className="rounded-full h-8 w-8">
      <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
    </Link>
  );
};

const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col min-h-screen w-full bg-white dark:bg-neutral-900 overflow-x-hidden lg:pl-[60px]">
      {children}
    </div>
  );
};
