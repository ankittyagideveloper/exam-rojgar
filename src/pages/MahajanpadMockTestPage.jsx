import React from "react";
import MockTest from "../component/MockTest";
import { mahajanpadMockData } from "../data/mahajanpadMockData";

const MahajanpadMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={mahajanpadMockData} onComplete={handleComplete} />
    </div>
  );
};

export default MahajanpadMockTestPage;

// Made with Bob
