import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { courseMockData } from "./mockData";
import CourseVideoPlayer from "../component/CourseVideoPlayer";
import { useVideoCompletion } from "../hooks/useVideoProgress";
import { setLastWatchedVideo } from "../utils/videoProgressStorage";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconCircle,
  IconLock,
} from "@tabler/icons-react";

// Static class strings so Tailwind's scanner detects every dark: variant
const SIDEBAR_ROW_ACTIVE =
  "bg-blue-50 dark:bg-blue-950 border border-[#1272ba] dark:border-[#1272ba]";
const SIDEBAR_ROW_LOCKED =
  "opacity-60 hover:bg-amber-50 dark:hover:bg-amber-950 cursor-pointer";
const SIDEBAR_ROW_DEFAULT =
  "hover:bg-gray-100 dark:hover:bg-gray-700";

const SIDEBAR_TITLE_ACTIVE  = "text-[#1272ba] dark:text-[#5aaef0]";
const SIDEBAR_TITLE_DEFAULT = "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white";
const SIDEBAR_TITLE_LOCKED  = "text-gray-500 dark:text-gray-500 group-hover:text-amber-700 dark:group-hover:text-amber-400";

function VideoPlayerPage() {
  const { courseName, videoId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [, setShowCompletionFeedback] = useState(false);

  const course = courseMockData.find((c) => c.slug === courseName);
  const { isCompleted, toggle } = useVideoCompletion(course?.id, videoId);

  useEffect(() => {
    if (course?.id && videoId) {
      setLastWatchedVideo(course.id, videoId);
    }
  }, [course?.id, videoId]);

  // ── 404: course not found ─────────────────────────────────────────
  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            Course Not Found
          </h1>
        </div>
      </div>
    );
  }

  // Flatten all videos for prev/next navigation
  let currentVideo = null;
  const allVideos = [];
  course.seasons?.forEach((season) => {
    season.videos.forEach((video) => {
      allVideos.push(video);
      if (video.id === videoId) currentVideo = video;
    });
  });

  // ── 404: video not found ──────────────────────────────────────────
  if (!currentVideo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            Video Not Found
          </h1>
          <Link
            to={`/learn/${courseName}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1272ba] px-6 py-3 text-white hover:bg-[#245d59] transition-colors shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = user?.publicMetadata?.roles?.includes("premium");
  const currentFlatIndex = allVideos.findIndex((v) => v.id === videoId);
  const previousVideo = currentFlatIndex > 0 ? allVideos[currentFlatIndex - 1] : null;
  const nextVideo = currentFlatIndex < allVideos.length - 1 ? allVideos[currentFlatIndex + 1] : null;

  // ── Paywall ───────────────────────────────────────────────────────
  if (!isPaid && currentFlatIndex > 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-center max-w-md px-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
            <IconLock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Premium Content
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            This video is available for premium members only. Upgrade to unlock
            all lessons in this course.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/target-series#program"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1272ba] px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#245d59]"
            >
              Upgrade to Premium
            </Link>
            <Link
              to={`/learn/${courseName}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (previousVideo) navigate(`/learn/${courseName}/${previousVideo.id}`);
  };

  const handleNext = () => {
    if (nextVideo) {
      if (!isPaid && currentFlatIndex + 1 > 0) {
        navigate("/target-series#program");
        return;
      }
      navigate(`/learn/${courseName}/${nextVideo.id}`);
    }
  };

  const handleToggleComplete = () => {
    toggle();
    setShowCompletionFeedback(true);
    setTimeout(() => setShowCompletionFeedback(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>
          {currentVideo.title} - {course.title} | Exam Rojgaar
        </title>
        <meta name="description" content={currentVideo.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">

        {/* ── Video Player Section ──────────────────────────────────── */}
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

            {/* ── Left: Player + meta ──────────────────────────────── */}
            <div className="flex flex-col">
              <CourseVideoPlayer
                youtubeId={currentVideo.youtubeId}
                title={currentVideo.title}
              />

              {/* Video Meta + Controls */}
              <div className="bg-white dark:bg-gray-900 md:rounded-2xl border-b border-gray-200 dark:border-gray-700 md:border md:mt-4 px-4 py-5 md:px-6 transition-colors duration-200">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1272ba] dark:text-[#5aaef0] mb-1">
                      {currentVideo.episodeNumber}
                    </p>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50 md:text-xl leading-snug">
                      {currentVideo.title}
                    </h1>
                    {currentVideo.description && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {currentVideo.description}
                      </p>
                    )}
                  </div>

                  {/* Mark complete button */}
                  <button
                    onClick={handleToggleComplete}
                    className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isCompleted
                        ? "bg-[#1272ba] text-white hover:bg-[#1260ba]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {isCompleted ? (
                      <IconCircleCheck className="h-5 w-5" />
                    ) : (
                      <IconCircle className="h-5 w-5" />
                    )}
                    <span className="hidden sm:inline">
                      {isCompleted ? "Completed" : "Mark Complete"}
                    </span>
                  </button>
                </div>

                {/* Prev / Next navigation */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handlePrevious}
                    disabled={!previousVideo}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 enabled:cursor-pointer"
                  >
                    <IconChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {currentFlatIndex + 1} / {allVideos.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={!nextVideo}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#1272ba] text-white hover:bg-[#1260ba] enabled:cursor-pointer"
                  >
                    <span>Next</span>
                    <IconChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right: Course Content Sidebar ────────────────────── */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <div className="md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm mb-8 transition-colors duration-200">
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
                    Course Content
                  </h3>
                  <Link
                    to={`/learn/${courseName}`}
                    className="flex items-center gap-1 text-xs font-medium text-[#1272ba] dark:text-[#5aaef0] hover:underline"
                  >
                    <IconArrowLeft className="h-3.5 w-3.5" />
                    Overview
                  </Link>
                </div>

                {/* Video list */}
                <div className="space-y-0 max-h-[600px] overflow-y-auto">
                  {(() => {
                    let sidebarIndex = 0;
                    return course.seasons?.map((season) => (
                      <div key={season.id} className="mb-1">
                        {/* Season label */}
                        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                          {season.title}
                        </div>

                        {season.videos.map((video) => {
                          const videoIndex = sidebarIndex++;
                          const isVideoLocked = !isPaid && videoIndex > 0;

                          const VideoItem = ({ video, isVideoLocked }) => {
                            const { isCompleted: videoCompleted, toggle: toggleVideo } =
                              useVideoCompletion(course.id, video.id);

                            const handleToggleCompletion = (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleVideo();
                            };

                            const isActive = video.id === videoId;

                            return (
                              <div
                                className={`group flex items-start gap-3 px-4 py-3 transition-colors ${
                                  isActive
                                    ? SIDEBAR_ROW_ACTIVE
                                    : isVideoLocked
                                    ? SIDEBAR_ROW_LOCKED
                                    : SIDEBAR_ROW_DEFAULT
                                }`}
                              >
                                {/* Lock / complete toggle */}
                                {isVideoLocked ? (
                                  <div className="flex-shrink-0 pt-0.5">
                                    <IconLock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                  </div>
                                ) : (
                                  <button
                                    onClick={handleToggleCompletion}
                                    className="flex-shrink-0 pt-0.5 hover:scale-110 transition-transform"
                                    title={videoCompleted ? "Mark as incomplete" : "Mark as complete"}
                                  >
                                    {videoCompleted ? (
                                      <IconCircleCheck className="h-4 w-4 text-[#1272ba] dark:text-[#5aaef0]" />
                                    ) : (
                                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                    )}
                                  </button>
                                )}

                                {/* Title */}
                                {isVideoLocked ? (
                                  <Link to="/target-series#program" className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium leading-snug ${SIDEBAR_TITLE_LOCKED}`}>
                                      {video.episodeNumber} | {video.title}
                                    </p>
                                    {video.duration && (
                                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                                        {video.duration}
                                      </p>
                                    )}
                                    <span className="mt-1 inline-block rounded-full bg-amber-100 dark:bg-amber-900 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                      Premium
                                    </span>
                                  </Link>
                                ) : (
                                  <Link
                                    to={`/learn/${courseName}/${video.id}`}
                                    className="flex-1 min-w-0"
                                  >
                                    <p className={`text-sm font-medium leading-snug ${isActive ? SIDEBAR_TITLE_ACTIVE : SIDEBAR_TITLE_DEFAULT}`}>
                                      {video.episodeNumber} | {video.title}
                                    </p>
                                    {video.duration && (
                                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
                                        {video.duration}
                                      </p>
                                    )}
                                  </Link>
                                )}
                              </div>
                            );
                          };

                          return (
                            <VideoItem
                              key={video.id}
                              video={video}
                              isVideoLocked={isVideoLocked}
                            />
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlayerPage;

// Made with Bob
