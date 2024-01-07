import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import useClass from "../../../CustomHooks/useClass";
import { typeClass } from "../../../types/types.class";
import { useState } from "react";
const ClassDetail = () => {
  const [classDetail, setClassDetail] = useState<typeClass | null>();
  const navigate = useNavigate();
  const { getClassDetailByUid } = useClass();
  const { id } = useParams();

  const getClassDetail = async () => {
    if (id) {
      const getClassDetail: typeClass | null = await getClassDetailByUid(id);
      setClassDetail(getClassDetail)
    }
  };
  getClassDetail();
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Class Detail
          </h2>

          {/* Current Date */}
          <div className="mb-6">
            <label
              htmlFor="currentDate"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Current Date:
            </label>
            {/* <span className="text-purple-800 text-lg">{classDetail?.timestamp || ""}</span> */}
          </div>

          {/* Class Name */}
          <div className="mb-6">
            <label
              htmlFor="className"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Name:
            </label>
            <span className="text-purple-800 text-lg">{classDetail?.className}</span>
          </div>

          {/* Class Teacher */}
          <div className="mb-6">
            <label
              htmlFor="classTeacher"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              Class Teacher:
            </label>
            <span className="text-purple-800 text-lg">John Doe</span>
          </div>

          {/* Students List */}
          <div className="mb-6">
            <label
              htmlFor="classStudents"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              No Of Students:
            </label>
            <ul className="list-disc pl-5">
              <li className="text-purple-800">Student 1</li>
              <li className="text-purple-800">Student 2</li>
              <li className="text-purple-800">Student 3</li>
            </ul>
          </div>

          {/* Subjects List */}
          <div className="mb-6">
            <label
              htmlFor="classSubjects"
              className="text-gray-600 mb-2 block text-lg font-semibold"
            >
              No Of Subjects:
            </label>
            <ul className="list-disc pl-5">
              <li className="text-purple-800">Subject 1</li>
              <li className="text-purple-800">Subject 2</li>
              <li className="text-purple-800">Subject 3</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              onClick={() => navigate("/StudentForm")}
            >
              Enroll Students
            </button>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              onClick={() => alert("Add subject")}
            >
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
