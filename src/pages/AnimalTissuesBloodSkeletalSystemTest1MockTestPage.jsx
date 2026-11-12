import React from "react";
import { animalTissuesBloodSkeletalSystemTest1MockData } from "../data/animalTissuesBloodSkeletalSystemTest1MockData";
import TestSeries from "../component/TestSeries";

const AnimalTissuesBloodSkeletalSystemTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={animalTissuesBloodSkeletalSystemTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default AnimalTissuesBloodSkeletalSystemTest1MockTestPage;
