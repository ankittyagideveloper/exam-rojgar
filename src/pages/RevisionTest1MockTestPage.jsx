import React from "react";
import MockTest from "../component/MockTest";
import { revisionTest1MockData } from "../data/revisionTest1MockData";

const RevisionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={revisionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest1MockTestPage;

// Made with Bob
