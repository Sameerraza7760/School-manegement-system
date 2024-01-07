import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

const AddStudentForm = () => {
  const [nameError, setNameError] = useState<boolean>();
  const [studentRollNoError, setRollNumberError] = useState<boolean>();
  const [classError, setClassError] = useState<boolean>(false);
  const [subjectError, setSubjectError] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "studentName") setNameError(false);
    if (name === "studentRollNo") setRollNumberError(false);
    if (name === "className") setClassError(false);
    if (name === "subject") setSubjectError(false);
  };
  
  const handleEnrollStudent = (event: React.FormEvent) => {
    event.preventDefault();
  
    const target = event.target as any;
    const studentName = target.studentName.value;
    const studentRollNum = target.studentRollNo.value;
    const studentClass = target.className.value;
    const studentSubject = target.subject.value;
  
    // ... rest of your logic
    
    if (!studentName || !studentRollNum || !studentClass || !studentSubject) {
      if (!studentName) setNameError(true);
      if (!studentRollNum) setRollNumberError(true);
      if (!studentClass) setClassError(true);
      if (!studentSubject) setSubjectError(true);
      return;
    }


    const StudentDetail={
      
    }
    setLoader(true);
   
  };
  return (
    <>
      <Header />
      <form
        // onSubmit={handleEnrollStudent}
        className="container mx-auto pt-9 mt-10"
        onSubmit={handleEnrollStudent}
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
          <div className="mb-4">
            <label
              htmlFor="studentSubjects"
              className="text-gray-600 mb-2 block"
            >
              Subjects:
            </label>
            <div className="flex items-center space-x-2">
              <TextField
                margin="normal"
                required
                fullWidth
                id="subject"
                label="Enter a Subject"
                name="subject"
                autoComplete="off"
                error={subjectError}
                helperText={subjectError && "Subject is required"}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
              >
                Add
              </Button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {/* Display added subjects */}
            </ul>
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
      </form>
    </>
  );
};

export default AddStudentForm;
