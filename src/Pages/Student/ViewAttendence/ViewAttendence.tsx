import { useState } from "react";
import { useSelector } from "react-redux";
import { calculateAttendancePercentage } from "../../../utills/calculateAttendence";
import PieChartAttendence from "../../components/AttendenceChart/AttendenceChart";
import { Attendance } from "../../../types/type.attendence";

const ViewAttendance = () => {
  const studentAttendance = useSelector(
    (state: any) => state?.student?.student?.attendance
  );

  const { presentPercentage, absentPercentage } =
    calculateAttendancePercentage(studentAttendance);

  const [showChart, setShowChart] = useState(false);

  const handleToggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mt-4 w-full flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto "
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
      <h1 className="text-3xl font-semibold mb-4 ml-3">View Attendance</h1>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentAttendance?.map((entry: Attendance, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttendance;
