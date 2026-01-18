import { VALIDATION_RULES } from '../constants';

/**
 * Validate form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Object with errors (empty if valid)
 */
export const validateTestForm = (formData) => {
  const errors = {};

  // Validate title
  if (VALIDATION_RULES.title.required && !formData.title?.trim()) {
    errors.title = 'Test title is required';
  } else if (
    formData.title?.trim() &&
    formData.title.trim().length < VALIDATION_RULES.title.minLength
  ) {
    errors.title = VALIDATION_RULES.title.message;
  }

  // Validate testId (only for new tests)
  if (!formData.isEditing && VALIDATION_RULES.testId.required) {
    if (!formData.testId?.trim()) {
      errors.testId = 'Test ID is required';
    } else if (
      formData.testId.trim().length < VALIDATION_RULES.testId.minLength
    ) {
      errors.testId = VALIDATION_RULES.testId.message;
    }
  }

  // Validate duration
  if (VALIDATION_RULES.duration.required) {
    if (!formData.duration || formData.duration < VALIDATION_RULES.duration.min) {
      errors.duration = VALIDATION_RULES.duration.message;
    }
  }

  // Validate maxMarks
  if (formData.maxMarks !== undefined && formData.maxMarks < VALIDATION_RULES.maxMarks.min) {
    errors.maxMarks = VALIDATION_RULES.maxMarks.message;
  }

  // Validate questionsCount
  if (
    formData.questionsCount !== undefined &&
    formData.questionsCount < VALIDATION_RULES.questionsCount.min
  ) {
    errors.questionsCount = VALIDATION_RULES.questionsCount.message;
  }

  return errors;
};

/**
 * Check if form is valid
 * @param {Object} errors - Validation errors
 * @returns {boolean} - True if form is valid
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
