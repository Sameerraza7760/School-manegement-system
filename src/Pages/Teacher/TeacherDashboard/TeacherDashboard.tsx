import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import {
  BookOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import ClassDetail from "../ClassDetail/TeacherClassDetail";
import TeacherAttendencePage from "../TeacherAttendence/TeacherAttendence";
import TeacherComplain from "../TeacherComplain/TeacherComplain";
import TeacherHome from "../TeacherHome/TeacherHome";
import TeacherLogout from "../TeacherLogout";
import TeacherProfile from "../TeacherProfilePage/TeacherProfile";
import ViewStudent from "../ViewStudent/ViewStudent";

const TeacherDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { teacherName } = useSelector((state: any) => state?.teacher?.teacher || {});
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleMediaQueryChange = (event: any) => {
      setSidebarOpen(!event.matches);
    };
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav
        className={`bg-gray-800 text-white w-64 p-4 min-h-screen ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-center mb-8">
          <span className="text-3xl font-bold">Teacher Dashboard</span>
        </div>
        <ul>
          <li className="mb-4">
            <Link
              to="/TeacherDashboard"
              className="text-white hover:text-gray-300"
            >
              <HomeOutlined /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Tprofile" className="text-white hover:text-gray-300">
              <UserOutlined /> Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TViewStudent" className="text-white hover:text-gray-300">
              <BookOutlined /> View Student
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TClassDetail" className="text-white hover:text-gray-300">
              <BookOutlined /> ClassDetail
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TAttendence" className="text-white hover:text-gray-300">
              <ScheduleOutlined /> Attendance
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TComplain" className="text-white hover:text-gray-300">
              <ExclamationCircleOutlined /> Complain
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Tlogout" className="text-white hover:text-gray-300">
              <LogoutOutlined /> Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 text-white py-2">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-300 mr-2">Welcome, {teacherName}</span>
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TeacherHome />} />
            <Route path="Tprofile" element={<TeacherProfile />} />
            <Route path="TClassDetail" element={<ClassDetail />}></Route>
            <Route path="TViewStudent" element={<ViewStudent />}></Route>
            <Route
              path="TAttendence"
              element={<TeacherAttendencePage />}
            ></Route>
            <Route path="TComplain" element={<TeacherComplain />}></Route>
            <Route path="Tlogout" element={<TeacherLogout />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
