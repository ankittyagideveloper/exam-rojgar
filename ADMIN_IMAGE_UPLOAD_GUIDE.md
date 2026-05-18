# Admin Guide: Uploading Images to Quiz Questions

## Quick Start

### How to Add an Image to a Question

1. **Open Question Editor**
   - Go to Question Bank page
   - Click "Edit" on any question

2. **Upload Image**
   - Scroll to "Question Image (Optional)" section
   - Click "Click to Upload Image" button
   - Select an image file from your computer

3. **Preview & Adjust**
   - Image preview appears immediately
   - Verify the image looks correct
   - Click the ❌ button to remove if needed

4. **Save**
   - Click "Save Changes" button
   - Wait for "Uploading Image..." to complete
   - Question saved with image

---

## Supported Image Formats

✅ **Allowed**:

- JPG / JPEG
- PNG
- WEBP

❌ **Not Allowed**:

- GIF
- BMP
- SVG
- PDF
- Other formats

---

## File Size Limit

**Maximum**: 5MB per image

💡 **Tips for reducing file size**:

- Use online image compressors (TinyPNG, Squoosh)
- Resize large images before uploading
- Use WEBP format for better compression
- Avoid uploading screenshots at full resolution

---

## Best Practices

### Image Quality

- ✅ Use clear, high-contrast images
- ✅ Ensure text in images is readable
- ✅ Test on mobile devices
- ❌ Avoid blurry or pixelated images

### Image Content

- ✅ Diagrams and charts
- ✅ Mathematical formulas
- ✅ Maps and illustrations
- ✅ Reference materials
- ❌ Copyrighted content without permission

### File Naming

- ✅ Use descriptive names: `triangle-diagram.png`
- ✅ Avoid special characters
- ❌ Don't use: `IMG_1234.jpg`

---

## Common Tasks

### Replace an Existing Image

1. Open question editor
2. Click ❌ on current image
3. Click "Click to Upload Image"
4. Select new image
5. Save changes

### Remove an Image

1. Open question editor
2. Click ❌ on the image
3. Save changes
4. Image will be deleted from storage

### Cancel Upload

- Click "Cancel" button before saving
- Changes won't be applied
- Original image remains unchanged

---

## Troubleshooting

### "Only JPG, PNG, and WEBP images are allowed"

**Problem**: Wrong file format
**Solution**: Convert image to JPG, PNG, or WEBP

### "Image size must be less than 5MB"

**Problem**: File too large
**Solution**:

- Compress the image using online tools
- Resize to smaller dimensions
- Use WEBP format

### "Failed to upload image"

**Problem**: Network or permission error
**Solution**:

- Check internet connection
- Refresh page and try again
- Contact administrator if persists

### Image Not Displaying in Quiz

**Problem**: Image failed to load
**Solution**:

- Check if image was saved correctly
- Verify image URL in question data
- Try re-uploading the image

---

## FAQ

### Q: Can I add multiple images to one question?

**A**: Currently, only one image per question is supported.

### Q: Will images work on mobile devices?

**A**: Yes, images are responsive and scale automatically.

### Q: What happens to the old image when I upload a new one?

**A**: The old image is automatically deleted from storage.

### Q: Can students download the images?

**A**: Yes, images are publicly accessible via URL.

### Q: Do images affect quiz loading time?

**A**: Minimal impact. Images are optimized and cached by browsers.

### Q: Can I use images from Google?

**A**: Only if you have permission. Use royalty-free images or create your own.

---

## Image Recommendations by Question Type

### Mathematics

- ✅ Geometric diagrams
- ✅ Graphs and charts
- ✅ Complex formulas
- Recommended size: 800x600px

### Science

- ✅ Experimental setups
- ✅ Anatomical diagrams
- ✅ Chemical structures
- Recommended size: 1000x800px

### Geography

- ✅ Maps
- ✅ Topographical images
- ✅ Satellite imagery
- Recommended size: 1200x800px

### General Knowledge

- ✅ Historical photos
- ✅ Infographics
- ✅ Reference images
- Recommended size: 800x600px

---

## Storage Management

### Current Limits

- **Per Image**: 5MB
- **Total Storage**: Check Firebase console
- **Images per Question**: 1

### Monitoring Usage

- Admin can check Firebase Storage console
- View total storage used
- See individual file sizes

### Cleanup

- Deleted questions' images remain in storage
- Contact administrator for bulk cleanup
- Regular maintenance recommended

---

## Keyboard Shortcuts

| Action           | Shortcut            |
| ---------------- | ------------------- |
| Open file picker | Click upload button |
| Remove image     | Click ❌ button     |
| Save changes     | Click Save button   |
| Cancel           | Click Cancel or Esc |

---

## Mobile Usage

### Uploading from Mobile

1. Open question editor on mobile
2. Tap "Click to Upload Image"
3. Choose from:
   - Camera (take new photo)
   - Gallery (select existing)
4. Preview and save

### Tips for Mobile

- ✅ Use landscape orientation for better preview
- ✅ Ensure good lighting when taking photos
- ✅ Crop images before uploading
- ❌ Avoid uploading very large photos

---

## Security & Privacy

### Image Access

- ✅ Images are publicly accessible
- ✅ No authentication required to view
- ❌ Don't upload sensitive information
- ❌ Don't upload personal data

### Permissions

- Only admins can upload images
- Only admins can delete images
- Students can only view images

---

## Getting Help

### If You Need Assistance

1. Check this guide first
2. Review error messages carefully
3. Try refreshing the page
4. Contact technical support

### Reporting Issues

Include:

- Screenshot of error
- Image file details (size, format)
- Steps to reproduce
- Browser and device info

---

## Version History

**v1.0** (2026-05-18)

- Initial image upload feature
- Support for JPG, PNG, WEBP
- 5MB file size limit
- Single image per question

---

## Quick Reference Card

```
┌─────────────────────────────────────┐
│  IMAGE UPLOAD QUICK REFERENCE       │
├─────────────────────────────────────┤
│  Formats: JPG, PNG, WEBP            │
│  Max Size: 5MB                      │
│  Per Question: 1 image              │
│                                     │
│  Upload: Click upload button        │
│  Remove: Click ❌ on preview        │
│  Replace: Remove + Upload new       │
│                                     │
│  ✅ Clear, high-contrast images     │
│  ✅ Compress before uploading       │
│  ✅ Test on mobile                  │
│  ❌ No copyrighted content          │
└─────────────────────────────────────┘
```

---

_Last Updated: 2026-05-18_
_Feature Version: 1.0_
