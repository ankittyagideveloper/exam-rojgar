import React from "react";
import questions from "./Quiz-question.json";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Clock, Star, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
const QuizResult = ({ results, userAnswers }) => {
  const { categoryId } = useParams();
  const quizData = questions[categoryId] || [];
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {results.percentage}%
            </div>
            <div className="text-lg text-muted-foreground">
              {results.correct} out of {results.totalAttempted} questions
              correct
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">Correct</div>
              <div className="text-2xl font-bold text-green-600">
                {results.correct}
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-800">Attempted</div>
              <div className="text-2xl font-bold text-blue-600">
                {results.attempted}
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold text-yellow-800">Marked</div>
              <div className="text-2xl font-bold text-yellow-600">
                {results.marked}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <XCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-800">Skipped</div>
              <div className="text-2xl font-bold text-gray-600">
                {results.skipped}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Detailed Analysis</h3>
            {quizData.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect =
                userAnswer.selectedOption === question.correctAnswer;
              const wasAttempted = userAnswer.selectedOption !== null;

              return (
                <Card
                  key={question.id}
                  className={`${
                    isCorrect
                      ? "border-green-200"
                      : wasAttempted
                      ? "border-red-200"
                      : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">
                        Q{question.id}: {question.question}
                      </h4>
                      <Badge
                        variant={
                          isCorrect
                            ? "default"
                            : wasAttempted
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {isCorrect
                          ? "Correct"
                          : wasAttempted
                          ? "Incorrect"
                          : "Not Attempted"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex + 1 === question.correctAnswer
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : optionIndex === userAnswer.selectedOption &&
                                optionIndex !== question.correctAnswer
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-gray-50"
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {optionIndex + 1 === question.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                          )}
                          {optionIndex === userAnswer.selectedOption &&
                            optionIndex !== question.correctAnswer && (
                              <XCircle className="w-4 h-4 text-red-600 inline ml-2" />
                            )}
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={() => window.location.reload()} size="lg">
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;
