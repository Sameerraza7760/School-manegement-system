
import { useNavigate } from "react-router-dom";

const TClassDetail = () => {
  const navigate=useNavigate()
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Class Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  ml-3">
        {/* Card 1: Class Information */}
        <div className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">
            Class Information
          </h3>
          <p className="text-gray-700">
            View and manage detailed information about the class. Monitor
            attendance, schedule, and more.
          </p>
        </div>

        {/* Card 2: Assignments */}
        <div onClick={()=>navigate('/TmanegeAssignment')} className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">
            Assignments
          </h3>
          <p className="text-gray-700">
            Access and manage assignments for the class. Create, grade, and
            provide feedback on assignments.
          </p>
        </div>

        {/* Card 3: Class Materials */}
        <div className="bg-white p-8 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">
            Class Materials
          </h3>
          <p className="text-gray-700">
            Upload and organize class materials. Share resources, documents, and
            study materials with students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TClassDetail;
