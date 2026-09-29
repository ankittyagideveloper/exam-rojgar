import React from "react";
import { MsPowerpointMockData } from "../data/MsPowerpointMockData";
import TestSeries from "../component/TestSeries";

const MsPowerpointMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MsPowerpointMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MsPowerpointMockTestPage;
