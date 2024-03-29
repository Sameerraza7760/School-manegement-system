// import { Link } from "react-router-dom";
import { Box, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import students from "./../../assets/students.svg";
// import { LightPurpleButton } from '../components/buttonStyles';
function Home() {
  const navigate=useNavigate()
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={students} alt="students" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <StyledTitle>
              Welcome to
              <br />
              School Management
              <br />
              System
            </StyledTitle>
            <StyledText>
              Streamline school management, class organization, and add students
              and faculty. Seamlessly track attendance, assess performance, and
              provide feedback. Access records, view marks, and communicate
              effortlessly.
            </StyledText>
            <StyledBox>
              <Button variant="contained" onClick={()=>navigate('/chooseUser')} fullWidth>
                Login
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 3,
                  color: "#7f56da",
                  borderColor: "#7f56da",
                }}
              >
                Login as Guest
              </Button>

              <StyledText>
                Don't have an account?{" "}
                <p style={{ color: "#550080" }}>Sign up</p>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

// const StyledLink = styled()`
//   text-decoration: none;
// `;
