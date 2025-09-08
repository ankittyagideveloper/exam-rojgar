const LogoLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-32 h-32">
        <img
          src="./logo-loader2.png"
          alt="Loading..."
          className="w-full h-full object-contain animate-rotateY"
          style={{
            transformStyle: "preserve-3d",
          }}
        />
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LogoLoader;
