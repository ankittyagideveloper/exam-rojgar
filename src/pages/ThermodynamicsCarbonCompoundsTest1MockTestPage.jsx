import React from "react";
import { thermodynamicsCarbonCompoundsTest1MockData } from "../data/thermodynamicsCarbonCompoundsTest1MockData";
import TestSeries from "../component/TestSeries";

const ThermodynamicsCarbonCompoundsTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={thermodynamicsCarbonCompoundsTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ThermodynamicsCarbonCompoundsTest1MockTestPage;
