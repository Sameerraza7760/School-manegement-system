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

  const filteredStudents = enrolledStudents?.filter((student) =>
    student?.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Header />
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Student Information</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">ID</th>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Image</th>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Roll Number</th>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Grade</th>
            <th className="py-3 px-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.studentRollNum}
              className="hover:bg-indigo-100 cursor-pointer"
            >
              <td className="py-3 px-4">{student.studentid?.slice(25, 30)}</td>
              <td className="py-3 px-4">
                <img
                  // src={student.image}
                  alt={student.studentName}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="py-3 px-4">{student.studentName}</td>
              <td className="py-3 px-4">{student.studentRollNum}</td>
              <td className="py-3 px-4">{student.studentClass}</td>
              <td className="py-3 px-4">{student.studentid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
      <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
      <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
    </div>
  </div>
</section>
  </>
  );
};

export default AdminStudentPage;
