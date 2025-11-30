import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import MarkdownViewer from "../components/MarkdownViewer";
import useLocalStorage from "../hooks/useLocalStorage";
import CoursesData from "../data/courses.json";

const CourseExplorer = () => {
  const [courses] = useLocalStorage("customCourses", CoursesData.courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [progress, setProgress] = useLocalStorage("courseProgress", {});

  // SELECTION HANDLERS

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setSidebarOpen(false);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
  };

  const handleSubtopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
  };

  // PROGRESS TRACKING

  const toggleCompletion = (course, topic, subtopic) => {
    const courseTitle = course.title;
    const topicTitle = topic.title;
    const subtopicTitle = subtopic.title;

    setProgress((prev) => {
      // Deep clone to avoid mutation issues
      const updated = JSON.parse(JSON.stringify(prev));

      if (!updated[courseTitle]) updated[courseTitle] = {};
      if (!updated[courseTitle][topicTitle]) updated[courseTitle][topicTitle] = {};

      // Toggle the completion status
      updated[courseTitle][topicTitle][subtopicTitle] = 
        !updated[courseTitle][topicTitle][subtopicTitle];

      return updated;
    });
  };

  // PROGRESS CALCULATIONS

  const getTopicProgress = (course, topic) => {
    const completedMap = progress[course.title]?.[topic.title] || {};
    const total = topic.subtopics.length;

    if (total === 0) return 0;

    const completed = Object.values(completedMap).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const getCourseProgress = (course) => {
    let total = 0;
    let completed = 0;

    course.topics.forEach((topic) => {
      total += topic.subtopics.length;
      const topicMap = progress[course.title]?.[topic.title] || {};
      completed += Object.values(topicMap).filter(Boolean).length;
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  // UI RENDER

  return (
    <div className="flex h-screen relative">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰ Menu
      </button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="absolute z-40 w-64 h-full bg-white shadow-md md:hidden">
          <Sidebar
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={handleCourseSelect}
            setSelectedTopic={setSelectedTopic}
            setSelectedSubtopic={setSelectedSubtopic}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={handleCourseSelect}
          setSelectedTopic={setSelectedTopic}
          setSelectedSubtopic={setSelectedSubtopic}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <Breadcrumbs
          course={selectedCourse}
          topic={selectedTopic}
          subtopic={selectedSubtopic}
          onCourseClick={() => {
            setSelectedTopic(null);
            setSelectedSubtopic(null);
          }}
          onTopicClick={() => {
            setSelectedSubtopic(null);
          }}
        />

        {/* NO COURSE SELECTED */}
        {!selectedCourse ? (
          <p className="text-gray-600">Select a course from the sidebar.</p>
        ) : !selectedTopic ? (
          // COURSE VIEW → SHOW TOPICS
          <div>
            <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>

            <p className="text-sm mt-2 font-medium bg-green-100 text-green-800 px-3 py-1 w-fit rounded">
              Course Progress: {getCourseProgress(selectedCourse)}%
            </p>

            <h3 className="text-xl mt-4 font-semibold">Topics</h3>

            <ul className="space-y-3 mt-3">
              {selectedCourse.topics.map((topic) => (
                <li
                  key={topic.title}
                  onClick={() => handleTopicSelect(topic)}
                  className="p-3 rounded border bg-white shadow cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{topic.title}</p>
                      <p className="text-sm text-gray-600">
                        {topic.description}
                      </p>
                    </div>

                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded">
                      {getTopicProgress(selectedCourse, topic)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // TOPIC VIEW → SHOW SUBTOPICS + CONTENT
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Subtopics List */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4">{selectedTopic.title}</h2>
              <h3 className="text-lg font-semibold mb-3">Subtopics</h3>

              <ul className="space-y-2">
                {selectedTopic.subtopics.map((sub) => (
                  <li
                    key={sub.title}
                    className={`p-3 rounded border bg-white shadow flex justify-between items-center transition-colors ${
                      selectedSubtopic?.title === sub.title
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      onClick={() => handleSubtopicSelect(sub)}
                      className="cursor-pointer flex-1"
                    >
                      <p className="font-medium text-sm">{sub.title}</p>
                    </div>

                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600 cursor-pointer ml-2 flex-shrink-0"
                      checked={
                        progress[selectedCourse.title]?.[selectedTopic.title]?.[
                          sub.title
                        ] || false
                      }
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleCompletion(selectedCourse, selectedTopic, sub);
                      }}
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                <p className="text-sm font-semibold">
                  Progress: {getTopicProgress(selectedCourse, selectedTopic)}%
                </p>
              </div>
            </div>

            {/* RIGHT: Content */}
            <div className="lg:col-span-2">
              {selectedSubtopic ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedSubtopic.title}
                  </h2>
                  <div className="bg-white p-6 rounded shadow">
                    <MarkdownViewer content={selectedSubtopic.content} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-white rounded shadow">
                  <p className="text-gray-500">Select a subtopic to view content</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseExplorer;