import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface TeacherFieldProps {
  formValidation: {
    register: any;
    errors: any;
  };
}
function AuthField({ formValidation }: TeacherFieldProps) {
  const [toggle, setToggle] = useState(false);
  const { register, errors } = formValidation;
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Enter your email"
        autoComplete="email"
        autoFocus
        {...register("email")}
      />
      {errors.email && (
        <Typography variant="body2" color="error">
          {errors.email.message}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
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
      />{" "}
      {errors.password && (
        <Typography variant="body2" color="error">
          {errors.password.message}
        </Typography>
      )}{" "}
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <p>Forgot password?</p>
      </Grid>
    </>
  );
}

export default AuthField;
