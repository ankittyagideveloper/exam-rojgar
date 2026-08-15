import React from "react";
import MockTest from "../component/MockTest";
import { hostoryFullRevisionTestMockData } from "../data/hostoryFullRevisionTestMockData";

const HostoryFullRevisionTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={hostoryFullRevisionTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default HostoryFullRevisionTestMockTestPage;
