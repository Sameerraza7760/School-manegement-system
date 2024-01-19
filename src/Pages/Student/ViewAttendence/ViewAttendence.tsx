import React from "react";

const ViewAttendance = () => {
    const attendanceData = [
        { date: '2024-01-15', status: 'Present' },
        { date: '2024-01-16', status: 'Absent' },
        { date: '2024-01-17', status: 'Present' },
        // Add more attendance data as needed
    ];

    return (
        <div className="container mx-auto mt-8">
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
                        {attendanceData.map((entry, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {entry.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {entry.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAttendance;