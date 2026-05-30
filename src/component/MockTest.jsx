import React, { useState, useEffect, useCallback } from "react";
import {
  IconClock,
  IconCheck,
  IconX,
  IconTrophy,
  IconBrain,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const MockTest = ({ testData, onComplete }) => {
  // Screen states
  const [currentScreen, setCurrentScreen] = useState("home"); // home, countdown, test, result
  const [countdown, setCountdown] = useState(5);

  // Test state
  const [currentLang, setCurrentLang] = useState("eng");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60); // in seconds
  const [mockStarted, setMockStarted] = useState(false);
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  // Question state - 0: Not Visited, 1: Not Answered, 2: Answered, 3: Marked, 4: Answered & Marked
  const [userState, setUserState] = useState(
    Array(testData.questions.length)
      .fill()
      .map(() => ({
        status: 0,
        selectedOption: null,
        timeSpent: 0,
      })),
  );

  const [qStartTime, setQStartTime] = useState(0);
  const [analysisFilter, setAnalysisFilter] = useState("all");

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (mockStarted && !mockSubmitted) {
        e.preventDefault();
        e.returnValue =
          "Do you want to leave the test? Progress might be lost.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [mockStarted, mockSubmitted]);

  // Timer effect
  useEffect(() => {
    if (mockStarted && !mockSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mockStarted, mockSubmitted, timeLeft]);

  // Countdown effect
  useEffect(() => {
    if (currentScreen === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          startMock();
        } else {
          setCountdown(countdown - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, countdown]);

  const startCountdown = () => {
    setCurrentScreen("countdown");
    setCountdown(5);
  };

  const startMock = () => {
    setMockStarted(true);
    const newState = Array(testData.questions.length)
      .fill()
      .map(() => ({
        status: 0,
        selectedOption: null,
        timeSpent: 0,
      }));
    newState[0].status = 1; // Mark first question as visited
    setUserState(newState);
    setCurrentScreen("test");
    setQStartTime(Date.now());
  };

  const recordTime = () => {
    if (qStartTime > 0) {
      const elapsed = Math.floor((Date.now() - qStartTime) / 1000);
      setUserState((prev) => {
        const newState = [...prev];
        newState[currentQIndex].timeSpent += elapsed;
        return newState;
      });
    }
  };

  const selectOption = (index) => {
    setUserState((prev) => {
      const newState = [...prev];
      newState[currentQIndex].selectedOption = index;

      // Update status
      if (newState[currentQIndex].status === 3) {
        newState[currentQIndex].status = 4; // Answered & Marked
      } else if (newState[currentQIndex].status !== 4) {
        newState[currentQIndex].status = 2; // Answered
      }

      return newState;
    });
  };

  const markForReview = () => {
    setUserState((prev) => {
      const newState = [...prev];
      const current = newState[currentQIndex];

      if (current.selectedOption !== null) {
        current.status = 4; // Answered & Marked
      } else {
        current.status = 3; // Marked
      }

      return newState;
    });
  };

  const clearResponse = () => {
    setUserState((prev) => {
      const newState = [...prev];
      newState[currentQIndex].selectedOption = null;

      if (newState[currentQIndex].status === 4) {
        newState[currentQIndex].status = 3; // Back to Marked
      } else if (newState[currentQIndex].status === 2) {
        newState[currentQIndex].status = 1; // Back to Not Answered
      }

      return newState;
    });
  };

  const saveAndNext = () => {
    recordTime();

    if (currentQIndex < testData.questions.length - 1) {
      const nextIndex = currentQIndex + 1;
      setCurrentQIndex(nextIndex);

      setUserState((prev) => {
        const newState = [...prev];
        if (newState[nextIndex].status === 0) {
          newState[nextIndex].status = 1; // Mark as visited
        }
        return newState;
      });

      setQStartTime(Date.now());
    }
  };

  const jumpToQuestion = (index) => {
    recordTime();
    setCurrentQIndex(index);

    setUserState((prev) => {
      const newState = [...prev];
      if (newState[index].status === 0) {
        newState[index].status = 1;
      }
      return newState;
    });

    setQStartTime(Date.now());
    setShowMobilePalette(false);
  };

  const requestSubmit = () => {
    setShowSubmitPopup(true);
  };

  const executeSubmit = () => {
    recordTime();
    setMockSubmitted(true);
    setShowSubmitPopup(false);
    setCurrentScreen("result");

    if (onComplete) {
      onComplete(calculateResults());
    }
  };

  const handleAutoSubmit = () => {
    recordTime();
    setMockSubmitted(true);
    setCurrentScreen("result");
  };

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let attempted = 0;

    userState.forEach((state, idx) => {
      if (state.selectedOption !== null) {
        attempted++;
        if (state.selectedOption === testData.questions[idx].ans) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const score = correct * 1 - wrong * 0.33;
    const accuracy =
      attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0;

    // Rank calculation
    const MAX_SCORE = testData.questions.length * 1;
    const M = Math.max(0, score);
    let percent, rank;

    if (M >= 45) {
      percent = 99.0 + ((M - 45) / 5) * 1.0;
      rank = 50 - ((M - 45) / 5) * 49;
    } else if (M >= 35) {
      percent = 85 + ((M - 35) / 9) * 14;
      rank = 500 - ((M - 35) / 9) * 450;
    } else if (M >= 25) {
      percent = 60 + ((M - 25) / 9) * 25;
      rank = 2500 - ((M - 25) / 9) * 2000;
    } else if (M >= 10) {
      percent = 30 + ((M - 10) / 14) * 30;
      rank = 4500 - ((M - 10) / 14) * 2000;
    } else {
      percent = ((M - 0) / 9) * 30;
      rank = 5000 - ((M - 0) / 9) * 500;
    }

    rank = Math.max(1, Math.round(rank));
    percent = percent > 100 ? 100 : percent;

    return {
      score: score.toFixed(1),
      maxScore: MAX_SCORE,
      attempted,
      correct,
      wrong,
      accuracy,
      rank,
      percentile: percent.toFixed(2),
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusCounts = () => {
    const counts = {
      answered: 0,
      notAnswered: 0,
      notVisited: 0,
      marked: 0,
      answeredMarked: 0,
    };

    userState.forEach((state) => {
      if (state.status === 0) counts.notVisited++;
      else if (state.status === 1) counts.notAnswered++;
      else if (state.status === 2) counts.answered++;
      else if (state.status === 3) counts.marked++;
      else if (state.status === 4) counts.answeredMarked++;
    });

    return counts;
  };

  const getPaletteButtonClass = (status, isActive) => {
    let baseClass =
      "w-10 h-10 flex items-center justify-center font-semibold text-sm cursor-pointer transition-all ";

    if (isActive) {
      baseClass += "ring-2 ring-blue-600 scale-110 ";
    }

    if (status === 0)
      return baseClass + "bg-gray-200 text-gray-700 border border-gray-300";
    if (status === 1) return baseClass + "bg-red-500 text-white rounded-br-2xl";
    if (status === 2)
      return baseClass + "bg-green-500 text-white rounded-tl-2xl";
    if (status === 3)
      return baseClass + "bg-purple-500 text-white rounded-full";
    if (status === 4)
      return baseClass + "bg-purple-500 text-white rounded-full relative";

    return baseClass;
  };

  // Render functions for each screen
  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white flex flex-col items-center py-10 px-4 overflow-y-auto">
      <div className="max-w-4xl w-full text-center mt-8 z-10">
        <h2 className="text-xl md:text-2xl text-yellow-400 mb-2 font-semibold">
          Hi, Welcome to
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
          {testData.title}
        </h1>
        <p className="text-sm md:text-lg text-slate-300 font-medium mb-4">
          {testData.subtitle}
        </p>
        <p className="text-lg md:text-xl text-blue-400 font-semibold bg-blue-400/10 inline-block px-4 py-1 rounded-full border border-blue-400/30 mb-8">
          {testData.category}
        </p>

        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          "Speed + Accuracy = Selection"
        </h3>

        <button
          onClick={startCountdown}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-10 rounded-lg text-xl md:text-2xl shadow-xl transition-all transform hover:scale-105 w-full md:w-auto"
        >
          I AM READY TO BEGIN
        </button>
      </div>

      <div className="max-w-5xl w-full mt-16 z-10">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h3 className="text-3xl font-bold text-center mb-4">
            Elite Mentor Strategy
          </h3>
          <blockquote className="text-center text-lg md:text-xl italic text-slate-300 mb-8 border-l-4 border-blue-400 pl-4 py-2 mx-auto max-w-3xl bg-slate-800/30 rounded-r">
            "If you are targeting all {testData.questions.length} questions, you
            are already making a mistake. Selection comes from solving the right
            questions — not all."
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors">
              <div className="text-red-500 text-3xl mb-3">
                <IconClock />
              </div>
              <h4 className="text-xl font-bold mb-2">3–5 Sec Rule</h4>
              <p className="text-slate-300 text-sm">
                Can you see a direct formula or clear steps? Is it solvable in
                30 sec?{" "}
                <span className="text-red-500 font-bold">
                  If NO → SKIP immediately.
                </span>
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors">
              <div className="text-yellow-400 text-3xl mb-3">
                <IconX />
              </div>
              <h4 className="text-xl font-bold mb-2">Skip in Round 1</h4>
              <ul className="text-slate-300 text-sm list-disc pl-4 space-y-1">
                <li>Lengthy calculations</li>
                <li>Tricky language</li>
                <li>DI-heavy questions</li>
                <li>Entirely new patterns</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors">
              <div className="text-green-500 text-3xl mb-3">
                <IconCheck />
              </div>
              <h4 className="text-xl font-bold mb-2">Target System</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>Total Qs: {testData.questions.length}</li>
                <li>
                  Time:{" "}
                  <span className="text-yellow-400 font-bold">
                    {testData.duration} Minutes
                  </span>
                </li>
                <li>
                  Target Attempt:{" "}
                  <span className="text-yellow-400 font-bold">20+</span>
                </li>
                <li>Target Accuracy: 100%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCountdownScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl font-bold mb-8">Your Mock Begins In...</h2>
      <div className="text-9xl font-bold text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
        {countdown}
      </div>
    </div>
  );

  const renderTestScreen = () => {
    const currentQ = testData.questions[currentQIndex];
    const currentState = userState[currentQIndex];
    const counts = getStatusCounts();
    const options = currentLang === "eng" ? currentQ.optE : currentQ.optH;
    const questionText = currentLang === "eng" ? currentQ.eng : currentQ.hin;

    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-300 shadow-sm flex flex-col md:flex-row justify-between items-center px-3 md:px-4 py-2 gap-2 z-10">
          <div className="font-bold text-base md:text-lg text-slate-800">
            {testData.title}
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                View In:
              </span>
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs md:text-sm bg-gray-50 outline-none focus:border-blue-500"
              >
                <option value="eng">English</option>
                <option value="hin">Hindi</option>
              </select>
            </div>
            <div className="bg-gray-100 border border-gray-300 px-2 md:px-4 py-1 rounded flex items-center gap-2 font-mono text-sm md:text-lg font-bold text-slate-700">
              <IconClock className="text-blue-500" size={20} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={requestSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 md:py-1.5 px-3 md:px-6 rounded shadow transition-colors text-xs md:text-base"
            >
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Question Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Question Header */}
            <div className="border-b border-gray-200 p-2 md:p-3 bg-gray-50 flex justify-between items-center">
              <div className="font-bold text-blue-800 text-sm md:text-lg flex items-center gap-2">
                <span>Q.</span>
                <span className="bg-blue-100 px-2 py-0.5 rounded text-blue-900 border border-blue-200">
                  {currentQIndex + 1}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-xs font-semibold text-gray-600 hidden sm:inline">
                  Marks: +1.0, -0.33
                </span>
                <button
                  onClick={() => setShowMobilePalette(!showMobilePalette)}
                  className="md:hidden text-blue-600 font-bold flex items-center gap-1 border border-blue-600 px-3 py-1 rounded bg-blue-50 text-xs"
                >
                  <span>☰</span> Palette
                </button>
              </div>
            </div>

            {/* Question Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="mb-6 font-medium text-slate-800 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                {questionText}
              </div>
              <div className="space-y-3 max-w-3xl">
                {options.map((optText, i) => {
                  const isSelected = currentState.selectedOption === i;
                  return (
                    <div
                      key={i}
                      onClick={() => selectOption(i)}
                      className={`p-3 rounded flex items-center gap-3 cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-blue-50 border-blue-600"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${isSelected ? "text-blue-900" : "text-slate-700"}`}
                      >
                        {String.fromCharCode(65 + i)}. {optText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border-t border-gray-300 md:bg-gray-50 p-2 md:p-4 flex flex-col sm:flex-row gap-2 justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={markForReview}
                  className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 md:py-2 px-2 md:px-6 rounded text-xs md:text-sm transition-colors"
                >
                  Mark Review
                </button>
                <button
                  onClick={clearResponse}
                  className="flex-1 sm:flex-none bg-white hover:bg-gray-100 text-gray-700 border border-gray-400 font-semibold py-2.5 md:py-2 px-2 md:px-6 rounded text-xs md:text-sm transition-colors"
                >
                  Clear
                </button>
              </div>

              <button
                onClick={saveAndNext}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-2 px-8 rounded text-sm md:text-base shadow-md transition-colors uppercase"
              >
                Save & Next
              </button>
            </div>
          </div>

          {/* Palette Panel */}
          <div
            className={`${
              showMobilePalette ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0 fixed inset-y-0 right-0 md:relative w-[85%] md:w-80 bg-white shadow-xl md:shadow-none md:border-l border-gray-300 z-50 transition-transform duration-300 flex flex-col`}
          >
            <div className="p-3 bg-blue-600 text-white font-bold flex justify-between items-center">
              <span>Question Palette</span>
              <button
                className="md:hidden text-white"
                onClick={() => setShowMobilePalette(false)}
              >
                <IconX size={24} />
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-2 text-xs border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-tl-2xl" />
                <span>Answered ({counts.answered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-br-2xl" />
                <span>Not Answered ({counts.notAnswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 border border-gray-300" />
                <span>Not Visited ({counts.notVisited})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full" />
                <span>Marked ({counts.marked + counts.answeredMarked})</span>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto bg-blue-50/30">
              <div className="font-bold text-gray-700 mb-3 border-b pb-1">
                {testData.category}
              </div>
              <div className="grid grid-cols-5 gap-3">
                {userState.map((state, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToQuestion(idx)}
                    className={getPaletteButtonClass(
                      state.status,
                      idx === currentQIndex,
                    )}
                  >
                    {idx + 1}
                    {state.status === 4 && (
                      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Popup */}
        {showSubmitPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="bg-slate-800 p-4 text-white flex items-center gap-3 rounded-t-xl">
                <IconX className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold">Confirm Submission</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-700 text-lg mb-2">
                  Are you sure you want to submit the test?
                </p>
                <p className="text-sm text-red-600 font-semibold mb-6">
                  Once submitted, you cannot change your answers.
                </p>

                <div className="grid grid-cols-2 gap-4 text-center text-sm mb-6 bg-slate-50 p-4 rounded-lg border">
                  <div>
                    <span className="block font-bold text-xl text-green-600">
                      {counts.answered + counts.answeredMarked}
                    </span>
                    Answered
                  </div>
                  <div>
                    <span className="block font-bold text-xl text-slate-500">
                      {testData.questions.length -
                        counts.answered -
                        counts.answeredMarked}
                    </span>
                    Unanswered
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowSubmitPopup(false)}
                    className="px-5 py-2 border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeSubmit}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold shadow transition-colors"
                  >
                    Yes, Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderResultScreen = () => {
    const results = calculateResults();

    let feedbackMsg, feedbackSub, feedbackColor;
    const score = parseFloat(results.score);

    if (score >= 40) {
      feedbackMsg = "Excellent performance! You are on the path of selection.";
      feedbackSub =
        "Target next mock: Maintain this consistency and aim for 45+.";
      feedbackColor = "bg-green-50";
    } else if (score >= 35) {
      feedbackMsg = "Very Good attempt! Selection zone ke paas ho.";
      feedbackSub = "Suggest improvement + push for 40+ next time.";
      feedbackColor = "bg-blue-50";
    } else if (score >= 25) {
      feedbackMsg = "Decent start but needs solid improvement.";
      feedbackSub = "Focus on weak areas and accuracy. Next target: 35+.";
      feedbackColor = "bg-yellow-50";
    } else {
      feedbackMsg = "No issue, this is your starting point.";
      feedbackSub =
        "Deeply analyze your mistakes below. Build concepts before speed.";
      feedbackColor = "bg-red-50";
    }

    const filteredQuestions = testData.questions.filter((q, idx) => {
      const state = userState[idx];
      const isAttempted = state.selectedOption !== null;
      const isCorrect = isAttempted && state.selectedOption === q.ans;

      if (analysisFilter === "correct") return isCorrect;
      if (analysisFilter === "wrong") return isAttempted && !isCorrect;
      if (analysisFilter === "skipped") return !isAttempted;
      return true;
    });

    return (
      <div className="min-h-screen bg-slate-50 overflow-y-auto">
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Performance Dashboard</h1>
              <p className="text-blue-400 font-medium mt-1">{testData.title}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20">
          {/* Feedback & Rank */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className={`lg:col-span-2 bg-white rounded-xl shadow-sm border p-6 relative overflow-hidden`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full transform translate-x-10 -translate-y-10 ${feedbackColor}`}
              />
              <h2 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-2">
                Mentor Review
              </h2>
              <div className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-4">
                {feedbackMsg}
              </div>
              <p className="text-slate-600 font-medium">{feedbackSub}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl shadow-lg p-6 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
              <IconTrophy
                className="absolute top-[-20px] left-[-20px] text-white opacity-10 transform -rotate-12"
                size={120}
              />
              <div className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-1">
                All India Rank
              </div>
              <div className="text-5xl font-black mb-2">
                {results.rank.toLocaleString()}
              </div>
              <div className="text-blue-100 font-medium">Out of 5000 users</div>
              <div className="mt-4 pt-4 border-t border-blue-500/50 w-full flex justify-between items-center">
                <span className="text-sm font-semibold">Percentile:</span>
                <span className="text-xl font-bold text-yellow-400">
                  {results.percentile}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
              <div className="text-slate-500 text-sm font-semibold mb-1">
                Final Score
              </div>
              <div className="text-3xl font-bold text-slate-800">
                {results.score}/{results.maxScore}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
              <div className="text-slate-500 text-sm font-semibold mb-1">
                Attempted
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {results.attempted}/{testData.questions.length}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
              <div className="text-slate-500 text-sm font-semibold mb-1">
                Correct / Wrong
              </div>
              <div className="text-2xl font-bold">
                <span className="text-green-500">{results.correct}</span>
                <span className="text-slate-300"> / </span>
                <span className="text-red-500">{results.wrong}</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
              <div className="text-slate-500 text-sm font-semibold mb-1">
                Accuracy
              </div>
              <div className="text-3xl font-bold text-yellow-500">
                {results.accuracy}%
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div>
            <div className="flex justify-between items-center mb-4 mt-8">
              <h3 className="text-2xl font-bold text-slate-800">
                Detailed Question Analysis
              </h3>
              <div className="flex gap-2">
                {["all", "correct", "wrong", "skipped"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAnalysisFilter(filter)}
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      analysisFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {filteredQuestions.map((q, originalIdx) => {
                const idx = testData.questions.indexOf(q);
                const state = userState[idx];
                const isAttempted = state.selectedOption !== null;
                const isCorrect = isAttempted && state.selectedOption === q.ans;

                let badge;
                if (!isAttempted) {
                  badge = (
                    <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Skipped
                    </span>
                  );
                } else if (isCorrect) {
                  badge = (
                    <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                      <IconCheck size={14} /> Correct
                    </span>
                  );
                } else {
                  badge = (
                    <span className="bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                      <IconX size={14} /> Incorrect
                    </span>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <div className="bg-slate-50 border-b p-4 flex justify-between items-center">
                      <span className="font-bold text-slate-800">
                        Question {idx + 1}
                      </span>
                      {badge}
                    </div>
                    <div className="p-5">
                      <div className="mb-6">
                        <p className="text-slate-800 font-medium mb-3 whitespace-pre-wrap">
                          <span className="font-bold text-blue-600">EN:</span>{" "}
                          {q.eng}
                        </p>
                        <p className="text-slate-600 font-medium whitespace-pre-wrap">
                          <span className="font-bold text-blue-600">HI:</span>{" "}
                          {q.hin}
                        </p>
                      </div>

                      <div className="mb-6 max-w-3xl space-y-2">
                        {q.optE.map((optText, i) => {
                          let optClass = "border-slate-200 bg-white";
                          let marker = null;

                          if (i === q.ans) {
                            optClass =
                              "border-green-500 bg-green-50 font-bold text-green-900";
                            marker = (
                              <IconCheck
                                className="text-green-500 ml-auto"
                                size={20}
                              />
                            );
                          } else if (
                            isAttempted &&
                            state.selectedOption === i
                          ) {
                            optClass =
                              "border-red-500 bg-red-50 font-bold text-red-900";
                            marker = (
                              <IconX
                                className="text-red-500 ml-auto"
                                size={20}
                              />
                            );
                          }

                          return (
                            <div
                              key={i}
                              className={`p-3 border rounded flex items-center ${optClass}`}
                            >
                              <span className="mr-3 font-semibold">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              <span>{optText}</span>
                              {marker}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mb-6 p-4 bg-slate-50 rounded border flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-slate-500 font-semibold">
                            Your Answer:{" "}
                          </span>
                          <span
                            className={`font-bold ${isCorrect ? "text-green-600" : isAttempted ? "text-red-600" : "text-slate-500"}`}
                          >
                            {isAttempted
                              ? String.fromCharCode(65 + state.selectedOption)
                              : "Not Attempted"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold">
                            Correct Answer:{" "}
                          </span>
                          <span className="font-bold text-green-600">
                            {String.fromCharCode(65 + q.ans)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold">
                            Time Spent:{" "}
                          </span>
                          <span className="font-bold text-slate-700">
                            {state.timeSpent} sec
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 rounded-lg border border-blue-100 p-5">
                        <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
                          <IconBrain size={20} /> Detailed Solution
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-wider">
                              English Explanation
                            </div>
                            <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                              {q.solE}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-wider">
                              Hindi Explanation
                            </div>
                            <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                              {q.solH}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="w-full h-screen">
      {currentScreen === "home" && renderHomeScreen()}
      {currentScreen === "countdown" && renderCountdownScreen()}
      {currentScreen === "test" && renderTestScreen()}
      {currentScreen === "result" && renderResultScreen()}
    </div>
  );
};

export default MockTest;

// Made with Bob
