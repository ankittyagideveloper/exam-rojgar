import React from "react";
import { acidsBasesSaltsGasesBehavioursTest1MockData } from "../data/acidsBasesSaltsGasesBehavioursTest1MockData";
import TestSeries from "../component/TestSeries";

const AcidsBasesSaltsGasesBehavioursTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={acidsBasesSaltsGasesBehavioursTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default AcidsBasesSaltsGasesBehavioursTest1MockTestPage;
