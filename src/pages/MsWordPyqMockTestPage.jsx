import React from "react";
import { MsWordPyqMockData } from "../data/MsWordPyqMockData";
import TestSeries from "../component/TestSeries";

const MsWordPyqMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MsWordPyqMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MsWordPyqMockTestPage;
