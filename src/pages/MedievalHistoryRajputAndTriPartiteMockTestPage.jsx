import React from "react";
import { MedievalHistoryRajputAndTriPartiteMockData } from "../data/MedievalHistoryRajputAndTriPartiteMockData";
import TestSeries from "../component/TestSeries";

const MedievalHistoryRajputAndTriPartiteMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={MedievalHistoryRajputAndTriPartiteMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MedievalHistoryRajputAndTriPartiteMockTestPage;
