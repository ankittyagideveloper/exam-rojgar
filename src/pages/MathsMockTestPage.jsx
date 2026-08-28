import React from "react";
import MockTest from "../component/MockTest";
import { MathsMockData } from "../data/MathsMockData";

const MathsMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={MathsMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MathsMockTestPage;
