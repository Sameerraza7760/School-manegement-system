import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAssignment from "../../../hooks/useAssignment";
import { useSelector } from "react-redux";
import { TeacherInfo } from "../../../types/types.teacher";
import { Assignment } from "../../../types/types.assignment";

const ViewAssignments: React.FC = () => {
  const [assinment, setAssignment] = useState<Assignment | null>(null);
  const { getAssignmentByClassId } = useAssignment();
  const navigate = useNavigate();
  const teacherDetail: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );

  useEffect(() => {
    const getAssinment = async () => {
      const classId = teacherDetail.classId;
      if (classId) {
        const data: Assignment | null = await getAssignmentByClassId(classId);
        console.log(data);
        setAssignment(data);
      }
    };
    getAssinment();
  }, []);
  return (
    <div className=" mx-auto p-4">
      {/* <h2 className="text-3xl font-bold mb-4">View Assignments</h2> */}
      <p>No assignments available.</p>
      <div>
        <div
          onClick={() => navigate("/ViewAssignment")}
          className="bg-white p-6 rounded-md shadow-md mb-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer "
        >
          <h3 className="text-xl font-bold mb-2">{assinment?.title}</h3>
          <p className="text-gray-600 mb-2">{assinment?.description}</p>
          <p className="text-gray-600">Due Date: {assinment?.dueDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;
