import React from "react";
import { PercentageMockData } from "../data/PercentageMockData";
import TestSeries from "../component/TestSeries";

const PercentageMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={PercentageMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PercentageMockTestPage;
