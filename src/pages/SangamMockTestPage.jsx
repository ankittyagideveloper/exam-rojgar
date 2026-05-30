import React from "react";
import MockTest from "../component/MockTest";
import { sangamMockData } from "../data/sangamMockData";

const SangamMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={sangamMockData} onComplete={handleComplete} />
    </div>
  );
};

export default SangamMockTestPage;

// Made with Bob
