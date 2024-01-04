import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import bgpic from "./../../../assets/designlogin.jpg";
// import Popup from '../../components/Popup';
// import { LightPurpleButton } from '../../components/buttonStyles';

const defaultTheme = createTheme();

function AdminRegester() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="adminName"
                  label="Enter your name"
                  name="adminName"
                  autoComplete="name"
                  autoFocus
                  // error={adminNameError}
                  // helperText={adminNameError && 'Name is required'}
                  // onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="schoolName"
                  label="Create your school name"
                  name="schoolName"
                  autoComplete="off"
                  // error={schoolNameError}
                  // helperText={schoolNameError && 'School name is required'}
                  // onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter your email"
                  name="email"
                  autoComplete="email"
                  // error={emailError}
                  // helperText={emailError && 'Email is required'}
                  // onChange={handleInputChange}
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
                  // error={passwordError}
                  // helperText={passwordError && 'Password is required'}
                  // onChange={handleInputChange}
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
                  Regester
                </Button>
                <Grid container>
                  <Grid>Already have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <p style={{ color: "purple" }}>Log in</p>
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
        {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
      </ThemeProvider>
    </div>
  );
}

export default AdminRegester;