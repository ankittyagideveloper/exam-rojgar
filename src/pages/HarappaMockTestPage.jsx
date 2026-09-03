import React from "react";
import { harappaMockData } from "../data/harappaMockData";
import TestSeries from "../component/TestSeries";

const HarappaMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={harappaMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HarappaMockTestPage;
