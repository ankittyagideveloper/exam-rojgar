import React from "react";
import MockTest from "../component/MockTest";
import { MughalMockData } from "../data/MughalMockData";

const MughalMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={MughalMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MughalMockTestPage;
