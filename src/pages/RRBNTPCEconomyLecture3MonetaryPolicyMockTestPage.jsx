import React from "react";
import { RRBNTPCEconomyLecture3MonetaryPolicyMockData } from "../data/RRBNTPCEconomyLecture3MonetaryPolicyMockData";
import TestSeries from "../component/TestSeries";

const RRBNTPCEconomyLecture3MonetaryPolicyMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={RRBNTPCEconomyLecture3MonetaryPolicyMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RRBNTPCEconomyLecture3MonetaryPolicyMockTestPage;
