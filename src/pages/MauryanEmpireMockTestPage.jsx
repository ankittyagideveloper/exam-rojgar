import React from "react";
import { mauryanEmpireMockData } from "../data/mauryanEmpireMockData";
import TestSeries from "../component/TestSeries";

const MauryanEmpireMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={mauryanEmpireMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MauryanEmpireMockTestPage;
