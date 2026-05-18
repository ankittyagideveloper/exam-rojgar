# Quiz Question Image Support - Implementation Plan

## Overview

Add optional image support to quiz questions, allowing admins to upload, preview, and manage images while creating/editing questions.

## Tech Stack

- **Frontend**: React
- **Backend/DB**: Firebase Firestore
- **Storage**: Firebase Storage
- **Current Firebase SDK**: v12.6.0 ✅

---

## 1. Firebase Storage Setup

### 1.1 Initialize Firebase Storage

**File**: [`firebase.js`](firebase.js:1)

```javascript
import { getStorage } from "firebase/storage";

// Add after app initialization
export const storage = getStorage(app);
```

**Storage Bucket**: `exam-rojgaar-e1b10.firebasestorage.app` (already configured)

---

## 2. Image Upload Utilities

### 2.1 Create Storage Helper Functions

**New File**: `src/utils/storageHelpers.js`

**Functions to implement**:

#### `uploadQuestionImage(file, questionId)`

- Upload image to Firebase Storage
- Path: `questions/{questionId}/{timestamp}_{filename}`
- Return: `{ imageUrl, imagePath }`
- Handle errors and progress

#### `deleteQuestionImage(imagePath)`

- Delete image from Firebase Storage
- Handle errors gracefully

#### `validateImageFile(file)`

- Validate file type (jpg, jpeg, png, webp)
- Validate file size (max 5MB)
- Return validation result

**Implementation Details**:

```javascript
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

export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: "No file selected" };

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

export const uploadQuestionImage = async (file, questionId) => {
  const validation = validateImageFile(file);
  if (!validation.valid) throw new Error(validation.error);

  const timestamp = Date.now();
  const filename = `${timestamp}_${file.name}`;
  const imagePath = `questions/${questionId}/${filename}`;
  const storageRef = ref(storage, imagePath);

  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  return { imageUrl, imagePath };
};

export const deleteQuestionImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    // Don't throw - allow operation to continue even if delete fails
  }
};
```

---

## 3. Firestore Schema Update

### 3.1 Question Document Schema

**Collection**: `questions`

**New Fields**:

```javascript
{
  // Existing fields
  questionText: string,
  questionTextHindi: string,
  options: string[],
  optionsHindi: string[],
  explanation: string,
  explanationHindi: string,
  testIds: string[],
  correctAnswerIndex: number,

  // NEW: Image fields (optional)
  imageUrl: string | null,      // Public URL for displaying image
  imagePath: string | null,     // Storage path for deletion
  hasImage: boolean,            // Quick filter flag

  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  searchKeywords: string[]
}
```

**Migration**: No migration needed - fields are optional and backward compatible.

---

## 4. Admin Portal - EditQuestionModal Updates

### 4.1 Component State Management

**File**: [`src/pages/admin/components/EditQuestionModal.jsx`](src/pages/admin/components/EditQuestionModal.jsx:1)

**New State Variables**:

```javascript
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [isUploadingImage, setIsUploadingImage] = useState(false);
const [imageError, setImageError] = useState(null);
```

**Update formData State**:

```javascript
const [formData, setFormData] = useState({
  // ... existing fields
  imageUrl: "",
  imagePath: "",
  hasImage: false,
});
```

### 4.2 Image Upload UI Component

**Location**: After explanation fields, before linked tests

**UI Elements**:

1. **File Input** (hidden, triggered by button)
2. **Upload Button** (when no image)
3. **Image Preview** (when image exists)
4. **Remove Button** (when image exists)
5. **Loading Spinner** (during upload)
6. **Error Message** (on validation/upload failure)

**Layout**:

```jsx
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
      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors"
    >
      {isUploadingImage ? "Uploading..." : "Upload Image"}
    </button>
  ) : (
    <div className="relative inline-block">
      <img
        src={imagePreview || formData.imageUrl}
        alt="Question preview"
        className="max-w-md max-h-64 rounded-md border border-gray-300"
      />
      <button
        type="button"
        onClick={handleRemoveImage}
        disabled={isUploadingImage}
        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
      >
        ✕
      </button>
    </div>
  )}

  {/* Error message */}
  {imageError && <p className="text-sm text-red-600">{imageError}</p>}

  {/* Help text */}
  <p className="text-xs text-gray-500">Supported: JPG, PNG, WEBP (max 5MB)</p>
</div>
```

### 4.3 Image Handling Functions

**handleImageSelect**:

```javascript
const handleImageSelect = (e) => {
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
  const reader = new FileReader();
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
  reader.readAsDataURL(file);
};
```

**handleRemoveImage**:

```javascript
const handleRemoveImage = () => {
  setImageFile(null);
  setImagePreview(null);
  setImageError(null);

  // Mark for deletion if existing image
  if (formData.imagePath) {
    setFormData((prev) => ({
      ...prev,
      imageUrl: null,
      imagePath: null,
      hasImage: false,
      _deleteImage: true, // Flag for deletion
    }));
  }
};
```

