import React from "react";
import { guptaMockData } from "../data/guptaMockData";
import TestSeries from "../component/TestSeries";

const GuptaMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={guptaMockData} onComplete={handleComplete} />
    </div>
  );
};

export default GuptaMockTestPage;
