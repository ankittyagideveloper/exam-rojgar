import React from "react";
import { UniverseLatitudeAndLongitudeMockData } from "../data/UniverseLatitudeAndLongitudeMockData";
import TestSeries from "../component/TestSeries";

const UniverseLatitudeAndLongitudeMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={UniverseLatitudeAndLongitudeMockData} onComplete={handleComplete} />
    </div>
  );
};

export default UniverseLatitudeAndLongitudeMockTestPage;
