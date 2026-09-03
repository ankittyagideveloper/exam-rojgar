import React from "react";
import { RevisionMockData } from "../data/RevisionMockData";
import TestSeries from "../component/TestSeries";

const RevisionMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RevisionMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionMockTestPage;
