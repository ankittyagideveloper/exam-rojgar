import React from "react";
import { ProfitMockData } from "../data/ProfitMockData";
import TestSeries from "../component/TestSeries";

const ProfitMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ProfitMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ProfitMockTestPage;
