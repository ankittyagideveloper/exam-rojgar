import React from "react";
import { ConstitutionalBodiesMockData } from "../data/ConstitutionalBodiesMockData";
import TestSeries from "../component/TestSeries";

const ConstitutionalBodiesMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ConstitutionalBodiesMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ConstitutionalBodiesMockTestPage;
