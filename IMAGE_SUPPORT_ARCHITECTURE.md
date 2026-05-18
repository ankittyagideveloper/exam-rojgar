# Image Support Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN PORTAL                                 │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │         EditQuestionModal Component                         │   │
│  │                                                              │   │
│  │  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐  │   │
│  │  │ File Input   │───▶│  Validation  │──▶│   Preview    │  │   │
│  │  │ (hidden)     │    │  (5MB, type) │   │   Display    │  │   │
│  │  └──────────────┘    └──────────────┘   └──────────────┘  │   │
│  │         │                    │                   │          │   │
│  │         │                    ▼                   │          │   │
│  │         │            ┌──────────────┐            │          │   │
│  │         └───────────▶│ Upload Btn   │◀───────────┘          │   │
│  │                      └──────────────┘                       │   │
│  │                             │                               │   │
│  └─────────────────────────────┼───────────────────────────────┘   │
│                                │                                   │
└────────────────────────────────┼───────────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  storageHelpers.js     │
                    │                        │
                    │  • validateImageFile() │
                    │  • uploadQuestionImage()│
                    │  • deleteQuestionImage()│
                    └────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
        ┌─────────────────────┐   ┌─────────────────────┐
        │  Firebase Storage   │   │  Firebase Firestore │
        │                     │   │                     │
        │  Path:              │   │  Collection:        │
        │  questions/         │   │  questions/         │
        │    {id}/            │   │    {questionId}     │
        │      {timestamp}_   │   │                     │
        │      {filename}     │   │  Fields:            │
        │                     │   │  • imageUrl         │
        │  Returns:           │   │  • imagePath        │
        │  • imageUrl         │   │  • hasImage         │
        │  • imagePath        │   │  • questionText     │
        └─────────────────────┘   │  • options          │
                    │              │  • ...              │
                    │              └─────────────────────┘
                    │                         │
                    └────────────┬────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         QUIZ INTERFACE                               │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              Quiz Component                                 │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────┐      │   │
│  │  │  Question Display                                 │      │   │
│  │  │                                                    │      │   │
│  │  │  1. Question Text                                 │      │   │
│  │  │                                                    │      │   │
│  │  │  ┌─────────────────────────────────────┐         │      │   │
│  │  │  │  {imageUrl && (                      │         │      │   │
│  │  │  │    <img src={imageUrl} />            │         │      │   │
│  │  │  │  )}                                   │         │      │   │
│  │  │  └─────────────────────────────────────┘         │      │   │
│  │  │                                                    │      │   │
│  │  │  A. Option 1                                      │      │   │
│  │  │  B. Option 2                                      │      │   │
│  │  │  C. Option 3                                      │      │   │
│  │  │  D. Option 4                                      │      │   │
│  │  └──────────────────────────────────────────────────┘      │   │
│  └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│   Admin     │
│  Selects    │
│   Image     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Client-Side Validation                 │
│  • File type (jpg, png, webp)           │
│  • File size (< 5MB)                    │
│  • Create preview (FileReader)          │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Upload to Firebase Storage             │
│  • Path: questions/{id}/{timestamp}_... │
│  • uploadBytes(storageRef, file)        │
│  • getDownloadURL(storageRef)           │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Returns                                 │
│  • imageUrl (public URL)                │
│  • imagePath (storage reference)        │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Save to Firestore                      │
│  • Update question document             │
│  • Add imageUrl, imagePath, hasImage    │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Quiz Fetches Question                  │
│  • Reads imageUrl from Firestore        │
│  • Displays image if present            │
└─────────────────────────────────────────┘
```

## Component Interaction Flow

```
EditQuestionModal
    │
    ├─▶ handleImageSelect()
    │       │
    │       ├─▶ validateImageFile()
    │       │       └─▶ Check type & size
    │       │
    │       └─▶ Create preview (FileReader)
    │
    ├─▶ handleSubmit()
    │       │
    │       ├─▶ uploadQuestionImage()
    │       │       │
    │       │       ├─▶ Firebase Storage upload
    │       │       │       └─▶ Returns {imageUrl, imagePath}
    │       │       │
    │       │       └─▶ Update formData
    │       │
    │       └─▶ onSave(questionId, formData)
    │               │
    │               └─▶ updateQuestion() in useQuestions
    │                       │
    │                       └─▶ Firestore updateDoc()
    │
    └─▶ handleRemoveImage()
            │
            ├─▶ Clear preview
            │
            └─▶ deleteQuestionImage()
                    └─▶ Firebase Storage deleteObject()
