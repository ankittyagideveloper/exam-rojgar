import React from "react";
import { PipeMockData } from "../data/PipeMockData";
import TestSeries from "../component/TestSeries";

const PipeMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={PipeMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PipeMockTestPage;
