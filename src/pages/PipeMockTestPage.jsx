import React from "react";
import MockTest from "../component/MockTest";
import { PipeMockData } from "../data/PipeMockData";

const PipeMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={PipeMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PipeMockTestPage;
