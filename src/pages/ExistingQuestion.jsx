import React, { useEffect, useRef, useState } from "react";
import { doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

const ExistingQuestion = ({ idx, q, db }) => {
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    questionText: q.questionText,
    options: [...q.options],
    correctIndex: q.correctIndex,
    explanation: q.explanation || "",
    testIds: q.testIds?.join(", ") || "",
  });

  useEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit]);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const updateOption = (i, value) => {
    const newOptions = [...form.options];
    newOptions[i] = value;
    update("options", newOptions);
  };

  const handleSave = async () => {
    if (!form.questionText.trim()) {
      alert("Question cannot be empty");
      return;
    }

    try {
      await updateDoc(doc(db, "questions", q.id), {
        questionText: form.questionText,
        options: form.options,
        correctIndex: form.correctIndex,
        explanation: form.explanation,
        testIds: form.testIds
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        updatedAt: serverTimestamp(),
      });

      setIsEdit(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this question?\nThis cannot be undone."
    );

    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "questions", q.id));
      alert("Question deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete question");
    }
  };

  return (
    <div className="border-b pb-4 mb-4 relative">
      {/* Edit / Save Button */}
      <div
        className="absolute right-0 cursor-pointer text-xl"
        onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
      >
        {isEdit ? "💾" : "✏️"}
      </div>

      <span className="cursor-pointer text-red-600" onClick={handleDelete}>
        🗑️
      </span>

      {/* Question */}
      {isEdit ? (
        <input
          ref={inputRef}
          className="w-full border p-2 rounded mb-2"
          value={form.questionText}
          onChange={(e) => update("questionText", e.target.value)}
        />
      ) : (
        <p className="font-medium mb-2">
          {idx + 1}. {q.questionText}
        </p>
      )}

      {/* Options */}
      <div className="ml-4 space-y-1">
        {form.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            {isEdit && (
              <input
                type="radio"
                checked={form.correctIndex === i}
                onChange={() => update("correctIndex", i)}
              />
            )}

            {isEdit ? (
              <input
                className="border p-1 rounded w-full"
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
              />
            ) : (
              <span
                className={
                  i === q.correctIndex ? "text-green-600 font-semibold" : ""
                }
              >
                {String.fromCharCode(65 + i)}. {opt}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="mt-3">
        <p className="font-semibold">Explanation</p>
        {isEdit ? (
          <textarea
            className="w-full border p-2 rounded"
            value={form.explanation}
            onChange={(e) => update("explanation", e.target.value)}
          />
        ) : (
          <p className="text-sm text-gray-700">{q.explanation || "—"}</p>
        )}
      </div>

      {/* Test IDs */}
      <div className="mt-2">
        <p className="font-semibold">Assigned Tests</p>
        {isEdit ? (
          <input
            className="w-full border p-1 rounded"
            placeholder="test1, test2, test3"
            value={form.testIds}
            onChange={(e) => update("testIds", e.target.value)}
          />
        ) : (
          <p className="text-sm text-gray-600">
            {q.testIds?.length ? q.testIds.join(", ") : "None"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExistingQuestion;