**handleSubmit** (Updated):

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  let finalData = { ...formData };

  // Handle image upload if new file selected
  if (imageFile) {
    setIsUploadingImage(true);
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
    } catch (error) {
      setImageError(error.message);
      setIsUploadingImage(false);
      return;
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
```

---

## 5. Question Bank Page Updates

### 5.1 Display Image Indicator

**File**: [`src/pages/admin/QuestionBankPage.jsx`](src/pages/admin/QuestionBankPage.jsx:1)

**Update Table Row** (line ~235):

```jsx
<td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <div className="text-sm text-gray-900 line-clamp-2 max-w-xl">
      {q.questionText || "(No text)"}
    </div>
    {q.hasImage && (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
        📷 Image
      </span>
    )}
  </div>
  <div className="text-xs text-gray-500 mt-1">ID: {q.id}</div>
</td>
```

---

## 6. Quiz Display Updates

### 6.1 Display Question Images

**File**: [`src/component/quiz/index.jsx`](src/component/quiz/index.jsx:1)

**Current Implementation** (lines 271-278):

```jsx
{
  currentQuestionData?.image ? (
    <img
      height={300}
      width={300}
      src={currentQuestionData.image}
      alt={currentQuestionData.id + 1}
    />
  ) : null;
}
```

**Updated Implementation**:

```jsx
{
  currentQuestionData?.imageUrl && (
    <div className="my-4">
      <img
        src={currentQuestionData.imageUrl}
        alt={`Question ${currentQuestion + 1}`}
        className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
        style={{ maxHeight: "400px" }}
        onError={(e) => {
          e.target.style.display = "none";
          console.error("Failed to load question image");
        }}
      />
    </div>
  );
}
```

---

## 7. useQuestions Hook Updates

### 7.1 Update Create/Update Functions

**File**: [`src/pages/admin/hooks/useQuestions.js`](src/pages/admin/hooks/useQuestions.js:1)

**No changes needed** - hook already passes all data through. Image fields will be included automatically.

**Verification Points**:

- Line 93-103: `createQuestion` - passes `...questionData`
- Line 135-144: `updateQuestion` - passes `...questionData`

---

## 8. Testing Checklist

### 8.1 Image Upload Testing

- [ ] Upload valid image (JPG, PNG, WEBP)
- [ ] Reject invalid file types
- [ ] Reject oversized files (>5MB)
- [ ] Preview displays correctly
- [ ] Loading state shows during upload
- [ ] Error messages display properly

### 8.2 Image Management Testing

- [ ] Remove uploaded image before save
- [ ] Remove existing image and save
- [ ] Replace existing image with new one
- [ ] Cancel edit without saving image changes

### 8.3 Display Testing

- [ ] Image displays in quiz interface
- [ ] Image scales properly on mobile
- [ ] Broken image handling works
- [ ] Questions without images display normally

### 8.4 Data Integrity Testing

- [ ] Firestore document includes image fields
- [ ] Storage path is correct
- [ ] Image URL is accessible
- [ ] Old questions without images still work

---

## 9. Implementation Order

### Phase 1: Foundation (30 min)

1. ✅ Set up Firebase Storage in firebase.js
2. ✅ Create storageHelpers.js with upload/delete/validate functions

### Phase 2: Admin UI (45 min)

3. ✅ Update EditQuestionModal state management
4. ✅ Add image upload UI components
5. ✅ Implement image handling functions
6. ✅ Add loading states and error handling

### Phase 3: Display (20 min)

7. ✅ Update QuestionBankPage to show image indicator
8. ✅ Update Quiz component to display images

### Phase 4: Testing (30 min)

9. ✅ Test all upload scenarios
10. ✅ Test image display in quiz
11. ✅ Test error handling
12. ✅ Verify backward compatibility

**Total Estimated Time**: ~2 hours

---

## 10. Security Considerations

### 10.1 Firebase Storage Rules

**Recommended Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /questions/{questionId}/{filename} {
      // Allow authenticated admins to upload
      allow write: if request.auth != null && request.auth.token.admin == true;

      // Allow public read access
      allow read: if true;

      // Validate file size and type
      allow write: if request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 10.2 Client-Side Validation

- File type validation (MIME type check)
- File size validation (5MB limit)
- Image dimension validation (optional)

---

## 11. Performance Optimization

### 11.1 Image Optimization

- Consider adding image compression before upload
- Use responsive image loading
- Implement lazy loading for quiz images
- Cache images in browser

### 11.2 Storage Management

- Clean up orphaned images (images without questions)
- Implement image deletion when question is deleted
- Monitor storage usage

---

## 12. Future Enhancements

### 12.1 Potential Features

- [ ] Image cropping/editing before upload
- [ ] Multiple images per question
- [ ] Image galleries for options
- [ ] Drag-and-drop upload
- [ ] Bulk image upload
- [ ] Image CDN integration
- [ ] Automatic image optimization

---

## 13. Rollback Plan

If issues arise:

1. Image fields are optional - no breaking changes
2. Remove image upload UI from EditQuestionModal
3. Questions without images continue to work
4. Existing images remain accessible
5. Can disable feature with feature flag

---

## 14. Documentation Updates

### 14.1 Admin Guide

- How to upload images
- Supported formats and sizes
- Best practices for question images
- Troubleshooting common issues

### 14.2 Developer Guide

- Storage helper functions usage
- Schema documentation
- Testing procedures
- Maintenance tasks

---

## Summary

This implementation adds optional image support to quiz questions with:

- ✅ Firebase Storage integration
- ✅ Image upload with validation
- ✅ Preview and removal functionality
- ✅ Proper error handling
- ✅ Loading states
- ✅ Backward compatibility
- ✅ Clean UI/UX
- ✅ Security considerations

The implementation is non-breaking and can be rolled out incrementally.
