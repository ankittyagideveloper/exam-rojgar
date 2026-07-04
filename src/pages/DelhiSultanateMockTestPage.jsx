import React from "react";
import MockTest from "../component/MockTest";
import { delhiSultanateMockData } from "../data/delhiSultanateMockData";

const DelhiSultanateMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={delhiSultanateMockData} onComplete={handleComplete} />
    </div>
  );
};

export default DelhiSultanateMockTestPage;
