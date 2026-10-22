import React from "react";
import { classificationOfElementsSolutionTest1MockData } from "../data/classificationOfElementsSolutionTest1MockData";
import TestSeries from "../component/TestSeries";

const ClassificationOfElementsSolutionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={classificationOfElementsSolutionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ClassificationOfElementsSolutionTest1MockTestPage;
