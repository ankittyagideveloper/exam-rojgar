import React from "react";
import MockTest from "../component/MockTest";
import { FundamentalRightsAndDpSpMockData } from "../data/FundamentalRightsAndDpSpMockData";

const FundamentalRightsAndDpSpMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={FundamentalRightsAndDpSpMockData} onComplete={handleComplete} />
    </div>
  );
};

export default FundamentalRightsAndDpSpMockTestPage;
