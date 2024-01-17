import { useNavigate } from "react-router-dom";
const TeacherHome = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-8 ml-2">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to Teacher Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Overview */}
        <div
          onClick={() => navigate("TAttendence")}
          className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Overview</h3>
          <p className="text-gray-700">
            Check overall performance, attendance, and more.
          </p>
        </div>

        {/* Card 2: Class Schedule */}
        <div className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Class Schedule
          </h3>
          <p className="text-gray-700">View and manage class schedules.</p>
        </div>

        {/* Card 3: Students */}
        <div
          className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
          onClick={() => navigate("TViewStudent")}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Students</h3>
          <p className="text-gray-700">Access and manage student profiles.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;