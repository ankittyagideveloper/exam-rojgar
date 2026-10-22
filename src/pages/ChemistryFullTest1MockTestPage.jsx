import React from "react";
import { chemistryFullTest1MockData } from "../data/chemistryFullTest1MockData";
import TestSeries from "../component/TestSeries";

const ChemistryFullTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={chemistryFullTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ChemistryFullTest1MockTestPage;
