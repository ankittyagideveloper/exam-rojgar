import React from "react";
import { AdvanceMathsMensurationMockData } from "../data/AdvanceMathsMensurationMockData";
import TestSeries from "../component/TestSeries";

const AdvanceMathsMensurationMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={AdvanceMathsMensurationMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AdvanceMathsMensurationMockTestPage;
