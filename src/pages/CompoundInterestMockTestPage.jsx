import React from "react";
import { compoundInterestMockData } from "../data/compoundInterestMockData";
import TestSeries from "../component/TestSeries";

const CompoundInterestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={compoundInterestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default CompoundInterestMockTestPage;
