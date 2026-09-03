import React from "react";
import { MughalMockData } from "../data/MughalMockData";
import TestSeries from "../component/TestSeries";

const MughalMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MughalMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MughalMockTestPage;
