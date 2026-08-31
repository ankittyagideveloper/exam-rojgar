import React from "react";
import { PolityConstitutionAndPreambleAndSourcesMockData } from "../data/PolityConstitutionAndPreambleAndSourcesMockData";
import TestSeries from "../component/TestSeries";

const PolityConstitutionAndPreambleAndSourcesMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={PolityConstitutionAndPreambleAndSourcesMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PolityConstitutionAndPreambleAndSourcesMockTestPage;
