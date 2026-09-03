import React from "react";
import { MathsMockData } from "../data/MathsMockData";
import TestSeries from "../component/TestSeries";

const MathsMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MathsMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MathsMockTestPage;
