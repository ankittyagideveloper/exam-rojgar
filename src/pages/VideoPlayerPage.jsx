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

function VideoPlayerPage() {
  const { courseName, videoId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCompletionFeedback, setShowCompletionFeedback] = useState(false);

  // Find course by slug
  const course = courseMockData.find((c) => c.slug === courseName);

  // Get video completion state and toggle function
  const { isCompleted, toggle } = useVideoCompletion(course?.id, videoId);

  // Track last watched video when component mounts or videoId changes
  useEffect(() => {
    if (course?.id && videoId) {
      setLastWatchedVideo(course.id, videoId);
    }
  }, [course?.id, videoId]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Course Not Found
          </h1>
          {/* <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1272ba] px-6 py-3 text-white hover:bg-[#245d59] transition-colors shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
            Back to Courses
          </Link> */}
        </div>
      </div>
    );
  }

  // Find current video and its position
  let currentVideo = null;
  let allVideos = [];

  // Flatten all videos for navigation
  course.seasons?.forEach((season) => {
    season.videos.forEach((video) => {
      allVideos.push(video);
      if (video.id === videoId) {
        currentVideo = video;
      }
    });
  });

  if (!currentVideo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
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

  // Find current video in flattened array
  const currentFlatIndex = allVideos.findIndex((v) => v.id === videoId);
  const previousVideo =
    currentFlatIndex > 0 ? allVideos[currentFlatIndex - 1] : null;
  const nextVideo =
    currentFlatIndex < allVideos.length - 1
      ? allVideos[currentFlatIndex + 1]
      : null;

  // For non-premium users, redirect to /purchase if this isn't the first video
  if (!isPaid && currentFlatIndex > 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
            <IconLock className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Premium Content
          </h1>
          <p className="mb-6 text-gray-600">
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (previousVideo) {
      navigate(`/learn/${courseName}/${previousVideo.id}`);
    }
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

  // Handle mark as complete toggle
  const handleToggleComplete = () => {
    toggle();

    // Show feedback animation
    setShowCompletionFeedback(true);
    setTimeout(() => {
      setShowCompletionFeedback(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>
          {currentVideo.title} - {course.title} | Exam Rojgaar
        </title>
        <meta name="description" content={currentVideo.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        {/* <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                to={`/learn/${courseName}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1272ba] transition-colors"
              >
                <IconArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="text-sm text-gray-600">
                {currentFlatIndex + 1} / {allVideos.length}
              </div>
            </div>
          </div>
        </div> */}

        {/* Video Player Section */}
        <div className="mx-auto max-w-7xl  md:px-6 lg:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            {/* Main Content */}
            <CourseVideoPlayer
              youtubeId={currentVideo.youtubeId}
              title={currentVideo.title}
            />

            {/* Sidebar - Course Content */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <div className="md:rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Course Content
                </h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {(() => {
                    let sidebarIndex = 0;
                    return course.seasons?.map((season) => (
                    <div key={season.id}>
                      <div className="mb-2 text-sm font-semibold text-gray-600">
                        {season.title}
                      </div>
                      {season.videos.map((video) => {
                        const videoIndex = sidebarIndex++;
                        const isVideoLocked = !isPaid && videoIndex > 0;

                        // Use the hook to get real-time completion status
                        const VideoItem = ({ video, isVideoLocked, videoIndex }) => {
                          const { isCompleted: videoCompleted, toggle } =
                            useVideoCompletion(course.id, video.id);

                          const handleToggleCompletion = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle();
                          };

                          return (
                            <div
                              className={`group mb-2 flex items-start gap-3 rounded-lg p-3 transition-colors ${
                                video.id === videoId
                                  ? "bg-[#]/10 border border-[#1272ba]/30"
                                  : isVideoLocked
                                  ? "opacity-60 hover:bg-amber-50 cursor-pointer"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              {/* Lock / complete toggle */}
                              {isVideoLocked ? (
                                <div className="flex-shrink-0 pt-1">
                                  <IconLock className="h-5 w-5 text-amber-500" />
                                </div>
                              ) : (
                                <button
                                  onClick={handleToggleCompletion}
                                  className="flex-shrink-0 pt-1 hover:scale-110 transition-transform"
                                  title={
                                    videoCompleted
                                      ? "Mark as incomplete"
                                      : "Mark as complete"
                                  }
                                >
                                  {videoCompleted ? (
                                    <IconCircleCheck className="h-5 w-5 text-[#1272ba]" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                  )}
                                </button>
                              )}

                              {/* Title — Link for free, upgrade redirect for locked */}
                              {isVideoLocked ? (
                                <Link
                                  to="/target-series#program"
                                  className="flex-1 min-w-0"
                                >
                                  <p className="text-sm font-medium text-gray-500 group-hover:text-amber-700">
                                    {video.episodeNumber} | {video.title}
                                  </p>
                                  {video.duration && (
                                    <p className="mt-1 text-xs text-gray-400">
                                      {video.duration}
                                    </p>
                                  )}
                                  <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                    Premium
                                  </span>
                                </Link>
                              ) : (
                                <Link
                                  to={`/learn/${courseName}/${video.id}`}
                                  className="flex-1 min-w-0"
                                >
                                  <p
                                    className={`text-sm font-medium ${
                                      video.id === videoId
                                        ? "text-[#1272ba]"
                                        : "text-gray-700 group-hover:text-gray-900"
                                    }`}
                                  >
                                    {video.episodeNumber} | {video.title}
                                  </p>
                                  {video.duration && (
                                    <p className="mt-1 text-xs text-gray-500">
                                      {video.duration}
                                    </p>
                                  )}
                                </Link>
                              )}
                            </div>
                          );
                        };

                        return <VideoItem key={video.id} video={video} isVideoLocked={isVideoLocked} videoIndex={videoIndex} />;
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
