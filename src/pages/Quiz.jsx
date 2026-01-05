import { QuizCard } from "../component/QuizCard";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router";
import { useQuizData } from "../hooks/QueryData";
import { LoaderOne } from "../components/ui/loader";
import {
  createAttempt,
  getActiveAttempt,
  isUserRegistered,
} from "../utils/firestoreHelpers";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import RegistrationModal from "../component/quiz/RegistrationModal";

const Quiz = () => {
  const db = getFirestore(app);
  const { tests, isLoading } = useQuizData();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [attemptMap, setAttemptMap] = useState({});
  const [openRegistaration, setOpenRegistration] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

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
  const startTest = async (test, islastAttempt) => {
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

  const handleTest = async (test, islastAttempt) => {
    if (test.requiresRegistration) {
      const registered = await isUserRegistered({
        db,
        testId: test.id,
        userId: user.id,
      });

      if (!registered) {
        setSelectedTest(test);
        setOpenRegistration(true);
        return;
      }
      await startTest(test, islastAttempt);
    } else {
      await startTest(test, islastAttempt);
    }
  };

  console.log(attemptMap);
  const isAdmin = user?.publicMetadata?.role === "admin";

  const saveRegistrationToFirestore = async ({
    db,
    testId,
    userId,
    formData,
  }) => {
    const ref = doc(db, "testRegistrations", testId, "users", userId);

    await setDoc(ref, {
      name: formData.name,
      rrbRegNo: formData.rrbRegNo,
      phone: formData.phone,
      dob: formData.dob,
      userId,
      testId,
      registeredAt: serverTimestamp(),
    });

    return true;
  };

  const handleRegister = async (formData) => {
    await saveRegistrationToFirestore({
      db,
      testId: selectedTest.id,
      userId: user.id,
      formData,
    });
    setOpenRegistration(false);
    await startTest(selectedTest, false);
  };

  return (
    <>
      {openRegistaration && (
        <RegistrationModal
          isOpen={openRegistaration}
          onClose={() => setOpenRegistration(false)}
          onSubmit={handleRegister}
        />
      )}
      <div className="px-4 flex flex-col gap-4 mt-6">
        {tests
          ?.filter((test) => test.isActive || isAdmin)
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
    </>
  );
};

export default Quiz;
