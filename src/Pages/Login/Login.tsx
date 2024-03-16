import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema, studentLoginSchema } from "../../Schema/loginSchema";
import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";
import useTeacher from "../../hooks/useTeacher";
import { User } from "../../types/types.auth";
import AuthField from "../components/LoginFields/Authfield";
import Studentfield from "../components/LoginFields/Studentfield";
import GridImage from "../components/GridImage/GridImage";

function Login() {
  const { handleTeacherLogin } = useTeacher();
  const { handleStudentLogin, getAllStudentsInClassroom } = useStudent();

  const { Role } = useParams();
  const views: any = {
    Teacher: AuthField,
    Admin: AuthField,
    Student: Studentfield,
  };

  const CurrentFields = views[Role];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(
      Role === "Student" ? studentLoginSchema : loginSchema
    ),
  });

  const { getAllTeacher } = useTeacher();

  const { signin } = useAuth();

  const onSubmit = async (data: Record<string, any>) => {
    if (Role === "Student") {
      const { rollNumber, studentName } = data;
      handleStudentLogin(rollNumber, studentName);
      return;
    }
    if (Role === "Teacher") {
      handleTeacherLogin(data as User);
      return;
    } // for admin
    await signin(data as User, Role || "Admin");
  };

  useEffect(() => {
    getAllTeacher();
    getAllStudentsInClassroom();
  }, []);

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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ width: "100%", marginTop: 2 }}
            >
              {" "}
              {CurrentFields && (
                <CurrentFields formValidation={{ register, errors }} />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                style={{ backgroundColor: "purple" }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                fullWidth
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
        </Grid>{" "}
        <GridImage />
      </Grid>
      <ToastContainer />
    </>
  );
}

export default Login;
