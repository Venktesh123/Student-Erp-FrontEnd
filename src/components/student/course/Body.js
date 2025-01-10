import React, { useState, useEffect } from "react";

const Body = () => {
  // Mock data for a single course, unit, and lectures
  const mockData = {
    courseName: "Course 1",
    unit: [
      {
        unitName: "Unit and Dimension",
        icon: "📚", // Add an icon for the unit
        lectures: [
          { lectureName: "Lecture 1.1", videoId: "fiMemypKqEI" },
          { lectureName: "Lecture 1.2", videoId: "yzgGHAoN_68" },
        ],
      },
      {
        unitName: "Applications",
        icon: "📝", // Add an icon for the unit
        lectures: [
          { lectureName: "Lecture 2.1", videoId: "fiMemypKqEI" },
          { lectureName: "Lecture 2.2", videoId: "yzgGHAoN_68" },
        ],
      },
    ],
  };

  // Set default video as the first lecture of the first unit
  const [selectedVideo, setSelectedVideo] = useState(
    mockData.unit[0].lectures[0].videoId
  );
  const [expandedUnit, setExpandedUnit] = useState(null); // To track the expanded unit

  const handleLectureClick = (videoId) => {
    setSelectedVideo(videoId); // Update the video when a new lecture is selected
  };

  const toggleUnit = (unitIndex) => {
    setExpandedUnit(expandedUnit === unitIndex ? null : unitIndex); // Toggle unit dropdown visibility
  };

  return (
    <div className="flex flex-row items-start justify-center w-full h-screen bg-transparent p-4">
      {/* Left Section: Course and Units */}
      <div className="w-1/4 h-full p-4 border-r border-gray-300">
        <div className="mb-4 text-xl font-semibold text-center p-2 border border-gray-300">
          {mockData.courseName}
        </div>

        {/* Render each unit */}
        {mockData.unit.map((unit, index) => (
          <div key={index} className="mb-6">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleUnit(index)}
            >
              {/* Icon for the unit */}
              <span className="mr-2 text-xl">{unit.icon}</span>
              <div className="text-lg font-medium text-indigo-600">
                {unit.unitName}
              </div>
            </div>

            {/* Show lectures dropdown if the unit is expanded */}
            {expandedUnit === index && (
              <div className="mt-2">
                <select
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => handleLectureClick(e.target.value)}
                  defaultValue={selectedVideo}
                >
                  <option value="" disabled>
                    Select a Lecture
                  </option>
                  {unit.lectures.map((lecture, idx) => (
                    <option key={idx} value={lecture.videoId}>
                      {lecture.lectureName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Section: Video Section */}
      <div className="w-3/4 h-full flex flex-col items-center justify-center">
        {selectedVideo ? (
          <div
            className="relative w-full max-w-3xl"
            style={{ height: "400px" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="Selected Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            Please select a lecture to view the video.
          </div>
        )}

        {/* Text Area Section Below the Video */}
        <div className="w-full max-w-3xl mt-4 px-4">
          <textarea
            id="question"
            rows="6"
            className="w-full p-5 border border-gray-300 rounded-md resize-none max-h-[200px] overflow-y-auto"
            style={{ height: "39%" }}
            placeholder="Ask me anything..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Body;
