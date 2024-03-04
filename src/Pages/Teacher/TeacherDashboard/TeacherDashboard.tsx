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
import CreateQuiz from "../CreateTest/CreateTest";
import TeacherAttendencePage from "../TeacherAttendence/TeacherAttendence";
import TeacherComplain from "../TeacherComplain/TeacherComplain";
import TeacherHome from "../TeacherHome/TeacherHome";
import TeacherLogout from "../TeacherLogout";
import TeacherProfile from "../TeacherProfilePage/TeacherProfile";
import ViewStudent from "../ViewStudent/ViewStudent";
import TeacherChat from "../TeacherChat/TeacherChat";

const TeacherDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { teacherName } = useSelector(
    (state: any) => state?.teacher?.teacher || {}
  );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-60vh">
      {/* Sidebar */}
      <nav
        className={`bg-gray-900 text-white w-[40px] sm:w-40 md:w-60 p-4 min-h-screen transition-width duration-300 ${
          isSidebarOpen ? "w-60" : "hidden"
        }`}
      >
        <div className="text-center sm:text-2xl  mb-8">
          <span
            className={` hidden sm:text-none ${
              isSidebarOpen ? "sm:inline" : "hidden"
            }`}
          >
            Teacher Dashboard
          </span>
        </div>
        <ul>
          <li className="mb-4">
            <Link
              to="/TeacherDashboard"
              className="text-white hover:text-gray-300"
            >
              <HomeOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Tprofile" className="text-white hover:text-gray-300">
              <UserOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Profile
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TViewStudent" className="text-white hover:text-gray-300">
              <BookOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                View Students
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TClassDetail" className="text-white hover:text-gray-300">
              <BookOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Class Detail
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TAttendence" className="text-white hover:text-gray-300">
              <ScheduleOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Attendence
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="TComplain" className="text-white hover:text-gray-300">
              <ExclamationCircleOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Complain
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Tlogout" className="text-white hover:text-gray-300">
              <LogoutOutlined />{" "}
              <span
                className={` hidden sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
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
            <Route path="TViewStudent" element={<ViewStudent />}></Route>{" "}
            <Route path="TcreateTest" element={<CreateQuiz />}></Route>{" "}
            {/* <Route path="TResult" element={<QuizResult />}></Route> */}
            <Route
              path="TAttendence"
              element={<TeacherAttendencePage />}
            ></Route>
            <Route path="TComplain" element={<TeacherComplain />}></Route>
            <Route path="Tlogout" element={<TeacherLogout />}></Route>{" "}
            {/* <Route path="TecChatRoom/:studentId" element={<TeacherChat />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
