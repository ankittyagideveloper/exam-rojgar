import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Clock, Star, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useParams } from "react-router";
import questions from "./Quiz-question.json";
import { Progress } from "../../../components/ui/progress";

const AllQuizAnalysis = ({
  quizData,
  results,
  userAnswers,
  currentQuestion,
  handleQuestionNavigation,
}) => {
  // const { categoryId } = useParams();
  // const quizData = questions[categoryId] || [];
  return (
    <div className="lg:col-span-1  lg:fixed right-0 top-0 bottom-0 w-80 z-40 ">
      <Card className="bg-[#d9edf7] ">
        <CardHeader className="bg-[#b4dbed] px-3.5">
          <CardTitle className="text-[#333] flex items-center justify-start py-2">
            <span className="font-bold uppercase pr-2">{`Section :`}</span>
            {`Test`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* Legend */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Marked For Review</span>
              <div className="ml-auto bg-teal-600 text-white px-2 py-1 rounded text-xs">
                Attempted
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-300 rounded"></div>
              <span>Skipped</span>
              <div className="ml-auto bg-gray-300 px-2 py-1 rounded text-xs">
                Not Viewed
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-1 text-center text-sm">
            <div>
              <Star className="w-4 h-4 text-yellow-500 mx-auto" />
              <div className="font-bold">{results.marked}</div>
            </div>
            <div>
              <div className="w-4 h-4 bg-teal-600 rounded mx-auto"></div>
              <div className="font-bold">{results.attempted}</div>
            </div>
            <div>
              <div className="font-bold">{results.skipped}</div>
            </div>
            <div>
              <div className="font-bold">{results.notViewed}</div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-6 gap-1">
            {quizData?.map((_, index) => {
              const answer = userAnswers[index];
              const status = answer?.status || "not-viewed";

              return (
                <button
                  key={index}
                  onClick={() => handleQuestionNavigation(index)}
                  className={`w-8 h-8 text-xs font-medium rounded border-2 transition-colors ${
                    currentQuestion === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : status === "attempted"
                      ? "bg-teal-600 text-white border-teal-600"
                      : status === "marked"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : status === "skipped"
                      ? "bg-red-100 text-gray-600 border-red-300"
                      : "bg-white text-gray-400 border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Progress */}
          {/* <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {Math.round(
                  ((results.attempted + results.marked) /
                    quizData.questions.length) *
                    100
                )}
                %
              </span>
            </div>
            <Progress
              value={
                ((results.attempted + results.marked) /
                  quizData.questions.length) *
                100
              }
            />
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllQuizAnalysis;
