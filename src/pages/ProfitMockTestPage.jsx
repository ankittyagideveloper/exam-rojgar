import React from "react";
import MockTest from "../component/MockTest";
import { ProfitMockData } from "../data/ProfitMockData";

const ProfitMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={ProfitMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ProfitMockTestPage;
