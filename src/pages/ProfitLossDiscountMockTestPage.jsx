import React from "react";
import { profitLossDiscountMockData } from "../data/profitLossDiscountMockData";
import TestSeries from "../component/TestSeries";

const ProfitLossDiscountMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={profitLossDiscountMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ProfitLossDiscountMockTestPage;
