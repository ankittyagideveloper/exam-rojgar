import React from "react";
import MockTest from "../component/MockTest";
import { profitLossDiscountMockData } from "../data/profitLossDiscountMockData";

const ProfitLossDiscountMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest
        testData={profitLossDiscountMockData}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default ProfitLossDiscountMockTestPage;

// Made with Bob
