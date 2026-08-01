import React from "react";
import MockTest from "../component/MockTest";
import { BhaktiAndSufiMockData } from "../data/BhaktiAndSufiMockData";

const BhaktiAndSufiMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={BhaktiAndSufiMockData} onComplete={handleComplete} />
    </div>
  );
};

export default BhaktiAndSufiMockTestPage;
