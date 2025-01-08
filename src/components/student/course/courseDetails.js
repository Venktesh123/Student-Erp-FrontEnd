import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white shadow-md rounded-lg p-6 mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          <div className="space-y-6">
            {course.units.map((unit) => (
              <div key={unit._id} className="border rounded-lg p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {unit.title}
                </h2>
                <p className="text-gray-500 mb-4">{unit.description}</p>
                <div className="space-y-4">
                  {unit.lectures.map((lecture) => (
                    <div
                      key={lecture._id}
                      className="bg-white shadow rounded-lg p-4"
                    >
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {lecture.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Duration: {lecture.duration} minutes
                      </p>
                      <iframe
                        className="w-full aspect-video rounded"
                        src={lecture.videoUrl.replace(
                          "example.com/videos",
                          "youtube.com/embed"
                        )}
                        title={lecture.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseComponent;
