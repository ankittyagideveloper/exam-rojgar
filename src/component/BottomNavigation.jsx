import React, { useState } from "react";
import {
  Home,
  FileText,
  HelpCircle,
  FileDown,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  console.log(location);
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "test", label: "Test", icon: FileText, path: "/test-category" },
    { id: "quiz", label: "Quiz", icon: HelpCircle, path: "/quiz-category" },
    { id: "pdfs", label: "PDF's", icon: FileDown, path: "/pdf-category" },
    // {
    //   id: "purchase",
    //   label: "My Purchase",
    //   icon: ShoppingBag,
    //   path: "/user-my-purchase",
    // },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link to={item.path}>
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`cursor-pointer flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-1 ${
                    isActive ? "text-teal-600" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-teal-600" : "text-gray-500"
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
  );
};

export default BottomNavigation;
