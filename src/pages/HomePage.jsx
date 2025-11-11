import React from "react";
import { FileText, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Slider from "../component/Slider";
import FeaturesRibbon from "../component/features-ribbon";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className="min-h-screen bg-gray-100 pb-20 dark:bg-[#121212]">
      {/* <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}
      {/* Main Content */}
      <main className="px-0 py-0 md:px-4 md:py-6 dark:bg-[#121212]">
        <div className="lg:flex lg:items-center xl:flex-row justify-around">
          {/* Hero Section */}
          {/* {currentLanguage === "en" ? (
            <div className="hidden md:block mb-8 ">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Crack your <span className="text-teal-600">goal</span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                with <span className="text-teal-600">ExamRojgar</span> Test
                Series
              </h3>
              <p className="text-gray-600 md:text-2xl text-base leading-relaxed">
                {t("tagLine")}
              </p>
            </div>
          ) : (
            <div className="hidden md:block mb-8 md:text-4xl ">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                <span className="md:text-4xl text-teal-600 ">ExamRojgar</span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                टेस्ट सीरीज़ के साथ <br />
                अपना
                <span className="md:text-4xl text-teal-600"> लक्ष्य</span> हासिल
                करें
              </h3>
              <p className="md:text-2xl text-gray-600 text-base leading-relaxed">
                {t("tagLine")}
              </p>
            </div>
          )} */}

          {/* App Preview Card */}
          <Slider />
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "Mock Tests",
              subtitle: "Practice with real exam patterns",
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Study Material",
              subtitle: "Comprehensive notes & PDFs",
              color: "bg-green-50 text-green-600",
            },
            {
              title: "Live Classes",
              subtitle: "Expert guidance sessions",
              color: "bg-purple-50 text-purple-600",
            },
            {
              title: "Performance",
              subtitle: "Track your progress",
              color: "bg-orange-50 text-orange-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-3`}
              >
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">{feature.subtitle}</p>
            </div>
          ))}
        </div> */}

        <FeaturesRibbon />

        {/* Quick Actions */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-[#121212]">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3 dark:bg-[#121212]">
            {[
              {
                title: "Start Free Test",
                subtitle: "Begin your preparation journey",
                color: "bg-teal-600",
              },
              {
                title: "Download App",
                subtitle: "Get the mobile experience",
                color: "bg-blue-600",
              },
              {
                title: "View Results",
                subtitle: "Check your latest scores",
                color: "bg-purple-600",
              },
            ].map((action, index) => (
              <button
                key={index}
                className={`w-full ${action.color} text-white rounded-xl p-4 text-left hover:opacity-90 transition-opacity`}
              >
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-90">{action.subtitle}</div>
              </button>
            ))}
          </div>
        </div> */}
      </main>

      {/* Bottom Navigation */}
      {/* <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
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
            );
          })}
        </div>
      </nav> */}
    </div>
  );
}

export default HomePage;
