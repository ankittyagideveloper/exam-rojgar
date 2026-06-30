import React from "react";
import MockTest from "../component/MockTest";
import { averageMockData } from "../data/averageMockData";

const AverageMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={averageMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AverageMockTestPage;
