export default function TestCard2(props) {
  const { icon, studentCount, title, progress, total, percentage, onGoToTest } =
    props;

  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mx-auto h-full"
      style={{
        background:
          "linear-gradient(rgba(144, 19, 254, 0.2) 0%, rgba(255, 255, 255, 0) 30%, white 100%)",
        padding: "1rem",
        maxWidth: "280px",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
          {icon}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-xs">⚡</span>
          <span className="text-xs font-medium text-gray-600">
            {studentCount} Students
          </span>
        </div>
      </div>

      <h3 className="text-gray-800 font-semibold text-base leading-tight mb-4 min-h-10">
        {title}
      </h3>

      <div className="flex items-center justify-between mb-2 text-gray-600">
        <span className="text-xs font-medium">
          {progress}/{total}
        </span>
        <span className="text-xs font-medium">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-cyan-400 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <button
        onClick={onGoToTest}
        className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        {progress === total
          ? "Completed!"
          : progress === 0
          ? "Start Test Series"
          : "Continue Tests"}
      </button>
    </div>
  );
}
