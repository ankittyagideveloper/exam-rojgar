import React from "react";
import { VijayNagarAndBahmaniMockData } from "../data/VijayNagarAndBahmaniMockData";
import TestSeries from "../component/TestSeries";

const VijayNagarAndBahmaniMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={VijayNagarAndBahmaniMockData} onComplete={handleComplete} />
    </div>
  );
};

export default VijayNagarAndBahmaniMockTestPage;
