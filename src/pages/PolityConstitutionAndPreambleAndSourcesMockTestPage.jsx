import React from "react";
import MockTest from "../component/MockTest";
import { PolityConstitutionAndPreambleAndSourcesMockData } from "../data/PolityConstitutionAndPreambleAndSourcesMockData";

const PolityConstitutionAndPreambleAndSourcesMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={PolityConstitutionAndPreambleAndSourcesMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PolityConstitutionAndPreambleAndSourcesMockTestPage;
