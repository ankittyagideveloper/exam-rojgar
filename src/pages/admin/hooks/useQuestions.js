import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../../../firebase";
import { generateSearchKeywords } from "../../../utils/firestoreHelpers";

const db = getFirestore(app);

/**
 * Helper function to update test's questionsCount
 * Called automatically when questions are added/removed
 */
const updateTestQuestionsCount = async (testId, count) => {
  if (!testId) return;
  try {
    const ref = doc(db, "tests", testId);
    await updateDoc(ref, {
      questionsCount: count,
    });
  } catch (err) {
    console.error("Error updating questions count:", err);
  }
};

/**
 * Custom hook for managing questions for a specific test
 * ENFORCES: Questions must always belong to a test (testId required)
 * @param {string} testId - The test ID (required)
 * @returns {Object} - Questions data and operations
 */
export const useQuestions = (testId) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    if (!testId) {
      setQuestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // CRITICAL: Only fetch questions for this specific test
      // const q = query(
      //   collection(db, 'questions'),
      //   where('testId', '==', testId)
      // );
      const q = query(
        collection(db, "questions"),
        where("testIds", "array-contains", testId),
      );
      const snap = await getDocs(q);
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  // Auto-update questionsCount when questions change
  useEffect(() => {
    if (testId && questions.length >= 0) {
      updateTestQuestionsCount(testId, questions.length);
    }
  }, [questions.length, testId]);

  const createQuestion = async (questionData) => {
    if (!testId) {
      throw new Error("Test ID is required to create a question");
    }

    setIsLoading(true);
    setError(null);
    try {
      // CRITICAL: Automatically attach testId - no manual assignment
      const questionDoc = {
        ...questionData,
        testId, // MANDATORY: Questions always belong to a test
        testId, // MANDATORY: Questions always belong to a test
        createdAt: new Date(),
        searchKeywords: generateSearchKeywords(
          (questionData.questionText || "") +
            " " +
            (questionData.questionTextHindi || ""),
        ),
      };

      const docRef = await addDoc(collection(db, "questions"), questionDoc);

      // Update local state optimistically
      const newQuestions = [
        ...questions,
        {
          id: docRef.id,
          ...questionDoc,
        },
      ];
      setQuestions(newQuestions);

      // Auto-update test's questionsCount
      await updateTestQuestionsCount(testId, newQuestions.length);

      return docRef.id;
    } catch (err) {
      setError(err.message);
      console.error("Error creating question:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestion = async (questionId, questionData) => {
    setIsLoading(true);
    setError(null);
    try {
      // CRITICAL: Ensure testId is preserved (cannot change test)
      await updateDoc(doc(db, "questions", questionId), {
        ...questionData,
        testId, // Ensure testId is always set
        updatedAt: new Date(),
        searchKeywords: generateSearchKeywords(
          (questionData.questionText || "") +
            " " +
            (questionData.questionTextHindi || ""),
        ),
      });

      // Update local state optimistically
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, ...questionData, testId } : q,
        ),
      );
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error updating question:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "questions", questionId));
      // Update local state optimistically
      const newQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(newQuestions);

      // Auto-update test's questionsCount
      await updateTestQuestionsCount(testId, newQuestions.length);

      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting question:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    isLoading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    refetch: fetchQuestions,
  };
};
