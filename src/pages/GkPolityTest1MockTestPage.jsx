import React from "react";
import TestSeries from "../component/TestSeries";
import { gkPolityTest1MockData } from "../data/gkPolityMockData";

const GkPolityTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={gkPolityTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default GkPolityTest1MockTestPage;
