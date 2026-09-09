import React from "react";
import { TrigonometryMockData } from "../data/TrigonometryMockData";
import TestSeries from "../component/TestSeries";

const TrigonometryMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={TrigonometryMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TrigonometryMockTestPage;
