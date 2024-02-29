import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StudentDetail } from "../../../types/types.student";
import { TeacherInfo } from "../../../types/types.teacher";
import StudentCard from "./StudentCard";
import "./style.css";

const ViewStudent = () => {
  const getStudents: StudentDetail[] = useSelector(
    (state: any) => state.students.enrolledStudents
  );
  const classDetail: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );
  const [students, setStudents] = useState<StudentDetail[]>([]);

  console.log(classDetail);

  useEffect(() => {
    const teacherid = classDetail.classId;
    const findStudent = getStudents.filter(
      (item) => item.studentid?.slice(0, 20) === teacherid
    );
    setStudents(findStudent);
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-gray-900 font-serif">
              Class Students
            </h1>
          </div>
          <div className="flex flex-wrap">
            {students?.map((student) => (
              <StudentCard key={student.studentid} student={student} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewStudent;
