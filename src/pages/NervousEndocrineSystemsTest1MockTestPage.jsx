import React from "react";
import { nervousEndocrineSystemsTest1MockData } from "../data/nervousEndocrineSystemsTest1MockData";
import TestSeries from "../component/TestSeries";

const NervousEndocrineSystemsTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={nervousEndocrineSystemsTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default NervousEndocrineSystemsTest1MockTestPage;
