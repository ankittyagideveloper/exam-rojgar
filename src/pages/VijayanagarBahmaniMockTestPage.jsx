import React from "react";
import MockTest from "../component/MockTest";
import { vijayanagarBahmaniMockData } from "../data/vijayanagarBahmaniMockData";

const VijayanagarBahmaniMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest
        testData={vijayanagarBahmaniMockData}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default VijayanagarBahmaniMockTestPage;

// Made with Bob
