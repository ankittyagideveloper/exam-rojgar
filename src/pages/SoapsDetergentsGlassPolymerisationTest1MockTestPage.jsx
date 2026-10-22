import React from "react";
import { soapsDetergentsGlassPolymerisationTest1MockData } from "../data/soapsDetergentsGlassPolymerisationTest1MockData";
import TestSeries from "../component/TestSeries";

const SoapsDetergentsGlassPolymerisationTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={soapsDetergentsGlassPolymerisationTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default SoapsDetergentsGlassPolymerisationTest1MockTestPage;
