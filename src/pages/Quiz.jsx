import { useEffect, useState } from "react";
import QuizComponent from "../component/quiz";
import { QuizCard } from "../component/QuizCard";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router";

const Quiz = () => {
  const [tests, setTests] = useState([]);
  const db = getFirestore(app);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTests();
  }, []);
  const fetchTests = async () => {
    const snap = await getDocs(collection(db, "tests"));
    setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };
  const handleTest = (id) => {
    navigate(`/all-quiz/${id}`);
  };

  return (
    <div className="px-4 flex flex-col gap-4 mt-6">
      {tests
        .filter((test) => test.isActive)
        .map((test) => (
          <QuizCard
            title={test.title}
            date="08 Aug 2025"
            questions={test.totalQuestions}
            marks={test.totalMarks}
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
