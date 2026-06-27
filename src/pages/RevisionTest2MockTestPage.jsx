import React from "react";
import MockTest from "../component/MockTest";
import { revisionTest2MockData } from "../data/revisionTest2MockData";

const RevisionTest2MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={revisionTest2MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest2MockTestPage;

// Made with Bob
