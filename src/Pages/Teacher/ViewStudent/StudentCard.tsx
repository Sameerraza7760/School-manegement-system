import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { StudentDetail } from "../../../types/types.student";
import { calculateAttendancePercentage } from "../../../utills/calculateAttendence";
import PieChartAttendence from "../../components/AttendenceChart/AttendenceChart";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface StudentProps {
  student: StudentDetail;
}
const StudentCard = ({ student }: StudentProps) => {
  const navigate = useNavigate();
  const { studentid, studentName, studentRollNum, studentClass, attendance } =
    student;

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const { presentPercentage, absentPercentage } = attendance
    ? calculateAttendancePercentage(attendance)
    : { presentPercentage: 0, absentPercentage: 0 };

  return (
    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <img
          alt="student-avatar"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          src={"https://dummyimage.com/80x80"}
        />
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">
            {studentName}
          </h2>
          <p className="text-gray-500">Roll Number: {studentRollNum}</p>
          <p className="text-gray-500">Grade: {studentClass}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none transition duration-300 mt-2"
            onClick={toggleDrawer}
          >
            View Detail
          </button>
        </div>
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 400,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-blue-800">
              Student Information
            </h2>
            <p className="text-2xl font-semibold mb-2 text-gray-900">
              {studentName}
            </p>
            <div className="mb-3">
              <p className="text-gray-600">ID: {studentid?.slice(0, 7)}</p>
              <p className="text-gray-600">Grade: {studentClass}</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-blue-800">
              Attendance Summary
            </h2>
            <PieChartAttendence
              presentPercentage={presentPercentage}
              absentPercentage={absentPercentage}
            />
          </div>

          {/* Add the Chat button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/TecChatRoom/${studentid}`)}
          >
            Chat with Student
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default StudentCard;
