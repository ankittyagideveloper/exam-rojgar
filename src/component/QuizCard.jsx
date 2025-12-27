"use client";

export function QuizCard({
  title,
  date,
  questions,
  marks,
  duration,
  languages,
  userCount,
  isFree = false,
  isNewInterface = false,
  onStartClick,
  attemptStatus,
}) {
  const formatLanguages = (langs) => {
    if (langs.length <= 2) {
      return langs.join(", ");
    }
    const displayed = langs.slice(0, 2);
    const remaining = langs.length - 2;
    return `${displayed.join(", ")} + ${remaining} More`;
  };
  const isSubmitted = attemptStatus === "SUBMITTED";
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-3 transition-shadow relative mt-1">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          {isFree && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              FREE
            </span>
          )}
          {isNewInterface && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW INTERFACE
            </span>
          )}
        </div>

        {/* Title and Button */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-sm font-medium text-gray-900 leading-tight flex-1">
            {title}
          </h3>
          <div className="flex flex-col gap-1">
            <button
              disabled={attemptStatus === "SUBMITTED"}
              onClick={onStartClick}
              className={`${
                isSubmitted ? " bg-gray-300 hover:bg-gray-300" : ""
              } cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors whitespace-nowrap`}
            >
              {attemptStatus === "IN_PROGRESS"
                ? "Resume"
                : attemptStatus === "SUBMITTED"
                ? "SUBMITTED"
                : "Start Now"}
            </button>
            {attemptStatus === "SUBMITTED" && (
              <button
                onClick={onStartClick}
                className={`cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors whitespace-nowrap`}
              >
                Last Attempt
              </button>
            )}
          </div>
        </div>

        {/* Quiz Details */}
        <div className="text-xs text-gray-500 mb-3">
          {questions} Questions | {marks} Marks | {duration} Mins.
        </div>

        {/* Languages */}
        {/* <div className="flex items-center text-xs text-cyan-500">
          <span className="mr-1">🏳️</span>
          {formatLanguages(languages)}
        </div> */}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {isFree && (
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  FREE
                </span>
              )}
              {isNewInterface && (
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  NEW INTERFACE
                </span>
              )}
            </div>

            {/* Title and User Count */}
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-sm font-medium text-gray-900">{title}</h4>
              {userCount && (
                <div className="flex items-center text-sm text-gray-500">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  {userCount} Users
                </div>
              )}
            </div>

            {/* Quiz Details */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 ">
              <div className="flex items-center gap-1">
                <span className="text-gray-400 p-1">❓</span>
                {questions} Questions
              </div>
              <div className="flex items-center gap-1 ">
                <span className="text-gray-400 p-1">📋</span>
                {marks} Marks
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 p-1">⏱️</span>
                {duration} Mins
              </div>
            </div>

            {/* Languages */}
            {/* <div className="flex items-center text-sm text-cyan-500">
              <span className="mr-2">🏳️</span>
              {formatLanguages(languages)}
            </div> */}
          </div>

          {/* Start Button */}
          <div className="ml-6">
            <div className="flex flex-col gap-1">
              <button
                disabled={attemptStatus === "SUBMITTED"}
                onClick={onStartClick}
                className={`${
                  isSubmitted ? " bg-gray-300 hover:bg-gray-300" : ""
                } cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors whitespace-nowrap`}
              >
                {attemptStatus === "IN_PROGRESS"
                  ? "Resume"
                  : attemptStatus === "SUBMITTED"
                  ? "SUBMITTED"
                  : "Start Now"}
              </button>
              {attemptStatus === "SUBMITTED" && (
                <button
                  onClick={() => onStartClick(true)}
                  className={`cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors whitespace-nowrap`}
                >
                  Last Attempt
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
