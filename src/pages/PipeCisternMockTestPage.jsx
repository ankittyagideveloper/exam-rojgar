import React from "react";
import MockTest from "../component/MockTest";
import { pipeCisternMockData } from "../data/pipeCisternMockData";

const PipeCisternMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={pipeCisternMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PipeCisternMockTestPage;
