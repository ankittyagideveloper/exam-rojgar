import React from "react";
import { polygonTest1MockData } from "../data/polygonTest1MockData";
import TestSeries from "../component/TestSeries";

const PolygonTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={polygonTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default PolygonTest1MockTestPage;
