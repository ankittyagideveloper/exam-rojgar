import React from "react";
import MockTest from "../component/MockTest";
import { ScheduleCitizenshipMockData } from "../data/ScheduleCitizenshipMockData";

const ScheduleCitizenshipMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={ScheduleCitizenshipMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ScheduleCitizenshipMockTestPage;
