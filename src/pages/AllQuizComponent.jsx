import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Clock } from "lucide-react";
import { useParams } from "react-router-dom";

import AllQuizAnalysis from "../component/quiz/AllQuizAnalysis";
import AllQuizResult from "../component/quiz/AllQuizResult";
import { LoaderOne } from "../components/ui/loader";
import { useAttemptData, useQuizData } from "../hooks/QueryData";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import QuizHeader from "../component/quiz/QuizHeader";
import { ConfirmationModal } from "../component/modals/confirmation-modal";
import { TestSubmissionModal } from "../component/modals/test-submission-modal";
import { useTranslation } from "react-i18next";

const db = getFirestore(app);
const AllQuizComponent = () => {
  const { attemptId } = useParams();

  console.log("attemptId", attemptId, typeof attemptId);
  const { data: attempt, isLoading: attemptLoading } =
    useAttemptData(attemptId);

  const testId = attempt?.testId;
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  const getBilingualText = (obj, field) => {
    if (!obj) return "";
    if (isHindi && obj[`${field}Hindi`]) {
      return obj[`${field}Hindi`];
    }
    return obj[field];
  };

  const getBilingualOptions = (q) => {
    if (!q) return [];
    if (
      isHindi &&
      q.optionsHindi &&
      q.optionsHindi.length === 4 &&
      q.optionsHindi.some((o) => o)
    ) {
      return q.optionsHindi;
    }
    return q.options;
  };
  const { quizData, testDetails, isLoading } = useQuizData(testId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openSubmissionModal, setopenSubmissionModal] = useState(false);
  useEffect(() => {
    if (!attempt?.answers || !quizData.length) return;

    const restored = quizData.map((q) => ({
      questionId: q.id,
      selectedOption: attempt.answers[q.id] ?? null,
      status: attempt.answers[q.id] != null ? "attempted" : "not-viewed",
      timeSpent: attempt.timePerQuestion?.[q.id] || 0,
    }));
    setCurrentQuestion(attempt?.currentQuestionIndex);
    setUserAnswers(restored);

    const disableRightClick = (e) => e.preventDefault();
    const disableCopy = (e) => e.preventDefault();

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("cut", disableCopy);
    document.addEventListener("paste", disableCopy);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("cut", disableCopy);
      document.removeEventListener("paste", disableCopy);
    };
  }, [attempt, quizData, attempt?.status]);

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

  useEffect(() => {
    if (!userAnswers.length) return;

    const currentAnswer = userAnswers[currentQuestion];
    setSelectedOption(currentAnswer?.selectedOption ?? null);
  }, [currentQuestion, userAnswers]);

  const formatAttemptData = () => {
    const answers = {};
    const timePerQuestion = {};

    userAnswers.forEach((q) => {
      if (q.selectedOption !== null) {
        answers[q.questionId] = q.selectedOption;
      }
      timePerQuestion[q.questionId] = q.timeSpent;
    });

    return { answers, timePerQuestion };
  };
  // const saveAttempt = async (status = "IN_PROGRESS") => {
  //   const { answers, timePerQuestion } = formatAttemptData();
  //   console.log(results);
  //   await updateDoc(doc(db, "attempts", attemptId), {
  //     answers,
  //     timePerQuestion,
  //     currentQuestion,
  //     timeRemaining,
  //     status,
  //     lastSavedAt: serverTimestamp(),
  //   });
  // };
  const saveAttempt = async (
    status = "IN_PROGRESS",
    updatedAnswers = null,
    currentQuestionIndex,
    timeSpent,
  ) => {
    // Use provided answers or fall back to current state
    const answersToSave = updatedAnswers || userAnswers;

    const answers = {};
    const timePerQuestion = {};

    answersToSave.forEach((q) => {
      if (q.selectedOption !== null) {
        answers[q.questionId] = q.selectedOption;
      }
      timePerQuestion[q.questionId] = q.timeSpent;
    });

    if (status === "SUBMITTED") {
      const results = calculateResults();
      await updateDoc(doc(db, "attempts", attemptId), {
        answers,
        timePerQuestion,
        currentQuestion,
        currentQuestionIndex,
        status,
        correctCount: results.correct,
        timeSpentSec: timeSpent,
        incorrectCount: results.incorrectCount,
        lastSavedAt: serverTimestamp(),
        score: results.score,
      });
    } else {
      await updateDoc(doc(db, "attempts", attemptId), {
        answers,
        timePerQuestion,
        currentQuestion,
        currentQuestionIndex,
        status,
        lastSavedAt: serverTimestamp(),
      });
    }
  };

  const handleSaveAndNext = async () => {
    if (currentQuestion === quizData.length - 1) {
      setOpenConfirmationModal(true);
    }
    let updatedAnswers = userAnswers;

    if (selectedOption !== null) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      // Create the updated answers array immediately
      updatedAnswers = userAnswers.map((answer, index) =>
        index === currentQuestion
          ? {
              ...answer,
              selectedOption: selectedOption,
              status: "attempted",
              timeSpent: answer.timeSpent + timeSpent,
            }
          : answer,
      );

      // Update state
      setUserAnswers(updatedAnswers);
    }

    let currentQuestionIndex = 0;
    if (currentQuestion < quizData.length - 1) {
      currentQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(currentQuestionIndex);
      setQuestionStartTime(Date.now()); // Reset timer for next question
    }
    // Save with the updated answers
    await saveAttempt("IN_PROGRESS", updatedAnswers, currentQuestionIndex);
  };

  const updateQuestionStatus = (questionIndex, status) => {
    setUserAnswers((prev) =>
      prev?.map((answer, index) =>
        index === questionIndex ? { ...answer, status } : answer,
      ),
    );
  };

  // const saveAnswer = (questionIndex, optionIndex) => {
  //   const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
  //   setUserAnswers((prev) =>
  //     prev?.map((answer, index) =>
  //       index === questionIndex
  //         ? {
  //             ...answer,
  //             selectedOption: optionIndex,
  //             status: "attempted",
  //             timeSpent: answer.timeSpent + timeSpent,
  //           }
  //         : answer
  //     )
  //   );
  // };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleMarkAndNext = () => {
    if (selectedOption !== null) {
      // saveAnswer(currentQuestion, selectedOption);
    }
    // updateQuestionStatus(currentQuestion, "marked");
    // if (currentQuestion < quizData.length - 1) {
    //   setCurrentQuestion(currentQuestion + 1);
    //   setSelectedOption(userAnswers[currentQuestion]?.selectedOption || null);
    // }

    updateQuestionStatus(currentQuestion, "marked");
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(
        userAnswers[currentQuestion + 1]?.selectedOption || null,
      );
    }
  };

  // const handleSaveAndNext = async () => {
  //   debugger;
  //   if (selectedOption !== null) {
  //     saveAnswer(currentQuestion, selectedOption);
  //   }
  //   await saveAttempt();

  //   if (currentQuestion < quizData.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //     setSelectedOption(userAnswers[currentQuestion]?.selectedOption || null);
  //   }
  // };

  const handleClear = () => {
    setSelectedOption(null);
    setUserAnswers((prev) =>
      prev?.map((answer, index) =>
        index === currentQuestion
          ? { ...answer, selectedOption: null, status: "skipped" }
          : answer,
      ),
    );
  };

  const handleQuestionNavigation = (questionIndex) => {
    if (selectedOption !== null) {
      // saveAnswer(currentQuestion, selectedOption);
    }
    setCurrentQuestion(questionIndex);
    setSelectedOption(userAnswers[questionIndex]?.selectedOption || null);
  };

  const handleSubmitQuiz = async () => {
    // if (selectedOption !== null) {
    //   saveAnswer(currentQuestion, selectedOption);
    // }

    let updatedAnswers = userAnswers;

    const timeSpent = Math.floor(
      (Date.now() - attempt.startedAt.toMillis()) / 1000,
    );
    if (selectedOption !== null) {
      // Create the updated answers array immediately
      updatedAnswers = userAnswers.map((answer, index) =>
        index === currentQuestion
          ? {
              ...answer,
              selectedOption: selectedOption,
              status: "attempted",
              timeSpent: answer.timeSpent,
            }
          : answer,
      );

      // Update state
      setUserAnswers(updatedAnswers);
    }
    // handleScore();
    await saveAttempt("SUBMITTED", updatedAnswers, currentQuestion, timeSpent);
    setIsQuizCompleted(true);
  };

  const handleSubmission = () => {
    setopenSubmissionModal(true);
  };

  const calculateResults = () => {
    let correct = 0;
    let attempted = 0;
    let marked = 0;
    let skipped = 0;
    let notViewed = 0;
    let incorrectCount = 0;

    userAnswers?.forEach((answer, index) => {
      if (
        answer.selectedOption !== null &&
        answer.selectedOption === parseInt(quizData[index].correctIndex)
      ) {
        correct++;
      }

      if (
        answer.selectedOption !== null &&
        answer.selectedOption !== parseInt(quizData[index].correctIndex)
      ) {
        incorrectCount++;
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
      (a) => a.selectedOption !== null,
    ).length;

    const percentage =
      totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;

    const marksPerQuestion = testDetails?.marksPerQuestion || 1;
    const negativeMarking =
      testDetails?.negativeMarking !== undefined
        ? testDetails.negativeMarking
        : 1 / 3;

    const marks = correct * marksPerQuestion - incorrectCount * negativeMarking;
    const TotalMarks = Number(marks.toFixed(2));
    return {
      correct,
      attempted,
      marked,
      skipped,
      notViewed,
      totalAttempted,
      percentage,
      incorrectCount,
      score: TotalMarks,
      totalQuestions: quizData.length,
    };
  };

  if (isQuizCompleted || attempt?.status === "SUBMITTED") {
    const results = calculateResults();

    return (
      <AllQuizResult
        userId={attempt.userId}
        db={db}
        testId={testId}
        results={results}
        userAnswers={userAnswers}
        quizData={quizData}
        testDetails={testDetails}
      />
    );
  }

  const currentQuestionData = quizData[currentQuestion];
  const results = calculateResults();

  if (isLoading || attemptLoading) {
    return (
      <div className="flex items-center justify-center h-screen border-1 border-red-400">
        <LoaderOne />
      </div>
    );
  }

  const testStatistics = [
    {
      section: testDetails?.title ?? "Test",
      totalQuestions: results.totalQuestions,
      answered: results.totalAttempted,
      notAnswered: results.totalQuestions - results.totalAttempted,
      markedForReview: results.marked,
      notVisited: results.notViewed,
    },
  ];
  return (
    <div className="max-w-6xl mx-auto p-2 md:p-6 ">
      <ConfirmationModal
        isOpen={openConfirmationModal}
        message={t("confirmationModal.lastQuestionConfirm")}
        onConfirm={() => {
          setCurrentQuestion(0);
          setOpenConfirmationModal(false);
        }}
        onCancel={() => setOpenConfirmationModal(false)}
      />
      <TestSubmissionModal
        isOpen={openSubmissionModal}
        onClose={() => setopenSubmissionModal(false)}
        statistics={testStatistics}
        onSubmit={handleSubmitQuiz}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Quiz Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <QuizHeader
            currentQuestion={currentQuestion}
            isQuizCompleted={isQuizCompleted}
            testDetails={testDetails}
            timesUp={handleSubmitQuiz}
            attemptId={attemptId}
          />
          {/* Question Content */}
          <Card>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-lg whitespace-pre-line">
                  {currentQuestion + 1}.{" "}
                  {getBilingualText(currentQuestionData, "questionText")}
                </h3>

                <div className="space-y-2">
                  {getBilingualOptions(currentQuestionData)?.map(
                    (option, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            selectedOption === index
                              ? "border-primary bg-[#B4DBED]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:gap-4 pt-4 justify-between md:justify-center pointer">
                <Button
                  onClick={handleMarkAndNext}
                  className="bg-yellow-500 hover:bg-yellow-600 text-xs md:text-sm "
                >
                  Mark for Review
                </Button>
                <Button onClick={handleClear} variant="secondary">
                  CLEAR
                </Button>
                <Button
                  onClick={handleSaveAndNext}
                  className="bg-teal-600 hover:bg-teal-700 text-xs md:text-sm"
                >
                  SAVE & NEXT
                </Button>
              </div>
              <div className="flex flex-end justify-end">
                <Button
                  onClick={handleSubmission}
                  className="bg-teal-600 hover:bg-teal-700 text-xs md:text-sm"
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions Analysis Panel */}
        <AllQuizAnalysis
          quizData={quizData}
          results={results}
          userAnswers={userAnswers}
          currentQuestion={currentQuestion}
          handleQuestionNavigation={handleQuestionNavigation}
          testDetails={testDetails}
        />
      </div>
    </div>
  );
};

export default AllQuizComponent;
