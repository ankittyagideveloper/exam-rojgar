import React from "react";
import { currentAffairsPyqTest1MockData } from "../data/currentAffairsPyqTest1MockData";
import TestSeries from "../component/TestSeries";

const CurrentAffairsPyqTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={currentAffairsPyqTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default CurrentAffairsPyqTest1MockTestPage;
