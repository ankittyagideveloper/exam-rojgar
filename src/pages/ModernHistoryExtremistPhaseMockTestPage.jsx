import React from "react";
import MockTest from "../component/MockTest";
import { ModernHistoryExtremistPhaseMockData } from "../data/ModernHistoryExtremistPhaseMockData";

const ModernHistoryExtremistPhaseMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={ModernHistoryExtremistPhaseMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ModernHistoryExtremistPhaseMockTestPage;
