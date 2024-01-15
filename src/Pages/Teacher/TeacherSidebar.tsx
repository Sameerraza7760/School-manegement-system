import React from "react";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <>
    
    <aside className="bg-gray-800 text-white h-screen w-64 fixed overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
      </div>
      <nav className="space-y-4 pt-4">
        <Link to="/teacher-dashboard" className="block p-3 hover:bg-gray-700">
          Home
        </Link>
        <Link to="/teacher-dashboard/students" className="block p-3 hover:bg-gray-700">
          Students
        </Link>
        <Link to="/teacher-dashboard/profile" className="block p-3 hover:bg-gray-700">
          Profile
        </Link>
        <Link to="/teacher-dashboard/complain" className="block p-3 hover:bg-gray-700">
          Complain
        </Link>
        <Link to="/teacher-dashboard/class-detail" className="block p-3 hover:bg-gray-700">
          Class Detail
        </Link>
      </nav>
    </aside>
    </>
  );
};

export default TeacherSidebar;
