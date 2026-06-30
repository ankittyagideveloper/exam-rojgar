import React from "react";
import MockTest from "../component/MockTest";
import { mauryanEmpireMockData } from "../data/mauryanEmpireMockData";

const MauryanEmpireMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={mauryanEmpireMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MauryanEmpireMockTestPage;
