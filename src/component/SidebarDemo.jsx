import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import {
  IconArrowLeft,
  IconFileTypePdf,
  IconProgressHelp,
  IconClipboard,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "./utils/utils";
import { Link } from "react-router-dom";
import { SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react";

export default function SidebarDemo({ children }) {
  const links = [
    {
      label: "Tests",
      href: "/test-category",
      icon: (
        <IconClipboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Quiz",
      href: "quiz-category",
      icon: (
        <IconProgressHelp className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Pdf",
      href: "pdf-category",
      icon: (
        <IconFileTypePdf className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <SignOutButton>
          <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        </SignOutButton>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-col lg:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div div className="rounded-full  h-8 w-8">
        <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        ExamRojgar1
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link to="/" className="rounded-full  h-8 w-8">
      <img src="/examrojgar-logo-s.png" alt="examrojgar-logo-s" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-1 overflow-scroll overflow-x-hidden bg-white">
      <div className="flex min-h-screen w-full flex-1 flex-col  border border-neutral-200 bg-white   dark:border-neutral-700 dark:bg-neutral-900">
        {/* <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array-demo-1" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={"second-array-demo-1" + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div> */}
        {children}
      </div>
    </div>
  );
};
