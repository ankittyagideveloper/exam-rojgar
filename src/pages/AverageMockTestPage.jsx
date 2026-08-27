import React from "react";
import MockTest from "../component/MockTest";
import { AverageMockData } from "../data/AverageMockData";

const AverageMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={AverageMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AverageMockTestPage;
