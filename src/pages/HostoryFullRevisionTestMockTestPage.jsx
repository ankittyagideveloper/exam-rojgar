import React from "react";
import { hostoryFullRevisionTestMockData } from "../data/hostoryFullRevisionTestMockData";
import TestSeries from "../component/TestSeries";

const HostoryFullRevisionTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={hostoryFullRevisionTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HostoryFullRevisionTestMockTestPage;
