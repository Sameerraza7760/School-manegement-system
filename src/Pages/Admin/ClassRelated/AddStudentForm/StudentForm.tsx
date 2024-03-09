import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStudent from "../../../../hooks/useStudent";
import { StudentDetail } from "../../../../types/types.student";
import Header from "../../../components/Header/Header";
import { useSelector } from "react-redux";

const AddStudentForm = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { classRoomid } = useParams();
  const [nameError, setNameError] = useState<boolean>();
  const [studentRollNoError, setRollNumberError] = useState<boolean>();
  const [classError, setClassError] = useState<boolean>(false);
  const schoolId: string = useSelector(
    (state: any) => state?.admin?.admin?.schoolid
  );

  const [loader, setLoader] = useState(false);
  const { addStudentDetail } = useStudent();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (name === "studentName") setNameError(false);
    if (name === "studentRollNo") setRollNumberError(false);
    if (name === "className") setClassError(false);
  };

  const handleEnrollStudent = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as any;
    const studentName = target.studentName.value;
    const studentRollNum = target.studentRollNo.value;
    const studentClass = target.className.value;

    if (!studentName || !studentRollNum || !studentClass) {
      if (!studentName) setNameError(true);
      if (!studentRollNum) setRollNumberError(true);
      if (!studentClass) setClassError(true);

      return;
    }
    setLoader(true);
    const StudentDetail: StudentDetail = {
      studentName,
      studentRollNum,
      studentClass,
      schoolId,
    };
    if (classRoomid) {
      try {
        await addStudentDetail(StudentDetail, classRoomid);
        formRef.current?.reset();
      } catch (error) {
        console.log(error);
      }
    }
    setLoader(false);
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleEnrollStudent}
        className="container w-full mx-auto mt-[100px] flex justify-center items-center"
        // ref={formRef}
        // noValidate
      >
        <div className="w-[90%] sm:w-[70%] mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">
            Enroll Student
          </h2>
          <div className="mb-6">
            <label
              htmlFor="studentName"
              className="text-gray-600 block text-sm mb-2"
            >
              Student Name:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                nameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="studentName"
              name="studentName"
              placeholder="Enter Student Name"
              autoComplete="off"
              onChange={handleInputChange}
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">
                Student Name is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="studentRollNo"
              className="text-gray-600 block text-sm mb-2"
            >
              Roll Number:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                studentRollNoError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="studentRollNo"
              name="studentRollNo"
              placeholder="Enter Roll Number"
              autoComplete="off"
              onChange={handleInputChange}
            />
            {studentRollNoError && (
              <p className="text-red-500 text-sm mt-1">
                Roll Number is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="studentClass"
              className="text-gray-600 block text-sm mb-2"
            >
              Class:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                classError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="className"
              name="className"
              placeholder="Enter Student Class"
              autoComplete="ClassName"
              onChange={handleInputChange}
            />
            {classError && (
              <p className="text-red-500 text-sm mt-1">Class is required</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none ${
              loader && "cursor-not-allowed"
            }`}
            disabled={loader}
          >
            {loader ? "Enrolling..." : "Enroll Student"}
          </button>
        </div>

        <ToastContainer />
      </form>
    </>
  );
};

export default AddStudentForm;
