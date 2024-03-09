import { message } from "antd";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTeacher from "../../../hooks/useTeacher";
import { Attendance } from "../../../types/type.attendence";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "../../components/Header/Header";
const TeacherDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [teacherId, setTeacherId] = useState<string | undefined>("");

  const teacherName: TeacherInfo[] = useSelector(
    (state: any) => state.teachers.enrolledTeachers
  );
  const { takeTeacherAttendence } = useTeacher();

  const handleAttendance = (id: string | undefined) => {
    setCalendarOpen(true);
    setTeacherId(id);
    console.log(id);
  };

  const handleCalendarChange = async (date: Date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
    const confirmResult = window.confirm("Is the student present?");
    const status = confirmResult ? "present" : "absent";

    try {
      if (teacherId) {
        const teacherAttendence: Attendance = {
          date: date.toISOString(),
          id: teacherId,
          status,
        };

        await takeTeacherAttendence(teacherAttendence);
        message.success("Attendence Recorded");
        setTeacherId("");
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

      <div className="container w-[96%] mx-auto mt-[120px]">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-800">
          Teacher Details
        </h2>

        {teacherName?.map((teacher, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {teacher.teacherName}
            </h2>
            <div className="mb-4">
              <span className="font-medium text-gray-600">Subjects:</span>
              <ul className="list-disc pl-5">
                <li className="text-gray-700">{teacher.selectedSubject}</li>
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-600">
                  Contact Number:
                </span>
                <p className="text-gray-700">{teacher.phoneNumber}</p>
              </div>
              <button
                onClick={() => handleAttendance(teacher.teacherId)}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none"
              >
                Mark Attendance
              </button>
            </div>
            {isCalendarOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

        <button
          onClick={() => setIsAddingTeacher(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none"
        >
          Add Teacher
        </button>

        {isAddingTeacher && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Add New Teacher</h2>

              <button
                onClick={() => navigate("/ClassList")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsAddingTeacher(false)}
                className="text-gray-600 ml-4 hover:underline focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherDetailsPage;
