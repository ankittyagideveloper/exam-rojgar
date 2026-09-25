import React from "react";
import { circleTest1MockData } from "../data/circleTest1MockData";
import TestSeries from "../component/TestSeries";

const CircleTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={circleTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default CircleTest1MockTestPage;
