import React from "react";
import { stateLegislaturePanchayatiRajTest1MockData } from "../data/stateLegislaturePanchayatiRajTest1MockData";
import TestSeries from "../component/TestSeries";

const StateLegislaturePanchayatiRajTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={stateLegislaturePanchayatiRajTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default StateLegislaturePanchayatiRajTest1MockTestPage;
