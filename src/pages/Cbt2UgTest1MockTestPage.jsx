import React from "react";
import { cbt2UgTest1MockData } from "../data/cbt2UgTest1MockData";
import TestSeries from "../component/TestSeries";

const Cbt2UgTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={cbt2UgTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default Cbt2UgTest1MockTestPage;
