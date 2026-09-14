import React from "react";
import { geographyFullTest1MockData } from "../data/geographyFullTest1MockData";
import TestSeries from "../component/TestSeries";

const GeographyFullTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={geographyFullTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default GeographyFullTest1MockTestPage;
