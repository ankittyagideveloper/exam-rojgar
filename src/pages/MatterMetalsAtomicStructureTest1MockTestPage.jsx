import React from "react";
import { matterMetalsAtomicStructureTest1MockData } from "../data/matterMetalsAtomicStructureTest1MockData";
import TestSeries from "../component/TestSeries";

const MatterMetalsAtomicStructureTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={matterMetalsAtomicStructureTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default MatterMetalsAtomicStructureTest1MockTestPage;
