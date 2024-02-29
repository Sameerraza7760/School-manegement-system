import { TeacherInfo } from "../../../types/types.teacher";

interface TeacherModalProps {
  teacher: TeacherInfo;
  onClose: () => void;
  isOpen: boolean;
}

const TeacherModal: React.FC<TeacherModalProps> = ({
  teacher,
  onClose,
  isOpen,
}) => {
  const modalStyle = isOpen
    ? "fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50"
    : "hidden";
  return (
    <div className={modalStyle}>
      <div className="relative p-4 mx-auto mt-20 max-w-md">
        <div className="relative bg-white rounded-md shadow-md">
          <div className="flex justify-end p-4">
            <span className="text-gray-500 cursor-pointer" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Teacher Details</h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {teacher.teacherName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {teacher.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
