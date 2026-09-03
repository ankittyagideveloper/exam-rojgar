import React from "react";
import { delhiSultanateMockData } from "../data/delhiSultanateMockData";
import TestSeries from "../component/TestSeries";

const DelhiSultanateMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={delhiSultanateMockData} onComplete={handleComplete} />
    </div>
  );
};

export default DelhiSultanateMockTestPage;
