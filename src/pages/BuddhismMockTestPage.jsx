import React from "react";
import MockTest from "../component/MockTest";
import { buddhismMockData } from "../data/buddhismMockData";

const BuddhismMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={buddhismMockData} onComplete={handleComplete} />
    </div>
  );
};

export default BuddhismMockTestPage;

// Made with Bob
