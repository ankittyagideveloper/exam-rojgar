import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Clock, Star, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";
import questions from "./Quiz-question.json";

export default function QuizComponent() {
  const { categoryId } = useParams();
  const quizData = questions[categoryId] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Initialize user answers
  useEffect(() => {
    const initialAnswers = quizData.questions.map((q) => ({
      questionId: q.id,
      selectedOption: null,
      status: "not-viewed",
      timeSpent: 0,
    }));
    initialAnswers[0].status = "not-viewed";
    setUserAnswers(initialAnswers);
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isQuizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isQuizCompleted]);

  // Update question start time when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now());
    // Mark current question as viewed if not already marked
    if (
      userAnswers.length > 0 &&
      userAnswers[currentQuestion]?.status === "not-viewed"
    ) {
      updateQuestionStatus(currentQuestion, "skipped");
    }
  }, [currentQuestion]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const updateQuestionStatus = (questionIndex, status) => {
    setUserAnswers((prev) =>
      prev.map((answer, index) =>
        index === questionIndex ? { ...answer, status } : answer
      )
    );
  };

  const saveAnswer = (questionIndex, optionIndex) => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    setUserAnswers((prev) =>
      prev.map((answer, index) =>
        index === questionIndex
          ? {
              ...answer,
              selectedOption: optionIndex,
              status: "attempted",
              timeSpent: answer.timeSpent + timeSpent,
            }
          : answer
      )
    );
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleMarkAndNext = () => {
    if (selectedOption !== null) {
      saveAnswer(currentQuestion, selectedOption);
    }
    updateQuestionStatus(currentQuestion, "marked");
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(
        userAnswers[currentQuestion + 1]?.selectedOption || null
      );
    }
  };

  const handleSaveAndNext = () => {
    if (selectedOption !== null) {
      saveAnswer(currentQuestion, selectedOption);
    }
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(
        userAnswers[currentQuestion + 1]?.selectedOption || null
      );
    }
  };

  const handleClear = () => {
    setSelectedOption(null);
    setUserAnswers((prev) =>
      prev.map((answer, index) =>
        index === currentQuestion
          ? { ...answer, selectedOption: null, status: "skipped" }
          : answer
      )
    );
  };

  const handleQuestionNavigation = (questionIndex) => {
    if (selectedOption !== null) {
      saveAnswer(currentQuestion, selectedOption);
    }
    setCurrentQuestion(questionIndex);
    setSelectedOption(userAnswers[questionIndex]?.selectedOption || null);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption !== null) {
      saveAnswer(currentQuestion, selectedOption);
    }
    setIsQuizCompleted(true);
  };

  const calculateResults = () => {
    let correct = 0;
    let attempted = 0;
    let marked = 0;
    let skipped = 0;
    let notViewed = 0;

    userAnswers.forEach((answer, index) => {
      if (
        answer.selectedOption !== null &&
        answer.selectedOption ===
          parseInt(quizData.questions[index].correctAnswer)
      ) {
        correct++;
      }

      switch (answer.status) {
        case "attempted":
          attempted++;
          break;
        case "marked":
          marked++;
          break;
        case "skipped":
          skipped++;
          break;
        case "not-viewed":
          notViewed++;
          break;
      }
    });

    const totalAttempted = userAnswers.filter(
      (a) => a.selectedOption !== null
    ).length;
    const percentage =
      totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;

    return {
      correct,
      attempted,
      marked,
      skipped,
      notViewed,
      totalAttempted,
      percentage,
    };
  };

  if (isQuizCompleted) {
    const results = calculateResults();

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {results.percentage}%
              </div>
              <div className="text-lg text-muted-foreground">
                {results.correct} out of {results.totalAttempted} questions
                correct
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-800">Correct</div>
                <div className="text-2xl font-bold text-green-600">
                  {results.correct}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-800">Attempted</div>
                <div className="text-2xl font-bold text-blue-600">
                  {results.attempted}
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="font-semibold text-yellow-800">Marked</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {results.marked}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <XCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">Skipped</div>
                <div className="text-2xl font-bold text-gray-600">
                  {results.skipped}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Detailed Analysis</h3>
              {quizData.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect =
                  userAnswer.selectedOption === question.correctAnswer;
                const wasAttempted = userAnswer.selectedOption !== null;

                return (
                  <Card
                    key={question.id}
                    className={`${
                      isCorrect
                        ? "border-green-200"
                        : wasAttempted
                        ? "border-red-200"
                        : "border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">
                          Q{question.id}: {question.question}
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
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-100 text-green-800 border border-green-300"
                                : optionIndex === userAnswer.selectedOption &&
                                  optionIndex !== question.correctAnswer
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : "bg-gray-50"
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                            )}
                            {optionIndex === userAnswer.selectedOption &&
                              optionIndex !== question.correctAnswer && (
                                <XCircle className="w-4 h-4 text-red-600 inline ml-2" />
                              )}
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button onClick={() => window.location.reload()} size="lg">
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];
  const results = calculateResults();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Quiz Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {currentQuestion + 1}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-lg">
                      {formatTime(timeRemaining)} min left
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default" className="bg-green-600">
                      +{results.correct}
                    </Badge>
                    <Badge variant="destructive">
                      -{results.totalAttempted - results.correct}
                    </Badge>
                    <Badge variant="secondary">EN</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Question Content */}
          <Card>
            {/* <CardHeader>
              <CardTitle className="text-lg">
                {quizData.title} is done for -
              </CardTitle>
            </CardHeader> */}
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-lg whitespace-pre-line">
                  {currentQuestion + 1}. {currentQuestionData.question}
                </h3>
                {currentQuestionData?.image ? (
                  <img
                    height={300}
                    width={300}
                    src={currentQuestionData.image}
                    alt={currentQuestionData.id + 1}
                  />
                ) : null}

                <div className="space-y-2">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedOption === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleMarkAndNext}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  MARK & NEXT
                </Button>
                <Button onClick={handleClear} variant="secondary">
                  CLEAR
                </Button>
                <Button
                  onClick={
                    currentQuestion === quizData.questions.length - 1
                      ? handleSubmitQuiz
                      : handleSaveAndNext
                  }
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {currentQuestion === quizData.questions.length - 1
                    ? "SUBMIT"
                    : "SAVE & NEXT"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions Analysis Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-teal-600 text-white">
              <CardTitle>Questions Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Legend */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Marked For Review</span>
                  <div className="ml-auto bg-teal-600 text-white px-2 py-1 rounded text-xs">
                    Attempted
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Skipped</span>
                  <div className="ml-auto bg-gray-300 px-2 py-1 rounded text-xs">
                    Not Viewed
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-1 text-center text-sm">
                <div>
                  <Star className="w-4 h-4 text-yellow-500 mx-auto" />
                  <div className="font-bold">{results.marked}</div>
                </div>
                <div>
                  <div className="w-4 h-4 bg-teal-600 rounded mx-auto"></div>
                  <div className="font-bold">{results.attempted}</div>
                </div>
                <div>
                  <div className="font-bold">{results.skipped}</div>
                </div>
                <div>
                  <div className="font-bold">{results.notViewed}</div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-6 gap-1">
                {quizData.questions.map((_, index) => {
                  const answer = userAnswers[index];
                  const status = answer?.status || "not-viewed";

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionNavigation(index)}
                      className={`w-8 h-8 text-xs font-medium rounded border-2 transition-colors ${
                        currentQuestion === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : status === "attempted"
                          ? "bg-teal-600 text-white border-teal-600"
                          : status === "marked"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                          : status === "skipped"
                          ? "bg-gray-100 text-gray-600 border-gray-300"
                          : "bg-white text-gray-400 border-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      ((results.attempted + results.marked) /
                        quizData.questions.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    ((results.attempted + results.marked) /
                      quizData.questions.length) *
                    100
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
