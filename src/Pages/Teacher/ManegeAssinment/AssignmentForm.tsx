import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAssignment from "../../../hooks/useAssignment";
import { Assignment } from "../../../types/types.assignment";
import { TeacherInfo } from "../../../types/types.teacher";

const AssignmentForm: React.FC = () => {
  const { addAssignmentInClass } = useAssignment();
  const teacherDetail: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );

  const [loader, setLoader] = useState(false);
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: "",
    dueDate: "",
    classId: teacherDetail.classId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true)
    try {
      await addAssignmentInClass(assignment);
      toast.success("Add Assinment is your Class");
      setAssignment({
        title: "",
        description: "",
        dueDate: "",
        classId: teacherDetail.classId,
      });
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={assignment.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={assignment.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-600"
        >
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default AssignmentForm;
