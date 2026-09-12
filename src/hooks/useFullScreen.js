import { useCallback, useEffect, useState } from "react";

export const useFullscreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    () => typeof document !== "undefined" && Boolean(document.fullscreenElement),
  );

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === "undefined") return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error(`Error attempting to toggle fullscreen: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return { isFullScreen, toggleFullscreen };
};