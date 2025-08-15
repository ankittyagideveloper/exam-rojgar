import React, { useEffect } from "react";
import QuizComponent from "../component/Quiz";

const QuizPage = () => {
  useEffect(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    if (!document.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
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
