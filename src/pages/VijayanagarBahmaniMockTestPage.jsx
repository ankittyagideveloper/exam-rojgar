import React from "react";
import { vijayanagarBahmaniMockData } from "../data/vijayanagarBahmaniMockData";
import TestSeries from "../component/TestSeries";

const VijayanagarBahmaniMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={vijayanagarBahmaniMockData} onComplete={handleComplete} />
    </div>
  );
};

export default VijayanagarBahmaniMockTestPage;
