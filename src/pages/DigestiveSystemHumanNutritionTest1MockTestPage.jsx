import React from "react";
import { digestiveSystemHumanNutritionTest1MockData } from "../data/digestiveSystemHumanNutritionTest1MockData";
import TestSeries from "../component/TestSeries";

const DigestiveSystemHumanNutritionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={digestiveSystemHumanNutritionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default DigestiveSystemHumanNutritionTest1MockTestPage;
