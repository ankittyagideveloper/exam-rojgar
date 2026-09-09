import React from "react";
import { TransportationSystemMockData } from "../data/TransportationSystemMockData";
import TestSeries from "../component/TestSeries";

const TransportationSystemMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={TransportationSystemMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TransportationSystemMockTestPage;
