// StudentSubjects.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTeacher from "../../../hooks/useTeacher";
import { ClassRoom } from "../../../types/types.class";
import { TeacherInfo } from "../../../types/types.teacher";
import TeacherModal from "./TeacherModal";
const StudentSubjects = () => {
  const { getAllTeacher } = useTeacher();
  const [isModalOpen, setModalOpen] = useState(false);
  const [sutbjectList, setSubjectList] = useState<string[] | undefined>([]);
  const [classRoomId, setClassId] = useState<string>("");
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherInfo | null>(
    null
  );

  const classDetail: ClassRoom[] = useSelector(
    (state: any) => state.class.classes
  );
  const studentId: string = useSelector(
    (state: any) => state.student.student.studentid
  );
  // console.log(studentId);

  useEffect(() => {
    const findclassRoomid = classDetail.find(
      (item: ClassRoom) => item.id === studentId.slice(0, 20)
    );
    if (findclassRoomid) {
      setSubjectList(findclassRoomid.subjects);
      setClassId(findclassRoomid.id);
    }
    const getTeachers = async () => {
      const teachers = await getAllTeacher();
      setTeachers(teachers);
    };
    getTeachers();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log("Closing modal");
    setModalOpen(false);
  };
  const subjectDetail = (subject: string) => {
    const subjectTeacher = teachers.find(
      (item) => item.classId === classRoomId && item.selectedSubject === subject
    );
    if (subjectTeacher) {
      console.log(subjectTeacher);

      setSelectedTeacher(subjectTeacher);
      openModal();
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 ml-[2%] ">
        <h1 className="text-3xl font-semibold mb-4 text-blue-800 font-serif">Your Subjects</h1>
        <div className="grid grid-cols-1 w-[90%] mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-auto">
          {sutbjectList?.map((subject, index) => (
            <div
              onClick={() => subjectDetail(subject)}
              key={index}
              className="bg-white p-6 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:bg-gray-100 transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold mb-4">{subject}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                euismod suscipit imperdiet.
              </p>{" "}
              <a className="text-indigo-500 inline-flex items-center mt-2">
                View Detail
                <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round" 
    strokeLinejoin="round"
    strokeWidth="2" 
    className="w-4 h-4 ml-2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
              </a>
            </div>
          ))}
        </div>
        {selectedTeacher ? (
          <TeacherModal
            teacher={selectedTeacher}
            onClose={closeModal}
            isOpen={isModalOpen}
          />
        ) : null}
      </div>
    </>
  );
};

export default StudentSubjects;
