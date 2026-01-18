import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure path is correct
import {
  fetchQuestionsPaginated,
  searchQuestions,
  fetchQuestionById,
  updateQuestion,
} from "../../utils/firestoreHelpers";
import EditQuestionModal from "./components/EditQuestionModal";
import { app } from "../../../firebase";
import { getFirestore } from "firebase/firestore";

export default function QuestionBankPage() {
  const db = getFirestore(app);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Edit State
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initial Load
  useEffect(() => {
    loadQuestions(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadQuestions = async (reset = false) => {
    try {
      const isLoadingMore = !reset;
      if (isLoadingMore) setLoadingMore(true);
      else setLoading(true);

      const fetchFn =
        isSearching && searchText
          ? (opts) => searchQuestions(db, searchText, opts)
          : (opts) => fetchQuestionsPaginated(db, opts);

      const result = await fetchFn({
        limit: 20,
        lastDoc: reset ? null : lastDoc,
      });

      if (reset) {
        setQuestions(result.questions);
      } else {
        setQuestions((prev) => [...prev, ...result.questions]);
      }

      setLastDoc(result.lastDoc);
      setHasMore(!!result.lastDoc && result.questions.length === 20); // Heuristic
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("Failed to load questions.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (!searchText.trim()) {
  //       setIsSearching(false);
  //       loadQuestions(true); // Reset to normal view
  //       return;
  //     }
  //     setIsSearching(true);
  //     setLastDoc(null);
  //     // Directly call load (will pick up searchText state due to implementation above,
  //     // but better to pass explicitly or wait for state update.
  //     // State update is async, so best to force logic update or useEffect)
  //     // Actually, due to closure stale state, let's restructure `loadQuestions` slightly or just use a flag.
  //     // Simpler: Trigger effect or call separate function.
  //     // Let's manually trigger the search logic
  //     performSearch(searchText);
  //   };

  //   const performSearch = async (query) => {
  //     setLoading(true);
  //     setQuestions([]);
  //     setLastDoc(null);
  //     try {
  //       // If query is empty, allow fallback to normal list?
  //       const result = await searchQuestions(db, query, { limit: 20 });
  //       setQuestions(result.questions);
  //       setLastDoc(result.lastDoc);
  //       setHasMore(!!result.lastDoc); // Simplified
  //     } catch (err) {
  //       console.error("Search error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const clearSearch = () => {
  //     setSearchText("");
  //     setIsSearching(false);
  //     setLastDoc(null);
  //     // Reload normal questions
  //     // We need to wait for state to propagate if we rely on it in loadQuestions
  //     // So we just call fetchQuestionsPaginated directly here to be safe
  //     fetchInitialNormal();
  //   };

  const fetchInitialNormal = async () => {
    setLoading(true);
    try {
      const result = await fetchQuestionsPaginated(db, { limit: 20 });
      setQuestions(result.questions);
      setLastDoc(result.lastDoc);
      setHasMore(!!result.lastDoc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (questionId) => {
    // Optimistic check: if we already have full details?
    // Usually list view might be partial. Safe to fetch full doc.
    try {
      const fullQ = await fetchQuestionById(db, questionId);
      if (fullQ) setEditingQuestion(fullQ);
    } catch (err) {
      console.error("Error fetching question details:", err);
      alert("Error loading question details.");
    }
  };

  const handleSaveQuestion = async (questionId, data) => {
    setIsSaving(true);
    try {
      await updateQuestion(db, questionId, data);

      // Update local state to reflect changes immediately
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, ...data } : q)),
      );

      setEditingQuestion(null);
    } catch (err) {
      console.error("Error updating question:", err);
      alert("Failed to update question.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 bg-gray-100 md:py-8 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all questions and test associations
          </p>
        </div>
        <Link to="/admin/tests" className="text-blue-600 hover:underline">
          &larr; Back to Tests
        </Link>
      </div>

      {/* Toolbar / Search */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search questions by keyword..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          {isSearching && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div> */}

      {/* Questions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No questions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2"
                  >
                    Question
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tests Linked
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-900 line-clamp-2 max-w-xl"
                        title={q.questionText}
                      >
                        {q.questionText || "(No text)"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ID: {q.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${q.testIds?.length ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {q.testIds?.length || 0} Tests
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(q.id)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && questions.length > 0 && (
          <div className="p-4 border-t border-gray-200 text-center">
            <button
              onClick={() => loadQuestions(false)}
              disabled={loadingMore}
              className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
            >
              {loadingMore ? "Loading more..." : "Load More Questions"}
            </button>
          </div>
        )}
      </div>

      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={handleSaveQuestion}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
