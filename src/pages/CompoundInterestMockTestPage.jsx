import React from "react";
import MockTest from "../component/MockTest";
import { compoundInterestMockData } from "../data/compoundInterestMockData";

const CompoundInterestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={compoundInterestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default CompoundInterestMockTestPage;
