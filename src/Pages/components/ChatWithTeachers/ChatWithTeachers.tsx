import { Link } from "react-router-dom";
import { TeacherInfo } from "../../../types/types.teacher";

interface TeacherProps {
  teacher: TeacherInfo;
}
function ChatWithTeachers({ teacher }: TeacherProps) {
  const { teacherId, teacherName } = teacher;

  return (
    <div>
      {" "}
      <div key={teacherId} className="mb-4">
        <Link
          to={`StdChatRoom/${teacherId}`}
          className="block p-4 bg-white shadow-md rounded-md transition duration-300 transform hover:scale-105 hover:bg-gray-100"
        >
          <span className="text-indigo-600 hover:underline">
            Teacher Name: {teacherName}
          </span>
        </Link>{" "}
      </div>
    </div>
  );
}

export default ChatWithTeachers;
