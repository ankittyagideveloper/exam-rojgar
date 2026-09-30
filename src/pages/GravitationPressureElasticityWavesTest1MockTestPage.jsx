import React from "react";
import { gravitationPressureElasticityWavesTest1MockData } from "../data/gravitationPressureElasticityWavesTest1MockData";
import TestSeries from "../component/TestSeries";

const GravitationPressureElasticityWavesTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={gravitationPressureElasticityWavesTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default GravitationPressureElasticityWavesTest1MockTestPage;
