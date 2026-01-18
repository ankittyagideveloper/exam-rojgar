import { useState, useEffect } from "react";
import { DEFAULT_TEST_FORM } from "../constants";
import { validateTestForm } from "../utils/validation";

/**
 * Custom hook for managing test form state
 * @param {Object} initialData - Initial form data (for editing)
 * @returns {Object} - Form state and handlers
 */
export const useTestForm = (initialData = null) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        testId: initialData.testId || initialData.id || "",
        title: initialData.title || "",
        duration: initialData.durationMinutes || 90,
        isActive: initialData.isActive || false,
        requiresRegistration: initialData.requiresRegistration || false,
        marksPerQuestion: initialData.marksPerQuestion || 1,
        negativeMarking:
          initialData.negativeMarking !== undefined
            ? initialData.negativeMarking
            : 0.33,
        isEditing,
      };
    }
    return { ...DEFAULT_TEST_FORM, isEditing: false };
  });

  const [errors, setErrors] = useState({});

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        testId: initialData.testId || initialData.id || "",
        title: initialData.title || "",
        duration: initialData.durationMinutes || 90,
        isActive: initialData.isActive || false,
        requiresRegistration: initialData.requiresRegistration || false,
        marksPerQuestion: initialData.marksPerQuestion || 1,
        negativeMarking:
          initialData.negativeMarking !== undefined
            ? initialData.negativeMarking
            : 0.33,
        isEditing: true,
      });
      setErrors({});
    } else {
      setFormData({ ...DEFAULT_TEST_FORM, isEditing: false });
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const validationErrors = validateTestForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const reset = () => {
    setFormData({ ...DEFAULT_TEST_FORM, isEditing: false });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
    isEditing,
  };
};
