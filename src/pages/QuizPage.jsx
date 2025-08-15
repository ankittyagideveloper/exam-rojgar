import React, { useEffect } from "react";
import QuizComponent from "../component/Quiz";

const QuizPage = () => {
  useEffect(() => {
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    // } else

    function enterFullscreen() {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    // Call the function
    enterFullscreen();

    return () => {
      document.exitFullscreen();
    };
  }, []);
  return (
    <div>
      <QuizComponent />
    </div>
  );
};

export default QuizPage;
