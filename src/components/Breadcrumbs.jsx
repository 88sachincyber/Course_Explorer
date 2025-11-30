const Breadcrumbs = ({ course, topic, subtopic, onCourseClick, onTopicClick }) => {
  return (
    <div className="text-sm text-gray-700 mb-4">
      <div className="flex gap-2 items-center">

        {/* COURSE (clickable if exists) */}
        {course ? (
          <span
            className="cursor-pointer hover:underline hover:text-blue-700"
            onClick={onCourseClick}
          >
            {course.title}
          </span>
        ) : (
          <span>Courses</span>
        )}

        {/* TOPIC SECTION */}
        {topic && (
          <>
            <span>/</span>
            <span
              className="cursor-pointer hover:underline hover:text-blue-700"
              onClick={onTopicClick}
            >
              {topic.title}
            </span>
          </>
        )}

        {/* SUBTOPIC SECTION */}
        {subtopic && (
          <>
            <span>/</span>
            <span className="font-semibold text-gray-900">
              {subtopic.title}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
