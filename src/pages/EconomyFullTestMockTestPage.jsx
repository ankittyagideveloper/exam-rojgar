import React from "react";
import { EconomyFullTestMockData } from "../data/EconomyFullTestMockData";
import TestSeries from "../component/TestSeries";

const EconomyFullTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={EconomyFullTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default EconomyFullTestMockTestPage;
