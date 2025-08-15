import React, { useEffect } from "react";
import QuizComponent from "../component/Quiz";

const QuizPage = () => {
  useEffect(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (!document.webkitEnterFullscreen) {
      document.documentElement.webkitEnterFullscreen();
    }

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
