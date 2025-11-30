import { useState } from "react";

const Sidebar = ({
  courses,
  selectedCourse,
  setSelectedCourse,
  setSelectedTopic,
  setSelectedSubtopic,
  onClose, // NEW: Add this prop for mobile close functionality
}) => {
  const [search, setSearch] = useState("");

  const searchLower = search.toLowerCase().trim();

  // Build filtered match structure
  const filteredCourses = courses
    .map((course) => {
      const courseMatch =
        searchLower && course.title.toLowerCase().includes(searchLower);

      const topicMatches = [];

      course.topics?.forEach((topic) => {
        const topicTitleMatch =
          searchLower && topic.title.toLowerCase().includes(searchLower);

        const subtopicMatches =
          searchLower
            ? topic.subtopics?.filter((sub) =>
                sub.title.toLowerCase().includes(searchLower)
              ) || []
            : [];

        if (topicTitleMatch || subtopicMatches.length > 0) {
          topicMatches.push({
            topic,
            topicTitleMatch,
            subtopicMatches,
          });
        }
      });

      const hasAnyMatch =
        searchLower.length === 0 ||
        courseMatch ||
        topicMatches.length > 0;

      if (!hasAnyMatch) return null;

      return {
        course,
        courseMatch,
        topicMatches,
      };
    })
    .filter(Boolean);

  return (
    <aside className="w-full h-full bg-white p-4 overflow-auto flex flex-col">
      {/* CLOSE BUTTON FOR MOBILE - Only shows when onClose is provided */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden self-end text-gray-600 hover:text-gray-900 mb-2 text-2xl font-light"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      )}

      <h2 className="text-xl font-bold mb-4">Courses</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search courses, topics, subtopics..."
        className="w-full p-2 border rounded mb-4 outline-none focus:border-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-3 flex-1 overflow-auto">
        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">No matching results.</p>
        ) : (
          filteredCourses.map(
            ({ course, courseMatch, topicMatches }, idx) => (
              <li
                key={idx}
                className={`p-3 rounded border shadow-sm transition cursor-pointer ${
                  selectedCourse?.title === course.title
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedCourse(course);
                  setSelectedTopic(null);
                  setSelectedSubtopic(null);
                  onClose?.(); // Close mobile sidebar when course is selected
                }}
              >
                {/* Course Title */}
                <p
                  className={`font-medium ${
                    courseMatch ? "text-blue-700" : ""
                  }`}
                >
                  {course.title}
                </p>

                <p className="text-sm text-gray-600">{course.subtitle}</p>

                {/* MATCHES SECTION */}
                {searchLower && topicMatches.length > 0 && (
                  <div className="mt-2 text-xs text-gray-700">
                    <p className="font-semibold mb-1">Matches:</p>

                    <ul className="space-y-1">
                      {topicMatches.map(
                        ({ topic, topicTitleMatch, subtopicMatches }) => (
                          <li key={topic.title}>
                            {/* TOPIC CLICKABLE */}
                            <span
                              className={`cursor-pointer ${
                                topicTitleMatch
                                  ? "font-semibold text-blue-700"
                                  : "font-medium"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse(course);
                                setSelectedTopic(topic);
                                setSelectedSubtopic(null);
                                onClose?.(); // Close mobile sidebar when topic is selected
                              }}
                            >
                              {topic.title}
                            </span>

                            {/* SUBTOPIC MATCHES */}
                            {subtopicMatches.length > 0 && (
                              <ul className="ml-3 list-disc mt-1">
                                {subtopicMatches.map((sub) => (
                                  <li
                                    key={sub.title}
                                    className="cursor-pointer text-gray-700 hover:text-blue-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCourse(course);
                                      setSelectedTopic(topic);
                                      setSelectedSubtopic(sub);
                                      onClose?.(); // Close mobile sidebar when subtopic is selected
                                    }}
                                  >
                                    {sub.title}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </li>
            )
          )
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;