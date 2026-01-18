import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuestions } from "./hooks/useQuestions";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { LoaderOne } from "../../components/ui/loader";
import { useTranslation } from "react-i18next";

/**
 * TestQuestionsPage - Questions tab for a specific test
 * ENFORCES: All questions belong to this test only (testId from route)
 */
export default function TestQuestionsPage() {
  const { testId } = useParams();
  const { test } = useOutletContext();
  const {
    questions,
    isLoading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useQuestions(testId);

  const [questionText, setQuestionText] = useState("");
  const [questionTextHindi, setQuestionTextHindi] = useState(""); // Hindi Question
  const [options, setOptions] = useState(["", "", "", ""]);
  const [optionsHindi, setOptionsHindi] = useState(["", "", "", ""]); // Hindi Options
  const [correctIndex, setCorrectIndex] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [explanationHindi, setExplanationHindi] = useState(""); // Hindi Explanation
  const [difficulty, setDifficulty] = useState("Medium");
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Simple check for language preference

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const isHindi = currentLanguage.startsWith("hi");

  const getBilingualText = (obj, field) => {
    if (isHindi && obj[`${field}Hindi`]) {
      return obj[`${field}Hindi`];
    }
    return obj[field]; // Fallback to English
  };

  // For options specifically
  const getBilingualOptions = (q) => {
    if (isHindi && q.optionsHindi && q.optionsHindi.some((o) => o)) {
      return q.optionsHindi;
    }
    return q.options;
  };

  const handleOptionChange = (index, value, isHindi = false) => {
    if (isHindi) {
      const updated = [...optionsHindi];
      updated[index] = value;
      setOptionsHindi(updated);
    } else {
      const updated = [...options];
      updated[index] = value;
      setOptions(updated);
    }
  };

  const resetForm = () => {
    setQuestionText("");
    setQuestionTextHindi("");
    setOptions(["", "", "", ""]);
    setOptionsHindi(["", "", "", ""]);
    setCorrectIndex(null);
    setDifficulty("Medium");
    setExplanation("");
    setExplanationHindi("");
    setEditingQuestion(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
      alert("Please enter a question");
      return;
    }

    if (correctIndex === null) {
      alert("Please select the correct answer");
      return;
    }

    if (options.some((opt) => !opt.trim())) {
      alert("Please fill in all options");
      return;
    }

    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, {
          questionText,
          questionTextHindi,
          options,
          optionsHindi,
          correctIndex,
          explanation,
          explanationHindi,
          difficulty,
        });
      } else {
        await createQuestion({
          testIds: [testId],
          questionText,
          questionTextHindi,
          options,
          optionsHindi,
          correctIndex,
          explanation,
          explanationHindi,
          difficulty,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving question:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setQuestionText(question.questionText);
    setQuestionTextHindi(question.questionTextHindi || "");
    setOptions([...question.options]);
    setOptionsHindi(question.optionsHindi || ["", "", "", ""]);
    setCorrectIndex(question.correctIndex);
    setExplanation(question.explanation || "");
    setExplanationHindi(question.explanationHindi || "");
    setDifficulty(question.difficulty || "Medium");
  };

  const handleDelete = async (questionId) => {
    const ok = window.confirm(
      "Are you sure you want to delete this question? This cannot be undone.",
    );
    if (!ok) return;

    try {
      await deleteQuestion(questionId);
    } catch (error) {
      console.error("Error deleting question:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (isLoading && questions.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <LoaderOne />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Create/Edit Question Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingQuestion ? "Edit Question" : "Create New Question"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Question Text (English){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded"
                  placeholder="Enter question"
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Question Text (Hindi)
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded"
                  placeholder="Enter question in Hindi"
                  rows={3}
                  value={questionTextHindi}
                  onChange={(e) => setQuestionTextHindi(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Options <span className="text-red-500">*</span>
              </label>
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 mb-4 p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctIndex === i}
                      onChange={() => setCorrectIndex(i)}
                      className="cursor-pointer"
                    />
                    <span className="font-semibold text-gray-700 w-6">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 p-2 rounded"
                      placeholder={`Option ${i + 1} (English)`}
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      required
                    />
                    <span className="text-sm text-gray-600">
                      {correctIndex === i && "✓ Correct"}
                    </span>
                  </div>
                  <div className="pl-10">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder={`Option ${i + 1} (Hindi)`}
                      value={optionsHindi[i]}
                      onChange={(e) =>
                        handleOptionChange(i, e.target.value, true)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Explanation (English)
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded"
                  placeholder="Enter explanation (optional)"
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Explanation (Hindi)
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded"
                  placeholder="Enter explanation in Hindi (optional)"
                  rows={2}
                  value={explanationHindi}
                  onChange={(e) => setExplanationHindi(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Difficulty
              </label>
              <select
                className="w-full border border-gray-300 rounded-md bg-white px-3 py-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingQuestion
                    ? "Update Question"
                    : "Create Question"}
              </Button>
              {editingQuestion && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Questions ({questions.length}) - {test?.title || "Test"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No questions yet</p>
              <p className="text-gray-400 text-sm">
                Create your first question using the form above
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-700">
                          Q{idx + 1}.
                        </span>
                        <span className="text-sm text-gray-500">
                          {q.difficulty || "Medium"}
                        </span>
                      </div>
                      <p className="font-medium mb-3">
                        {getBilingualText(q, "questionText")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(q)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(q.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <ul className="ml-6 space-y-1 mb-3">
                    {getBilingualOptions(q)?.map((opt, i) => (
                      <li
                        key={i}
                        className={`${
                          i === q.correctIndex
                            ? "text-green-600 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                        {i === q.correctIndex && " ✓"}
                      </li>
                    ))}
                  </ul>

                  {q.explanation && (
                    <div className="ml-6 mt-2 p-2 bg-green-50 rounded">
                      <p className="text-sm text-green-800">
                        <strong>Explanation:</strong>{" "}
                        {getBilingualText(q, "explanation")}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
