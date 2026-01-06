import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Clock } from "lucide-react";
import { useAttemptData } from "../../hooks/QueryData";

const QuizHeader = ({
  currentQuestion,
  testDetails,
  timesUp,
  isQuizCompleted,
  attemptId,
}) => {
  const { data: attempt, isLoading } = useAttemptData(attemptId);

  const [timeRemaining, setTimeRemaining] = useState(0); // seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (!attempt || isQuizCompleted) return;

    const startTimeMs = attempt.startedAt.toMillis(); // Firestore → ms
    const durationMs = attempt.totalDurationSec * 1000; // sec → ms

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeMs;
      const remainingMs = durationMs - elapsed;

      if (remainingMs <= 0) {
        setTimeRemaining(0);
        timesUp(); // Auto-submit
        clearInterval(timerRef.current);
      } else {
        setTimeRemaining(Math.floor(remainingMs / 1000));
      }
    };

    tick(); // Run immediately on load (important for refresh)
    timerRef.current = setInterval(tick, 1000);

    return () => clearInterval(timerRef.current);
  }, [attempt, isQuizCompleted, timesUp]);

  const formatTime = (totalSeconds = 0) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  if (isLoading || !attempt) return null;

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

            <Badge variant="secondary">EN</Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default React.memo(QuizHeader);
