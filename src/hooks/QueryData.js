import { useQuery } from "@tanstack/react-query";
import {
  fetchAttemptByAttemptId,
  fetchQuestionsByTestId,
  fetchTestById,
  fetchTests,
} from "../utils/firestoreHelpers";
import { getFirestore } from "firebase/firestore";

import { app } from "../../firebase";
const db = getFirestore(app);
export const useQuizData = (testId) => {
  const questionsQuery = useQuery({
    queryKey: ["questions", testId],
    queryFn: () => fetchQuestionsByTestId(db, testId),
    enabled: !!testId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const testQuery = useQuery({
    queryKey: ["test", testId],
    queryFn: () => fetchTestById(db, testId),
    enabled: !!testId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const allTestsQuery = useQuery({
    queryKey: ["tests"],
    queryFn: () => fetchTests(db),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return {
    tests: allTestsQuery.data ?? [],
    quizData: questionsQuery.data ?? [],
    testDetails: testQuery.data,
    isLoading:
      questionsQuery.isLoading ||
      testQuery.isLoading ||
      allTestsQuery.isLoading,
    error: questionsQuery.error || testQuery.error,
  };
};

export const useAttemptData = (attemptId) => {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => fetchAttemptByAttemptId(db, attemptId),
    enabled: !!attemptId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
