import React, { useState, useEffect, useRef } from "react";
import { useTests } from "../hooks/useTests";
import {
  validateImageFile,
  uploadQuestionImage,
  deleteQuestionImage,
  createImagePreview,
} from "../../../utils/storageHelpers";

export default function EditQuestionModal({
  question,
  onClose,
  onSave,
  isSaving,
}) {
  const { tests } = useTests();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    questionText: "",
    questionTextHindi: "",
    options: ["", "", "", ""],
    optionsHindi: ["", "", "", ""],
    explanation: "",
    explanationHindi: "",
    testIds: [],
    correctAnswerIndex: 0,
    imageUrl: "",
    imagePath: "",
    hasImage: false,
  });

  // Image-related state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);

  // Load question data
  useEffect(() => {
    if (question) {
      setFormData({
        questionText: question.questionText || "",
        questionTextHindi: question.questionTextHindi || "",
        options: question.options || ["", "", "", ""],
        optionsHindi: question.optionsHindi || ["", "", "", ""],
        explanation: question.explanation || "",
        explanationHindi: question.explanationHindi || "",
        testIds: question.testIds || [],
        correctAnswerIndex: question.correctAnswerIndex ?? 0,
        imageUrl: question.imageUrl || "",
        imagePath: question.imagePath || "",
        hasImage: question.hasImage || false,
      });

      // Reset image-related state
      setImageFile(null);
      setImagePreview(null);
      setImageError(null);
    }
  }, [question]);

  // Image handling functions
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.error);
      return;
    }

    // Clear error and set file
    setImageError(null);
    setImageFile(file);

    // Create preview
    try {
      const preview = await createImagePreview(file);
      setImagePreview(preview);
    } catch (error) {
      setImageError("Failed to create image preview");
      console.error(error);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Mark for deletion if existing image
    if (formData.imagePath) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: "",
        imagePath: "",
        hasImage: false,
        _deleteImage: true, // Flag for deletion
      }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value, isHindi = false) => {
    const field = isHindi ? "optionsHindi" : "options";
    const newOptions = [...formData[field]];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newOptions }));
  };

  const handleTestToggle = (testId) => {
    setFormData((prev) => {
      const currentIds = prev.testIds || [];
      if (currentIds.includes(testId)) {
        return { ...prev, testIds: currentIds.filter((id) => id !== testId) };
      } else {
        return { ...prev, testIds: [...currentIds, testId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalData = { ...formData };

    // Handle image upload if new file selected
    if (imageFile) {
      setIsUploadingImage(true);
      setImageError(null);

      try {
        const { imageUrl, imagePath } = await uploadQuestionImage(
          imageFile,
          question.id,
        );

        finalData = {
          ...finalData,
          imageUrl,
          imagePath,
          hasImage: true,
        };

        // Delete old image if exists
        if (question.imagePath && question.imagePath !== imagePath) {
          await deleteQuestionImage(question.imagePath);
        }
      } catch (error) {
        setImageError(error.message);
        setIsUploadingImage(false);
        return; // Don't proceed with save if upload fails
      }

      setIsUploadingImage(false);
    }

    // Handle image deletion
    if (finalData._deleteImage && question.imagePath) {
      await deleteQuestionImage(question.imagePath);
    }

    // Remove internal flags
    delete finalData._deleteImage;

    onSave(question.id, finalData);
  };

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Edit Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Question Text */}
          {/* Question Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text (English)
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.questionText}
                onChange={(e) => handleChange("questionText", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text (Hindi)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.questionTextHindi}
                onChange={(e) =>
                  handleChange("questionTextHindi", e.target.value)
                }
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Options */}
          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="space-y-4">
              {formData.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 p-2 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold w-6 text-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="English Option"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(idx, e.target.value, false)
                      }
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formData.correctAnswerIndex === idx}
                      onChange={() => handleChange("correctAnswerIndex", idx)}
                      className="w-4 h-4 text-blue-600"
                      title="Mark as correct answer"
                    />
                  </div>
                  <div className="pl-8">
                    <input
                      type="text"
                      placeholder="Hindi Option (Optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.optionsHindi[idx]}
                      onChange={(e) =>
                        handleOptionChange(idx, e.target.value, true)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select the radio button for the correct answer.
            </p>
          </div>

          {/* Explanation */}
          {/* Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (English)
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.explanation}
                onChange={(e) => handleChange("explanation", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (Hindi)
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.explanationHindi}
                onChange={(e) =>
                  handleChange("explanationHindi", e.target.value)
                }
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Question Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Image (Optional)
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageSelect}
              className="hidden"
            />

            {/* Upload button or preview */}
            {!imagePreview && !formData.imageUrl ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploadingImage ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Click to Upload Image
                  </span>
                )}
              </button>
            ) : (
              <div className="relative inline-block">
                <img
                  src={imagePreview || formData.imageUrl}
                  alt="Question preview"
                  className="max-w-full max-h-64 rounded-md border border-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploadingImage}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Error message */}
            {imageError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {imageError}
              </p>
            )}

            {/* Help text */}
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, WEBP (max 5MB)
            </p>
          </div>

          {/* Linked Tests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Linked Tests
            </label>
            <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto bg-gray-50">
              {tests.length === 0 ? (
                <p className="text-gray-500 text-sm">No tests available.</p>
              ) : (
                tests.map((test) => (
                  <label
                    key={test.id}
                    className="flex items-center gap-2 mb-2 last:mb-0 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.testIds || []).includes(test.id)}
                      onChange={() => handleTestToggle(test.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{test.title}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isSaving || isUploadingImage}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving || isUploadingImage}
            >
              {isUploadingImage
                ? "Uploading Image..."
                : isSaving
                  ? "Saving..."
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
