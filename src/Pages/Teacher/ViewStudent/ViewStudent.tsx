import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StudentDetail } from "../../../types/types.student";
import { TeacherInfo } from "../../../types/types.teacher";

const ViewStudent = () => {
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const getStudents: StudentDetail[] = useSelector(
    (state: any) => state.students.enrolledStudents
  );
  const classDetail: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );
  const classIds = classDetail.className.map(
    (item: TeacherInfo) => item.classId
  );

  useEffect(() => {
    const classIdSet = new Set(classIds);
    const findStudent = getStudents.filter((item) =>
      classIdSet.has(item.studentid?.slice(0, 20))
    );
    setStudents(findStudent || []);
  }, []);

  return (
    <div className="container mx-auto mt-8 ml-8 ">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Class Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 cursor-pointer">
        {students.map((student) => (
          <div
            key={student.studentid}
            className="bg-white p-6 rounded-md shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {student.studentName}
            </h3>
            <p className="text-gray-600 mb-2">
              Roll Number: {student.studentRollNum}
            </p>
            <p className="text-gray-600 mb-4">Grade: {student.studentClass}</p>
            <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-full focus:outline-none transition duration-300">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudent;
