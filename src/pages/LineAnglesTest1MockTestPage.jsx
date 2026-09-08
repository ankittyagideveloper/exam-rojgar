import React from "react";
import { lineAnglesTest1MockData } from "../data/lineAnglesTest1MockData";
import TestSeries from "../component/TestSeries";

const LineAnglesTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={lineAnglesTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default LineAnglesTest1MockTestPage;
