import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useStudent from "../../../hooks/useStudent";
import { StudentDetail } from "../../../types/types.student";
import Header from "../../components/Header/Header";

const StudentList = () => {
  const { classRoomid } = useParams();
  const { getAllStudentsInClassroom } = useStudent();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );

  useEffect(() => {
    (async () => {
      await getAllStudentsInClassroom();
    })();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) =>
      item.studentid?.slice(0, 20) === classRoomid &&
      (item.studentRollNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string | undefined) => {
    // Handle delete logic
  };

  return (
   <>
   <Header/>
   <div className="container mx-auto mt-[100px]">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Student List</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Roll Number or Name"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-indigo-800 text-white">
              <th className="py-2 px-4 border-b font-semibold">Roll Number</th>
              <th className="py-2 px-4 border-b font-semibold">Name</th>
              <th className="py-2 px-4 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterStudent.map((student) => (
              <tr key={student.studentid} className="hover:bg-gray-50 transition duration-300">
                <td className="py-3 px-4 border-b text-indigo-800">{student.studentRollNum}</td>
                <td className="py-3 px-4 border-b text-indigo-800">{student.studentName}</td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleDelete(student.studentid)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</>
  );
};

export default StudentList;