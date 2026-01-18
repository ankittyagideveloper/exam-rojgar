// Default form values
// Note: maxMarks and questionsCount are auto-calculated, not user input
export const DEFAULT_TEST_FORM = {
  testId: '',
  title: '',
  duration: 90,
  isActive: false,
  requiresRegistration: false,
};

// Validation rules
export const VALIDATION_RULES = {
  title: {
    required: true,
    minLength: 3,
    message: 'Test title must be at least 3 characters',
  },
  testId: {
    required: true,
    minLength: 1,
    message: 'Test ID is required',
  },
  duration: {
    required: true,
    min: 1,
    message: 'Duration must be at least 1 minute',
  },
  maxMarks: {
    required: false,
    min: 0,
    message: 'Max marks must be 0 or greater',
  },
  questionsCount: {
    required: false,
    min: 0,
    message: 'Questions count must be 0 or greater',
  },
};
