import React from "react";
import { HeightMockData } from "../data/HeightMockData";
import TestSeries from "../component/TestSeries";

const HeightMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={HeightMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HeightMockTestPage;
