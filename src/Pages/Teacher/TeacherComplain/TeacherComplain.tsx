import { useState } from "react";
import { useSelector } from "react-redux";
import useStudent from "../../../hooks/useStudent";
import { Complain } from "../../../types/type.complain";
const TeacherComplain = () => {
  const { submitComplain } = useStudent();

  const { teacher } = useSelector((state: any) => state.teacher);
  const [teacherComplaint, setTeacherComplaint] = useState<Complain>({
    complaintsName: teacher.teacherName,
    complainContent: "",
    number: teacher.phoneNumber,
    complaintsClass: teacher.ClassName,
    Role: "Teacher",
  });

  const handleComplainSubmit = async () => {
    if (!teacherComplaint.complainContent.trim()) {
      alert("Please enter a complaint before submitting.");
      return;
    }

    await submitComplain(teacherComplaint);
  };

  return (
    <div className="flex items-center justify-center mt-9 ">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4">Teacher Complaint Form</h1>
        <div>
          <div className="mb-4">
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-600"
            >
              Describe your complaint
            </label>
            <textarea
              id="complainText"
              value={teacherComplaint.complainContent}
              onChange={(e) =>
                setTeacherComplaint({
                  ...teacherComplaint,
                  complainContent: e.target.value,
                })
              }
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div className="text-right">
            <button
              onClick={handleComplainSubmit}
              type="submit"
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherComplain;
