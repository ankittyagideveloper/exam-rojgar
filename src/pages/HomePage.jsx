import React from "react";
import { FileText, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Slider from "../component/Slider";
import FeaturesRibbon from "../component/features-ribbon";
import { useTranslation } from "react-i18next";
import VideoPlayer from "../component/VideoPlayer";
import MeetInstructor from "../component/MeetInstructor";
import { Helmet } from "react-helmet-async";
import { StickyBannerDemo } from "../component/sticky-banner/StickyBanner";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { testimonials } from "@/constants";


function HomePage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // const db = getFirestore(app);

  // async function getAllUsers(quizId) {
  //   const usersRef = collection(db, "leaderboards", quizId, "users");
  //   const snapshot = await getDocs(usersRef);

  //   const users = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   return users;
  // }

  return (
    <>
      <Helmet>
        <title>
          Exam Rojgaar – RRB NTPC, JE, ALP & Group D Mock Tests & PYQs
        </title>

        <meta
          name="description"
          content="Prepare for Railway exams with Exam Rojgaar. Practice RRB NTPC, JE, ALP & Group D mock tests, previous year questions, detailed analysis and smart preparation tools."
        />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Exam Rojgaar" />
        <meta
          property="og:title"
          content="Exam Rojgaar – Railway Exam Preparation Platform"
        />
        <meta
          property="og:description"
          content="Free Railway mock tests & PYQs for RRB NTPC, JE, ALP and Group D. Prepare smarter with Exam Rojgaar."
        />
        <meta
          property="og:image"
          content="https://examrojgaar.com/android-chrome-512x512.png"
        />
        <meta property="og:url" content="https://examrojgaar.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Exam Rojgaar – RRB NTPC, JE, ALP & Group D Preparation"
        />
        <meta
          name="twitter:description"
          content="Railway exam preparation made easy. Attempt RRB mock tests, PYQs and track your performance with Exam Rojgaar."
        />
        <meta
          name="twitter:image"
          content="https://examrojgaar.com/android-chrome-512x512.png"
        />
      </Helmet>

      <div
        className="min-h-screen bg-gray-100 pb-20"
        style={{
          backgroundImage: "url('/hero-background.svg')",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}
        {/* Main Content */}
        <StickyBannerDemo />
        <main className="px-0 py-0 md:px-4 md:py-6 ">
          <div className="lg:flex lg:items-center xl:flex-row justify-around gap-8">
            {/* Hero Section */}
            <div className="hidden lg:flex flex-col mb-8 max-w-sm  px-4">
              {currentLanguage === "en" ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    Crack your <span className="text-[#1272ba]">goal</span>
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    with <span className="text-[#1272ba]">Exam Rojgaar</span>
                    <br />Test Series
                  </h3>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    <span className="text-[#1272ba]">Exam Rojgaar</span>
                  </h2>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    टेस्ट सीरीज़ के साथ <br />
                    अपना <span className="text-[#1272ba]">लक्ष्य</span> हासिल करें
                  </h3>
                </>
              )}
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                {t("tagLine")}
              </p>
              <a
                href="/online-test-series"
                className="inline-flex items-center justify-center gap-2 bg-[#1272ba] hover:bg-[#1260ba] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 w-fit"
              >
                <Play className="w-4 h-4" />
                Start Test Series
              </a>
            </div>

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
          
          <VideoPlayer />

          <div className="px-4 md:px-10 text-xl md:text-4xl  text-black dark:text-white">
            See what our <br class="inline-block md:hidden"/>students tell
            about us 💕
          </div>
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />

          {/* <MeetInstructor /> */}
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
    </>
  );
}

export default HomePage;
