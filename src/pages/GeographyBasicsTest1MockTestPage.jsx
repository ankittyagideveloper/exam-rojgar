import React from "react";
import { geographyBasicsTest1MockData } from "../data/geographyBasicsTest1MockData";
import TestSeries from "../component/TestSeries";

const GeographyBasicsTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={geographyBasicsTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default GeographyBasicsTest1MockTestPage;
