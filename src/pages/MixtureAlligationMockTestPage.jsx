import React from "react";
import MockTest from "../component/MockTest";
import { mixtureAlligationMockData } from "../data/mixtureAlligationMockData";

const MixtureAlligationMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={mixtureAlligationMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MixtureAlligationMockTestPage;
