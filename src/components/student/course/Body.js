import React from "react";

const Body = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-transparent">
      {/* Video Section with Border and Border Radius */}
      <div className="relative w-full max-w-3xl" style={{ height: "400px" }}>
        {" "}
        {/* Increased height here */}
        <iframe
          className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 rounded-lg" // Border and border-radius added here
          src="https://www.youtube.com/embed/fiMemypKqEI" // Replace 'example' with your video ID
          title="Transparent Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Text Area Section Below the Video */}
      <div className="w-full max-w-3xl mt-[5px] px-4">
        <textarea
          id="question"
          rows="6"
          className="w-full p-5 border border-gray-300 rounded-md resize-none max-h-[200px] overflow-y-auto"
          style={{ height: "326px" }}
          placeholder="Ask me anything..."
        ></textarea>
      </div>
    </div>
  );
};

export default Body;
