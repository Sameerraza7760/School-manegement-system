import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Logout from '../../../Logout/Logout';
import { HomeOutlined, UserOutlined, BookOutlined, ScheduleOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';

import StudentComplain from '../../StudentComplain/StudentComplain';
import StudentHomePage from '../../StudentHome/StudentHome';
import StudentSubjects from '../../StudentSubject/StudentSubject';
import ViewAttendance from '../../ViewAttendence/ViewAttendence';
import StudentProfile from '../StudentProfile';
import StudentLogout from '../../StudentLogout/StudentLogout';

  

const StudentDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <nav
      className={`bg-indigo-800 text-white w-64 p-4 min-h-screen ${
        isSidebarOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="text-center mb-8">
        <span className="text-3xl font-bold">School Dashboard</span>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/Student/dashboard" className="text-white hover:text-gray-300">
            <HomeOutlined /> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/Student/profile" className="text-white hover:text-gray-300">
            <UserOutlined /> Profile
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/Student/subjects" className="text-white hover:text-gray-300">
            <BookOutlined /> Subjects
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/Student/ViewAttendence" className="text-white hover:text-gray-300">
            <ScheduleOutlined /> Attendance
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/Student/StudentComplain" className="text-white hover:text-gray-300">
            <ExclamationCircleOutlined /> Complain
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/logout" className="text-white hover:text-gray-300">
            <LogoutOutlined /> Logout
          </Link>
        </li>
      </ul>
    </nav>


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-indigo-800 text-white py-2">
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
                            <span className="text-gray-300 mr-2">Welcome, Student!</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <Routes>
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />
                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/ViewAttendence" element={<ViewAttendance />} />
                        <Route path="/Student/StudentComplain" element={<StudentComplain />} />
                        <Route path="/logout" element={<StudentLogout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;