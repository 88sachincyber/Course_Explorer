import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import DefaultCourses from "../data/courses.json";

const CourseBuilder = () => {
  const [courses, setCourses] = useLocalStorage(
    "customCourses",
    DefaultCourses.courses
  );

  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    difficulty: "BEGINNER",
    topics: []
  });

  const [topic, setTopic] = useState({
    title: "",
    description: "",
    subtopics: []
  });

  const [subtopic, setSubtopic] = useState({
    title: "",
    content: ""
  });

  // Add Subtopic
  const addSubtopic = () => {
    if (!subtopic.title.trim()) return;
    setTopic({
      ...topic,
      subtopics: [...topic.subtopics, subtopic]
    });
    setSubtopic({ title: "", content: "" });
  };

  // Add Topic
  const addTopic = () => {
    if (!topic.title.trim()) return;
    setCourse({
      ...course,
      topics: [...course.topics, topic]
    });
    setTopic({ title: "", description: "", subtopics: [] });
  };

  // Add Course
  const addCourse = () => {
    if (!course.title.trim()) return;
    setCourses([...courses, course]);
    setCourse({
      title: "",
      subtitle: "",
      description: "",
      difficulty: "BEGINNER",
      topics: []
    });
    alert("Course added successfully!");
  };

  // Reset to defaults
  const resetData = () => {
    setCourses(DefaultCourses.courses);
    alert("Data restored to default JSON!");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Create / Edit Course
      </h1>

      {/* MAIN COURSE FORM */}
      <div className="bg-white border p-4 md:p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">New Course</h2>

        {/* Course Fields */}
        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-3 border rounded mb-3 text-sm"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Subtitle"
          className="w-full p-3 border rounded mb-3 text-sm"
          value={course.subtitle}
          onChange={(e) => setCourse({ ...course, subtitle: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded mb-3 text-sm min-h-[100px]"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        ></textarea>

        <select
          className="w-full p-3 border rounded mb-4 text-sm"
          value={course.difficulty}
          onChange={(e) =>
            setCourse({ ...course, difficulty: e.target.value })
          }
        >
          <option>BEGINNER</option>
          <option>INTERMEDIATE</option>
          <option>ADVANCED</option>
        </select>

        {/* TOPIC SECTION */}
        <h3 className="text-lg font-bold mt-4">Add Topics</h3>

        <input
          type="text"
          placeholder="Topic Title"
          className="w-full p-3 border rounded mb-3 text-sm"
          value={topic.title}
          onChange={(e) => setTopic({ ...topic, title: e.target.value })}
        />

        <textarea
          placeholder="Topic Description"
          className="w-full p-3 border rounded mb-3 text-sm min-h-[80px]"
          value={topic.description}
          onChange={(e) =>
            setTopic({ ...topic, description: e.target.value })
          }
        ></textarea>

        {/* SUBTOPIC SECTION */}
        <h4 className="font-semibold mb-2">Subtopics</h4>

        <input
          type="text"
          placeholder="Subtopic Title"
          className="w-full p-3 border rounded mb-3 text-sm"
          value={subtopic.title}
          onChange={(e) => setSubtopic({ ...subtopic, title: e.target.value })}
        />

        <textarea
          placeholder="Markdown Content"
          className="w-full p-3 border rounded mb-3 text-sm min-h-[120px]"
          value={subtopic.content}
          onChange={(e) =>
            setSubtopic({ ...subtopic, content: e.target.value })
          }
        ></textarea>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-3"
          onClick={addSubtopic}
        >
          ➕ Add Subtopic
        </button>

        {/* Show Subtopics */}
        {topic.subtopics.length > 0 && (
          <ul className="mb-4 pl-4 list-disc text-sm">
            {topic.subtopics.map((s, idx) => (
              <li key={idx}>{s.title}</li>
            ))}
          </ul>
        )}

        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full mb-4"
          onClick={addTopic}
        >
          ➕ Add Topic
        </button>

        {/* Show all topics added to this course */}
        {course.topics.length > 0 && (
          <ul className="pl-4 list-disc text-sm mb-5">
            {course.topics.map((t, idx) => (
              <li key={idx}>
                <strong>{t.title}</strong> – {t.subtopics.length} subtopics
              </li>
            ))}
          </ul>
        )}

        <button
          className="bg-purple-600 text-white px-5 py-3 rounded w-full"
          onClick={addCourse}
        >
          💾 Save Course
        </button>

        <button
          className="bg-red-600 text-white px-5 py-3 rounded w-full mt-3"
          onClick={resetData}
        >
          🔄 Reset to Default Data
        </button>
      </div>

      {/* DISPLAY ALL COURSES */}
      <h2 className="text-2xl font-semibold mt-10 mb-3">All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {courses.map((c, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border rounded shadow hover:shadow-md transition text-sm"
          >
            <h3 className="text-lg font-bold">{c.title}</h3>
            <p className="text-gray-600">{c.subtitle}</p>
            <p className="text-xs mt-1">{c.topics.length} topics</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBuilder;
