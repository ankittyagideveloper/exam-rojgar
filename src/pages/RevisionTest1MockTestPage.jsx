import React from "react";
import { revisionTest1MockData } from "../data/revisionTest1MockData";
import TestSeries from "../component/TestSeries";

const RevisionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={revisionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest1MockTestPage;
