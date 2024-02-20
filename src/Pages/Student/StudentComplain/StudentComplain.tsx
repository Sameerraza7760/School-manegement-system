import { useState } from "react";
import { useSelector } from "react-redux";
import useStudent from "../../../hooks/useStudent";
import { Complain } from "../../../types/type.complain";
import { ToastContainer } from "react-toastify";
const ComplainsPage = () => {
  const { submitComplain } = useStudent();
  const { student } = useSelector((state: any) => state.student);

  const [studentComplaint, setStudentComplaint] = useState<Complain>({
    complaintsName: student.studentName,
    complainContent: "",
    number: student.studentRollNum,
    complaintsClass: student.studentClass,
    Role: "Student",
  });

  const handleComplainSubmit = async () => {
    if (!studentComplaint.complainContent.trim()) {
      alert("Please enter a complaint before submitting.");
      return;
    }

    await submitComplain(studentComplaint);
    setStudentComplaint((prevComplaint) => ({
      ...prevComplaint,
      complainContent: "",
    }));
  };

  return (
    <>
      <div className="container mx-auto mt-[5%]">
        <h1 className="text-3xl font-semibold mb-6">Complaints</h1>

        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <label htmlFor="complainText" className="text-lg font-semibold mb-2">
            Enter Complaint:
          </label>
          <textarea
            id="complainText"
            value={studentComplaint.complainContent}
            onChange={(e) =>
              setStudentComplaint({
                ...studentComplaint,
                complainContent: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md"
          ></textarea>
          <button
            onClick={handleComplainSubmit}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
          >
            Submit Complaint
          </button>
        </div>

        {/* Display Student Complaint */}
        {studentComplaint.complaintsName && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Student Complaint</h2>
            <p>
              <strong>Name:</strong> {studentComplaint.complaintsName}
            </p>
            <p>
              <strong>Complaint Content:</strong>{" "}
              {studentComplaint.complainContent}
            </p>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default ComplainsPage;
