import React from "react";
import { RRBNTPCEconomyLecture4TaxationMockData } from "../data/RRBNTPCEconomyLecture4TaxationMockData";
import TestSeries from "../component/TestSeries";

const RRBNTPCEconomyLecture4TaxationMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RRBNTPCEconomyLecture4TaxationMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RRBNTPCEconomyLecture4TaxationMockTestPage;
