import React from "react";
import TestCard from "../component/TestCard";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: "100",
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Accounts Department Test",
      title: "Rly Accounts Dept.2A, 3A, LDCE",
    },
    {
      id: "101",
      image:
        "https://snwallah.com/assets/categories/0956768f1fd62a59c8a4d701e32f1365.png",
      alt: "Railway Group B Post Test",
      title: "RAILWAY GROUP B POST",
    },
    {
      id: "102",
      image:
        "https://snwallah.com/assets/categories/ca9ef0193155e688cce675ac58c54f45.jpg",
      alt: "Railway LDCE GDCE Test",
      title: "RAILWAY LDCE, GDCE",
    },
    {
      id: "103",
      image:
        "https://snwallah.com/assets/categories/ca9ef0193155e688cce675ac58c54f45.jpg",
      alt: "Practice Test",
      title: "PRACTICE TEST",
    },
  ];

  const handleTest = (id) => {
    navigate(`/all-test/${id}`);
  };
  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {categories.map((test, index) => (
        <TestCard
          onClick={() => handleTest(test.id)}
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
