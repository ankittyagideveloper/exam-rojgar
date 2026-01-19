import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useTests } from "./hooks/useTests";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

/**
 * TestSettingsPage - Settings tab for editing test metadata
 * Removed: maxMarks, questionsCount (auto-calculated)
 * Kept: title, duration, status, requiresRegistration
 */
export default function TestSettingsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { test: initialTest } = useOutletContext();
  const { updateTest, isLoading } = useTests();

  const [formData, setFormData] = useState({
    title: "",
    duration: 90,
    isActive: false,
    requiresRegistration: false,
  });

  useEffect(() => {
    if (initialTest) {
      setFormData({
        title: initialTest.title || "",
        duration: initialTest.durationMinutes || 90,
        isActive: initialTest.isActive || false,
        requiresRegistration: initialTest.requiresRegistration || false,
      });
    }
  }, [initialTest]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Test title is required");
      return;
    }

    if (formData.duration < 1) {
      alert("Duration must be at least 1 minute");
      return;
    }

    try {
      await updateTest(testId, formData);
      alert("Test updated successfully");
    } catch (error) {
      console.error("Error updating test:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Card className="mb-20">
      <CardHeader>
        <CardTitle>Test Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Test Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter test title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter duration in minutes"
              value={formData.duration}
              onChange={(e) => handleChange("duration", Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded-md bg-white px-3 py-2"
              value={formData.isActive}
              onChange={(e) =>
                handleChange("isActive", e.target.value === "true")
              }
            >
              <option value={true}>Live (Active)</option>
              <option value={false}>Draft (Inactive)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Registration Required
            </label>
            <select
              className="w-full border border-gray-300 rounded-md bg-white px-3 py-2"
              value={formData.requiresRegistration}
              onChange={(e) =>
                handleChange("requiresRegistration", e.target.value === "true")
              }
            >
              <option value={true}>Required</option>
              <option value={false}>Not Required</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/tests")}
            >
              Back to Tests
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
