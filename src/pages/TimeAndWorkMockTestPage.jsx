import React from "react";
import { TimeAndWorkMockData } from "../data/TimeAndWorkMockData";
import TestSeries from "../component/TestSeries";

const TimeAndWorkMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={TimeAndWorkMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeAndWorkMockTestPage;
