import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { courseMockData } from "./mockData";
import CourseVideoPlayer from "../component/CourseVideoPlayer";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
} from "@tabler/icons-react";

function VideoPlayerPage() {
  const { courseName, videoId } = useParams();
  const navigate = useNavigate();

  // Find course by slug
  const course = courseMockData.find((c) => c.slug === courseName);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Course Not Found
          </h1>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2C7873] px-6 py-3 text-white hover:bg-[#245d59] transition-colors shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
            Back to Courses
          </Link>
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
            className="inline-flex items-center gap-2 rounded-lg bg-[#2C7873] px-6 py-3 text-white hover:bg-[#245d59] transition-colors shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Find current video in flattened array
  const currentFlatIndex = allVideos.findIndex((v) => v.id === videoId);
  const previousVideo =
    currentFlatIndex > 0 ? allVideos[currentFlatIndex - 1] : null;
  const nextVideo =
    currentFlatIndex < allVideos.length - 1
      ? allVideos[currentFlatIndex + 1]
      : null;

  const handlePrevious = () => {
    if (previousVideo) {
      navigate(`/learn/${courseName}/${previousVideo.id}`);
    }
  };

  const handleNext = () => {
    if (nextVideo) {
      navigate(`/learn/${courseName}/${nextVideo.id}`);
    }
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
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                to={`/learn/${courseName}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C7873] transition-colors"
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
        </div>

        {/* Video Player Section */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            {/* Main Content */}
            <div>
              {/* Video Player */}
              <CourseVideoPlayer
                youtubeId={currentVideo.youtubeId}
                title={currentVideo.title}
              />

              {/* Video Info */}
              <div className="mt-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {currentVideo.episodeNumber} | {currentVideo.title}
                    </h1>
                    {currentVideo.duration && (
                      <p className="mt-2 text-sm text-gray-600">
                        Duration: {currentVideo.duration}
                      </p>
                    )}
                  </div>
                  {currentVideo.completed && (
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 border border-green-200">
                      <IconCircleCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Completed
                      </span>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">
                    About this video
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700">
                    {currentVideo.description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={!previousVideo}
                    className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${
                      previousVideo
                        ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <IconChevronLeft className="h-5 w-5" />
                    <span>Previous Video</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!nextVideo}
                    className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${
                      nextVideo
                        ? "bg-[#2C7873] text-white hover:bg-[#245d59] shadow-sm"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Next Video</span>
                    <IconChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Course Content */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Course Content
                </h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {course.seasons?.map((season) => (
                    <div key={season.id}>
                      <div className="mb-2 text-sm font-semibold text-gray-600">
                        {season.title}
                      </div>
                      {season.videos.map((video) => (
                        <Link
                          key={video.id}
                          to={`/learn/${courseName}/${video.id}`}
                          className={`group mb-2 flex items-start gap-3 rounded-lg p-3 transition-colors ${
                            video.id === videoId
                              ? "bg-[#2C7873]/10 border border-[#2C7873]/30"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex-shrink-0 pt-1">
                            {video.completed ? (
                              <IconCircleCheck className="h-5 w-5 text-green-600" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium ${
                                video.id === videoId
                                  ? "text-[#2C7873]"
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
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
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
