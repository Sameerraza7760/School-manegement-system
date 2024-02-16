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
  const schoolId:string = useSelector((state:any) => state?.admin?.admin?.schoolid);
  
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
      schoolId
    };
    if (classRoomid) {
      try {
        await addStudentDetail(StudentDetail, classRoomid);
        formRef.current?.reset();
        toast.success("Student Add");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
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
        // onSubmit={handleEnrollStudent}
        className="container mx-auto pt-9 mt-10"
        onSubmit={handleEnrollStudent}
        ref={formRef}
        noValidate
      >
        <div className="w-[90%] mx-auto bg-white p-8 rounded-md shadow-md">
          <Typography variant="h4" color="primary" gutterBottom>
            Enroll Student
          </Typography>
          <div className="mb-4">
            <label htmlFor="studentName" className="text-gray-600 mb-2 block">
              Student Name:
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="schoolName"
              label="Enter Student Name"
              name="studentName"
              autoComplete="off"
              error={nameError}
              helperText={nameError && "Student Name is required"}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="studentRollNo" className="text-gray-600 mb-2 block">
              Roll Number:
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="rollNumber"
              label="Enter Roll Number"
              name="studentRollNo"
              autoComplete="off"
              error={studentRollNoError}
              helperText={studentRollNoError && "Roll Number is required"}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="studentClass" className="text-gray-600 mb-2 block">
              Class:
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="className"
              label="Enter Student Class"
              name="className"
              autoComplete="ClassName"
              error={classError}
              helperText={classError && "Class is required"}
              onChange={handleInputChange}
            />
          </div>

          <Button
            // onClick={handleEnrollStudent}
            style={{ backgroundColor: "purple" }}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Enroll Student"
            )}
          </Button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default AddStudentForm;
