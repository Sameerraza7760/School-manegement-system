// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setStudent } from "../../Config/store/slice/CurrentStudentSlice";
import bgpic from "../../assets/designlogin.jpg";
import useAuth from "../../hooks/useAuth";
import { AdminCredentials } from "../../types/types.auth";
import { StudentDetail } from "../../types/types.student";
import { TeacherInfo } from "../../types/types.teacher";
import { setTeacher } from "../../Config/store/slice/CurrentTeacherSlice";

function Login() {
  const dispatch = useDispatch();
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );

  const enrolledTeachers: TeacherInfo[] = useSelector(
    (state: any) => state.teachers.enrolledTeachers
  );
  console.log(enrolledStudents);

  const { Role } = useParams();

  const { signin, successMessage, error } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Role === "Student") {
      const rollNum = event.currentTarget.rollNumber.value;
      const studentName = event.currentTarget.studentName.value;

      if (!rollNum || !studentName) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);

        return;
      }

      const findStudent = enrolledStudents.find(
        (std) =>
          std.studentName === studentName && std.studentRollNum === rollNum
      );
      if (!findStudent) {
        toast.warn("Wrong Name or Rollnumber");
        return;
      }
      console.log(findStudent);
      dispatch(setStudent(findStudent));
      toast.success("Login");
      setTimeout(() => {
        navigate("/StudentDashboard");
      }, 2000);
    }

    if (Role === "Teacher") {
      const target = event.target as any;
      const email = target.email.value;
      const password = target.password.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      setLoader(true);

      const cheakTeacher = enrolledTeachers.find(
        (item) => item.email === email && item.password === password
      );
      if (cheakTeacher) {
        toast.success("Teacher Signin");
        setTimeout(() => {
          dispatch(setTeacher(cheakTeacher));
          navigate("/TeacherDashboard");
        }, 2000);
        setLoader(false);
        return;
      }

      toast.warn("Wrong Email or Password");
      setLoader(false);
      return;
    }

    const target = event.target as any;
    const email = target.email.value;
    const password = target.password.value;
    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }
    setLoader(true);

    const fields: AdminCredentials = { email, password };
    console.log(fields);
    await signin(fields);
    setLoader(false);
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

      setTimeout(() => {
        navigate("/adminHome");
      }, 2000);
      return;
    }
    if (error) {
      toast.warning(error);
    }
  }, [successMessage, error]);

  const handleInputChange = (event: any) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {Role} Login
            </Typography>
            <Typography>Welcome back! Please enter your details</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              {Role === "Student" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rollNumber"
                    label="Enter your Roll Number"
                    name="rollNumber"
                    autoComplete="off"
                    type="number"
                    autoFocus
                    error={rollNumberError}
                    helperText={rollNumberError && "Roll Number is required"}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentName"
                    label="Enter your name"
                    name="studentName"
                    autoComplete="name"
                    autoFocus
                    error={studentNameError}
                    helperText={studentNameError && "Name is required"}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={toggle ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setToggle(!toggle)}>
                            {toggle ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <p>Forgot password?</p>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                style={{ backgroundColor: "purple" }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                fullWidth
                // onClick={guestModeHandler}
                variant="outlined"
                sx={{
                  mt: 2,
                  mb: 3,
                  color: "#7f56da",
                  borderColor: "#7f56da",
                }}
              >
                Login as Guest
              </Button>
              {Role === "Admin" && (
                <Grid container>
                  <Grid>Don't have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Link to="/adminSignup">Sign up</Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <ToastContainer />
    </>
  );
}

export default Login;
