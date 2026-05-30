import { useState, useEffect, useCallback } from "react";
import {
  getCourseProgress,
  isVideoCompleted,
  setVideoCompleted,
  toggleVideoCompleted,
  getCourseProgressStats,
  resetCourseProgress,
  getLastWatchedVideo,
  setLastWatchedVideo,
} from "../utils/videoProgressStorage";

/**
 * Custom hook for managing video completion progress
 * @param {string} courseId - The course identifier
 * @param {Array} allVideos - Array of all video objects in the course (optional)
 * @returns {Object} Progress state and methods
 */
export const useVideoProgress = (courseId, allVideos = []) => {
  const [courseProgress, setCourseProgress] = useState({});
  const [progressStats, setProgressStats] = useState({
    completed: 0,
    total: 0,
    percentage: 0,
  });
  const [lastWatchedVideoId, setLastWatchedVideoId] = useState(null);

  // Load initial progress data
  const loadProgress = useCallback(() => {
    if (!courseId) return;

    const progress = getCourseProgress(courseId);
    setCourseProgress(progress);

    if (allVideos.length > 0) {
      const stats = getCourseProgressStats(courseId, allVideos);
      setProgressStats(stats);
    }

    // Load last watched video
    const lastWatched = getLastWatchedVideo(courseId);
    setLastWatchedVideoId(lastWatched);
  }, [courseId, allVideos]);

  // Load progress on mount and when dependencies change
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Listen for progress updates from other components
  useEffect(() => {
    const handleProgressUpdate = (event) => {
      const { courseId: updatedCourseId, reset, clearAll } = event.detail;

      // Reload if this course was updated or if all progress was cleared
      if (clearAll || reset || updatedCourseId === courseId) {
        loadProgress();
      }
    };

    const handleLastWatchedUpdate = (event) => {
      const { courseId: updatedCourseId } = event.detail;
      if (updatedCourseId === courseId) {
        const lastWatched = getLastWatchedVideo(courseId);
        setLastWatchedVideoId(lastWatched);
      }
    };

    window.addEventListener("videoProgressUpdated", handleProgressUpdate);
    window.addEventListener("lastWatchedUpdated", handleLastWatchedUpdate);

    return () => {
      window.removeEventListener("videoProgressUpdated", handleProgressUpdate);
      window.removeEventListener("lastWatchedUpdated", handleLastWatchedUpdate);
    };
  }, [courseId, loadProgress]);

  /**
   * Check if a video is completed
   * @param {string} videoId - The video identifier
   * @returns {boolean}
   */
  const checkVideoCompleted = useCallback(
    (videoId) => {
      return isVideoCompleted(courseId, videoId);
    },
    [courseId],
  );

  /**
   * Mark a video as completed or not completed
   * @param {string} videoId - The video identifier
   * @param {boolean} completed - Completion status
   */
  const markVideoCompleted = useCallback(
    (videoId, completed) => {
      setVideoCompleted(courseId, videoId, completed);
    },
    [courseId],
  );

  /**
   * Toggle video completion status
   * @param {string} videoId - The video identifier
   * @returns {boolean} New completion status
   */
  const toggleVideo = useCallback(
    (videoId) => {
      return toggleVideoCompleted(courseId, videoId);
    },
    [courseId],
  );

  /**
   * Reset all progress for the current course
   */
  const resetProgress = useCallback(() => {
    resetCourseProgress(courseId);
  }, [courseId]);

  /**
   * Get completion status for multiple videos
   * @param {Array} videoIds - Array of video identifiers
   * @returns {Object} Map of videoId to completion status
   */
  const getMultipleVideoStatus = useCallback(
    (videoIds) => {
      const status = {};
      videoIds.forEach((videoId) => {
        status[videoId] = isVideoCompleted(courseId, videoId);
      });
      return status;
    },
    [courseId],
  );

  /**
   * Update last watched video
   * @param {string} videoId - The video identifier
   */
  const updateLastWatched = useCallback(
    (videoId) => {
      setLastWatchedVideo(courseId, videoId);
    },
    [courseId],
  );

  return {
    // State
    courseProgress,
    progressStats,
    lastWatchedVideoId,

    // Methods
    checkVideoCompleted,
    markVideoCompleted,
    toggleVideo,
    resetProgress,
    getMultipleVideoStatus,
    loadProgress,
    updateLastWatched,
  };
};

/**
 * Simplified hook for single video completion tracking
 * @param {string} courseId - The course identifier
 * @param {string} videoId - The video identifier
 * @returns {Object} Video completion state and toggle method
 */
export const useVideoCompletion = (courseId, videoId) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Load initial state
  useEffect(() => {
    if (courseId && videoId) {
      setIsCompleted(isVideoCompleted(courseId, videoId));
    }
  }, [courseId, videoId]);

  // Listen for updates
  useEffect(() => {
    const handleProgressUpdate = (event) => {
      const { courseId: updatedCourseId, videoId: updatedVideoId } =
        event.detail;

      if (updatedCourseId === courseId && updatedVideoId === videoId) {
        setIsCompleted(isVideoCompleted(courseId, videoId));
      }
    };

    window.addEventListener("videoProgressUpdated", handleProgressUpdate);

    return () => {
      window.removeEventListener("videoProgressUpdated", handleProgressUpdate);
    };
  }, [courseId, videoId]);

  /**
   * Toggle completion status
   */
  const toggle = useCallback(() => {
    const newStatus = toggleVideoCompleted(courseId, videoId);
    setIsCompleted(newStatus);
    return newStatus;
  }, [courseId, videoId]);

  return {
    isCompleted,
    toggle,
  };
};

// Made with Bob
