import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAssignment from "../../../hooks/useAssignment";
import { useSelector } from "react-redux";
import { TeacherInfo } from "../../../types/types.teacher";
import { Assignment } from "../../../types/types.assignment";

const ViewAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[] | null>([]);
  const { getAssignmentByClassId } = useAssignment();
  const navigate = useNavigate();
  const teacherDetail: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );

  useEffect(() => {
    const getAssignments = async () => {
      const classId = teacherDetail.classId;
      if (classId) {
        const data: Assignment[] | null = await getAssignmentByClassId(classId);
        setAssignments(data);
      }
    };
    getAssignments();
  }, []);

  return (
    <div className="mx-auto p-4">
   
      {assignments && assignments.length > 0 ? (
        <div>
          {assignments.map((assignment) => (
            <div
              key={assignment.classId}
              onClick={() =>
                navigate(`/ViewAssignment/${assignment.assignmentId}`)
              }
              className="bg-white p-6 rounded-md shadow-md mb-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer "
            >
              <h3 className="text-xl font-bold mb-2">{assignment.title}</h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No assignments available.</p>
      )}
    </div>
  );
};

export default ViewAssignments;
