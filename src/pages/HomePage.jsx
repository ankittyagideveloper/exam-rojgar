import React, { lazy, Suspense } from "react";
import { FileText, ChevronLeft, ChevronRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import Slider from "../component/Slider";
import FeaturesRibbon from "../component/features-ribbon";
import { useTranslation } from "react-i18next";
import VideoPlayer from "../component/VideoPlayer";
import MeetInstructor from "../component/MeetInstructor";
import { Helmet } from "react-helmet-async";
import { StickyBannerDemo } from "../component/sticky-banner/StickyBanner";
import { testimonials } from "@/constants";
import { Link } from "react-router";
import SpotlightPreview from "../components/ui/spotlight-demo";

const InfiniteMovingCards = lazy(() =>
  import("../components/ui/infinite-moving-cards").then((module) => ({
    default: module.InfiniteMovingCards,
  }))
);
const TelegramChatBot = lazy(() => import("../component/TelegramChatBot"));


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
        <meta
          name="keywords"
          content="rrb ntpc mock test, rrb ntpc test series 2025, railway mock test online, rrc group d test series, rrb ntpc free test, exam rojgaar, railway exam preparation, rrb ntpc practice test"
        />
        <link rel="canonical" href="https://examrojgaar.com/" />

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
        <meta property="og:url" content="https://examrojgaar.com/" />

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

      <SpotlightPreview>
      <div
        className="min-h-screen pb-20 lg:pb-0"
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
        {/* <StickyBannerDemo /> */}
        <main className="px-0 py-0 md:px-4 md:pt-6 md:pb-0">
          <div className="lg:flex lg:items-center xl:flex-row justify-between gap-6 xl:gap-10">
            {/* Hero Section */}
            <div className="hidden lg:flex flex-col mb-8 flex-1 min-w-0 max-w-2xl xl:max-w-3xl px-4">
              {/* Target Exam Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#1272ba] dark:text-blue-400 text-xs sm:text-sm font-semibold mb-4 w-fit shadow-xs whitespace-nowrap">
                <Sparkles className="w-4 h-4 text-[#FF7D07] shrink-0" />
                <span className="whitespace-nowrap">{currentLanguage === "en" ? "Target 2026: RRB NTPC & RRB JE Exam Prep" : "लक्ष्य 2026–27: RRB NTPC और RRB JE परीक्षा तैयारी"}</span>
              </div>

              {currentLanguage === "en" ? (
                <h1 className="text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
                  Ace <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1272ba] to-[#0ea5e9]">RRB NTPC &amp; JE</span> with India&apos;s #1 Test Series
                </h1>
              ) : (
                <h1 className="text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1272ba] to-[#0ea5e9]">RRB NTPC &amp; JE</span> में सफलता पाएं <span className="text-[#1272ba]">Exam Rojgaar</span> के साथ
                </h1>
              )}
              <p className="text-gray-600 dark:text-gray-300 md:text-base xl:text-lg 2xl:text-xl text-base leading-relaxed mb-6 font-normal">
                {t("tagLine")}
              </p>

              {/* CTAs */}
              <div className="flex flex-row items-center gap-3.5 mb-6 flex-nowrap">
                <Link
                  to="/online-test-series"
                  className="inline-flex items-center justify-center gap-2 bg-[#1272ba] hover:bg-[#0f5f9c] active:scale-[0.98] text-white font-semibold px-5 xl:px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-blue-500/20 whitespace-nowrap text-sm xl:text-base"
                >
                  <Play className="w-4 h-4 fill-white shrink-0" />
                  <span>Start Test Series</span>
                </Link>
                <Link
                  to="/free-tests"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 active:scale-[0.98] text-[#FF7D07] dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 font-semibold px-5 xl:px-6 py-3 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md whitespace-nowrap text-sm xl:text-base"
                >
                  <Sparkles className="w-4 h-4 text-[#FF7D07] shrink-0" />
                  <span>Try Free Test</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Latest Exam Pattern &amp; Detailed Solutions</span>
                </div>
              </div>
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
            See what our <br className="inline-block md:hidden" />students tell
            about us 💕
          </div>
          <Suspense fallback={<div className="h-40 w-full" />}>
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
              pauseOnHover={true}
              className="py-4"
            />
          </Suspense>

          {/* <MeetInstructor /> */}
        </main>

        {/* Telegram Chatbot floating widget */}
        <Suspense fallback={null}>
          <TelegramChatBot />
        </Suspense>
      </div>
      </SpotlightPreview>
    </>
  );
}

export default HomePage;
