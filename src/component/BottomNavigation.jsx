import React from "react";
import { Home, FileText, HelpCircle, FileDown, BookOpen, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnectivityBanner } from "./connectivity-banner/connectivityBanner";

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();

  const navItems = [
    { id: "home", label: t("homeBtn"), icon: Home, path: "/home" },
    {
      id: "test",
      label: t("testBtn"),
      icon: FileText,
      path: "/online-test-series",
    },
    { id: "mentor", label: t("mentorBtn"), icon: Target, path: "/target-series", isfeatured: true },
    { id: "courses", label: t("coursesBtn"), icon: BookOpen, path: "/learn" },

    {
      id: "quiz",
      label: t("quizBtn"),
      icon: HelpCircle,
      path: "/quiz-category",
    },
    // { id: "pdfs", label: t(["pdfBtn"]), icon: FileDown, path: "/pdf-category" },

    // {
    //   id: "purchase",
    //   label: "My Purchase",
    //   icon: ShoppingBag,
    //   path: "/user-my-purchase",
    // },
  ];

  const isActive = (currMenu) => {
    return path === currMenu || path.startsWith(currMenu);
  };
  return (
    <>
      <nav className="block lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-1 dark:bg-[#121212] dark:border-gray-800">
        <div className="flex justify-around items-end max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.isfeatured) {
              return (
                <Link to={item.path} key={item.id} className="flex flex-col items-center -mt-4">
                  <div
                    className={`flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all
                      ${active
                        ? "bg-[#2279be] text-white"
                        : "bg-gradient-to-br from-[#2279be] to-[#1a5fa0] text-white"
                      }`}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <span
                    className={`text-[10px] xs:text-xs font-semibold mt-1 ${active ? "text-[#2279be]" : "text-[#1a5fa0]"
                      } dark:text-blue-400`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link to={item.path} key={item.id}>
                <button
                  className={`cursor-pointer flex flex-col items-center py-2 px-2 xs:px-3 rounded-lg transition-colors ${active
                      ? "text-[#2279be]"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                >
                  <Icon
                    size={22}
                    color={active ? "#2279be" : "#6a7282"}
                    className="mb-1"
                  />
                  <span
                    className={`text-[10px] xs:text-xs font-medium leading-tight ${active ? "text-[#2279be]" : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {item.label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
      <ConnectivityBanner />
    </>
  );
};

export default BottomNavigation;
