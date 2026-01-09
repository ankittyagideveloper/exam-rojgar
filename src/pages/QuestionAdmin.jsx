import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../../firebase";
import ExistingQuestion from "./ExistingQuestion";

export default function QuestionBankWithTestAssign(testIds) {
  const db = getFirestore(app);

  const [questions, setQuestions] = useState([]);
  const [selectedTestQuestions, setSelectedTestQuestions] = useState([]);
  const [tests, setTests] = useState([]);

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedTestIds, setSelectedTestIds] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tests"), (snap) => {
      setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "questions"), (snap) => {
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedTestId) return;

    const q = query(
      collection(db, "questions"),
      where("testIds", "array-contains", selectedTestId)
    );

    const unsub = onSnapshot(q, (snap) => {
      setSelectedTestQuestions(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
  }, [selectedTestId]);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const toggleTestSelection = (testId) => {
    setSelectedTestIds((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const resetForm = () => {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setDifficulty("Medium");
    setSelectedTestIds([]);
    setExplanation("");
  };

  const saveQuestion = async () => {
    if (!questionText) return alert("Enter question");
    if (correctIndex === null) return alert("Select correct option");

    await addDoc(collection(db, "questions"), {
      questionText,
      options,
      correctIndex,
      explanation,
      difficulty,
      testIds: selectedTestIds,
      createdAt: new Date(),
    });

    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-1 mb-30 ">
      <h1 className="text-3xl font-bold mb-6">Question Bank</h1>
      {/* Create Question */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Question</h2>

        <textarea
          className="border p-3 w-full rounded mb-4"
          placeholder="Enter question"
          rows={3}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              className="border p-2 flex-1 rounded"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
            <input
              type="radio"
              name="correct"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
            />
            <span className="text-sm">Correct</span>
          </div>
        ))}
        <textarea
          className="border p-3 w-full rounded mb-4"
          placeholder="Enter Explanation"
          rows={3}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          <select
            className="border p-2 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Test Assignment */}
        <div className="mt-4">
          <p className="font-medium mb-2">Assign to Tests</p>
          <div className="grid grid-cols-2 gap-2">
            {tests.map((test) => (
              <label key={test.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTestIds.includes(test.id)}
                  onChange={() => toggleTestSelection(test.id)}
                />
                <span>{test.title}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={saveQuestion}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Question
        </button>
      </div>
      {/* Existing Questions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Questions</h2>

        {questions.map((q, idx) => (
          <ExistingQuestion q={q} idx={idx} db={db} />
        ))}
      </div>
      <h2 className="font-medium mb-2">Select Test</h2>

      <div className="grid grid-cols-2 gap-2">
        {tests.map((test) => (
          <label key={test.id} className="flex items-center gap-2">
            <input
              type="radio"
              name="test"
              checked={selectedTestId === test.testId}
              onChange={() => setSelectedTestId(test.testId)}
            />
            <span>{test.title}</span>
          </label>
        ))}
      </div>
      {selectedTestQuestions.map((q, idx) => (
        <div key={q.id} className="border-b pb-4 mb-4">
          <p className="font-medium mb-2">
            {idx + 1}. {q.questionText}
          </p>

          <ul className="ml-4 mb-2">
            {q.options.map((opt, i) => (
              <li
                key={i}
                className={
                  i === q.correctIndex ? "text-green-600 font-semibold" : ""
                }
              >
                {String.fromCharCode(65 + i)}. {opt}
              </li>
            ))}
          </ul>
          <p className="text-sm text-green-600">{q.explanation}</p>
          <p className="text-sm text-gray-600">
            Assigned Tests: {q.testIds?.length ? q.testIds.join(", ") : "None"}
          </p>
        </div>
      ))}
    </div>
  );
}
