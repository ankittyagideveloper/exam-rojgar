import React from "react";
import MockTest from "../component/MockTest";
import { TimeMockData } from "../data/TimeMockData";

const TimeMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={TimeMockData} onComplete={handleComplete} />
    </div>
  );
};

export default TimeMockTestPage;
