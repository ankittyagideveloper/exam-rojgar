import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const createAttempt = async ({ userId, test }) => {
  const attemptId = uuidv4();

  const attemptRef = doc(db, "attempts", attemptId);

  await setDoc(attemptRef, {
    attemptId,
    userId,
    testId: test.testId,

    status: "in_progress",

    startedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),

    totalDurationSec: test.durationSec,
    timeSpentSec: 0,
    remainingTimeSec: test.durationSec,

    currentQuestionIndex: 0,

    answers: {},

    totalAttempted: 0,
    correctCount: 0,
    incorrectCount: 0,
    skippedCount: test.totalQuestions,
    score: 0,
    percentage: 0,
  });

  return attemptId;
};
