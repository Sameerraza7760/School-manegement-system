import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
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

const { Title, Text } = Typography;
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
  const { getTeachersByClassId } = useTeacher();

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
        await getTeachersByClassId(id);
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

      <div className="container w-full mt-[90px] p-8 mx-auto  text-white">
        <div className="items-center flex justify-center w-full sm:w-[80%] mx-auto ">
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
              <Text strong>Number of Teachers:</Text> {teacherName?.length}
              <br />
              <Text strong>Number of Students:</Text> {filterStudent.length}
              <br />
              <Text strong>Number of Subjects:</Text>{" "}
              {classDetail?.subjects?.length}
            </Card>

            <div className="container w-[90%] mx-auto">
              <div className="grid grid-cols-1 gap-5  sm:grid-cols-2 md:grid-cols-4">
                <Button
                  type="primary"
                  onClick={() => navigate(`/TeacherDetail/${id || ""}`)}
                  className="bg-blue-800 h-[40px] hover:bg-blue-900 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  View Teachers
                </Button>

                <Button
                  onClick={() => navigate(`/studentList/${id || ""}`)}
                  type="primary"
                  className="bg-blue-800 h-[40px] hover:bg-blue-900 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  View Students
                </Button>

                <Button
                  onClick={() => navigate(`/subjectDetail/${id || ""}`)}
                  type="primary"
                  className="bg-blue-800 h-[40px] hover:bg-blue-900 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  View Subjects
                </Button>

                <Button
                  onClick={() => navigate(`/StudentForm/${id || ""}`)}
                  type="primary"
                  className="bg-green-600 h-[40px] hover:bg-green-700 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  Enroll Students
                </Button>

                <Button
                  onClick={() => navigate(`/addSubject/${id || ""}`)}
                  type="primary"
                  className="bg-green-600 h-[40px] hover:bg-green-700 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  Add Subject
                </Button>
              </div>
            </div>
          </Space>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
