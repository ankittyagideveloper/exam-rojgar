import React from "react";
import { vitaminsMineralsHumanDiseasesTest1MockData } from "../data/vitaminsMineralsHumanDiseasesTest1MockData";
import TestSeries from "../component/TestSeries";

const VitaminsMineralsHumanDiseasesTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={vitaminsMineralsHumanDiseasesTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default VitaminsMineralsHumanDiseasesTest1MockTestPage;
