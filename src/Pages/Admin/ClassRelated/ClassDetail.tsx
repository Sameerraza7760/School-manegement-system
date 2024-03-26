import { Card, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import useStudent from "../../../hooks/useStudent";
import useTeacher from "../../../hooks/useTeacher";
import { ClassRoom } from "../../../types/types.class";
import { StudentDetail } from "../../../types/types.student";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "../../components/Header/Header";

const { Title, Text } = Typography;
const ClassDetail = () => {
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
  const { getTeachersByClassId } = useTeacher();
  const getClassDetail = async () => {
    if (!id) return;
    const classDetail: ClassRoom | null = await getClassDetailById(id);
    setClassDetail(classDetail);
  };
  const fetchData = async () => {
    if (!id) return;
    await getClassDetail();
    await getAllStudentsInClassroom();

    try {
      await getTeachersByClassId(id);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterStudent: StudentDetail[] = enrolledStudents?.filter(
    (item) => item.studentid?.slice(0, 20) === id
  );

  return (
    <>
      <Header />

      <div className="container w-full mt-[90px] p-8 mx-auto text-white">
        <div className="items-center flex justify-center w-full sm:w-[80%] mx-auto">
          <Space
            direction="vertical"
            size="large"
            style={{ width: "95%", margin: "auto" }}
          >
            <Card className="rounded-lg" style={{ background: "#CCCCCC" }}>
              <Title level={3} className="text-indigo-800">
                Class Information
              </Title>
              <Divider />
              <Text strong>Class Name:</Text> {classDetail?.className}
              <br />
              <Text strong>Current Date:</Text> 17 Feb 2023
            </Card>

            <Card className="rounded-lg" style={{ background: "#F5F5DC" }}>
              <Title level={3} className="text-indigo-800">
                Statistics
              </Title>
              <Divider />
              <div className="flex gap-5 text-blue-800">
                {" "}
                <Text strong>Number of Teachers:</Text> {teacherName?.length}{" "}
                <Link to={`/TeacherDetail/${id || ""}`}>View Teachers</Link>
              </div>
              <br />
              <div className="flex gap-5 text-blue-900">
                {" "}
                <Text strong>Number of Students:</Text> {filterStudent.length}{" "}
                <Link to={`/studentList/${id || ""}`} className="text-blue-900">
                  View Students
                </Link>
              </div>
              <br />
              <div className="text-blue-900 flex gap-5">
                {" "}
                <Text strong>Number of Subjects:</Text>{" "}
                {classDetail?.subjects?.length}{" "}
                <Link
                  to={`/subjectDetail/${id || ""}`}
                  // className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-full transition duration-300 block text-center"
                >
                  View Subjects
                </Link>
              </div>
            </Card>

            <div className="container w-[90%] mx-auto">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                <Link
                  to={`/StudentForm/${id || ""}`}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full transition duration-300 block text-center"
                >
                  Enroll Students
                </Link>

                <Link
                  to={`/addSubject/${id || ""}`}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full transition duration-300 block text-center"
                >
                  Add Subject
                </Link>
              </div>
            </div>
          </Space>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
