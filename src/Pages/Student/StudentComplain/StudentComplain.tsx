import { message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useComplain } from "../../../hooks/useComplain";
import { Complain } from "../../../types/type.complain";
const ComplainsPage = () => {
  const { submitComplain } = useComplain();
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
      message.error("Please enter a complaint before submitting.");
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
        <h1 className="text-2xl text-center font-serif text-blue-900 font-semibold mb-6  sm:text-3xl ">
          Complaints
        </h1>

        <div className="container w-[90%] mx-auto  bg-white p-6 rounded-md mb-6">
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

        <ToastContainer />
      </div>
    </>
  );
};

export default ComplainsPage;
