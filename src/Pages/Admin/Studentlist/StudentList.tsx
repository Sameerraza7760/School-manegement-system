import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useStudent from "../../../hooks/useStudent";
import { StudentDetail } from "../../../types/types.student";
import Header from "../../components/Header/Header";
import { Attendance } from "../../../types/type.attendence";
import { message } from "antd";

const StudentList = () => {
  const { classRoomid } = useParams();
  const { takeStudentAttendance, getAllStudentsInClassroom } = useStudent();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );

  useEffect(() => {
    (async () => {
      await getAllStudentsInClassroom();
    })();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [id, setId] = useState<string | undefined>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) =>
      item.studentid?.slice(0, 20) === classRoomid &&
      (item.studentRollNum
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string | undefined) => {
    if (id) {
      setId(id);
    }
  };

  const handleAttendance = (id: string | undefined) => {
    setCalendarOpen(true);
    setId(id);
  };

  const handleCalendarChange = async (date: Date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
    const confirmResult = window.confirm("Is the student present?");
    const status = confirmResult ? "present" : "absent";

    try {
      if (id) {
        const studentAttendance: Attendance = {
          date: date.toISOString(),
          id,
          status,
        };

        await takeStudentAttendance(studentAttendance);
        message.success("Successfully taken attendance");
        setId("");
      } else {
        console.error("Error: Student ID is undefined.");
      }
    } catch (error) {
      console.error("Error in handleCalendarChange:", error);
    }
  };

  return (
    <>
      {" "}
      <Header />{" "}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-screen-lg mt-[160px] p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">
            Student List
          </h2>

          <div className="mb-4 w-full md:w-1/2">
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
                <th className="py-2 px-4 border-b font-semibold">
                  Roll Number
                </th>
                <th className="py-2 px-4 border-b font-semibold">Name</th>
                <th className="py-2 px-4 border-b font-semibold">Actions</th>
                <th className="py-2 px-4 border-b font-semibold">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filterStudent.map((student) => (
                <tr
                  key={student.studentid}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 px-4 border-b text-indigo-800">
                    {student.studentRollNum}
                  </td>
                  <td className="py-3 px-4 border-b text-indigo-800">
                    {student.studentName}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleDelete(student.studentid)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleAttendance(student.studentid)}
                      className="text-green-500 hover:text-green-700 focus:outline-none"
                    >
                      Mark Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isCalendarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-lg">
              <Calendar onChange={handleCalendarChange} value={selectedDate} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
