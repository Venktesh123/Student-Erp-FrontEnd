import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotice } from "../../redux/actions/adminActions";
import {
  getAttendance,
  getSubject,
  getTestResult,
} from "../../redux/actions/studentActions";

import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StudentHome = () => {
  // Safely parse user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { result: {} };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.result?.department && user?.result?.year) {
      dispatch(getSubject(user.result.department, user.result.year));
      dispatch(
        getTestResult(
          user.result.department,
          user.result.year,
          user.result.section
        )
      );
      dispatch(
        getAttendance(
          user.result.department,
          user.result.year,
          user.result.section
        )
      );
    }
    dispatch(getNotice());
  }, [dispatch, user]);

  return (
    <div
      className="bg-[#d6d9e0] min-h-screen h-full flex items-center justify-center"
      style={{ height: "100%" }}
    >
      <div className="flex flex-col bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
