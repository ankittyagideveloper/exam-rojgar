import React from "react";
import MockTest from "../component/MockTest";
import { ArithmeticSectionalTestMockData } from "../data/ArithmeticSectionalTestMockData";

const ArithmeticSectionalTestMockTestPage = () => {
  const handleComplete = (results) => {
    console.log("Test completed with results:", results);
  };

  return (
    <div className="w-full h-screen">
      <MockTest testData={ArithmeticSectionalTestMockData} onComplete={handleComplete} />
    </div>
  );
};

export default ArithmeticSectionalTestMockTestPage;
