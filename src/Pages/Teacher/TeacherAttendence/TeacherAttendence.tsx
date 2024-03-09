import { useState } from "react";
import { useSelector } from "react-redux";
import { Attendance } from "../../../types/type.attendence";
import PieChartAttendence from "../../components/AttendenceChart/AttendenceChart";
import { calculateAttendancePercentage } from "../../../utills/calculateAttendence";

const TeacherAttendance = () => {
  const [showChart, setShowChart] = useState(false);
  const attendenceRecorded: Attendance[] = useSelector(
    (state: any) => state?.teacher?.teacher.attendance
  );

  const { presentPercentage, absentPercentage } =
    calculateAttendancePercentage(attendenceRecorded);

  const handleToggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className=" text-gray-800 text-4xl font-bold mb-4 text-center">
        My Attendance
      </h1>
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
          <h2 className="text-xl text-gray-800 font-serif font-semibold mb-4 ml-3">
            Attendance Overview
          </h2>
          <PieChartAttendence
            presentPercentage={presentPercentage}
            absentPercentage={absentPercentage}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendenceRecorded?.map((record: Attendance, index: number) => (
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
