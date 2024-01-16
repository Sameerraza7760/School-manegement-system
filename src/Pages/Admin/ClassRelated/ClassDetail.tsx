import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import useStudent from "../../../hooks/useStudent";
import useTeacher from "../../../hooks/useTeacher";
import { ClassRoom } from "../../../types/types.class";
import { StudentDetail } from "../../../types/types.student";
import Header from "../../components/Header/Header";

const ClassDetail = () => {
  const navigate = useNavigate();
  const { getAllStudentsInClassroom } = useStudent();
  const [classDetail, setClassDetail] = useState<ClassRoom | null>();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );
  console.log(enrolledStudents);
  
  const { getClassDetailById } = useClassRoom();
  const { id } = useParams();
  const { getAllTeacher } = useTeacher();

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
        console.log("hi==>", teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, []);

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) => item.studentid?.slice(0, 20) === id
  );

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[80px]">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-lg border">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Class Detail</h2>

        <div className="mb-6">
          <p className="text-gray-600 text-lg font-semibold">Current Date:</p>
          <p className="text-indigo-800 text-lg">17 Feb 2023</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-lg font-semibold">Class Name:</p>
          <p className="text-indigo-800 text-lg">{classDetail?.className}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-lg font-semibold">No Of Teacher:</p>
          <p className="text-indigo-800 text-lg">None</p>
          <button
            onClick={() => navigate(`/TeacherDetail/${id || ""}`)}
            className="text-indigo-800 hover:underline focus:outline-none"
          >
            Teachers Detail
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-lg font-semibold">No Of Students:</p>
          <p className="text-indigo-800 text-lg">{filterStudent.length}</p>
          <button
            onClick={() => navigate(`/studentList/${id || ""}`)}
            className="text-indigo-800 hover:underline focus:outline-none"
          >
            Students Detail
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-lg font-semibold">No Of Subjects:</p>
          <p className="text-indigo-800 text-lg">{classDetail?.subjects?.length}</p>
          <button
            onClick={() => navigate(`/subjectDetail/${id || ""}`)}
            className="text-indigo-800 hover:underline focus:outline-none"
          >
            Subject Detail
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
            onClick={() => navigate(`/StudentForm/${id || ""}`)}
          >
            Enroll Students
          </button>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
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