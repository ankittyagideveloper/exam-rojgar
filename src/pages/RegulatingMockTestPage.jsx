import React from "react";
import { RegulatingMockData } from "../data/RegulatingMockData";
import TestSeries from "../component/TestSeries";

const RegulatingMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RegulatingMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RegulatingMockTestPage;
