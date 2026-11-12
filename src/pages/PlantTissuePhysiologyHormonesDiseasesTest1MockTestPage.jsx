import React from "react";
import { plantTissuePhysiologyHormonesDiseasesTest1MockData } from "../data/plantTissuePhysiologyHormonesDiseasesTest1MockData";
import TestSeries from "../component/TestSeries";

const PlantTissuePhysiologyHormonesDiseasesTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={plantTissuePhysiologyHormonesDiseasesTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default PlantTissuePhysiologyHormonesDiseasesTest1MockTestPage;
