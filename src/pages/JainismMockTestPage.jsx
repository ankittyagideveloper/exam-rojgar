import React from "react";
import MockTest from "../component/MockTest";
import { jainismMockData } from "../data/jainismMockData";

const JainismMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={jainismMockData} onComplete={handleComplete} />
    </div>
  );
};

export default JainismMockTestPage;

// Made with Bob
