import React from "react";
import { MarathaMockData } from "../data/MarathaMockData";
import TestSeries from "../component/TestSeries";

const MarathaMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MarathaMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MarathaMockTestPage;
