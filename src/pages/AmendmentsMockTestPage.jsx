import React from "react";
import { AmendmentsMockData } from "../data/AmendmentsMockData";
import TestSeries from "../component/TestSeries";

const AmendmentsMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={AmendmentsMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AmendmentsMockTestPage;
