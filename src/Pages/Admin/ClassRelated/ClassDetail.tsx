import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import useStudent from "../../../hooks/useStudent";
import { ClassRoom } from "../../../types/types.class";
import Header from "../../components/Header/Header";

import { useEffect, useState } from "react";
import { StudentDetail } from "../../../types/types.student";
const ClassDetail = () => {
  const { getAllStudentsInClassroom } = useStudent();
  const [classDetail, setClassDetail] = useState<ClassRoom | null>();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );

  const navigate = useNavigate();
  const { getClassDetailById } = useClassRoom();
  const { id } = useParams();

  useEffect(() => {
    const getClassDetail = async () => {
      if (id) {
        const getClassDetail: ClassRoom | null = await getClassDetailById(id);
        setClassDetail(getClassDetail);
      }
    };
    getClassDetail();
    getAllStudentsInClassroom();
  }, []);
  console.log("hi==>", enrolledStudents);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10">
        <div className="max-w-2xl mx-auto bg-white p-8  shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Class Detail
          </h2>

          {/* Current Date */}
          <div className="mb-6">
            <label
              htmlFor="currentDate"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Current Date:
            </label>
            <span className="text-purple-800 text-lg">17 feb 2023</span>
          </div>

          {/* Class Name */}
          <div className="mb-6">
            <label
              htmlFor="className"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Name:
            </label>
            <span className="text-purple-800 text-lg">
              {classDetail?.className}
            </span>
          </div>

          {/* Class Teacher */}
          <div className="mb-6">
            <label
              htmlFor="classTeacher"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Teacher:
            </label>
            <span className="text-purple-800 text-lg">None</span>
          </div>

          {/* Students List */}
          <div className="mb-6">
            <label
              htmlFor="classStudents"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              No Of Students:
            </label>

            <ul className="list-disc pl-5">
              <li className="text-purple-800">{enrolledStudents.length}</li>
            </ul>
            <button
              onClick={() => navigate(`/studentList/${id || ""}`)}
              className="text-purple-800 hover:underline focus:outline-none"
            >
              Students Detail
            </button>
          </div>

          {/* Subjects List */}
          <div className="mb-6">
            <label
              htmlFor="classSubjects"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              No Of Subjects:
            </label>
            <ul className="list-disc pl-5">
              <li className="text-purple-800">Subject 1</li>
              <li className="text-purple-800">Subject 2</li>
              <li className="text-purple-800">Subject 3</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              onClick={() => navigate(`/StudentForm/${id || ""}`)}
            >
              Enroll Students
            </button>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              onClick={() => alert("Add subject")}
            >
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
