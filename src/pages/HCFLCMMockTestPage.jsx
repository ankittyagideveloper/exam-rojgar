import React from "react";
import MockTest from "../component/MockTest";
import { hcflcmMockData } from "../data/hcflcmMockData";

const HCFLCMMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={hcflcmMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HCFLCMMockTestPage;

// Made with Bob
