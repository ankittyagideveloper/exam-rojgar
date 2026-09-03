import React from "react";
import { FundamentalRightsAndDpSpMockData } from "../data/FundamentalRightsAndDpSpMockData";
import TestSeries from "../component/TestSeries";

const FundamentalRightsAndDpSpMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={FundamentalRightsAndDpSpMockData} onComplete={handleComplete} />
    </div>
  );
};

export default FundamentalRightsAndDpSpMockTestPage;
