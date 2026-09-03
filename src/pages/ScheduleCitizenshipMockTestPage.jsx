import React from "react";
import { ScheduleCitizenshipMockData } from "../data/ScheduleCitizenshipMockData";
import TestSeries from "../component/TestSeries";

const ScheduleCitizenshipMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ScheduleCitizenshipMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ScheduleCitizenshipMockTestPage;
