import React from "react";
import { geneticsHeredityOrganicEvolutionTest1MockData } from "../data/geneticsHeredityOrganicEvolutionTest1MockData";
import TestSeries from "../component/TestSeries";

const GeneticsHeredityOrganicEvolutionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={geneticsHeredityOrganicEvolutionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default GeneticsHeredityOrganicEvolutionTest1MockTestPage;
