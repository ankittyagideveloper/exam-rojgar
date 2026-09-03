import React from "react";
import { militaryExerciseTest1MockData } from "../data/militaryExerciseTest1MockData";
import TestSeries from "../component/TestSeries";

const MilitaryExerciseTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={militaryExerciseTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default MilitaryExerciseTest1MockTestPage;
