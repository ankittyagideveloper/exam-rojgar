import React from "react";
import { ParliamentMockData } from "../data/ParliamentMockData";
import TestSeries from "../component/TestSeries";

const ParliamentMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ParliamentMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ParliamentMockTestPage;
