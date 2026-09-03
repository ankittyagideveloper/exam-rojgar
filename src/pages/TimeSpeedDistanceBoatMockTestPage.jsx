import React from "react";
import { TimeSpeedDistanceBoatMockData } from "../data/TimeSpeedDistanceBoatMockData";
import TestSeries from "../component/TestSeries";

const TimeSpeedDistanceBoatMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={TimeSpeedDistanceBoatMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeSpeedDistanceBoatMockTestPage;
