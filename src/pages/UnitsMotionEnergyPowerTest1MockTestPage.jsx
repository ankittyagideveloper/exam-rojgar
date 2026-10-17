import React from "react";
import { unitsMotionEnergyPowerTest1MockData } from "../data/unitsMotionEnergyPowerTest1MockData";
import TestSeries from "../component/TestSeries";

const UnitsMotionEnergyPowerTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={unitsMotionEnergyPowerTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default UnitsMotionEnergyPowerTest1MockTestPage;
