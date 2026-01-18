import { useTestForm } from "../hooks/useTestForm";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

/**
 * TestForm Component
 * @param {Object} props
 * @param {Object} props.initialData - Initial form data (for editing)
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when form is cancelled
 * @param {boolean} props.isLoading - Loading state
 */
export default function TestForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const { formData, errors, handleChange, validate, reset, isEditing } =
    useTestForm(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      if (!isEditing) {
        reset();
      }
    }
  };

  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? "Update Test" : "Create New Test"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Test ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Test ID */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Test ID {!isEditing && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                disabled={isEditing}
                className={`w-full border p-2 rounded ${
                  isEditing ? "bg-gray-200 cursor-not-allowed" : ""
                } ${errors.testId ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter test ID"
                value={formData.testId}
                onChange={(e) => handleChange("testId", e.target.value)}
              />
              {errors.testId && (
                <p className="text-red-500 text-sm mt-1">{errors.testId}</p>
              )}
            </div>

            {/* Test Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Test Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border p-2 rounded ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter test title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none cursor-pointer"
              value={formData.isActive}
              onChange={(e) =>
                handleChange("isActive", e.target.value === "true")
              }
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          {/* Registration Required */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Is Registration Required
            </label>
            <select
              className="w-full border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none cursor-pointer"
              value={formData.requiresRegistration}
              onChange={(e) =>
                handleChange("requiresRegistration", e.target.value === "true")
              }
            >
              <option value={true}>Required</option>
              <option value={false}>Not Required</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (min) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                className={`w-full border p-2 rounded ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Minutes"
                value={formData.duration}
                onChange={(e) =>
                  handleChange("duration", Number(e.target.value))
                }
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>

            {/* Marks Per Question */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Marks/Question
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                className="w-full border p-2 rounded border-gray-300"
                placeholder="e.g. 1"
                value={formData.marksPerQuestion}
                onChange={(e) =>
                  handleChange("marksPerQuestion", Number(e.target.value))
                }
              />
            </div>

            {/* Negative Marking */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Negative Marking
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full border p-2 rounded border-gray-300"
                placeholder="e.g. 0.33"
                value={formData.negativeMarking}
                onChange={(e) =>
                  handleChange("negativeMarking", Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : isEditing
                  ? "Update Test"
                  : "Create Test"}
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
