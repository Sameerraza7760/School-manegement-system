import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import useStudent from "../../../hooks/useStudent";
import useTeacher from "../../../hooks/useTeacher";
import { ClassRoom } from "../../../types/types.class";
import { StudentDetail } from "../../../types/types.student";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "../../components/Header/Header";

const ClassDetail = () => {
  const navigate = useNavigate();
  const { getAllStudentsInClassroom } = useStudent();
  const [classDetail, setClassDetail] = useState<ClassRoom | null>();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );
  const teacherName: TeacherInfo[] = useSelector(
    (state: any) => state.teachers.enrolledTeachers
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
        await getAllTeacher();
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchData();
  }, []);

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) => item.studentid?.slice(0, 20) === id
  );

  const filteredTeacher: TeacherInfo[] = teacherName?.filter(
    (item) => item.classId === id
  );
  return (
    <>
      <Header />

      <div className="container mx-auto mt-10 w-full bg-blue-300">
        <div className="mx-auto p-8 bg-gray-200 mt-[100px] ">
          <h1 className="mb-6 text-indigo-800 text-3xl font-bold">
            Class Details
          </h1>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="text-gray-800 text-lg font-semibold">
                Current Date:
              </p>
              <p className="text-indigo-800 text-base">17 Feb 2023</p>
            </Col>
            <Col span={12}>
              <p className="text-gray-800 text-lg font-semibold text-end">
                Class Name:
              </p>
              <p className="text-indigo-800 text-base text-end">
                {classDetail?.className}
              </p>
            </Col>
          </Row>

          <div className="mb-6">
            <p className="text-gray-800 text-lg font-semibold">
              Number of Teachers:
            </p>
            <p className="text-indigo-800 text-base">
              {filteredTeacher?.length}
            </p>
            <Button
              type="primary"
              className="bg-blue-800 text-base"
              onClick={() => navigate(`/TeacherDetail/${id || ""}`)}
            >
              View Teachers
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-gray-800 text-lg font-semibold">
              Number of Students:
            </p>
            <p className="text-indigo-800 text-base">{filterStudent.length}</p>
            <Button
              type="primary"
              className="bg-blue-800 text-base"
              onClick={() => navigate(`/studentList/${id || ""}`)}
            >
              View Students
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-gray-800 text-lg font-semibold">
              Number of Subjects:
            </p>
            <p className="text-indigo-800 text-base">
              {classDetail?.subjects?.length}
            </p>
            <Button
              type="primary"
              className="bg-blue-800 text-base"
              onClick={() => navigate(`/subjectDetail/${id || ""}`)}
            >
              View Subjects
            </Button>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="primary"
              className="bg-green-600 text-base"
              onClick={() => navigate(`/StudentForm/${id || ""}`)}
            >
              Enroll Students
            </Button>
            <Button
              type="primary"
              className="bg-green-600 text-base"
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
