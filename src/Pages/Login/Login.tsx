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
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgpic from "../../assets/designlogin.jpg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { adminDetail } from "../../types/types.auth";
import { useSelector } from "react-redux";

function Login() {
  const { signin, successMessage, error } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const authData=useSelector((state)=>(state))
  console.log(authData);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as any;
    const email = target.email.value;
    const password = target.password.value;
    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }
    setLoader(true);
    const fields: adminDetail = { email, password };
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
              Admin Login
            </Typography>
            <Typography>Welcome back! Please enter your details</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              {/* {role === "Student" ? (
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
                                helperText={rollNumberError && 'Roll Number is required'}
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
                                helperText={studentNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : ( */}
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
              {/* )} */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
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
              {/* {role === "Admin" &&
                        <Grid container>
                            <Grid>
                                Don't have an account?
                            </Grid>
                            <Grid item sx={{ ml: 2 }}>
                                <StyledLink to="/Adminregister">
                                    Sign up
                                </StyledLink>
                            </Grid>
                        </Grid>
                    } */}
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
