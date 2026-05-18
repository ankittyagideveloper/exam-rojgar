import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

// Validation constants
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

/**
 * Validate image file before upload
 * @param {File} file - The file to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Only JPG, PNG, and WEBP images are allowed",
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `Image size must be less than ${MAX_SIZE_MB}MB`,
    };
  }

  return { valid: true };
};

/**
 * Upload question image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} questionId - The question ID (used for storage path)
 * @returns {Promise<Object>} - { imageUrl: string, imagePath: string }
 */
export const uploadQuestionImage = async (file, questionId) => {
  // Validate file first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    // Create unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${sanitizedFilename}`;

    // Create storage path: questions/{questionId}/{filename}
    const imagePath = `questions/${questionId}/${filename}`;
    const storageRef = ref(storage, imagePath);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const imageUrl = await getDownloadURL(storageRef);

    return { imageUrl, imagePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete question image from Firebase Storage
 * @param {string} imagePath - The storage path of the image to delete
 * @returns {Promise<void>}
 */
export const deleteQuestionImage = async (imagePath) => {
  if (!imagePath) {
    return;
  }

  try {
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
    console.log("Image deleted successfully:", imagePath);
  } catch (error) {
    // Don't throw error - allow operation to continue even if delete fails
    // Image might already be deleted or path might be invalid
    console.error("Error deleting image (non-critical):", error);
  }
};

/**
 * Create a preview URL from a File object
 * @param {File} file - The image file
 * @returns {Promise<string>} - Base64 data URL for preview
 */
export const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

// Made with Bob
