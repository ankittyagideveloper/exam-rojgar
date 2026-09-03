import React from "react";
import { hcflcmMockData } from "../data/hcflcmMockData";
import TestSeries from "../component/TestSeries";

const HCFLCMMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={hcflcmMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HCFLCMMockTestPage;
