import { FaCalendar, FaList, FaUser } from "react-icons/fa"; // Import Font Awesome icons
import { useSelector } from "react-redux";
import { StudentDetail } from "../../../types/types.student";

const StudentHomePage = () => {
  const studentDetail: StudentDetail = useSelector(
    (state: any) => state.student.student
  );
  console.log(studentDetail);

  return (
    <div className="container mx-auto mt-8 ml-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaUser className="mr-2" /> Student Information
          </h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-gray-600">Name:</span>{" "}
            {studentDetail.studentName}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-gray-600">Roll Number:</span>{" "}
            {studentDetail.studentRollNum}
            123456
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Class:</span>{" "}
            {studentDetail.studentClass}
          </p>
        </div>

        {/* Upcoming Events or Announcements */}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaCalendar className="mr-2" /> Upcoming Events
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Event 1 on Date</li>
            <li>Event 2 on Date</li>
            <li>Event 3 on Date</li>
          </ul>
        </div>

        {/* Quick Links or Actions */}
        <div className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-4 text-blue-600 flex items-center">
            <FaList className="mr-2" /> Quick Links
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <a
                href="/Student/subjects"
                className="text-indigo-600 hover:underline"
              >
                View Subjects
              </a>
            </li>
            <li>
              <a
                href="/Student/attendance"
                className="text-indigo-600 hover:underline"
              >
                View Attendance
              </a>
            </li>
            <li>
              <a
                href="/Student/complain"
                className="text-indigo-600 hover:underline"
              >
                Submit a Complaint
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
