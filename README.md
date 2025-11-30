# 📚 Course Explorer

A fully interactive course exploration platform built using **React + Vite** and styled with **Tailwind CSS**, supporting Markdown content, progress tracking, search, and client-side persistence via localStorage.
---

## 🌐 Live Demo (Deployed Link)
👉 **https://course-explorer-six.vercel.app**
---

# 📑 Table of Contents

1. About the Project  
2. Getting Started (Setup Instructions)  
3. Architecture Summary  
4. Features Implemented  
   - Nice-to-Haves  
   - Bonus Features  
5. Known Issues / Future Improvements  
6. Tech Stack  
7. Folder Structure  


---

# 🧭 About the Project

**Course Explorer** is a client-side learning platform that allows users to:

- Browse courses  
- View topics & subtopics  
- Read Markdown content  
- Track subtopic completion  
- Search course hierarchy  
- Add custom courses  
- Reset data to defaults  
- Access an admin view of users (read-only)  

The app offers a responsive, accessible, and user-friendly interfaces.

---

# 🚀 Getting Started (Setup Instructions)

### 1️⃣ Clone the repository
```
git clone https://github.com/88sachincyber/Course_Explorer
cd course-explorer
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Start the development server
```
npm run dev
```

Navigate to:  
👉 http://localhost:5173

---

# 🏗 Architecture Summary

This project uses a **component-driven, state-lifting architecture**, supported by localStorage for persistence.

## 🔑 Key Components
| Component | Responsibility |
|----------|----------------|
| CourseExplorer.jsx | Main screen for navigation, viewing topics/subtopics, progress tracking |
| Sidebar.jsx | Course/topic/subtopic navigation + search functionality |
| Breadcrumbs.jsx | Displays navigation path |
| MarkdownViewer.jsx | Renders Markdown using react-markdown |
| Admin.jsx | Displays users |
| AddCourse.jsx | Add new courses |
| useLocalStorage.js | Persistent state hook |

## 🧠 Application State
| State | Purpose |
|-------|---------|
| selectedCourse | Current course |
| selectedTopic | Current topic |
| selectedSubtopic | Current subtopic |
| progress | Saved subtopic completion |
| courses | Default + custom courses |

---

# ✨ Features Implemented

## ✔ Course Explorer
- Sidebar navigation  
- Topic → Subtopic drill-down  
- Markdown rendering  
- Breadcrumb navigation  

## ✔ Search
- Filters courses, topics, subtopics  
- Clickable search results  

## ✔ Admin Panel
- Loads users from JSON  
- Handles loading/empty/error state  

## ✔ Responsive Design
- Mobile sidebar  
- Tailwind styling  
- Keyboard accessible  

---

# 🌟 Nice-to-Haves Implemented

## ⭐ Progress Tracking
- Checkbox completion  
- Topic-level progress %  
- Course-level progress %  
- Saved in localStorage  

## ⭐ Markdown Extras
- Code blocks  
- Blockquotes  
- Headings  

---

# 💡 Bonus Features

- Add new courses (client-side)
- Reset to default data
- Deep routing
- Import/export JSON  

---
# 🔗 Application Routes (How to Navigate)

Some pages are not visible in the UI menu. Use these paths:

## **1️⃣ Home (Course Explorer)**
```
/
```

## **2️⃣ Admin Panel (Users List)**
```
/admin
```

## **3️⃣ Course Builder (Add Course)**
```
/builder
```

## **4️⃣ Deep Navigation Routes**
### Course:
```
/course/:courseId
```

### Topic:
```
/course/:courseId/topic/:topicId
```

### Subtopic:
```
/course/:courseId/topic/:topicId/subtopic/:subtopicId
```

These can be shared/bookmarked for internal navigation.

---
# 🐞 Known Issues / Future Improvements

| Improvement | Status |
|------------|--------|
| Syntax highlighting | Pending |
| Dark mode | Optional |
| Add animations | Planned |
| Add unit tests | Pending |

---

# 🧰 Tech Stack

- React + Vite  
- Tailwind CSS  
- React Router  
- react-markdown  
- LocalStorage  

---

# 📁 Folder Structure

```
src/
 ├── components/
 │     ├── Sidebar.jsx
 │     ├── Breadcrumbs.jsx
 │     ├── MarkdownViewer.jsx
 │     
 │
 ├── pages/
 │     ├── CourseExplorer.jsx
 │     ├── Admin.jsx
 │     └── AddCourse.jsx
 │
 ├── hooks/
 │     └── useLocalStorage.js
 │
 ├── data/
 │     ├── courses.json
 │     └── users.json
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css

```

---


---

# 🙏 Thank You!

