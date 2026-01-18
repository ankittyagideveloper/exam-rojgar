import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTests } from "./hooks/useTests";
import TestForm from "./components/TestForm";
import TestsTable from "./components/TestsTable";

/**
 * TestsListPage - Lists all tests with ability to create new ones
 * Clicking "View" navigates to test detail page
 */
export default function TestsListPage() {
  const navigate = useNavigate();
  const { tests, isLoading, error, createTest, updateTest, deleteTest } =
    useTests();
  const [editingTest, setEditingTest] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      if (editingTest) {
        const testId = editingTest.id || editingTest.testId;
        await updateTest(testId, formData);
      } else {
        await createTest(formData);
      }
      setEditingTest(null);
    } catch (error) {
      console.error("Error saving test:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
  };

  const handleCancel = () => {
    setEditingTest(null);
  };

  const handleDelete = async (testId) => {
    try {
      await deleteTest(testId);
    } catch (error) {
      console.error("Error deleting test:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleView = (test) => {
    const testId = test.id || test.testId;
    navigate(`/admin/tests/${testId}`);
  };

  return (
    <div className="min-h-screen px-1 bg-gray-100 md:py-8 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel – Test Series</h1>
        <button
          onClick={() => navigate("/admin/question-bank")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Manage Question Bank
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <TestForm
        initialData={editingTest}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      <TestsTable
        tests={tests}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        isLoading={isLoading}
      />
    </div>
  );
}
