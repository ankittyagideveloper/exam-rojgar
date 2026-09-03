import React from "react";
import { postMauryanEmpireMockData } from "../data/postMauryanEmpireMockData";
import TestSeries from "../component/TestSeries";

const PostMauryanEmpireMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={postMauryanEmpireMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PostMauryanEmpireMockTestPage;
