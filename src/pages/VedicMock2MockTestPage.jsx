import React from "react";
import { vedicMock2MockData } from "../data/vedicMock2MockData";
import TestSeries from "../component/TestSeries";

const VedicMock2MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={vedicMock2MockData} onComplete={handleComplete} />
    </div>
  );
};

export default VedicMock2MockTestPage;
