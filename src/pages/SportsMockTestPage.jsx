import React from "react";
import { SportsMockData } from "../data/SportsMockData";
import TestSeries from "../component/TestSeries";

const SportsMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={SportsMockData} onComplete={handleComplete} />
    </div>
  );
};

export default SportsMockTestPage;
