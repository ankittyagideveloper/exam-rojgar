import React from "react";
import { MsOfficeMsWordMockData } from "../data/MsOfficeMsWordMockData";
import TestSeries from "../component/TestSeries";

const MsOfficeMsWordMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MsOfficeMsWordMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MsOfficeMsWordMockTestPage;
