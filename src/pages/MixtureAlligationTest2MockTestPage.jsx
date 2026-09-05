import React from "react";
import { mixtureAlligationTest2MockData } from "../data/mixtureAlligationTest2MockData";
import TestSeries from "../component/TestSeries";

const MixtureAlligationTest2MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={mixtureAlligationTest2MockData} onComplete={handleComplete} />
    </div>
  );
};

export default MixtureAlligationTest2MockTestPage;
