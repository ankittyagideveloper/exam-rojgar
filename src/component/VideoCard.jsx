import { useState } from "react";

export function VideoCard({ title, embedUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Container with 16:9 Aspect Ratio */}
      <div
        className={`
          relative w-full pb-[56.25%] rounded-lg overflow-hidden
          shadow-md transition-all duration-300 ease-out
          ${isHovered ? "shadow-xl scale-[1.02]" : "shadow-md"}
        `}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">YouTube Video</p>
    </div>
  );
}
