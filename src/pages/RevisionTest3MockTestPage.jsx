import React from "react";
import { RevisionTest3MockData } from "../data/RevisionTest3MockData";
import TestSeries from "../component/TestSeries";

const RevisionTest3MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RevisionTest3MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest3MockTestPage;
