import { useState } from "react";
import { useSelector } from "react-redux";
import { StudentDetail } from "../../../../types/types.student";
import Header from "../../../components/Header/Header";

const AdminStudentPage = () => {
  const enrolledStudents: StudentDetail[] = useSelector(
    (state: any) => state.students.enrolledStudents
  );
  console.log(enrolledStudents);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = enrolledStudents.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[120px]">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-800">
          Student Information
        </h2>
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            onClick={() => {
              // Replace '#' with the actual link or function for adding students
              // e.g., history.push('/add-student') or openAddStudentModal()
              console.log("Add Student button clicked");
            }}
          >
            Add Student
          </button> 
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md overflow-hidden shadow-md">
            <thead className="bg-indigo-800 text-white">
              <tr>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  ID
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  Image
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  Name
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  Roll Number
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  Grade
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                  Address
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.studentRollNum}
                  className="hover:bg-indigo-100 cursor-pointer"
                >
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    {student.studentid?.slice(25,30)}
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    <img
                      // src={student.image}
                      alt={student.studentName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    {student.studentName}
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    {student.studentRollNum}
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    {student.studentClass}
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
                    {student.studentid}
                  </td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminStudentPage;
