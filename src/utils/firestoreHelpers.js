import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

export const fetchTests = async (db) => {
  const snap = await getDocs(collection(db, "tests"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
