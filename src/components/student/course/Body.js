import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null); // Track selected unit
  const [selectedLecture, setSelectedLecture] = useState(null); // Track selected lecture
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

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

  const handleUnitClick = (unit) => {
    // Toggle visibility of the unit's lectures
    setSelectedUnit(selectedUnit === unit ? null : unit);
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture); // Set the selected lecture to display its video
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex mt-3 space-x-6">
      <div className="w-full">
        {/* Course and Lecture Details */}
        <div className="space-y-5">
          <div className="flex text-gray-400 items-center space-x-2">
            <h1>All Courses</h1>
          </div>
          <div
            className="mr-10 bg-white rounded-xl pt-6 pl-6"
            style={{ height: "29.5rem", width: "100%" }}
          >
            <div className="col-span-3 mr-6">
              {loading && <div className="spinner">Loading...</div>}
              {error && (
                <p className="text-red-500 text-2xl font-bold">{error}</p>
              )}

              {!loading && !error && courses?.length > 0 && (
                <div className="adminData">
                  {courses.map((course, idx) => (
                    <div key={idx} className="adminDataBody grid-cols-8">
                      <h1 className="col-span-1 adminDataBodyFields">
                        {course.title}
                      </h1>
                      <h1 className="col-span-2 adminDataBodyFields">
                        {course.description}
                      </h1>
                      <div className="space-y-4">
                        {course.units.map((unit) => (
                          <div
                            key={unit._id}
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <h2
                              className="text-xl font-semibold text-gray-700 mb-2 cursor-pointer"
                              onClick={() => handleUnitClick(unit)} // Toggle unit visibility
                            >
                              {unit.title}
                            </h2>
                            <p className="text-gray-500 mb-4">
                              {unit.description}
                            </p>

                            {/* Conditionally render lectures if unit is selected */}
                            {selectedUnit === unit && (
                              <div className="space-y-4">
                                {unit.lectures.map((lecture) => (
                                  <div
                                    key={lecture._id}
                                    className="cursor-pointer bg-white shadow rounded-lg p-4"
                                    onClick={() => handleLectureClick(lecture)} // Set selected lecture
                                  >
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                      {lecture.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                      Duration: {lecture.duration} minutes
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Section Inside the Same Container */}
            {selectedLecture && (
              <div className="mt-6">
                <div className="relative w-full pb-[56.25%] overflow-hidden bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded"
                    src={selectedLecture.videoUrl.replace(
                      "example.com/videos",
                      "youtube.com/embed"
                    )}
                    title={selectedLecture.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ maxWidth: "600px", maxHeight: "340px" }}
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
