import React, { useState } from "react";
import axios from "axios";

const Body = () => {
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

  const fallbackAnswers = [
    "I'm not sure about that. Let me get back to you!",
    "That's an interesting question, but I don't have an answer right now.",
    "I couldn't find anything useful. Try rephrasing your question.",
    "Sorry, I'm unable to help with that at the moment. Please try again later.",
  ];

  const getRandomFallbackAnswer = () => {
    return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
  };

  const [selectedVideo, setSelectedVideo] = useState(
    mockData.unit[0].lectures[0].videoId
  );
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/chatboat/ask-question",
        {
          question,
        }
      );

      if (response.data.answer) {
        setAnswer(response.data.answer);
      } else {
        setAnswer(getRandomFallbackAnswer());
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer(getRandomFallbackAnswer());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-start justify-center w-full h-screen bg-transparent p-4">
      <div className="w-1/4 h-full p-4 border-r border-gray-300">
        <div className="mb-4 text-xl font-semibold text-center p-2 border border-gray-300">
          {mockData.courseName}
        </div>

        {mockData.unit.map((unit, index) => (
          <div key={index} className="mb-6">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleUnit(index)}
            >
              <span className="mr-2 text-xl">{unit.icon}</span>
              <div className="text-lg font-medium text-indigo-600">
                {unit.unitName}
              </div>
            </div>

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

      <div className="w-3/4 h-full flex flex-col items-start overflow-y-auto">
        <div
          className="relative w-full max-w-3xl"
          style={{ height: "250px", marginBottom: "1rem" }}
        >
          {selectedVideo ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="Selected Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-gray-500 text-center">
              Please select a lecture to view the video.
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl mb-4 px-4 flex">
          <input
            id="question"
            type="text"
            className="w-3/4 p-2 border border-gray-300 rounded-full h-10 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ask me anything..."
            value={question}
            onChange={handleQuestionChange}
          />
          <button
            onClick={handleQuestionSubmit}
            className="ml-4 w-1/4 p-2 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
          >
            Ask Question
          </button>
        </div>

        {loading ? (
          <div className="mt-4 p-4 border border-gray-300 rounded-md w-full max-w-3xl text-center">
            <p>Loading...</p>
          </div>
        ) : (
          answer && (
            <div
              className="mt-4 p-4 border border-gray-300 rounded-md w-full max-w-3xl overflow-y-auto"
              style={{ maxHeight: "200px" }}
            >
              <p className="font-semibold">Answer:</p>
              <p>{answer}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Body;
