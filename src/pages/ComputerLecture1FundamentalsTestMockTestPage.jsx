import React from "react";
import { ComputerLecture1FundamentalsTestMockData } from "../data/ComputerLecture1FundamentalsTestMockData";
import TestSeries from "../component/TestSeries";

const ComputerLecture1FundamentalsTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ComputerLecture1FundamentalsTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ComputerLecture1FundamentalsTestMockTestPage;
