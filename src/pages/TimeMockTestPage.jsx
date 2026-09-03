import React from "react";
import { TimeMockData } from "../data/TimeMockData";
import TestSeries from "../component/TestSeries";

const TimeMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={TimeMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeMockTestPage;
