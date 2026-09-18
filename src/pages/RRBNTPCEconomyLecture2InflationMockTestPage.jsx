import React from "react";
import { RRBNTPCEconomyLecture2InflationMockData } from "../data/RRBNTPCEconomyLecture2InflationMockData";
import TestSeries from "../component/TestSeries";

const RRBNTPCEconomyLecture2InflationMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RRBNTPCEconomyLecture2InflationMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RRBNTPCEconomyLecture2InflationMockTestPage;
