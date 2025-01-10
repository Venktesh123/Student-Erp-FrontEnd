import React, { useState } from "react";
import axios from "axios";

const Body = () => {
  // Mock data for a single course, unit, and lectures
  const mockData = {
    courseName: "Course 1",
    unit: [
      {
        unitName: "Unit and Dimension",
        icon: "📚",
        lectures: [
          { lectureName: "Lecture 1.1", videoId: "fiMemypKqEI" },
          { lectureName: "Lecture 1.2", videoId: "yzgGHAoN_68" },
        ],
      },
      {
        unitName: "Applications",
        icon: "📝",
        lectures: [
          { lectureName: "Lecture 2.1", videoId: "fiMemypKqEI" },
          { lectureName: "Lecture 2.2", videoId: "yzgGHAoN_68" },
        ],
      },
    ],
  };

  const [selectedVideo, setSelectedVideo] = useState(
    mockData.unit[0].lectures[0].videoId
  );
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleLectureClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const toggleUnit = (unitIndex) => {
    setExpandedUnit(expandedUnit === unitIndex ? null : unitIndex);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/chatboat/ask-question",
        {
          question,
        }
      );
      console.log(response.data.answer, "ans");
      setAnswer(response.data.answer); // Set the answer received from the API
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Sorry, there was an error fetching the answer.");
    }
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
            style={{ height: "300px" }}
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

        {/* Input Section Below the Video */}
        <div className="w-full max-w-3xl mt-4 px-4 flex">
          <input
            id="question"
            type="text"
            className="w-full p-5 border border-gray-300 rounded-md"
            placeholder="Ask me anything..."
            value={question}
            onChange={handleQuestionChange}
          />
          <button
            onClick={handleQuestionSubmit}
            className="ml-4 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Ask Question
          </button>
        </div>

        {/* Display the Question and Answer */}
        {answer && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md w-full max-w-3xl">
            <p className="font-semibold">Answer:</p>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
