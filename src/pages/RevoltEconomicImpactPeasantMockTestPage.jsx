import React from "react";
import { RevoltEconomicImpactPeasantMockData } from "../data/RevoltEconomicImpactPeasantMockData";
import TestSeries from "../component/TestSeries";

const RevoltEconomicImpactPeasantMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RevoltEconomicImpactPeasantMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevoltEconomicImpactPeasantMockTestPage;
