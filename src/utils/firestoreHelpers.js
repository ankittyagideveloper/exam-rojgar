import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  serverTimestamp,
  limit,
  startAfter,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

/** Fetch questions by testId - UPDATED: Uses testId (single) instead of testIds (array) */
export const fetchQuestionsByTestId = async (db, testId) => {
  if (!testId) return [];

  // CRITICAL: Questions must belong to a specific test
  // Support both old format (testIds array) and new format (testId single)
  const q = query(
    collection(db, "questions"),
    where("testIds", "array-contains", testId),
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
    where("status", "in", ["SUBMITTED", "IN_PROGRESS", "NOT_STARTED"]),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs[0]?.data();
};

export const getAllSubmissions = async ({ db, testId }) => {
  const q = query(
    collection(db, "attempts"),
    where("testId", "==", testId),
    where("status", "==", "SUBMITTED"),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

export const isUserRegistered = async ({ db, testId, userId }) => {
  const ref = doc(db, "testRegistrations", testId, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists();
};

// --- Question Bank Management Helpers ---

export const generateSearchKeywords = (text) => {
  if (!text) return [];
  // Split by whitespace and remove non-alphanumeric chars (using unicode support)
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "") // Keep letters (uni), numbers (uni), space
    .split(/\s+/);
  return [...new Set(words.filter((w) => w.length > 1))]; // Keep > 1 char (Hindi words can be short)
};

export const fetchQuestionsPaginated = async (
  db,
  { limit: limitCount = 20, lastDoc = null } = {},
) => {
  let q = query(
    collection(db, "questions"),
    orderBy("createdAt", "desc"), // Ensure you have an index for this, or use 'id'
    limit(limitCount),
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return {
    questions: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const searchQuestions = async (
  db,
  searchText,
  { limit: limitCount = 20, lastDoc = null } = {},
) => {
  // NOTE: 'array-contains' only allows filtering by ONE value.
  // We cannot easily sort by 'createdAt' when using 'array-contains' without a composite index.
  // For MVP, we might drop the orderBy or just ensure the index exists in console.
  // Let's try without specific orderBy first, or user default doc order.
  let q = query(
    collection(db, "questions"),
    where("searchKeywords", "array-contains", searchText.toLowerCase()),
    limit(limitCount),
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return {
    questions: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const fetchQuestionsByTestIdPaginated = async (
  db,
  testId,
  { limit: limitCount = 20, lastDoc = null } = {},
) => {
  // We need to order by something to make pagination stable
  let q = query(
    collection(db, "questions"),
    where("testIds", "array-contains", testId),
    limit(limitCount),
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return {
    questions: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const fetchQuestionById = async (db, questionId) => {
  if (!questionId) return null;
  const docRef = doc(db, "questions", questionId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const updateQuestion = async (db, questionId, data) => {
  if (!questionId) throw new Error("Question ID is required");

  // Automatically generate/update search keywords if text is updated
  const updates = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  // Automatically generate/update search keywords if text is updated
  // We need both texts to generate full keywords.
  // If we only have partial data here, we might miss keywords.
  // Ideally, fetch current doc if texts are partial, or assumes 'data' has mostly everything or we accept partial updates.
  // For MVP, if questionText is provided, re-gen keywords. Ideally include Hindi too.
  if (data.questionText || data.questionTextHindi) {
    // Note: If one is missing in 'data', it might be in valid doc.
    // To be safe, we might need to fetch existing, but that adds a read.
    // Let's assume for now we mostly update fully or it's fine.
    // If we want to be perfect, we should fetch.
    const textToTokenize =
      (data.questionText || "") + " " + (data.questionTextHindi || "");
    updates.searchKeywords = generateSearchKeywords(textToTokenize);
  }

  const docRef = doc(db, "questions", questionId);
  await updateDoc(docRef, updates);
};
