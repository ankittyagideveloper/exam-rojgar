import React from "react";
import { budgetAndEconomicSurveyTest1MockData } from "../data/budgetAndEconomicSurveyTest1MockData";
import TestSeries from "../component/TestSeries";

const BudgetAndEconomicSurveyTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={budgetAndEconomicSurveyTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default BudgetAndEconomicSurveyTest1MockTestPage;
