import React, { useState } from "react";
import Header from "../../../components/Header/Header";

const AddStudentForm = () => {
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSubjects, setStudentSubjects] = useState([]);

  const handleAddSubject = () => {
    // Implement subject addition logic if needed
  };

  const handleEnrollStudent = () => {
    // Implement student enrollment logic
  };

  return (
    <>
      <Header />
      <div className="container mx-auto pt-9 mt-10">
        <div className="w-[60%] mx-auto bg-white p-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Enroll Student
          </h2>
          <div className="mb-4">
            <label htmlFor="studentName" className="text-gray-600 mb-2 block">
              Student Name:
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="studentRollNo" className="text-gray-600 mb-2 block">
              Roll Number:
            </label>
            <input
              type="text"
              id="studentRollNo"
              name="studentRollNo"
              value={studentRollNo}
              onChange={(e) => setStudentRollNo(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="studentClass" className="text-gray-600 mb-2 block">
              Class:
            </label>
            <input
              type="text"
              id="studentClass"
              name="studentClass"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentSubjects"
              className="text-gray-600 mb-2 block"
            >
              Subjects:
            </label>
            {/* Implement a dynamic way to add and display subjects */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add subject"
                className="border rounded-md p-2 flex-1"
              />
              <button
                onClick={handleAddSubject}
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              >
                Add
              </button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {/* Display added subjects */}
              {studentSubjects.map((subject, index) => (
                <li key={index} className="text-purple-800">
                  {subject}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleEnrollStudent}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Enroll Student
          </button>
        </div>
      </div>
    </>
  );
};

export default AddStudentForm;
