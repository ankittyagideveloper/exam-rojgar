import React from "react";
import { presidentGovernorPmTest1MockData } from "../data/presidentGovernorPmTest1MockData";
import TestSeries from "../component/TestSeries";

const PresidentGovernorPmTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={presidentGovernorPmTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default PresidentGovernorPmTest1MockTestPage;
