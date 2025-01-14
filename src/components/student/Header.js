import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description"; // For Overview
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // For Q&A
import BookIcon from "@mui/icons-material/Book"; // For Notebook Transcript
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user details from localStorage
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  // Navigation handlers for each section
  const navigateToOverview = () => navigate("/overview");
  const navigateToQA = () => navigate("/q-and-a");
  const navigateToNotebook = () => navigate("/notebook");

  return (
    <div className="flex-[0.05] flex flex-col justify-between mx-5 my-2">
      {/* Header Top Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="../kiit.png" alt="Logo" className="h-[4.5rem]" />{" "}
          {/* Increased logo size */}
          <h1 className="font-bold text-blue-600 text-sm"></h1>
        </div>
        <h1 className="font-semibold text-black">
          Welcome, {user.result.name.split(" ")[0]}
        </h1>
        <div className="flex items-center space-x-3">
          <Avatar
            src={user.result.avatar}
            alt={user.result.name.charAt(0)}
            sx={{ width: 24, height: 24 }}
            className="border-blue-600 border-2"
          />
          <h1>{user.result.name.split(" ")[0]}</h1>
          <LogoutIcon
            onClick={logout}
            className="cursor-pointer hover:scale-125 transition-all text-black"
          />
        </div>
      </div>

      {/* Inline Links Section */}
      <div className="flex justify-center items-center mt-4 ml-4 space-x-6">
        <div
          className="flex items-center cursor-pointer hover:text-blue-600"
          onClick={navigateToOverview}
        >
          <WysiwygIcon className="mr-1 text-black hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-black">Overview</span>
        </div>
        <div
          className="flex items-center cursor-pointer hover:text-blue-600"
          onClick={navigateToQA}
        >
          <QuestionAnswerIcon className="mr-1 text-black hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-black">Q&A</span>
        </div>
        <div
          className="flex items-center cursor-pointer hover:text-blue-600"
          onClick={navigateToNotebook}
        >
          <BookIcon className="mr-1 text-black hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-black">Notebook </span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-blue-600">
          <ViewHeadlineIcon className="mr-1 text-black hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-black">Transcript</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
