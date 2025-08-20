export default function Loader() {
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     // Simulate loading time - you can adjust this or tie it to actual loading events
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2500);

  //     return () => clearTimeout(timer);
  //   }, []);

  //   if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, rgb(0, 128, 128), rgb(0, 100, 100), rgb(0, 80, 80))`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative text-center z-10">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ER</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {"Exam Rojgar".split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "1s",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <div className="w-32 h-1 bg-white/60 mx-auto rounded-full">
            <div className="h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p className="text-white/80 text-lg font-medium animate-pulse">
          Loading your success journey...
        </p>
      </div>
    </div>
  );
}
