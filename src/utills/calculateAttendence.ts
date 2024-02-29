import { Attendance } from "../types/type.attendence";

export const calculateAttendancePercentage = (attendanceData: Attendance[] ) => {
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
