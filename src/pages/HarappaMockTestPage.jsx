import React from "react";
import MockTest from "../component/MockTest";
import { harappaMockData } from "../data/harappaMockData";

const HarappaMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={harappaMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HarappaMockTestPage;

// Made with Bob
