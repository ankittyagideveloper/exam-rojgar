import React from "react";
import MockTest from "../component/MockTest";
import { TimeAndWorkMockData } from "../data/TimeAndWorkMockData";

const TimeAndWorkMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={TimeAndWorkMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeAndWorkMockTestPage;
