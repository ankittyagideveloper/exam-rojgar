import React from "react";
import { jainismMockData } from "../data/jainismMockData";
import TestSeries from "../component/TestSeries";

const JainismMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={jainismMockData} onComplete={handleComplete} />
    </div>
  );
};

export default JainismMockTestPage;
