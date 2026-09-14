import React from "react";
import { RevisionTestPolityFullMockData } from "../data/RevisionTestPolityFullMockData";
import TestSeries from "../component/TestSeries";

const RevisionTestPolityFullMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RevisionTestPolityFullMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTestPolityFullMockTestPage;
