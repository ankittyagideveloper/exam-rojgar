# Course Page Implementation Plan

## Overview

Implement a complete course learning system with clickable course cards, dynamic routing, individual course pages with collapsible seasons, video cards, and a YouTube-integrated video player.

## Requirements Summary

- Make course cards clickable and responsive
- Dynamic routing: `/learn/:courseName` and `/learn/:courseName/:videoId`
- Course detail page with header, description, and collapsible season sections
- Video cards with completion status tracking
- YouTube-integrated video player component
- "Start Learning" button navigates to first video
- Dark theme UI matching the reference image

---

## Implementation Steps

### 1. Data Structure Enhancement

**File:** `src/pages/mockData.js`

**Changes:**

- Extend `courseMockData` to include:
  - `seasons` array with video lessons
  - Each season contains: `id`, `title`, `videos` array
  - Each video contains: `id`, `title`, `description`, `youtubeId`, `duration`, `completed`

**Example Structure:**

```javascript
{
  id: "course-rrb-ntpc-foundation",
  title: "RRB NTPC Foundation Course",
  description: "Build strong fundamentals...",
  thumbnail: "/rrb-ntpc.webp",
  slug: "rrb-ntpc-foundation",
  category: "Railway Exams",
  level: "Beginner",
  fullDescription: "Detailed multi-line description...",
  seasons: [
    {
      id: "season-1",
      title: "Season 1",
      videos: [
        {
          id: "ep-01",
          episodeNumber: "EP-01",
          title: "How JavaScript Works 🔥 & Execution Context",
          description: "Understanding how JavaScript works...",
          youtubeId: "ZvbzSrg0afE",
          duration: "15:30",
          completed: false
        }
      ]
    }
  ]
}
```

---

### 2. Make Course Cards Clickable

**File:** `src/pages/LearnPage.jsx`

**Changes:**

- Import `Link` from `react-router-dom`
- Wrap each course card `<article>` with `<Link to={`/learn/${course.slug}`}>`
- Add `cursor-pointer` class
- Ensure hover effects work properly
- Verify responsive grid: `sm:grid-cols-2 xl:grid-cols-3`

**Key Points:**

- Use `course.slug` for URL generation
- Maintain existing hover animations
- Ensure accessibility (proper link semantics)

---

### 3. Create CoursePage Component

**File:** `src/pages/CoursePage.jsx` (NEW)

**Structure:**

```jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { courseMockData } from "./mockData";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
} from "@tabler/icons-react";

function CoursePage() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [expandedSeasons, setExpandedSeasons] = useState({});

  // Find course by slug
  const course = courseMockData.find((c) => c.slug === courseName);

  // Handle 404
  if (!course) return <div>Course not found</div>;

  // Get first video for "Start Learning" button
  const firstVideo = course.seasons?.[0]?.videos?.[0];

  return (
    <>
      <Helmet>
        <title>{course.title} | Exam Rojgaar</title>
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Course Header Section */}
        {/* Course Content Section with Collapsible Seasons */}
      </div>
    </>
  );
}
```

**Layout Sections:**

#### A. Course Header

- Left side: Course thumbnail with "Start Learning" button overlay
- Right side: Course title, category badge, level, full description
- Responsive: Stack vertically on mobile, side-by-side on desktop

#### B. Course Content Section

- "Course Content" heading with orange left border
- Collapsible season cards
- Each season shows video count
- Click to expand/collapse

#### C. Video Cards (within seasons)

- Video icon, episode number, title with emoji
- Short description below
- Completion status icon (green checkmark)
- Clickable to navigate to video player
- Hover effects

---

### 4. Create Video Player Component

**File:** `src/component/CourseVideoPlayer.jsx` (NEW)

**Features:**

- YouTube iframe integration
- Responsive 16:9 aspect ratio
- Props: `youtubeId`, `title`
- Auto-play option
- Proper iframe attributes for security

**Implementation:**

```jsx
import React from "react";

function CourseVideoPlayer({ youtubeId, title }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export default CourseVideoPlayer;
```

---

### 5. Create Video Player Page

**File:** `src/pages/VideoPlayerPage.jsx` (NEW)

**Structure:**

- Use `useParams()` to get `courseName` and `videoId`
- Find course and video from mock data
- Display video player at top
- Show video title, description below
- Navigation: Previous/Next video buttons
- Breadcrumb navigation back to course
- Related videos sidebar (optional)

**Layout:**

```
┌─────────────────────────────────────┐
│     YouTube Video Player            │
│     (16:9 aspect ratio)             │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Episode Title                      │
│  Description                        │
│  [Previous] [Next] buttons          │
└─────────────────────────────────────┘
```

---

