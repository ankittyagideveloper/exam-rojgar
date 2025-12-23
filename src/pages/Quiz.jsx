import { useEffect, useState } from "react";
import QuizComponent from "../component/quiz";
import { QuizCard } from "../component/QuizCard";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router";
import { useQuizData } from "../hooks/QueryData";
import { LoaderFour, LoaderOne, LoaderThree } from "../components/ui/loader";

const Quiz = () => {
  const db = getFirestore(app);
  const { tests, isLoading } = useQuizData(db);
  const navigate = useNavigate();

  const handleTest = (id) => {
    navigate(`/all-quiz/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <LoaderOne />
      </div>
    );
  }
  return (
    <div className="px-4 flex flex-col gap-4 mt-6">
      {tests
        ?.filter((test) => test.isActive)
        ?.map((test) => (
          <QuizCard
            title={test.title}
            // date="08 Aug 2025"
            questions={test.questionsCount}
            marks={test.maxMarks}
            duration={test.durationMinutes}
            languages={test.languages ?? []}
            //  userCount="45.8k"
            isFree={true}
            isNewInterface={true}
            onStartClick={() => handleTest(test?.testId)}
          />
        ))}
    </div>
  );
};

export default Quiz;
