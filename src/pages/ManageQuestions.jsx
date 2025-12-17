import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase";
import { useEffect, useState } from "react";

export function ManageQuestions({ testId }) {
  const db = getFirestore(app);
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const snap = await getDocs(collection(db, "tests", testId, "questions"));
    setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const addQuestion = async () => {
    debugger;
    await addDoc(collection(db, "questions", "questionId", "questions"), {
      questionText,
      options,
      correctOptionIndex: correctIndex,
      marks: 1,
      negativeMarks: 0.25,
    });

    setQuestionText("");
    setOptions(["", "", "", ""]);
    fetchQuestions();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Questions</h2>

      <textarea
        className="border p-2 w-full mb-3"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Question"
      />

      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-2 w-full mb-2"
          value={opt}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
          placeholder={`Option ${i + 1}`}
        />
      ))}

      <select
        className="border p-2 w-full mb-3"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(+e.target.value)}
      >
        {[0, 1, 2, 3].map((i) => (
          <option key={i} value={i}>
            Correct Option {i + 1}
          </option>
        ))}
      </select>

      <button
        onClick={addQuestion}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>

      <ul className="mt-4 list-disc ml-5">
        {questions.map((q) => (
          <li key={q.id}>{q.questionText}</li>
        ))}
      </ul>
    </div>
  );
}
