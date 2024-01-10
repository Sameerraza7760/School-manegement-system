import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useStudent from "../../../hooks/useStudent";
import { StudentDetail } from "../../../types/types.student";
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

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) => item.studentid?.slice(0, 20) === classRoomid
  );

  const handleDelete = (id: string | undefined) => {};

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Student List</h1>
      <div className="grid grid-cols-2 gap-4">
        {filterStudent.map((student) => (
          <div
            key={student.studentid}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">
              {student.studentName}
            </h2>
            <p className="text-gray-600">
              Roll Number: {student.studentRollNum}
            </p>
            <button
              onClick={() => handleDelete(student.studentid)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
