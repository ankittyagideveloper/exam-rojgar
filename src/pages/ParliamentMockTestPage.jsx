import React from "react";
import MockTest from "../component/MockTest";
import { ParliamentMockData } from "../data/ParliamentMockData";

const ParliamentMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={ParliamentMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ParliamentMockTestPage;
