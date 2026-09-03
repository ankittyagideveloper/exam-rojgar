import React from "react";
import { environmentQuizMockData } from "../data/environmentQuizMockData";
import TestSeries from "../component/TestSeries";

const EnvironmentQuizMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={environmentQuizMockData} onComplete={handleComplete} />
    </div>
  );
};

export default EnvironmentQuizMockTestPage;
