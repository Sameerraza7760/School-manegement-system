import { AccountCircle, Group, School } from "@mui/icons-material";
import { Box, Container, Grid, Paper } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/userRelated/userHandle';
// import Popup from '../components/Popup';

const ChooseUser = () => {
  const navigate = useNavigate();
  return (
   <div>
     <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div>
              <StyledPaper
                elevation={3}
                onClick={() => {
                  console.log("Clicked on Admin");
                  navigate("/adminSignup");
                }}
              >
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>Admin</StyledTypography>
                Login as an administrator to access the dashboard to manage app
                data.
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
         <div>
         <StyledPaper
              elevation={3}
              onClick={() => { console.log("StudentClick");   navigate(`/Login/Student`)}}
            >
              <div>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>Student</StyledTypography>
                Login as a student to explore course materials and assignments.
              </div>
            </StyledPaper>
         </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
        <div>
        <StyledPaper elevation={3} onClick={() => { console.log('teacherClick');
            navigate(`/Login/Teacher`)}}>
              <div>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Teacher</StyledTypography>
                Login as a teacher to create courses, assignments, and track
                student progress.
              </div>
            </StyledPaper>
        </div>
          </Grid>
        </Grid>
      </Container>
    </StyledContainer>
   </div>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
