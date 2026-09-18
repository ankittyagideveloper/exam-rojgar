import React from "react";
import { EconomicsGDPGNPBasics1MockData } from "../data/EconomicsGDPGNPBasics1MockData";
import TestSeries from "../component/TestSeries";

const EconomicsGDPGNPBasics1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={EconomicsGDPGNPBasics1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default EconomicsGDPGNPBasics1MockTestPage;
