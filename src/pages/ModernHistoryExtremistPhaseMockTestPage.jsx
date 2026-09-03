import React from "react";
import { ModernHistoryExtremistPhaseMockData } from "../data/ModernHistoryExtremistPhaseMockData";
import TestSeries from "../component/TestSeries";

const ModernHistoryExtremistPhaseMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ModernHistoryExtremistPhaseMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ModernHistoryExtremistPhaseMockTestPage;
