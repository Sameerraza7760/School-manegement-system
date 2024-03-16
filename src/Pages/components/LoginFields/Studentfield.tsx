import { TextField, Typography } from "@mui/material";
interface StudentFieldProps {
  formValidation: {
    register: any;
    errors: any;
  };
}
function StudentField({ formValidation }: StudentFieldProps) {
  const { register, errors } = formValidation;

  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="rollNumber"
        label="Enter your Roll Number"
        autoComplete="off"
        autoFocus
        {...register("rollNumber")}
      />
      {errors.rollNumber && (
        <Typography variant="body2" color="error">
          {errors.rollNumber.message}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="studentName"
        label="Enter your name"
        autoComplete="name"
        autoFocus
        {...register("studentName")}
      />
      {errors.studentName && (
        <Typography variant="body2" color="error">
          {errors.studentName.message}
        </Typography>
      )}
    </>
  );
}

export default StudentField;
