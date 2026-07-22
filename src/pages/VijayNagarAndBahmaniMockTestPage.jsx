import React from "react";
import MockTest from "../component/MockTest";
import { VijayNagarAndBahmaniMockData } from "../data/VijayNagarAndBahmaniMockData";

const VijayNagarAndBahmaniMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={VijayNagarAndBahmaniMockData} onComplete={handleComplete} />
    </div>
  );
};

export default VijayNagarAndBahmaniMockTestPage;
