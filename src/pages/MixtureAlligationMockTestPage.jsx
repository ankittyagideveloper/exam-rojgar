import React from "react";
import { mixtureAlligationMockData } from "../data/mixtureAlligationMockData";
import TestSeries from "../component/TestSeries";

const MixtureAlligationMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={mixtureAlligationMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MixtureAlligationMockTestPage;
