import React from "react";
import { importantDaysTest1MockData } from "../data/importantDaysTest1MockData";
import TestSeries from "../component/TestSeries";

const ImportantDaysTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={importantDaysTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ImportantDaysTest1MockTestPage;
