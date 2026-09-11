import React from "react";
import { trianglesTest1MockData } from "../data/trianglesTest1MockData";
import TestSeries from "../component/TestSeries";

const TrianglesTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={trianglesTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default TrianglesTest1MockTestPage;
