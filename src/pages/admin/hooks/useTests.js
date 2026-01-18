import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "../../../../firebase";

const db = getFirestore(app);

/**
 * Custom hook for managing tests
 * @returns {Object} - Tests data and operations
 */
export const useTests = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const snap = await getDocs(collection(db, "tests"));
      setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const createTest = async (testData) => {
    setIsLoading(true);
    setError(null);
    try {
      await setDoc(doc(db, "tests", testData.testId), {
        testId: testData.testId,
        title: testData.title,
        durationMinutes: testData.duration,
        createdAt: new Date(),
        isActive: testData.isActive,
        requiresRegistration: testData.requiresRegistration,
        questionsCount: 0, // Auto-calculated from questions
        questionsCount: 0, // Auto-calculated from questions
        maxMarks: 0, // Can be auto-calculated if needed
        marksPerQuestion: testData.marksPerQuestion || 1,
        negativeMarking: testData.negativeMarking ?? 0.33,
      });
      // Update local state optimistically
      setTests((prev) => [
        ...prev,
        {
          id: testData.testId,
          testId: testData.testId,
          ...testData,
          durationMinutes: testData.duration,
          marksPerQuestion: testData.marksPerQuestion || 1,
          negativeMarking: testData.negativeMarking ?? 0.33,
        },
      ]);
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error creating test:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTest = async (testId, testData) => {
    setIsLoading(true);
    setError(null);
    try {
      const ref = doc(db, "tests", testId);
      await updateDoc(ref, {
        isActive: Boolean(testData.isActive),
        requiresRegistration: Boolean(testData.requiresRegistration),
        title: testData.title,
        durationMinutes: testData.duration,
        durationMinutes: testData.duration,
        marksPerQuestion: testData.marksPerQuestion || 1,
        negativeMarking: testData.negativeMarking ?? 0.33,
        // questionsCount and maxMarks are auto-calculated in theory, but here we just store configs
      });
      // Update local state optimistically
      setTests((prev) =>
        prev.map((test) =>
          test.id === testId || test.testId === testId
            ? {
                ...test,
                ...testData,
                ...testData,
                durationMinutes: testData.duration,
                marksPerQuestion: testData.marksPerQuestion || 1,
                negativeMarking: testData.negativeMarking ?? 0.33,
              }
            : test,
        ),
      );
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error updating test:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTest = async (testId) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "tests", testId));
      // Update local state optimistically
      setTests((prev) =>
        prev.filter((test) => test.id !== testId && test.testId !== testId),
      );
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting test:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update test's questionsCount automatically
   * Called when questions are added/removed
   */
  const updateQuestionsCount = async (testId, count) => {
    try {
      const ref = doc(db, "tests", testId);
      await updateDoc(ref, {
        questionsCount: count,
      });
      // Update local state
      setTests((prev) =>
        prev.map((test) =>
          test.id === testId || test.testId === testId
            ? { ...test, questionsCount: count }
            : test,
        ),
      );
    } catch (err) {
      console.error("Error updating questions count:", err);
    }
  };

  return {
    tests,
    isLoading,
    error,
    createTest,
    updateTest,
    deleteTest,
    updateQuestionsCount,
    refetch: fetchTests,
  };
};
