import { QuizCard } from "../component/QuizCard";
import { getFirestore } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router";
import { useQuizData } from "../hooks/QueryData";
import { LoaderOne } from "../components/ui/loader";
import { createAttempt, getActiveAttempt } from "../utils/firestoreHelpers";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const Quiz = () => {
  const db = getFirestore(app);
  const { tests, isLoading } = useQuizData();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [attemptMap, setAttemptMap] = useState({});

  useEffect(() => {
    // Wait until user is loaded, tests are loaded, and we have tests
    if (!isLoaded || isLoading || !tests.length || !user?.id) return;

    const loadAttempts = async () => {
      const map = {};
      for (const test of tests) {
        const activeAttempt = await getActiveAttempt({
          db,
          userId: user.id,
          testId: test.id,
        });

        if (activeAttempt) {
          map[test.id] = {
            status: activeAttempt.status,
            attemptId: activeAttempt.attemptId,
          };
        }
      }
      console.log(map, "map");
      setAttemptMap(map);
    };

    loadAttempts();
  }, [tests, isLoaded, db, user?.id, isLoading]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <LoaderOne />
      </div>
    );
  }

  console.log(attemptMap);

  const handleTest = async (test, islastAttempt) => {
    debugger;
    const existing = attemptMap[test.id];
    let attemptId;

    if (islastAttempt && existing?.status === "SUBMITTED") {
      navigate(`/all-quiz/${test.id}/attempt/${existing.attemptId}`);
      return;
    }
    if (existing?.status === "IN_PROGRESS") {
      attemptId = existing.attemptId; // resume
    } else {
      attemptId = await createAttempt({ db, userId: user.id, test }); // new
    }

    navigate(`/all-quiz/${test.id}/attempt/${attemptId}`);
  };

  console.log(attemptMap);
  return (
    <div className="px-4 flex flex-col gap-4 mt-6">
      {tests
        ?.filter((test) => test.isActive)
        ?.map((test) => (
          <QuizCard
            key={test.id}
            title={test.title}
            questions={test.questionsCount}
            marks={test.maxMarks}
            duration={test.durationMinutes}
            languages={test.languages ?? []}
            isFree={true}
            isNewInterface={true}
            onStartClick={(islastAttempt) => handleTest(test, islastAttempt)}
            attemptStatus={attemptMap[test.id]?.status || "NOT_STARTED"}
          />
        ))}
    </div>
  );
};

export default Quiz;
