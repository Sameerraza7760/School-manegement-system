import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <div className="container mx-auto mt-[90px] w-full">
      <div className="mx-auto bg-white p-8 rounded-md shadow-lg">
        <h1 className="mb-6 text-indigo-800 text-2xl font-bold">Class Details</h1>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p className="text-gray-800 text-lg font-semibold">Current Date:</p>
            <p className="text-indigo-800">17 Feb 2023</p>
          </Col>
          <Col span={12}>
            <p className="text-gray-800 text-lg font-semibold">Class Name:</p>
            <p className="text-indigo-800">{classDetail?.className}</p>
          </Col>
        </Row>

        <div className="mb-6">
          <p className="text-gray-800 text-lg font-semibold">Number of Teachers:</p>
          <p className="text-indigo-800">None</p>
          <Link
            to={`/TeacherDetail/${id || ""}`}
            className="text-indigo-800 hover:underline focus:outline-none block"
          >
            View Teachers
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 text-lg font-semibold">Number of Students:</p>
          <p className="text-indigo-800">{filterStudent.length}</p>
          <Link
            to={`/studentList/${id || ""}`}
            className="text-indigo-800 hover:underline focus:outline-none block"
          >
            View Students
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 text-lg font-semibold">Number of Subjects:</p>
          <p className="text-indigo-800">{classDetail?.subjects?.length}</p>
          <Link
            to={`/subjectDetail/${id || ""}`}
            className="text-indigo-800 hover:underline focus:outline-none block"
          >
            View Subjects
          </Link>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="primary"
            className="bg-blue-600"
            onClick={() => navigate(`/StudentForm/${id || ""}`)}
          >
            Enroll Students
          </Button>
          <Button
            className="bg-blue-600"
            type="primary"
            onClick={() => navigate(`/addSubject/${id || ""}`)}
          >
            Add Subject
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ClassDetail;
