import React from "react";
import MockTest from "../component/MockTest";
import { RatioMockData } from "../data/RatioMockData";

const RatioMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={RatioMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RatioMockTestPage;
