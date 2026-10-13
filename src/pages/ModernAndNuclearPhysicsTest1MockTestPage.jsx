import React from "react";
import { modernAndNuclearPhysicsTest1MockData } from "../data/modernAndNuclearPhysicsTest1MockData";
import TestSeries from "../component/TestSeries";

const ModernAndNuclearPhysicsTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={modernAndNuclearPhysicsTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ModernAndNuclearPhysicsTest1MockTestPage;
