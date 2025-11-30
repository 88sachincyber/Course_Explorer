# 📚 Course Explorer – React Intern Assignment

A fully interactive course exploration platform built using **React + Vite** and styled with **Tailwind CSS**, supporting Markdown content, progress tracking, search, and client-side persistence via localStorage.

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
8. Screenshots (Optional)  
9. Author  

---

# 🧭 About the Project

**Course Explorer** is a client-side learning platform that allows users to:

- Browse multiple courses  
- View topics & subtopics  
- Read content rendered from Markdown  
- Track learning progress  
- Search across course hierarchy  
- View admin users list  
- Add new custom courses  
- Save everything locally without a backend  

The app offers a responsive, accessible, and user-friendly interface, suitable for both desktop and mobile users.

---

# 🚀 Getting Started (Setup Instructions)

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/course-explorer.git
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

### 4️⃣ Build for production
```
npm run build
```

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
 ├── pages/
 ├── hooks/
 ├── data/
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

# 👨‍💻 Author

**Sachin Yadav**  
B.Tech CSE  
React • MERN • Java  
GitHub: https://github.com/your-username  
LinkedIn: https://linkedin.com/in/your-profile  

---

# 🙏 Thank You!

This project fulfills all requirements including nice-to-haves and bonus tasks.
