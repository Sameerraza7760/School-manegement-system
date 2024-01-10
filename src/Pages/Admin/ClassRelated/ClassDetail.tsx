import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import useStudent from "../../../hooks/useStudent";
import { ClassRoom } from "../../../types/types.class";
import Header from "../../components/Header/Header";
import useTeacher from "../../../hooks/useTeacher";
import { useEffect, useState } from "react";
import { StudentDetail } from "../../../types/types.student";
const ClassDetail = () => {
  const navigate = useNavigate();
  const { getAllStudentsInClassroom } = useStudent();
  const [classDetail, setClassDetail] = useState<ClassRoom | null>();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );
  const { getClassDetailById } = useClassRoom();
  const { id } = useParams();
  const {getAllTeacher} = useTeacher()
  useEffect(() => {
    const fetchData = async () => {
      const getClassDetail = async () => {
        if (id) {
          const classDetail: ClassRoom | null = await getClassDetailById(id);
          setClassDetail(classDetail);
        }
      };
  
      await getClassDetail();
      await getAllStudentsInClassroom();
  
      try {
        const teachers = await getAllTeacher();
        console.log("hi==>",teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
  
    fetchData();
  }, [id]);
  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) => item.studentid?.slice(0, 20) === id
  );

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
              No Of Teacher:
            </label>
            <span className="text-purple-800 text-lg">None</span>
            <br />
            <button
              onClick={() => navigate(`/studentList/${id || ""}`)}
              className="text-purple-800 hover:underline focus:outline-none"
            >
              Teachers Detail
            </button>
          </div>

          {/* Students List */}
          <div className="mb-6">
            <label
              htmlFor="classStudents"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              No Of Students:
            </label>

            <ul className=" pl-5">
              <li className="text-purple-800">{filterStudent.length}</li>
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
            <ul className=" pl-5 list-none ">
              <li className="text-purple-800">
                {classDetail?.subjects?.length}
              </li>
            </ul>
            <button
              onClick={() => navigate(`/subjectDetail/${id || ""}`)}
              className="text-purple-800 hover:underline focus:outline-none"
            >
              Subject Detail
            </button>
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
              onClick={() => navigate(`/addSubject/${id || ""}`)}
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
