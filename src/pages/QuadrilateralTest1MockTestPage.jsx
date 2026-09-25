import React from "react";
import { quadrilateralTest1MockData } from "../data/quadrilateralTest1MockData";
import TestSeries from "../component/TestSeries";

const QuadrilateralTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={quadrilateralTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default QuadrilateralTest1MockTestPage;