```

## State Management

```
EditQuestionModal State:
├─ formData
│  ├─ questionText
│  ├─ options
│  ├─ imageUrl ◀────── NEW
│  ├─ imagePath ◀───── NEW
│  └─ hasImage ◀────── NEW
│
├─ imageFile ◀──────── NEW (File object)
├─ imagePreview ◀───── NEW (Base64 string)
├─ isUploadingImage ◀─ NEW (boolean)
└─ imageError ◀─────── NEW (string | null)
```

## File Structure

```
src/
├── utils/
│   ├── firestoreHelpers.js (existing)
│   └── storageHelpers.js ◀────────── NEW
│       ├── validateImageFile()
│       ├── uploadQuestionImage()
│       └── deleteQuestionImage()
│
├── pages/admin/
│   ├── components/
│   │   └── EditQuestionModal.jsx ◀─── UPDATED
│   │       ├── Image upload UI
│   │       ├── Preview display
│   │       └── Remove functionality
│   │
│   ├── QuestionBankPage.jsx ◀──────── UPDATED
│   │   └── Image indicator badge
│   │
│   └── hooks/
│       └── useQuestions.js (no changes needed)
│
├── component/quiz/
│   └── index.jsx ◀──────────────────── UPDATED
│       └── Image display in questions
│
└── firebase.js ◀────────────────────── UPDATED
    └── Export storage instance
```

## Error Handling Flow

```
┌─────────────────┐
│  User Action    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Validation Layer               │
│  • File type check              │
│  • File size check              │
└────────┬────────────────────────┘
         │
         ├─ Valid ──────────────────┐
         │                          │
         └─ Invalid ────────┐       │
                            │       │
                            ▼       ▼
                    ┌──────────────────────┐
                    │  Show Error Message  │
                    │  • setImageError()   │
                    └──────────────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐
                            │  Upload Layer    │
                            │  • try/catch     │
                            └────────┬─────────┘
                                     │
                            ┌────────┴────────┐
                            │                 │
                    Success │                 │ Error
                            │                 │
                            ▼                 ▼
                    ┌──────────────┐  ┌──────────────┐
                    │  Continue    │  │  Show Error  │
                    │  Save        │  │  Retry       │
                    └──────────────┘  └──────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Client-Side Validation        │
│  • File type check (MIME)               │
│  • File size check (5MB)                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Layer 2: Firebase Storage Rules        │
│  • Authentication check                 │
│  • Admin role verification              │
│  • File size validation                 │
│  • Content type validation              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Layer 3: Firestore Security Rules      │
│  • Write permission check               │
│  • Document structure validation        │
└─────────────────────────────────────────┘
```

## Performance Considerations

```
Upload Process:
├─ Client-side compression (future)
├─ Progress tracking (future)
├─ Parallel upload for multiple images (future)
└─ Retry logic on failure (future)

Display Process:
├─ Lazy loading images
├─ Responsive image sizing
├─ Browser caching
├─ CDN integration (future)
└─ Image optimization (future)

Storage Management:
├─ Orphaned image cleanup (future)
├─ Storage quota monitoring
└─ Image lifecycle management
```

## Testing Strategy

```
Unit Tests:
├─ validateImageFile()
│  ├─ Valid file types
│  ├─ Invalid file types
│  ├─ File size limits
│  └─ Edge cases
│
├─ uploadQuestionImage()
│  ├─ Successful upload
│  ├─ Upload failure
│  └─ Network errors
│
└─ deleteQuestionImage()
   ├─ Successful deletion
   ├─ File not found
   └─ Permission errors

Integration Tests:
├─ Complete upload flow
├─ Image preview generation
├─ Form submission with image
├─ Image removal flow
└─ Quiz display with images

E2E Tests:
├─ Admin uploads image
├─ Admin edits question with image
├─ Admin removes image
├─ Student views question with image
└─ Backward compatibility (questions without images)
```

## Rollout Strategy

```
Phase 1: Development
├─ Implement core functionality
├─ Add validation and error handling
└─ Create unit tests

Phase 2: Staging
├─ Deploy to staging environment
├─ Test with sample data
├─ Verify Firebase Storage rules
└─ Performance testing

Phase 3: Production (Gradual)
├─ Enable for admin users only
├─ Monitor storage usage
├─ Collect feedback
└─ Fix issues

Phase 4: Full Release
├─ Enable for all admins
├─ Update documentation
├─ Monitor performance
└─ Plan enhancements
```
