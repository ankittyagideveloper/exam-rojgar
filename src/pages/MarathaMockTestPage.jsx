import React from "react";
import MockTest from "../component/MockTest";
import { MarathaMockData } from "../data/MarathaMockData";

const MarathaMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={MarathaMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MarathaMockTestPage;
