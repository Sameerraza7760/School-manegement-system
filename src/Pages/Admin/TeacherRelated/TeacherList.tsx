import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";

const TeacherDetailsPage = () => {
  const navigate = useNavigate();
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const { id } = useParams();
  const teacherName: TeacherInfo[] = useSelector(
    (state: any) => state.teachers.enrolledTeachers
  );
  const filterTeacher = teacherName.filter((item) => item.classId === id);
  return (
    <>
      <Header />

      <div className="container mx-auto mt-[120px]">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-800">
          Teacher Details
        </h2>

        {filterTeacher?.map((teacher, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {teacher.teacherName}
            </h2>
            <div className="mb-4">
              <span className="font-medium text-gray-600">Subjects:</span>
              <ol className="list-disc pl-5">
                <li className="text-gray-700">{teacher.selectedSubject}</li>
              </ol>
            </div>
            <div>
              <span className="font-medium text-gray-600">Contact Number:</span>
              <p className="text-gray-700">{teacher.phoneNumber}</p>
            </div>
          </div>
        ))}

        <button
          onClick={() => setIsAddingTeacher(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
        >
          Add Teacher
        </button>

        {isAddingTeacher && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>

              <button
                onClick={() => navigate("/ClassList")}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
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
