import { Modal as AntModal, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAssignment from "../../../hooks/useAssignment";
import {
  Assignment,
  completeAssignment,
} from "../../../types/types.assignment";
import { StudentDetail } from "../../../types/types.student";
import { uploadImage } from "../../../utills/uploadImage";
const { TextArea } = Input;

const StudentViewAssignment: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignment] = useState<
    string | undefined
  >();
  const [file, setFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [completedAssignments, setCompletedAssignments] = useState<
    Record<string, boolean>
  >({});
  const {
    getAssignmentByClassId,
    submitAssignment,
    checkIfAssignmentCompletedForStudent,
  } = useAssignment();
  const studentDetail: StudentDetail = useSelector(
    (state: any) => state.student.student
  );
  const { studentid } = studentDetail;
  const fetchAssignmentCompletionStatus = async (
    assignmentId: string | undefined
  ) => {
    try {
      const isAssignmentCompleted = await checkIfAssignmentCompletedForStudent(
        assignmentId,
        studentDetail.studentid
      );
      return isAssignmentCompleted;
    } catch (error: any) {
      console.error("Error checking quiz completion status:", error.message);
      return false;
    }
  };
  const fetchCompletionStatus = async () => {
    const statusMap: Record<string, boolean> = {};
    if (assignments.length > 0) {
      await Promise.all(
        assignments.map(async (assignment) => {
          if (assignment.assignmentId) {
            const isCompleted = await fetchAssignmentCompletionStatus(
              assignment.assignmentId
            );
            statusMap[assignment.assignmentId] = isCompleted;
          }
        })
      );
    }
    setCompletedAssignments(statusMap);
  };

  useEffect(() => {
    const getAssignment = async () => {
      const classId = studentDetail?.studentid?.slice(0, 20);

      const assignment: Assignment[] | null = await getAssignmentByClassId(
        classId as string
      );
      if (assignment) {
        setAssignments(assignment);
      }
    };
    getAssignment();
  }, [studentDetail]);
  useEffect(() => {
    fetchCompletionStatus();
  }, [assignments]);

  const handleAssignmentSubmit = (assignmentId: string | undefined) => {
    setSelectedAssignment(assignmentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment("");
    setFile(null);
    setSubmissionText("");
  };

  const confirmSubmit = async () => {
    const url = await uploadImage(file);
    if (selectedAssignmentId) {
      const completeAssignment: completeAssignment = {
        studentName: studentDetail.studentName,
        studentRollNum: studentDetail.studentRollNum,
        studentClass: studentDetail.studentClass,
        studentAssinment: url,
        studentId: studentid,
        submissionText: submissionText,
        assignmentId: selectedAssignmentId,
      };
      try {
        await submitAssignment(completeAssignment);
        toast.success("Assignment Submit");
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        Assignments
      </h2>
      {assignments?.length === 0 ? (
        <p className="text-center text-gray-600">No assignments available.</p>
      ) : (
        <div>
          {assignments?.map((assignment) => (
            <div
              key={assignment.classId}
              className="bg-white p-6 rounded-md shadow-md mb-8 transition duration-300 ease-in-out transform hover:scale-100 cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2 text-indigo-800">
                {assignment.title}
              </h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
              <div className="mt-4">
                <label className="block text-gray-600 font-semibold">
                  Submission Status:
                </label>
                {completedAssignments[assignment.assignmentId || ""] ? (
                  <span className="text-red-500">Completed: Assignment</span>
                ) : (
                  <button
                    onClick={() =>
                      handleAssignmentSubmit(assignment?.assignmentId)
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Submit Assignment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
      <AntModal
        title="Submit Assignment"
        open={isModalOpen}
        onOk={confirmSubmit}
        onCancel={closeModal}
        okButtonProps={{ style: { backgroundColor: "darkblue" } }}
      >
        <Input type="file" onChange={handleFileChange}></Input>
        <TextArea
          placeholder="Type your submission here..."
          rows={4}
          onChange={(e) => setSubmissionText(e.target.value)}
          value={submissionText}
          className="mt-5"
        />
      </AntModal>
    </div>
  );
};

export default StudentViewAssignment;
