import React from "react";
import MockTest from "../component/MockTest";
import { environmentQuizMockData } from "../data/environmentQuizMockData";

const EnvironmentQuizMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest
        testData={environmentQuizMockData}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default EnvironmentQuizMockTestPage;

// Made with Bob
