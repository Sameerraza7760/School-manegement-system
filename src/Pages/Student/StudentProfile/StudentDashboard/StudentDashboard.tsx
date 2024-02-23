import {
  BookOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { StudentDetail } from "../../../../types/types.student";
import ClassMaterials from "../../ClassMaterial/ClassMaterial";
import StudentViewAssignment from "../../ClassMaterial/StudentAssignment";
import StudentComplain from "../../StudentComplain/StudentComplain";
import StudentHomePage from "../../StudentHome/StudentHome";
import StudentLogout from "../../StudentLogout/StudentLogout";
import StudentSubjects from "../../StudentSubject/StudentSubject";
import ViewAttendance from "../../ViewAttendence/ViewAttendence";
import StudentProfile from "../StudentProfile";
// import "./../style.css";
import Quiz from "../../QuizTest/Quiz";

const StudentDashboard = () => {
  const { studentName }: StudentDetail = useSelector(
    (state: any) => state.student.student || {}
  );

  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="flex h-60vh">
      {/* Sidebar */}
      <nav
        className={`bg-indigo-900 text-white sm:w-20 md:w-60 p-4 min-h-screen transition-width duration-300 ${
          isSidebarOpen ? "w-60" : "w-10"
        }`}
      >
        <div className="text-center mb-8">
          <span className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}>Student Dashboard</span>
        </div>
        <ul>
          <li className="mb-4">
            <Link
              to="/StudentDashboard"
              className="text-white hover:text-gray-300"
            >
              <HomeOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                {" "}
                Dashboard{" "}
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Sprofile" className="text-white hover:text-gray-300">
              <UserOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                {" "}
                Profile{" "}
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="Ssubjects" className="text-white hover:text-gray-300">
              <BookOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Subjects
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="SViewAttendence"
              className="text-white hover:text-gray-300 flex gap-2"
            >
              <ScheduleOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Attendance
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="SComplain" className="text-white hover:text-gray-300">
              <ExclamationCircleOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Complain{" "}
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="ClassMaterial" className="text-white hover:text-gray-300">
              <BookOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                {" "}
                Class Material{" "}
              </span>
            </Link>
          </li>

          <li className="mb-4">
            <Link to="Sassignment" className="text-white hover:text-gray-300">
              <BookOutlined />{" "}
              <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >
                Assignment{" "}
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="SLogout" className="text-white hover:text-gray-300">
              <LogoutOutlined />  <span
                className={`sm:text-none ${
                  isSidebarOpen ? "sm:inline" : "hidden"
                }`}
              >  Logout </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <header className="bg-indigo-900 text-white py-2">
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
              <span className="text-gray-300 mr-2">
                Welcome, {studentName}!
              </span>
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="Sprofile" element={<StudentProfile />} />
            <Route path="Ssubjects" element={<StudentSubjects />} />
            <Route path="SViewAttendence" element={<ViewAttendance />} />
            <Route path="SComplain" element={<StudentComplain />} />
            <Route path="SLogout" element={<StudentLogout />}></Route>
            <Route
              path="ClassMaterial"
              element={<ClassMaterials />}
            ></Route>{" "}
            <Route path="SQuizTest/:quizId" element={<Quiz />} />
            <Route
              path="Sassignment"
              element={<StudentViewAssignment />}
            ></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
