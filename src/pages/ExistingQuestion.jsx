import React, { useEffect, useRef, useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const ExistingQuestion = ({ idx, q, db }) => {
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [questionText, setQuestionText] = useState(q.questionText);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const handleSave = async () => {
    if (!questionText.trim()) {
      alert("Question cannot be empty");
      return;
    }

    try {
      await updateDoc(doc(db, "questions", q.id), {
        questionText,
        updatedAt: serverTimestamp(),
      });

      setIsEdit(false);
    } catch (err) {
      console.error("Failed to update question", err);
      alert("Update failed");
    }
  };

  return (
    <div className="border-b pb-4 mb-4 relative">
      {!isEdit ? (
        <div
          className="absolute right-0 cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          ✏️
        </div>
      ) : (
        <div className="absolute right-0 cursor-pointer" onClick={handleSave}>
          💾
        </div>
      )}

      {isEdit ? (
        <input
          ref={inputRef}
          className="w-full border p-1 rounded"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      ) : (
        <p className="font-medium mb-2">
          {idx + 1}. {questionText}
        </p>
      )}

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

      <p className="text-sm text-gray-600">
        Assigned Tests: {q.testIds?.length ? q.testIds.join(", ") : "None"}
      </p>
    </div>
  );
};

export default ExistingQuestion;
