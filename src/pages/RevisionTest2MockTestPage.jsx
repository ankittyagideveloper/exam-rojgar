import React from "react";
import { revisionTest2MockData } from "../data/revisionTest2MockData";
import TestSeries from "../component/TestSeries";

const RevisionTest2MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={revisionTest2MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest2MockTestPage;
