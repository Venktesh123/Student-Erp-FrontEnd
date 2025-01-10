import React, { useState } from "react";

const Body = () => {
  // Mock data for a single course, unit, and lectures
  const mockData = {
    courseName: "Course 1",
    unit: {
      unitName: "Unit and Dimensions",
      lectures: [
        { lectureName: "Applications", videoId: "fiMemypKqEI" },
        { lectureName: "System And Sorounding", videoId: "fiMemypKqEI" },
      ],
    },
  };

  const [selectedVideo, setSelectedVideo] = useState(null); // Initially no video selected

  const handleLectureClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen bg-transparent">
      {/* Left Section: Dropdown List */}
      <div className="w-1/4 h-full p-4 border-r border-gray-300">
        <div className="mb-4 text-xl font-semibold text-center">
          {mockData.courseName}
        </div>

        <div className="mb-4 text-lg font-medium text-center">
          {mockData.unit.unitName}
        </div>

        {/* Dropdown for lectures */}
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleLectureClick(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select a Lecture
          </option>
          {mockData.unit.lectures.map((lecture, index) => (
            <option key={index} value={lecture.videoId}>
              {lecture.lectureName}
            </option>
          ))}
        </select>
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
