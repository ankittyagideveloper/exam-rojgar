import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { courseMockData } from "./mockData";
import { useVideoProgress } from "../hooks/useVideoProgress";
import { Progress } from "@/components/ui/progress";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconPlayerPlay,
  IconArrowLeft,
  IconRefresh,
  IconLock,
} from "@tabler/icons-react";

function CoursePage() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [expandedSeasons, setExpandedSeasons] = useState({ "season-1": true });

  // Find course by slug
  const course = courseMockData.find((c) => c.slug === courseName);

  // Flatten all videos for progress tracking
  const allVideos = useMemo(() => {
    if (!course) return [];
    const videos = [];
    course.seasons?.forEach((season) => {
      season.videos.forEach((video) => {
        videos.push(video);
      });
    });
    return videos;
  }, [course]);

  // Get video progress stats
  const {
    progressStats,
    checkVideoCompleted,
    resetProgress,
    lastWatchedVideoId,
  } = useVideoProgress(course?.id, allVideos);

  // State for reset confirmation
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Handle reset progress
  const handleResetProgress = () => {
    if (showResetConfirm) {
      resetProgress();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => {
        setShowResetConfirm(false);
      }, 3000);
    }
  };

  // Handle 404
  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            Course Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The course you're looking for doesn't exist.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1272ba] px-6 py-3 text-white hover:bg-[#245d59] transition-colors shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Get first video for "Start Learning" button
  const firstVideo = course.seasons?.[0]?.videos?.[0];

  // Toggle season expansion
  const toggleSeason = (seasonId) => {
    setExpandedSeasons((prev) => ({
      ...prev,
      [seasonId]: !prev[seasonId],
    }));
  };

  // Handle Start Learning button click
  const handleStartLearning = () => {
    if (firstVideo) {
      navigate(`/learn/${course.slug}/${firstVideo.id}`);
    }
  };

  // Handle Continue Learning button click
  const handleContinueLearning = () => {
    if (lastWatchedVideoId) {
      navigate(`/learn/${course.slug}/${lastWatchedVideoId}`);
    }
  };

  const isPaid = user?.publicMetadata?.roles?.includes("premium");

  // Handle video card click — block non-premium users
  const handleVideoClick = (videoId, index) => {
    if (!isPaid && index > 0) {
      navigate("/target-series#program");
      return;
    }
    navigate(`/learn/${course.slug}/${videoId}`);
  };

  return (
    <>
      <Helmet>
        <title>{course.title} | Exam Rojgaar</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.thumbnail} />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
        {/* Course Header Section */}
        <div className="border-b border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
            {/* Progress Bar Section */}
            {progressStats.total > 0 && (
              <div className="mb-8 rounded-2xl border border-gray-200 dark:border-[#1272ba]/30 bg-gradient-to-r from-[#1272ba]/5 to-blue-50 dark:from-[#1272ba]/10 dark:to-gray-800 p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Your Progress
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#1272ba] dark:text-[#5aaef0]">
                      {progressStats.percentage}%
                    </span>
                    {progressStats.completed > 0 && (
                      <button
                        onClick={handleResetProgress}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          showResetConfirm
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                        title={
                          showResetConfirm
                            ? "Click again to confirm"
                            : "Reset progress"
                        }
                      >
                        <IconRefresh className="h-4 w-4" />
                        <span>
                          {showResetConfirm ? "Confirm Reset?" : "Reset"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                <Progress
                  value={progressStats.percentage}
                  className="h-3 bg-gray-200 dark:bg-gray-700"
                />
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-[#1272ba] dark:text-[#5aaef0]">
                    {progressStats.completed}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-50">{progressStats.total}</span>{" "}
                  videos completed
                </p>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
              {/* Left: Course Thumbnail with Start Learning button */}
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-md">
                  <img
                    src={course.thumbnail}
                    alt={course.thumbnailAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                {firstVideo && (
                  <div className="mt-4 space-y-3">
                    {lastWatchedVideoId ? (
                      <>
                        <button
                          onClick={handleContinueLearning}
                          className="w-full rounded-xl bg-[#1272ba] cursor-pointer px-6 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#1260ba] hover:shadow-xl"
                        >
                          Continue Learning
                        </button>
                        <button
                          onClick={handleStartLearning}
                          className="cursor-pointer w-full rounded-xl bg-white dark:bg-gray-800 border-2 border-[#1272ba] px-6 py-3 text-base font-semibold text-[#1272ba] dark:text-[#5aaef0] shadow-sm transition-all hover:bg-[#1272ba]/5 dark:hover:bg-[#1272ba]/10"
                        >
                          Start from Beginning
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleStartLearning}
                        className="w-full rounded-xl bg-[#1272ba] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#245d59] hover:shadow-xl"
                      >
                        Start Learning
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Course Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 dark:bg-[#1272ba]/15 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-[#5aaef0]">
                    {course.category}
                  </span>
                  {course.level && (
                    <span className="rounded-full bg-purple-50 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-semibold text-purple-700 dark:text-purple-300">
                      {course.level}
                    </span>
                  )}
                </div>

                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl lg:text-5xl">
                  {course.title}
                </h1>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/60 p-6 border border-gray-200 dark:border-gray-700/60">
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                    {course.fullDescription || course.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="mb-6 border-l-4 border-[#1272ba] pl-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 md:text-3xl">
              Course Content
            </h2>
          </div>

          {/* Seasons */}
          <div className="space-y-4 mb-15 md:mb-0">
            {(() => {
              let flatIndex = 0;
              return course.seasons?.map((season) => (
              <div
                key={season.id}
                className="mb-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200"
              >
                {/* Season Header */}
                <button
                  onClick={() => toggleSeason(season.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1272ba] text-white shrink-0">
                      <span className="text-lg font-bold">
                        {season.id.split("-")[1]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {season.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {season.videos.length} videos
                      </p>
                    </div>
                  </div>
                  {expandedSeasons[season.id] ? (
                    <IconChevronUp className="h-6 w-6 text-gray-600 dark:text-gray-400 shrink-0" />
                  ) : (
                    <IconChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Video Cards */}
                {expandedSeasons[season.id] && (
                  <div className="border-t border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/40">
                    {season.videos.map((video) => {
                      const isCompleted = checkVideoCompleted(video.id);
                      const currentIndex = flatIndex++;
                      const isLocked = !isPaid && currentIndex > 0;

                      return (
                        <button
                          key={video.id}
                          onClick={() => handleVideoClick(video.id, currentIndex)}
                          className={`group flex w-full items-start gap-4 border-b border-gray-200 dark:border-gray-700/40 p-5 text-left transition-colors last:border-b-0 ${
                            isLocked
                              ? "opacity-70 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/10"
                              : "hover:bg-white dark:hover:bg-gray-800/80"
                          }`}
                        >
                          {/* Video Icon */}
                          <div className="flex-shrink-0">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                                isLocked
                                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-[#1272ba] group-hover:text-white"
                              }`}
                            >
                              {isLocked ? (
                                <IconLock className="h-6 w-6" />
                              ) : (
                                <IconPlayerPlay className="h-6 w-6" />
                              )}
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="flex-1 min-w-0">
                            <div className="mb-2 flex items-start justify-between gap-3">
                              <h4
                                className={`text-base font-semibold transition-colors ${
                                  isLocked
                                    ? "text-gray-500 dark:text-gray-500 group-hover:text-amber-700 dark:group-hover:text-amber-400"
                                    : "text-gray-900 dark:text-gray-100 group-hover:text-[#1272ba] dark:group-hover:text-[#5aaef0]"
                                }`}
                              >
                                {video.episodeNumber} | {video.title}
                              </h4>
                              {isLocked ? (
                                <span className="flex-shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                                  Premium
                                </span>
                              ) : (
                                isCompleted && (
                                  <IconCircleCheck className="h-6 w-6 flex-shrink-0 text-[#1272ba] dark:text-[#5aaef0]" />
                                )
                              )}
                            </div>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                              {video.description}
                            </p>
                            {video.duration && (
                              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                Duration: {video.duration}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ));
            })()}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursePage;

// Made with Bob
