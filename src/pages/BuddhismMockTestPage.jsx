import React from "react";
import { buddhismMockData } from "../data/buddhismMockData";
import TestSeries from "../component/TestSeries";

const BuddhismMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={buddhismMockData} onComplete={handleComplete} />
    </div>
  );
};

export default BuddhismMockTestPage;
