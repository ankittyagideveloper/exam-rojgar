import React, { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUserAttempts } from "../hooks/QueryData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";

const AttemptedTests = () => {
  const { user } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const { data: attempts = [], isLoading, error } = useUserAttempts(userId);

  // Group attempts by testId to get latest attempt per test
  const uniqueAttempts = useMemo(() => {
    const grouped = {};
    attempts.forEach((attempt) => {
      if (
        !grouped[attempt.testId] ||
        new Date(attempt.startedAt?.toDate?.()) >
          new Date(grouped[attempt.testId].startedAt?.toDate?.())
      ) {
        grouped[attempt.testId] = attempt;
      }
    });
    return Object.values(grouped).sort(
      (a, b) =>
        new Date(b.startedAt?.toDate?.()) - new Date(a.startedAt?.toDate?.()),
    );
  }, [attempts]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "SUBMITTED":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">In Progress</Badge>
        );
      case "NOT_STARTED":
        return (
          <Badge className="bg-gray-600 hover:bg-gray-700">Not Started</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getScorePercentage = (attempt) => {
    if (!attempt.totalAttempted) return 0;
    return Math.round((attempt.correctCount / attempt.totalAttempted) * 100);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate?.() || new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0 sec";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your attempts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">
              Error loading attempts: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!attempts.length) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Attempts</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't attempted any tests yet.
            </p>
            <Button onClick={() => navigate("/quiz-category")}>
              Start a Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            Your Test Attempts
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {uniqueAttempts.length} test
            {uniqueAttempts.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uniqueAttempts.map((attempt) => (
              <AttemptCard
                key={attempt.id}
                attempt={attempt}
                getStatusBadge={getStatusBadge}
                getScorePercentage={getScorePercentage}
                formatDate={formatDate}
                formatDuration={formatDuration}
                navigate={navigate}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AttemptCard = ({
  attempt,
  getStatusBadge,
  getScorePercentage,
  formatDate,
  formatDuration,
  navigate,
}) => {
  const percentage = getScorePercentage(attempt);
  const scoreColor =
    percentage >= 70
      ? "text-green-600"
      : percentage >= 50
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Section - Test Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg md:text-xl font-semibold">
                Test #{attempt.testId?.slice(0, 8)}
              </h3>
              {getStatusBadge(attempt.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {/* Date */}
              <div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Date
                </p>
                <p className="font-medium">{formatDate(attempt.startedAt)}</p>
              </div>

              {/* Attempted Questions */}
              <div>
                <p className="text-muted-foreground">Attempted</p>
                <p className="font-medium">
                  {attempt.totalAttempted || 0} questions
                </p>
              </div>

              {/* Score */}
              <div>
                <p className="text-muted-foreground">Score</p>
                <p className={`font-bold text-lg ${scoreColor}`}>
                  {attempt.correctCount || 0}/{attempt.totalAttempted || 0}
                </p>
              </div>

              {/* Duration */}
              <div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Duration
                </p>
                <p className="font-medium">
                  {formatDuration(attempt.timeSpentSec)}
                </p>
              </div>
            </div>

            {/* Score Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {/* Correct */}
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Correct</span>
                </div>
                <p className="text-lg font-bold text-green-600">
                  {attempt.correctCount || 0}
                </p>
              </div>

              {/* Incorrect */}
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-muted-foreground">
                    Incorrect
                  </span>
                </div>
                <p className="text-lg font-bold text-red-600">
                  {attempt.incorrectCount || 0}
                </p>
              </div>

              {/* Accuracy */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <span className="text-xs text-muted-foreground block mb-1">
                  Accuracy
                </span>
                <p className={`text-lg font-bold ${scoreColor}`}>
                  {percentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Action Button */}
          <div className="flex flex-col gap-2 justify-center">
            {attempt.status === "SUBMITTED" && (
              <Button
                onClick={() => navigate(`/attempt/${attempt.id}/result`)}
                className="bg-teal-600 hover:bg-teal-700 w-full md:w-auto"
              >
                View Result
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {attempt.status === "IN_PROGRESS" && (
              <Button
                onClick={() =>
                  navigate(`/all-quiz/${attempt.testId}/attempt/${attempt.id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttemptedTests;
