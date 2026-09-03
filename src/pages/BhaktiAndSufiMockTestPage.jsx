import React from "react";
import { BhaktiAndSufiMockData } from "../data/BhaktiAndSufiMockData";
import TestSeries from "../component/TestSeries";

const BhaktiAndSufiMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={BhaktiAndSufiMockData} onComplete={handleComplete} />
    </div>
  );
};

export default BhaktiAndSufiMockTestPage;
