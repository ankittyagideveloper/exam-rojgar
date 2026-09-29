import React from "react";
import { ComputerLecture2CPUandMemoryMockData } from "../data/ComputerLecture2CPUandMemoryMockData";
import TestSeries from "../component/TestSeries";

const ComputerLecture2CPUandMemoryMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ComputerLecture2CPUandMemoryMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ComputerLecture2CPUandMemoryMockTestPage;
