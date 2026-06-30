import React from "react";
import MockTest from "../component/MockTest";
import { postMauryanEmpireMockData } from "../data/postMauryanEmpireMockData";

const PostMauryanEmpireMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
    // You can save results to database here
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={postMauryanEmpireMockData} onComplete={handleComplete} />
    </div>
  );
};

export default PostMauryanEmpireMockTestPage;
