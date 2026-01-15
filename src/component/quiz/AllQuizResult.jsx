import React, { useEffect, useRef, useState } from "react";
import questions from "./Quiz-question.json";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CircleX,
  Trophy,
  RefreshCcw,
  Clock1,
  Download,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { getAllSubmissions } from "../../utils/firestoreHelpers";

const calculateRanks = (submissions) => {
  const sorted = [...submissions].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score; // higher score first

    if (a.timeSpentSec !== b.timeSpentSec)
      return a.timeSpentSec - b.timeSpentSec; // faster wins

    return a.startedAt.toMillis() - b.startedAt.toMillis(); // earlier submit wins
  });

  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};

const AllQuizResult = ({
  db,
  testId,
  results,
  userAnswers,
  quizData,
  userId,
  testDetails,
}) => {
  const { categoryId } = useParams();
  const [rank, setRank] = useState(0);
  const [timeSpentInTest, setTimeSpentInTest] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const timeoutRef = useRef(null);
  const [totalSubmission, setTotalSubmissions] = useState(0);
  const loadRanks = async () => {
    setRefreshing(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setRefreshing(false); // reset so re-trigger works
    requestAnimationFrame(() => {
      setRefreshing(true);
    });
    const subs = await getAllSubmissions({ db, testId });

    const ranked = calculateRanks(subs);
    console.log(ranked, "ranked");
    const myRank = ranked.find((r) => r.userId === userId);
    setTotalSubmissions(subs.length);

    setRank(myRank.rank);
    const timeSpent = myRank.timeSpentSec;

    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    setTimeSpentInTest({ minutes, seconds });
    timeoutRef.current = setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };
  useEffect(() => {
    loadRanks();
  }, [testId]);

  const navigate = useNavigate();
  function downloadPDF() {
    window.print();
  }
  return (
    <div className="max-w-6xl mx-auto md:p-6 space-y-6">
      <Card>
        <CardHeader className="relative">
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Results
          </CardTitle>
          <Button
            className="no-print bg-blue-600 text-white px-4 py-2 rounded absolute right-6 hidden md:block"
            onClick={downloadPDF}
          >
            <Download /> Download PDF
          </Button>
          <Button
            className="no-print bg-blue-600 text-white px-4 py-2 rounded absolute right-6 md:hidden block"
            onClick={downloadPDF}
          >
            <Download />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6 mb-6 shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">Your Score</div>

              <div className="flex justify-center items-baseline gap-3">
                <span className="text-5xl font-extrabold text-teal-700">
                  {results?.score}
                </span>
                <span className="text-lg text-gray-500">
                  /{results.totalQuestions /* {testDetails?.maxMarks} */}
                </span>
              </div>

              <div className="mt-2 text-xl font-semibold text-blue-600">
                {results?.percentage}% Accuracy
              </div>
            </div>

            <div className="text-4xl font-bold text-primary mb-2"></div>
            <div className="text-lg text-muted-foreground">
              {results?.correct} out of {results?.totalAttempted} questions
              correct
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            <div className="relative text-center p-4 bg-orange-50 rounded-lg border border-orange-200 shadow-sm">
              {/* Refresh icon (top-right) */}
              <button
                onClick={loadRanks}
                className="absolute top-3 right-3 text-orange-600 hover:text-orange-700 hover:cursor-pointer"
                title="Refresh Rank"
              >
                <RefreshCcw
                  className={`w-5 h-5 transition-transform duration-500 ${
                    refreshing ? "animate-spin" : ""
                  }`}
                />
              </button>

              {/* Trophy */}
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />

              <div className="font-semibold text-orange-800">Current Rank</div>

              <div className="text-3xl font-bold text-orange-600">{rank}</div>

              <div className="text-sm text-orange-600 mt-1">
                Total Submissions: {totalSubmission}
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">Correct</div>
              <div className="text-2xl font-bold text-green-600">
                {results?.correct}
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <CircleX className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="font-semibold text-red-800">In-Correct</div>
              <div className="text-2xl font-bold text-red-600">
                {results?.incorrectCount}
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-800">Attempted</div>
              <div className="text-2xl font-bold text-blue-600">
                {results?.attempted}
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-yellow-800">Marked</div>
              <div className="text-2xl font-bold text-yellow-600">
                {results?.marked}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <XCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-800 dark:text-white">
                Skipped
              </div>
              <div className="text-2xl font-bold text-gray-600">
                {results?.skipped}
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock1 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-800">Time Spent</div>
              <div className="font-bold text-blue-600">
                {timeSpentInTest.minutes} minutes {timeSpentInTest.seconds}
                sec
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Detailed Analysis</h3>
            {quizData?.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect =
                userAnswer?.selectedOption === question?.correctIndex;
              const wasAttempted = userAnswer?.selectedOption !== null;

              return (
                <Card
                  key={question.id}
                  className={`${
                    isCorrect
                      ? "border-green-200"
                      : wasAttempted
                      ? "border-red-200"
                      : "border-gray-200"
                  } `}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">
                        Q{index + 1}: {question.questionText}
                      </h4>
                      <Badge
                        variant={
                          isCorrect
                            ? "default"
                            : wasAttempted
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {isCorrect
                          ? "Correct"
                          : wasAttempted
                          ? "Incorrect"
                          : "Not Attempted"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm dark:text-black ${
                            optionIndex === question.correctIndex
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : optionIndex === userAnswer?.selectedOption &&
                                optionIndex !== question.correctIndex
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-gray-50"
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {optionIndex === question.correctIndex && (
                            <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                          )}
                          {optionIndex === userAnswer?.selectedOption &&
                            optionIndex !== question.correctIndex && (
                              <XCircle className="w-4 h-4 text-red-600 inline ml-2" />
                            )}
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded dark:text-black">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={() => navigate("/quiz-category")} size="lg">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllQuizResult;
