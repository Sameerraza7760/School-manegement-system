import React, { useState } from "react";
import AssignmentForm from "./AssignmentForm";
import "./style.css";
import ViewAssignments from "./ViewAssgnment";

const ManageAssignment: React.FC = () => {
  const [currentView, setCurrentView] = useState<"create" | "view">("create");

  const handleViewChange = (view: "create" | "view") => {
    setCurrentView(view);
  };

  
  return (
    <div className=" mx-auto mt-10 p-8 bg-white shadow-lg rounded-md w-full ">
      <div className="flex justify-between items-center mb-6 w-full ">
        <h1 className="heading text-4xl font-extrabold text-gray-800">
          Assignment Management
        </h1>
        <div className="assBtn flex gap-3">
          <button
            onClick={() => handleViewChange("create")}
            className={`${
              currentView === "create"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white px-6 py-3 rounded-md transition duration-300 focus:outline-none w-full md:w-auto`}
          >
            Create Assignment
          </button>
          <button
            onClick={() => handleViewChange("view")}
            className={`${
              currentView === "view"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white px-6 py-3 rounded-md transition duration-300 focus:outline-none w-full md:w-auto`}
          >
            View Assignments
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md w-full ">
        {currentView === "create" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Create Assignment
            </h2>
            <AssignmentForm />
            {/* Other components related to creating assignments */}
          </div>
        )}

        {currentView === "view" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              View Assignments
            </h2>
            <ViewAssignments />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAssignment;
