import React from "react";
import MockTest from "../component/MockTest";
import { AdventMockData } from "../data/AdventMockData";

const AdventMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={AdventMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AdventMockTestPage;
