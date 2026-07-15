import React from "react";
import MockTest from "../component/MockTest";
import { PercentageMockData } from "../data/PercentageMockData";

const PercentageMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={PercentageMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PercentageMockTestPage;