### 6. Update Routing

**File:** `src/App.jsx`

**Add Routes:**

```jsx
{
  path: "learn",
  element: <LearnPage />,
},
{
  path: "learn/:courseName",
  element: <CoursePage />,
},
{
  path: "learn/:courseName/:videoId",
  element: <VideoPlayerPage />,
},
```

**Route Order:** Place specific routes before generic ones

---

### 7. Styling Guidelines

**Color Palette (from UI reference):**

- Background: `#0a0a0a` or `#1a1a1a`
- Card background: `#2a2a2a` or `#1f1f1f`
- Text primary: `#ffffff`
- Text secondary: `#a0a0a0`
- Accent orange: `#ff6b35` or `#ff8c42`
- Success green: `#4ade80` or `#22c55e`
- Border: `#3a3a3a`

**Responsive Breakpoints:**

- Mobile: `< 640px` (sm)
- Tablet: `640px - 1024px` (md, lg)
- Desktop: `> 1024px` (xl, 2xl)

**Key Classes:**

- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Shadows: `shadow-sm`, `shadow-md`
- Transitions: `transition-all duration-200`
- Hover effects: `hover:scale-105`, `hover:shadow-lg`

---

### 8. Component Interactions

#### Course Card Click Flow:

1. User clicks course card on `/learn`
2. Navigate to `/learn/rrb-ntpc-foundation`
3. CoursePage renders with course details
4. User clicks "Start Learning" or video card
5. Navigate to `/learn/rrb-ntpc-foundation/ep-01`
6. VideoPlayerPage renders with YouTube player

#### Season Collapse/Expand:

- Use `useState` to track expanded seasons
- Toggle icon: `IconChevronDown` / `IconChevronUp`
- Smooth animation with Tailwind transitions
- Default: First season expanded, others collapsed

#### Video Completion Status:

- Green checkmark icon for completed videos
- Gray icon for incomplete videos
- Store in mock data (future: persist to backend)

---

### 9. SEO Optimization

**Helmet Tags for CoursePage:**

```jsx
<Helmet>
  <title>{course.title} | Exam Rojgaar</title>
  <meta name="description" content={course.description} />
  <meta property="og:title" content={course.title} />
  <meta property="og:description" content={course.description} />
  <meta property="og:image" content={course.thumbnail} />
</Helmet>
```

**Helmet Tags for VideoPlayerPage:**

```jsx
<Helmet>
  <title>
    {video.title} - {course.title} | Exam Rojgaar
  </title>
  <meta name="description" content={video.description} />
</Helmet>
```

---

### 10. Testing Checklist

- [ ] Course cards are clickable and navigate correctly
- [ ] Course page loads with correct data based on slug
- [ ] 404 handling for invalid course slugs
- [ ] Seasons expand/collapse smoothly
- [ ] Video cards navigate to video player page
- [ ] YouTube player loads and plays videos
- [ ] "Start Learning" button works
- [ ] Responsive on mobile (320px, 375px, 414px)
- [ ] Responsive on tablet (768px, 1024px)
- [ ] Responsive on desktop (1280px, 1920px)
- [ ] Hover effects work on all interactive elements
- [ ] Back navigation works properly
- [ ] SEO meta tags are correct

---

## File Structure Summary

```
src/
├── pages/
│   ├── LearnPage.jsx (UPDATE)
│   ├── CoursePage.jsx (NEW)
│   ├── VideoPlayerPage.jsx (NEW)
│   └── mockData.js (UPDATE)
├── component/
│   └── CourseVideoPlayer.jsx (NEW)
└── App.jsx (UPDATE - add routes)
```

---

## Implementation Order

1. ✅ Update `mockData.js` with seasons and videos
2. ✅ Make course cards clickable in `LearnPage.jsx`
3. ✅ Create `CoursePage.jsx` with header and content sections
4. ✅ Implement collapsible seasons in `CoursePage.jsx`
5. ✅ Create `CourseVideoPlayer.jsx` component
6. ✅ Create `VideoPlayerPage.jsx`
7. ✅ Add routes in `App.jsx`
8. ✅ Style all components to match UI reference
9. ✅ Test responsive behavior
10. ✅ Add SEO meta tags

---

## Notes

- Use existing Tabler icons for consistency
- Follow existing code patterns in the project
- Maintain dark theme throughout
- Ensure accessibility (ARIA labels, keyboard navigation)
- Consider loading states for future API integration
- Plan for error boundaries around video player

---

## Future Enhancements (Out of Scope)

- Video progress tracking with backend
- User authentication for course enrollment
- Comments section for videos
- Download course materials
- Certificate generation
- Course search and filtering
- Playlist creation
- Bookmarking videos
