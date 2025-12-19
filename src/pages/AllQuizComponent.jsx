import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Clock } from "lucide-react";
import { useParams } from "react-router-dom";

import QuizResult from "../component/quiz/QuizResult";
// import QuestionAnalysis from "../component/quiz/QuestionAnalysis";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../firebase";
import { useUser } from "@clerk/clerk-react";
import QuestionAnalysis from "../component/quiz/QuestionAnalysis";
import AllQuizAnalysis from "../component/quiz/AllQuizAnalysis";
import AllQuizResult from "../component/quiz/AllQuizResult";

const AllQuizComponent = () => {
  const db = getFirestore(app);
  const [testDetails, setTestDetails] = useState({});
  const { categoryId } = useParams();
  const fetchQuestionsByTestId = async (testId) => {
    const q = query(
      collection(db, "questions"),
      where("testIds", "array-contains", testId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const fetchTestById = async (testId) => {
    const docRef = doc(db, "tests", testId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  };
  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    fetchQuestionsByTestId(categoryId).then((data) => setQuizData(data));
    fetchTestById(categoryId).then((data) => setTestDetails(data));
  }, [categoryId]);

  //   const quizData = fetchQuestionsByTestId(categoryId, db) || [];

  const { user } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Initialize user answers
  useEffect(() => {
    const initialAnswers = quizData?.map((q) => ({
      questionId: q.questionId,
      selectedOption: null,
      status: "not-viewed",
      timeSpent: 0,
    }));
    // initialAnswers[0].status = "not-viewed";
    setUserAnswers(initialAnswers);
  }, []);

  // Timer effect
  //   useEffect(() => {
  //     if (timeRemaining > 0 && !isQuizCompleted) {
  //       const timer = setTimeout(() => {
  //         setTimeRemaining(timeRemaining - 1);
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     } else if (timeRemaining === 0) {
  //       handleSubmitQuiz();
  //     }
  //   }, [timeRemaining, isQuizCompleted]);

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
      prev?.map((answer, index) =>
        index === questionIndex ? { ...answer, status } : answer
      )
    );
  };

  const saveAnswer = (questionIndex, optionIndex) => {
    debugger;
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    setUserAnswers((prev) =>
      prev?.map((answer, index) =>
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
    if (currentQuestion < quizData.length - 1) {
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
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(
        userAnswers[currentQuestion + 1]?.selectedOption || null
      );
    }
  };

  const handleClear = () => {
    setSelectedOption(null);
    setUserAnswers((prev) =>
      prev?.map((answer, index) =>
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

  const handleScore = async () => {
    const quizId = categoryId;

    const userId = user.id;

    await setDoc(doc(db, "leaderboards", quizId, "users", userId), {
      userId,
      score: results.correct,
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmitQuiz = () => {
    if (selectedOption !== null) {
      saveAnswer(currentQuestion, selectedOption);
    }
    handleScore();
    setIsQuizCompleted(true);
  };

  const calculateResults = () => {
    let correct = 0;
    let attempted = 0;
    let marked = 0;
    let skipped = 0;
    let notViewed = 0;

    userAnswers?.forEach((answer, index) => {
      if (
        answer.selectedOption !== null &&
        answer.selectedOption === parseInt(quizData[index].correctAnswer)
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
      <AllQuizResult
        results={results}
        userAnswers={userAnswers}
        quizData={quizData}
      />
    );
  }

  const currentQuestionData = quizData[currentQuestion];
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
                    {/* <Badge variant="default" className="bg-green-600">
                      +{results.correct}
                    </Badge>
                    <Badge variant="destructive">
                      -{results.totalAttempted - results.correct}
                    </Badge> */}
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
                  {currentQuestion + 1}. {currentQuestionData?.questionText}
                </h3>
                {/* {currentQuestionData?.image ? (
                  <img
                    height={300}
                    width={300}
                    src={currentQuestionData.image}
                    alt={currentQuestionData.id + 1}
                  />
                ) : null} */}

                <div className="space-y-2">
                  {currentQuestionData?.options?.map((option, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index + 1)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedOption === index + 1
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    );
                  })}
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
                    currentQuestion === quizData.length - 1
                      ? handleSubmitQuiz
                      : handleSaveAndNext
                  }
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {currentQuestion === quizData.length - 1
                    ? "Save"
                    : "SAVE & NEXT"}
                </Button>
                <Button
                  onClick={handleSubmitQuiz}
                  className="bg-teal-600 hover:bg-teal-700"
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
        />
      </div>
    </div>
  );
};

export default AllQuizComponent;
