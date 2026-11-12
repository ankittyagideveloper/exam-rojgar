import React from "react";
import { plantMorphologyReproductionTest1MockData } from "../data/plantMorphologyReproductionTest1MockData";
import TestSeries from "../component/TestSeries";

const PlantMorphologyReproductionTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={plantMorphologyReproductionTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default PlantMorphologyReproductionTest1MockTestPage;
