import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Clock } from "lucide-react";

const QuizHeader = ({
  currentQuestion,
  testDetails,
  timesUp,
  isQuizCompleted,
}) => {
  // store seconds directly
  const [timeRemaining, setTimeRemaining] = useState(
    (testDetails?.durationMinutes || 0) * 60
  );

  const timerRef = useRef(null);

  // Reset timer when new test loads
  useEffect(() => {
    setTimeRemaining((testDetails?.durationMinutes || 0) * 60);
  }, [testDetails?.durationMinutes]);

  // Timer logic
  useEffect(() => {
    if (isQuizCompleted) return;

    if (timeRemaining <= 0) {
      timesUp();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isQuizCompleted, timeRemaining, timesUp]);

  const formatTime = (totalSeconds = 0) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {currentQuestion + 1}
            </Badge>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">
                {formatTime(timeRemaining)} left
              </span>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary">EN</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default React.memo(QuizHeader);
