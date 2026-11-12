import React from "react";
import { cellBiologyCellDivisionClassificationOrganismsMicrobiologyTest1MockData } from "../data/cellBiologyCellDivisionClassificationOrganismsMicrobiologyTest1MockData";
import TestSeries from "../component/TestSeries";

const CellBiologyCellDivisionClassificationOrganismsMicrobiologyTest1MockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={cellBiologyCellDivisionClassificationOrganismsMicrobiologyTest1MockData} onComplete={handleComplete} />
    </div>
  );
};

export default CellBiologyCellDivisionClassificationOrganismsMicrobiologyTest1MockTestPage;
