import React from "react";
import { ArithmeticSectionalTestMockData } from "../data/ArithmeticSectionalTestMockData";
import TestSeries from "../component/TestSeries";

const ArithmeticSectionalTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <TestSeries testData={ArithmeticSectionalTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ArithmeticSectionalTestMockTestPage;
