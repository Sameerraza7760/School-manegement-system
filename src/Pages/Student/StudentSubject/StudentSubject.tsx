// StudentSubjects.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClassRoom } from "../../../types/types.class";

const StudentSubjects = () => {
  const [sutbjectList, setSubjectList] = useState<string[] | undefined>([]);
  const classDetail: ClassRoom[] = useSelector(
    (state: any) => state.class.classes
  );
  const studentId: string = useSelector(
    (state: any) => state.student.student.studentid
  );
  console.log(studentId);

  useEffect(() => {
    const findclassRoomid = classDetail.find(
      (item: ClassRoom) => item.id === studentId.slice(0, 20)
    );
    if (findclassRoomid) {
      setSubjectList(findclassRoomid.subjects);
    }
  });

  return (
    <>
      <div className="container mx-auto mt-8 ml-[2%] ">
        <h1 className="text-3xl font-semibold mb-4">Your Subjects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sutbjectList?.map((subject, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:bg-gray-100 transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold mb-4">{subject}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                euismod suscipit imperdiet.
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentSubjects;
