import { useState } from "react";

const TestCard = ({ image, alt, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border ${
        isHovered ? "shadow-lg scale-105 bg-[#2C7873]" : "shadow-sm bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <img
          src={image}
          alt={alt}
          className="w-full aspect-square object-contain rounded-lg"
        />
      </div>
      <div className="p-4 pt-0">
        <h3
          className={`text-lg font-semibold text-center transition-colors duration-300 ${
            isHovered ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TestCard;
