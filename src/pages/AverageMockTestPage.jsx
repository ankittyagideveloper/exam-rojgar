import React from "react";
import { AverageMockData } from "../data/averageMockData";
import TestSeries from "../component/TestSeries";

const AverageMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={AverageMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AverageMockTestPage;
