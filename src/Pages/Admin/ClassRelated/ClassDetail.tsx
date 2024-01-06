import React from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
const ClassDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container pt-5 mx-auto mt-10">
        <div className="max-w-2xl mx-auto bg-white p-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Class Detail
          </h2>
          <div className="mb-6">
            <label
              htmlFor="className"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Name:
            </label>
            <span className="text-purple-800 text-lg">Class A</span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="classTeacher"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Teacher:
            </label>
            <span className="text-purple-800 text-lg">John Doe</span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="classStudents"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Students:
            </label>
            <ul className="list-disc pl-5">
              <li className="text-purple-800">Student 1</li>
              <li className="text-purple-800">Student 2</li>
              <li className="text-purple-800">Student 3</li>
            </ul>
          </div>
          <div className="mb-6">
            <label
              htmlFor="classSubjects"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Subjects:
            </label>
            <ul className="list-disc pl-5">
              <li className="text-purple-800">Subject 1</li>
              <li className="text-purple-800">Subject 2</li>
              <li className="text-purple-800">Subject 3</li>
            </ul>
          </div>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-md mr-3 hover:bg-purple-600 focus:outline-none"
            onClick={() => navigate("/StudentForm")}
          >
            Enroll Students
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none ml-8;"
            onClick={() => alert("Enroll students")}
          >
            Add Subject
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
