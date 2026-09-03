import React from "react";
import { mahajanpadMockData } from "../data/mahajanpadMockData";
import TestSeries from "../component/TestSeries";

const MahajanpadMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={mahajanpadMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MahajanpadMockTestPage;
