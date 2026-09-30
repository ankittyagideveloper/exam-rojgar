import React from "react";
import { electricityAndMagnetismTest1MockData } from "../data/electricityAndMagnetismTest1MockData";
import TestSeries from "../component/TestSeries";

const ElectricityAndMagnetismTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={electricityAndMagnetismTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ElectricityAndMagnetismTest1MockTestPage;
