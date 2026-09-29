import React from "react";
import { MsExcelMockData } from "../data/MsExcelMockData";
import TestSeries from "../component/TestSeries";

const MsExcelMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MsExcelMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MsExcelMockTestPage;
