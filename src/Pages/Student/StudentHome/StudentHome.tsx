import { useEffect, useState } from "react";
import {
  FaBell,
  FaBook,
  FaCalendar,
  FaComments,
  FaList,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useQuiz from "../../../hooks/useQuiz";
import useTeacher from "../../../hooks/useTeacher";
import { notics } from "../../../types/type.notics";
import { StudentDetail } from "../../../types/types.student";
import { TeacherInfo } from "../../../types/types.teacher";

const StudentHomePage = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState<
    Record<string, boolean>
  >({});
  const studentDetail: StudentDetail = useSelector(
    (state: any) => state.student.student
  );
  const ClassTeachers: TeacherInfo[] = useSelector(
    (state: any) => state?.teachers?.enrolledTeachers
  );

  const { getTeachersByClassId } = useTeacher();
  const { getNoticeFromDb } = useAuth();
  const { getQuizzesByClassId, checkIfQuizCompletedForStudent } = useQuiz();

  const [quizzes, setquiz] = useState<any[]>([]);
  const [notics, setNotics] = useState<notics>();
  const getNotics = async () => {
    const notics: notics | null = await getNoticeFromDb(studentDetail.schoolId);
    console.log(notics);
    if (notics) {
      setNotics(notics);
    }
  };

  const classId = studentDetail.studentid?.slice(0, 20);
  const getQuizbyClassId = async () => {
    const quizze = await getQuizzesByClassId(classId);

    if (quizze) {
      setquiz(quizze);
    }
  };
  const fetchQuizCompletionStatus = async (quizId: string) => {
    try {
      const isQuizCompleted = await checkIfQuizCompletedForStudent(
        quizId,
        studentDetail.studentid
      );
      return isQuizCompleted;
    } catch (error: any) {
      console.error("Error checking quiz completion status:", error.message);
      return false;
    }
  };
  const fetchCompletionStatus = async () => {
    const statusMap: Record<string, boolean> = {};
    await Promise.all(
      quizzes.map(async (quiz) => {
        const isCompleted = await fetchQuizCompletionStatus(quiz.id);
        statusMap[quiz.id] = isCompleted;
      })
    );
    setCompletedQuizzes(statusMap);
  };

  const getTeacherByClassId = async () => {
    if (classId) {
      await getTeachersByClassId(classId);
    }
  };
  useEffect(() => {
    getNotics();
    getQuizbyClassId();
    getTeacherByClassId();
  }, []);
  useEffect(() => {
    fetchCompletionStatus();
  }, [quizzes]);
  return (
    <div className="container mx-auto  mt-8 ">
      <div className="grid grid-cols-1 mx-auto w-[90%] md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaUser className="mr-2" /> Student Information
          </h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-gray-600">Name:</span>{" "}
            {studentDetail.studentName}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-gray-600">Roll Number:</span>{" "}
            {studentDetail.studentRollNum}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Class:</span>{" "}
            {studentDetail.studentClass}
          </p>
        </div>
        {/* Upcoming Events or Announcements */}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaCalendar className="mr-2" /> Upcoming Events
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Event 1 on Date</li>
            <li>Event 2 on Date</li>
            <li>Event 3 on Date</li>
          </ul>
        </div>
        {/* Quick Links or Actions */}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaList className="mr-2" /> Quick Links
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <Link to="Ssubjects" className="text-indigo-600 hover:underline">
                Subjects
              </Link>
            </li>
            <li>
              <Link
                to="SViewAttendence"
                className="text-indigo-600 hover:underline"
              >
                Attendance
              </Link>
            </li>
            <li>
              <Link to="SComplain" className="text-indigo-600 hover:underline">
                Complain
              </Link>
            </li>
          </ul>
        </div>
        {/* Notices Section */}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaBell className="mr-2" /> Notices
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Single Notice */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="text-md font-semibold mb-2">
                {notics?.noticeContent}
              </h3>
              <p className="text-gray-700">
                {notics?.noticeContent ?? "Not Notics Available"}
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaBook className="mr-2" /> Quizzes
          </h2>
          {/* Add content related to quizzes here */}
          <ul className="list-disc pl-5 text-gray-700">
            {quizzes.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {quizzes.map((quiz) => (
                  <li key={quiz.id}>
                    {completedQuizzes[quiz.id] ? (
                      <span className="text-red-500">
                        Completed: {quiz.quizTitle}{" "}
                        {/* if you already submit the quiz*/}
                      </span>
                    ) : (
                      <Link
                        to={`SQuizTest/${quiz.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {quiz.quizTitle}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No quizzes available.</p>
            )}
          </ul>
        </div>{" "}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaComments className="mr-2" /> Chat with Teacher
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mx-auto">
            {ClassTeachers?.map((teacher) => (
              <div key={teacher.teacherId} className="mb-4">
                <Link
                  to={`StdChatRoom/${teacher.teacherId}`}
                  className="block p-4 bg-white shadow-md rounded-md transition duration-300 transform hover:scale-105 hover:bg-gray-100"
                >
                  <span className="text-indigo-600 hover:underline">
                    Teacher Name: {teacher.teacherName}
                  </span>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
