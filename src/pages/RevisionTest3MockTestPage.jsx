import React from "react";
import MockTest from "../component/MockTest";
import { RevisionTest3MockData } from "../data/RevisionTest3MockData";

const RevisionTest3MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={RevisionTest3MockData} onComplete={handleComplete} />
    </div>
  );
};

export default RevisionTest3MockTestPage;
