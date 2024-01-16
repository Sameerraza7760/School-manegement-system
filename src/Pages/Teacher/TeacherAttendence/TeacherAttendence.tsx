
import { useState } from 'react';

const TeacherAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([
    { date: '2024-01-14', present: true },
    { date: '2024-01-15', present: false },
    // Add more attendance records as needed
  ]);

  return (
    <div className="container mx-auto mt-8 ml-3">
      <h1 className="text-4xl font-bold mb-4">My Attendance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendanceData.map((record, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <p className="text-lg font-semibold">{record.date}</p>
            <p className={`text-${record.present ? 'green' : 'red'}-500`}>
              {record.present ? 'Present' : 'Absent'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAttendance;