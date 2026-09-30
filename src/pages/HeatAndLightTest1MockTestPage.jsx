import React from "react";
import { heatAndLightTest1MockData } from "../data/heatAndLightTest1MockData";
import TestSeries from "../component/TestSeries";

const HeatAndLightTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={heatAndLightTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default HeatAndLightTest1MockTestPage;
