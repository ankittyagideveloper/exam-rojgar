import React from "react";
import { pipeCisternMockData } from "../data/pipeCisternMockData";
import TestSeries from "../component/TestSeries";

const PipeCisternMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={pipeCisternMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PipeCisternMockTestPage;
