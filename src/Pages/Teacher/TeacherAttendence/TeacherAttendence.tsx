import { useState } from "react";
import { useSelector } from "react-redux";
import { Attendance } from "../../../types/type.attendence";
import PieChartAttendence from "../../components/AttendenceChart/AttendenceChart";

const calculateAttendancePercentage = (attendanceData: Attendance[]) => {
  const totalEntries = attendanceData?.length;

  const presentCount = attendanceData?.filter(
    (entry) => entry.status.toLowerCase() === "present"
  ).length;
  const absentCount = attendanceData?.filter(
    (entry) => entry.status.toLowerCase() === "absent"
  ).length;

  return {
    presentPercentage: (presentCount / totalEntries) * 100,
    absentPercentage: (absentCount / totalEntries) * 100,
  };
};

const TeacherAttendance = () => {
  const teacherAttendance: Attendance[] = useSelector(
    (state: any) => state?.teacher?.teacher.attendance
  );
  const [showChart, setShowChart] = useState(false);

  const { presentPercentage, absentPercentage } =
    calculateAttendancePercentage(teacherAttendance);

  const handleToggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className=" text-gray-800 text-4xl font-bold mb-4">My Attendance</h1>
      <div className="mt-4 w-full flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto"
          onClick={handleToggleChart}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>
      {showChart && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 ml-3">
            Attendance Overview
          </h2>
          <PieChartAttendence
            presentPercentage={presentPercentage}
            absentPercentage={absentPercentage}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherAttendance?.map((record: Attendance, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <p className="text-lg font-semibold">{record.date}</p>
            <p
              className={`text-${
                record.status === "present" ? "green" : "red"
              }-500`}
            >
              {record.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAttendance;
