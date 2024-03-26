import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminSchema } from "../../../Schema/adminSchema";
import useAuth from "../../../hooks/useAuth";
import { AdminCredentials } from "../../../types/types.auth";
import GridImage from "../../components/GridImage/GridImage";

function AdminRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminCredentials>({
    resolver: zodResolver(adminSchema),
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const role = "Admin";

  const onSubmit: SubmitHandler<AdminCredentials> = async (data) => {
    await signup({ ...data, role });
  };

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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ width: "100%", marginTop: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="adminName"
                label="Enter your name"
                autoComplete="name"
                autoFocus
                {...register("userName")}
              />
              {errors.userName && (
                <Typography variant="body2" color="error">
                  {errors.userName.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="schoolName"
                label="Enter Your School Name"
                autoComplete="off"
                {...register("schoolName")}
              />
              {errors.schoolName && (
                <Typography variant="body2" color="error">
                  {errors.schoolName.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && typeof errors.email === "string" && (
                <Typography color="error">{errors.email}</Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Enter Your Password"
                type={toggle ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                {...register("password")}
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
              {errors.password && (
                <Typography variant="body2" color="error">
                  {errors.password.message}
                </Typography>
              )}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )}
              </Button>
              <Grid container>
                <Grid>Already have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <p
                    style={{ color: "purple", cursor: "pointer" }}
                    onClick={() => navigate(`/login/${"Admin"}`)}
                  >
                    Log in
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <GridImage />
      </Grid>
      <ToastContainer />
    </div>
  );
}

export default AdminRegister;
