import React from "react";
import TestCard from "../component/TestCard";

const TestPage = () => {
  const testData = [
    {
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Accounts Department Test",
      title: "ACCOUNTS DEPT.",
    },
    {
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Railway Group B Post Test",
      title: "RAILWAY GROUP B POST",
    },
    {
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Railway LDCE GDCE Test",
      title: "RAILWAY LDCE, GDCE",
    },
    {
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Practice Test",
      title: "PRACTICE TEST",
    },
  ];
  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {testData.map((test, index) => (
        <TestCard
          key={index}
          image={test.image}
          alt={test.alt}
          title={test.title}
        />
      ))}
    </div>
  );
};

export default TestPage;
