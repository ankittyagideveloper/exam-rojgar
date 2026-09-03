import React from "react";
import { AdventMockData } from "../data/AdventMockData";
import TestSeries from "../component/TestSeries";

const AdventMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={AdventMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AdventMockTestPage;
