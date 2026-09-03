import React from "react";
import { RatioMockData } from "../data/RatioMockData";
import TestSeries from "../component/TestSeries";

const RatioMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RatioMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RatioMockTestPage;
