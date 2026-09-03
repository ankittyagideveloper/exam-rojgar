import React from "react";
import { sangamMockData } from "../data/sangamMockData";
import TestSeries from "../component/TestSeries";

const SangamMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={sangamMockData} onComplete={handleComplete} />
    </div>
  );
};

export default SangamMockTestPage;
