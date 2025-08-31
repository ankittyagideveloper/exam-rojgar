const LiveIndicator = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Pulsing ring animation */}
      <div
        className={`absolute inset-0 ${sizeClasses[size]} bg-red-500 rounded-full animate-ping opacity-75`}
      ></div>
      {/* Static dot */}
      <div
        className={`relative ${sizeClasses[size]} bg-red-500 rounded-full`}
      ></div>
    </div>
  );
};

export default LiveIndicator;
