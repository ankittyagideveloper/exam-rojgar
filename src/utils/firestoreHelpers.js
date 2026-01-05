import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

/** Fetch questions by testId */
export const fetchQuestionsByTestId = async (db, testId) => {
  if (!testId) return [];

  const q = query(
    collection(db, "questions"),
    where("testIds", "array-contains", testId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/** Fetch test details by id */
export const fetchTestById = async (db, testId) => {
  if (!testId) return null;

  const docRef = doc(db, "tests", testId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/** Fetch attempt details by attemptId */
export const fetchAttemptByAttemptId = async (db, attemptId) => {
  if (!attemptId) return null;

  const docRef = doc(db, "attempts", attemptId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const fetchTests = async (db) => {
  const snap = await getDocs(collection(db, "tests"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createAttempt = async ({ db, userId, test }) => {
  const attemptId = uuidv4();

  const attemptRef = doc(db, "attempts", attemptId);

  await setDoc(attemptRef, {
    attemptId,
    userId,
    testId: test.testId,

    status: "IN_PROGRESS",

    startedAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),

    totalDurationSec: test.durationMinutes * 60,
    timeSpentSec: 0,
    remainingTimeSec: test.durationMinutes * 60,

    currentQuestionIndex: 0,

    answers: {},

    totalAttempted: 0,
    correctCount: 0,
    incorrectCount: 0,
    skippedCount: test.questionsCount,
    score: 0,
    percentage: 0,
  });

  return attemptId;
};

export const getActiveAttempt = async ({ db, userId, testId }) => {
  const q = query(
    collection(db, "attempts"),
    where("userId", "==", userId),
    where("testId", "==", testId),
    where("status", "in", ["SUBMITTED", "IN_PROGRESS", "NOT_STARTED"])
  );

  const snapshot = await getDocs(q);

  return snapshot.docs[0]?.data();
};

export const isUserRegistered = async ({ db, testId, userId }) => {
  const ref = doc(db, "testRegistrations", testId, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists();
};
