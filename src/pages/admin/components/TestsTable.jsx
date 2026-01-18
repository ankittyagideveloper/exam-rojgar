import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { LoaderOne } from "../../../components/ui/loader";

/**
 * TestsTable Component
 * @param {Object} props
 * @param {Array} props.tests - Array of test objects
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 * @param {Function} props.onView - Callback when view button is clicked
 * @param {boolean} props.isLoading - Loading state
 */
export default function TestsTable({
  tests,
  onEdit,
  onDelete,
  onView,
  isLoading,
}) {
  const handleDelete = async (test) => {
    const ok = window.confirm(
      `Are you sure you want to delete "${test.title}"? This action cannot be undone.`,
    );
    if (ok) {
      await onDelete(test.id || test.testId);
    }
  };

  if (isLoading && tests.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <LoaderOne />
        </CardContent>
      </Card>
    );
  }

  if (!isLoading && tests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No tests found</p>
            <p className="text-gray-400 text-sm">
              Create your first test using the form above
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tests ({tests.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">Title</th>
                <th className="p-2 border text-left">Duration</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Questions</th>
                <th className="p-2 border text-left">Max Marks</th>
                <th className="p-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id || test.testId} className="hover:bg-gray-50">
                  <td className="p-2 border">{test.title || "Untitled"}</td>
                  <td className="p-2 border">
                    {test.durationMinutes || 0} min
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        test.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {test.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-2 border">{test.questionsCount || 0}</td>
                  <td className="p-2 border">
                    {test.maxMarks ||
                      (test.questionsCount || 0) * (test.marksPerQuestion || 1)}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      {onView && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onView(test)}
                          disabled={isLoading}
                        >
                          View
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(test)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(test)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
