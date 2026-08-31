import React from "react";
import MockTest from "../component/MockTest";
import { AmendmentsMockData } from "../data/AmendmentsMockData";

const AmendmentsMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={AmendmentsMockData} onComplete={handleComplete} />
    </div>
  );
};

export default AmendmentsMockTestPage;
