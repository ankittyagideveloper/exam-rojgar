import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuestions } from "./hooks/useQuestions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { LoaderOne } from "../../components/ui/loader";
import { useTranslation } from "react-i18next";

/**
 * TestPreviewPage - Preview tab showing test as students will see it
 */
export default function TestPreviewPage() {
  const { testId } = useParams();
  const { test } = useOutletContext();

  const { questions, isLoading } = useQuestions(testId);

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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <LoaderOne />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 mb-20">
      <Card>
        <CardHeader>
          <CardTitle>Test Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-lg">
                {test?.title || "Untitled Test"}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-2 font-medium">
                  {test?.durationMinutes || 0} min
                </span>
              </div>
              <div>
                <span className="text-gray-600">Questions:</span>
                <span className="ml-2 font-medium">{questions.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium">
                  {test?.isActive ? "Live" : "Draft"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Registration:</span>
                <span className="ml-2 font-medium">
                  {test?.requiresRegistration ? "Required" : "Not Required"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No questions added yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="mb-3">
                    <span className="font-semibold text-gray-700">
                      Question {idx + 1}:
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({q.difficulty || "Medium"})
                    </span>
                  </div>
                  <p className="font-medium mb-4 text-lg">
                    {getBilingualText(q, "questionText")}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {getBilingualOptions(q)?.map((opt, i) => (
                      <li
                        key={i}
                        className={`p-2 rounded ${
                          i === q.correctIndex
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                        {i === q.correctIndex && (
                          <span className="ml-2 text-green-600 font-semibold">
                            ✓ Correct Answer
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {q.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm">
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
