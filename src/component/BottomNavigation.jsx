import React from "react";
import { Home, FileText, HelpCircle, FileDown, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnectivityBanner } from "./connectivity-banner/connectivityBanner";

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();

  const navItems = [
    { id: "home", label: t("homeBtn"), icon: Home, path: "/home" },
    { id: "courses", label: "Courses", icon: BookOpen, path: "/learn" },
    {
      id: "test",
      label: t("testBtn"),
      icon: FileText,
      path: "/online-test-series",
    },
    {
      id: "quiz",
      label: t("quizBtn"),
      icon: HelpCircle,
      path: "/quiz-category",
    },
    { id: "pdfs", label: t(["pdfBtn"]), icon: FileDown, path: "/pdf-category" },
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
      <nav className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 dark:bg-[#121212]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link to={item.path} key={item.id}>
                <button
                  className={`cursor-pointer flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "text-[#2279be]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon
                    size={24}
                    color={isActive(item.path) ? "#2279be" : "#6a7282"}
                    className={`mb-1`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive(item.path) ? "text-[#2279be]" : "text-gray-500"
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
