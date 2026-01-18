import React, { useState, useEffect } from "react";
import { useTests } from "../hooks/useTests";

export default function EditQuestionModal({
  question,
  onClose,
  onSave,
  isSaving,
}) {
  const { tests } = useTests();
  const [formData, setFormData] = useState({
    questionText: "",
    questionTextHindi: "",
    options: ["", "", "", ""],
    optionsHindi: ["", "", "", ""],
    explanation: "",
    explanationHindi: "",
    testIds: [],
    correctAnswerIndex: 0, // Assuming 0-indexed or similar. Check existing data model.
    // If existing model uses option text as answer, adapt accordingly.
  });

  // Load question data
  useEffect(() => {
    if (question) {
      setFormData({
        questionText: question.questionText || "",
        questionTextHindi: question.questionTextHindi || "",
        options: question.options || ["", "", "", ""],
        optionsHindi: question.optionsHindi || ["", "", "", ""],
        explanation: question.explanation || "",
        explanationHindi: question.explanationHindi || "",
        testIds: question.testIds || [],
        correctAnswerIndex: question.correctAnswerIndex ?? 0, // Default if missing
      });
    }
  }, [question]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value, isHindi = false) => {
    const field = isHindi ? "optionsHindi" : "options";
    const newOptions = [...formData[field]];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newOptions }));
  };

  const handleTestToggle = (testId) => {
    setFormData((prev) => {
      const currentIds = prev.testIds || [];
      if (currentIds.includes(testId)) {
        return { ...prev, testIds: currentIds.filter((id) => id !== testId) };
      } else {
        return { ...prev, testIds: [...currentIds, testId] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(question.id, formData);
  };

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Edit Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Question Text */}
          {/* Question Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text (English)
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.questionText}
                onChange={(e) => handleChange("questionText", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text (Hindi)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.questionTextHindi}
                onChange={(e) =>
                  handleChange("questionTextHindi", e.target.value)
                }
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Options */}
          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="space-y-4">
              {formData.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 p-2 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold w-6 text-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="English Option"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(idx, e.target.value, false)
                      }
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formData.correctAnswerIndex === idx}
                      onChange={() => handleChange("correctAnswerIndex", idx)}
                      className="w-4 h-4 text-blue-600"
                      title="Mark as correct answer"
                    />
                  </div>
                  <div className="pl-8">
                    <input
                      type="text"
                      placeholder="Hindi Option (Optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.optionsHindi[idx]}
                      onChange={(e) =>
                        handleOptionChange(idx, e.target.value, true)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select the radio button for the correct answer.
            </p>
          </div>

          {/* Explanation */}
          {/* Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (English)
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.explanation}
                onChange={(e) => handleChange("explanation", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (Hindi)
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.explanationHindi}
                onChange={(e) =>
                  handleChange("explanationHindi", e.target.value)
                }
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Linked Tests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Linked Tests
            </label>
            <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto bg-gray-50">
              {tests.length === 0 ? (
                <p className="text-gray-500 text-sm">No tests available.</p>
              ) : (
                tests.map((test) => (
                  <label
                    key={test.id}
                    className="flex items-center gap-2 mb-2 last:mb-0 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.testIds || []).includes(test.id)}
                      onChange={() => handleTestToggle(test.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{test.title}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
