/**
 * Video Progress Storage Utility
 * Manages video completion state and last watched video in localStorage for multiple playlists/courses
 */

const STORAGE_KEY = "examrojgaar_video_progress";
const LAST_WATCHED_KEY = "examrojgaar_last_watched";

/**
 * Get all video progress data from localStorage
 * @returns {Object} Progress data structure: { "course-id": { "video-id": boolean } }
 */
export const getAllProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading video progress from localStorage:", error);
    return {};
  }
};

/**
 * Get progress data for a specific course
 * @param {string} courseId - The course identifier
 * @returns {Object} Video completion data for the course: { "video-id": boolean }
 */
export const getCourseProgress = (courseId) => {
  const allProgress = getAllProgress();
  return allProgress[courseId] || {};
};

/**
 * Check if a specific video is completed
 * @param {string} courseId - The course identifier
 * @param {string} videoId - The video identifier
 * @returns {boolean} True if video is marked as completed
 */
export const isVideoCompleted = (courseId, videoId) => {
  const courseProgress = getCourseProgress(courseId);
  return courseProgress[videoId] === true;
};

/**
 * Mark a video as completed or not completed
 * @param {string} courseId - The course identifier
 * @param {string} videoId - The video identifier
 * @param {boolean} completed - Completion status
 */
export const setVideoCompleted = (courseId, videoId, completed) => {
  try {
    const allProgress = getAllProgress();

    // Initialize course progress if it doesn't exist
    if (!allProgress[courseId]) {
      allProgress[courseId] = {};
    }

    // Set video completion status
    allProgress[courseId][videoId] = completed;

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));

    // Dispatch custom event for real-time updates across components
    window.dispatchEvent(
      new CustomEvent("videoProgressUpdated", {
        detail: { courseId, videoId, completed },
      }),
    );
  } catch (error) {
    console.error("Error saving video progress to localStorage:", error);
  }
};

/**
 * Toggle video completion status
 * @param {string} courseId - The course identifier
 * @param {string} videoId - The video identifier
 * @returns {boolean} New completion status
 */
export const toggleVideoCompleted = (courseId, videoId) => {
  const currentStatus = isVideoCompleted(courseId, videoId);
  const newStatus = !currentStatus;
  setVideoCompleted(courseId, videoId, newStatus);
  return newStatus;
};

/**
 * Calculate course progress statistics
 * @param {string} courseId - The course identifier
 * @param {Array} allVideos - Array of all video objects in the course
 * @returns {Object} Progress statistics: { completed, total, percentage }
 */
export const getCourseProgressStats = (courseId, allVideos) => {
  const courseProgress = getCourseProgress(courseId);
  const total = allVideos.length;
  const completed = allVideos.filter(
    (video) => courseProgress[video.id] === true,
  ).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    completed,
    total,
    percentage,
  };
};

/**
 * Reset all progress for a specific course
 * @param {string} courseId - The course identifier
 */
export const resetCourseProgress = (courseId) => {
  try {
    const allProgress = getAllProgress();
    delete allProgress[courseId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("videoProgressUpdated", {
        detail: { courseId, reset: true },
      }),
    );
  } catch (error) {
    console.error("Error resetting course progress:", error);
  }
};

/**
 * Get all last watched video data from localStorage
 * @returns {Object} Last watched data structure: { "course-id": "video-id" }
 */
export const getAllLastWatched = () => {
  try {
    const data = localStorage.getItem(LAST_WATCHED_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading last watched data from localStorage:", error);
    return {};
  }
};

/**
 * Get last watched video for a specific course
 * @param {string} courseId - The course identifier
 * @returns {string|null} Video ID of last watched video, or null if none
 */
export const getLastWatchedVideo = (courseId) => {
  const allLastWatched = getAllLastWatched();
  return allLastWatched[courseId] || null;
};

/**
 * Set last watched video for a course
 * @param {string} courseId - The course identifier
 * @param {string} videoId - The video identifier
 */
export const setLastWatchedVideo = (courseId, videoId) => {
  try {
    const allLastWatched = getAllLastWatched();
    allLastWatched[courseId] = videoId;
    localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(allLastWatched));

    // Dispatch custom event for real-time updates
    window.dispatchEvent(
      new CustomEvent("lastWatchedUpdated", {
        detail: { courseId, videoId },
      }),
    );
  } catch (error) {
    console.error("Error saving last watched video to localStorage:", error);
  }
};

/**
 * Clear last watched video for a specific course
 * @param {string} courseId - The course identifier
 */
export const clearLastWatchedVideo = (courseId) => {
  try {
    const allLastWatched = getAllLastWatched();
    delete allLastWatched[courseId];
    localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(allLastWatched));

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("lastWatchedUpdated", {
        detail: { courseId, cleared: true },
      }),
    );
  } catch (error) {
    console.error("Error clearing last watched video:", error);
  }
};

/**
 * Clear all video progress data
 */
export const clearAllProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent("videoProgressUpdated", {
        detail: { clearAll: true },
      }),
    );
  } catch (error) {
    console.error("Error clearing all progress:", error);
  }
};

// Made with Bob
