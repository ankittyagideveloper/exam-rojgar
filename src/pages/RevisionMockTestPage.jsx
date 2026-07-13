import React from "react";
import MockTest from "../component/MockTest";
import { RevisionMockData } from "../data/RevisionMockData";

const RevisionMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={RevisionMockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionMockTestPage;
