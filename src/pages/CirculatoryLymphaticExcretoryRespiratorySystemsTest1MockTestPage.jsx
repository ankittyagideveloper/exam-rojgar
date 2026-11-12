import React from "react";
import { circulatoryLymphaticExcretoryRespiratorySystemsTest1MockData } from "../data/circulatoryLymphaticExcretoryRespiratorySystemsTest1MockData";
import TestSeries from "../component/TestSeries";

const CirculatoryLymphaticExcretoryRespiratorySystemsTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={circulatoryLymphaticExcretoryRespiratorySystemsTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default CirculatoryLymphaticExcretoryRespiratorySystemsTest1MockTestPage;
