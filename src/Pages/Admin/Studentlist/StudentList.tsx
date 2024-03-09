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

  const filteredStudents: StudentDetail[] = enrolledStudents?.filter(
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
      <Header />
      <div className="container mx-auto mt-[100px]">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-800 ml-4">
          Students Detail
        </h2>
        <div className="mb-4 flex items-center justify-between mx-auto w-[90%] sm:w-[50%]">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border border-gray-300 rounded-md  mx-auto w-full"
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 w-[90%] mx-auto sm:w-full sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((student) => (
            <div
              key={student.studentid}
              className="bg-white p-6 rounded-md shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">
                {student.studentName}
              </h3>
              <p className="text-gray-600 mb-4">
                Roll Number: {student.studentRollNum}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(student.studentid)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAttendance(student.studentid)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Mark Attendance
                </button>
              </div>
              {isCalendarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  {" "}
                  <div className="bg-white p-8 rounded-md shadow-lg">
                    <Calendar
                      onChange={handleCalendarChange}
                      value={selectedDate}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentList;
