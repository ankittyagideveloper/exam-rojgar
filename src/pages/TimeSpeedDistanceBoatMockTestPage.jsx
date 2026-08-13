import React from "react";
import MockTest from "../component/MockTest";
import { TimeSpeedDistanceBoatMockData } from "../data/TimeSpeedDistanceBoatMockData";

const TimeSpeedDistanceBoatMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={TimeSpeedDistanceBoatMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeSpeedDistanceBoatMockTestPage;
