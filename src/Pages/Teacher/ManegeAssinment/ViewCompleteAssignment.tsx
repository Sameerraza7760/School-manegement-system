import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAssignment from "../../../hooks/useAssignment";
import { useParams } from "react-router-dom";
import { completeAssignment } from "../../../types/types.assignment";

const ViewCompletedAssignments: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCompleteAssignments } = useAssignment();
  const [completeAssignment, setCompleteAssignment] = useState<
    completeAssignment[]
  >([]);

  useEffect(() => {
    const getAssignemnt = async () => {
      if (id) {
        const getCompleteAssignment = await getCompleteAssignments(id);
        if (getCompleteAssignment) {
          setCompleteAssignment(getCompleteAssignment);
        }
      }
    };
    getAssignemnt();
  }, []);

  const renderCompleteAssignment = () => {
    if (completeAssignment.length === 0) {
      return (
        <p className="text-center text-gray-600">
          No completed assignments available.
        </p>
      );
    }
    return completeAssignment.map((assignment) => (
      <div
        key={assignment.assignmentId}
        className="bg-white p-6 rounded-md shadow-md mb-8 transition duration-300 ease-in-out transform hover:scale-100 cursor-pointer"
      >
        <h3 className="text-xl font-bold mb-2 text-blue-600">
          {assignment.submissionText}
        </h3>
        <p className="text-gray-600 mb-2">{assignment.submissionText}</p>
        <p className="text-gray-600">Due Date: {assignment.assignmentId}</p>
        <div className="mt-4">
          <label className="block text-gray-600 font-semibold">
            Student's Name:
          </label>
          <p className="text-blue-600">{assignment.studentName}</p>
          <label className="block text-gray-600 font-semibold">
            Student's Roll Number:
          </label>
          <p className="text-blue-600">{assignment.studentRollNum}</p>
          <label className="block text-gray-600 font-semibold">
            Student's Submission:
          </label>
          <p className="whitespace-pre-line">{assignment.submissionText}</p>
        </div>
      </div>
    ));
  };
  return (
    <div className="mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Completed Assignments
      </h2>
      <div>{renderCompleteAssignment()}</div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ViewCompletedAssignments;
