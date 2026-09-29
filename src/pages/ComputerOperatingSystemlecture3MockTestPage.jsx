import React from "react";
import { ComputerOperatingSystemlecture3MockData } from "../data/ComputerOperatingSystemlecture3MockData";
import TestSeries from "../component/TestSeries";

const ComputerOperatingSystemlecture3MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ComputerOperatingSystemlecture3MockData} onComplete={handleComplete} />
    </div>
  );
};

export default ComputerOperatingSystemlecture3MockTestPage;
