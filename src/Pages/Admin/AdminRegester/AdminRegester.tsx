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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";
import bgpic from "./../../../assets/designlogin.jpg";
import { useNavigate } from "react-router-dom";

import { AdminCredentials, UserRole } from "./../../../types/types.auth";

function AdminRegester() {
  const { signup, successMessage, error } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [loader, setLoader] = useState(false);
  const role = "Admin";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as any;

    const username = target.adminName.value;
    const schoolName = target.schoolName.value;
    const email = target.email.value;
    const password = target.password.value;

    if (!username || !schoolName || !email || !password) {
      if (!username) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }
    setLoader(true);
    const fields: AdminCredentials = {
      username,
      email,
      password,
      schoolName,
      role: UserRole.Admin,
    };
    await signup(fields);
    setLoader(false);
    // dispatch(registerUser(fields, role))
    // console.log(adminData);
  };
  const handleInputChange = (event: any) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (error) {
      toast.warning(error);
    }
  }, [successMessage, error]);
  return (
    <div>
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
              Admin Register
            </Typography>
            <Typography>
              Create your own school by registering as an admin.
              <br />
              You will be able to add students and faculty and manage the
              system.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="adminName"
                label="Enter your name"
                name="adminName"
                autoComplete="name"
                autoFocus
                error={adminNameError}
                helperText={adminNameError && "Name is required"}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="schoolName"
                label="Create your school name"
                name="schoolName"
                autoComplete="off"
                error={schoolNameError}
                helperText={schoolNameError && "School name is required"}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                autoComplete="email"
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
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Button
                style={{ backgroundColor: "purple" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
              <Grid container>
                <Grid>Already have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <p
                    style={{ color: "purple", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </p>
                </Grid>
              </Grid>
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
      {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
    </div>
  );
}

export default AdminRegester;
