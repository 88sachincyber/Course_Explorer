import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseExplorer from "./pages/CourseExplorer.jsx";
import Admin from "./pages/Admin.jsx";
import CourseBuilder from "./pages/CourseBuilder";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseExplorer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/builder" element={<CourseBuilder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
