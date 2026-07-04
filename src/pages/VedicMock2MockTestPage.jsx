import React from "react";
import MockTest from "../component/MockTest";
import { vedicMock2MockData } from "../data/vedicMock2MockData";

const VedicMock2MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={vedicMock2MockData} onComplete={handleComplete} />
    </div>
  );
};

export default VedicMock2MockTestPage;
