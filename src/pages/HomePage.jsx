import React, { useState } from "react";
import {
  Home,
  FileText,
  HelpCircle,
  FileDown,
  ShoppingBag,
  Menu,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Appendix 2A",
      subtitle: "Click here",
      color: "from-teal-600 to-teal-700",
    },
    {
      title: "Railway Exams",
      subtitle: "Start Practice",
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "SSC Preparation",
      subtitle: "Begin Test",
      color: "from-purple-600 to-purple-700",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Crack your <span className="text-teal-600">goal</span>
          </h2>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            with <span className="text-teal-600">SNW</span> Test Series
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            SNW Test Series one of the best online test platform in India for
            railway, ssc departmental exams.
          </p>
        </div>

        {/* App Preview Card */}
        <div className="relative mb-8">
          <div
            className={`bg-gradient-to-br ${slides[currentSlide].color} rounded-3xl p-6 text-white relative overflow-hidden`}
          >
            {/* Google Play Badge */}
            <div className="flex items-center gap-2 mb-6">
              <Play className="w-6 h-6 text-white" />
              <div className="bg-white text-gray-800 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-red-600">
                  SNW Test Series
                </span>
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full ml-auto">
                <span className="text-sm">Bilingual</span>
                <div className="text-xs">(Hindi+English)</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center py-8">
              <div className="bg-white text-gray-800 rounded-full px-8 py-4 mb-6 inline-block">
                <h4 className="text-2xl font-bold text-red-600">
                  {slides[currentSlide].title}
                </h4>
              </div>
              <div className="bg-white text-gray-800 rounded-full px-8 py-3 inline-block">
                <span className="text-xl font-bold text-teal-700">
                  {slides[currentSlide].subtitle}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
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
              <h4 className="font-semibold text-gray-800 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">{feature.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
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
        </div>
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
