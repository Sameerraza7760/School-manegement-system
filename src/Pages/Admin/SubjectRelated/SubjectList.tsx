import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../../components/Header/Header";

function SubjectList() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const location = useLocation();
  const ClassSubject = location.state.selectedClass;

  const handleCheckboxChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleSelectAll = () => {
    setSelectedSubject(null);
  };

  const handleNextClick = () => {
    if (selectedSubject) {
      const teacherDetail = {
        selectedSubject,
        ClassName: ClassSubject.className,
        classId: ClassSubject.id,
      };
      console.log(teacherDetail);
      navigate("/TeacherForm", { state: { teacherDetail } });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Select Subjects for Teacher
          </h2>
          <div className="mb-4">
            <label className="flex items-center text-gray-600 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!selectedSubject}
                onChange={handleSelectAll}
                className="mr-2 cursor-pointer"
              />
              <span className="text-sm">Select All</span>
            </label>
          </div>
          <div className="mb-4">
            <span className="ml-1 text-gray-800">
              Class {location.state.selectedClass.className}
            </span>
            {ClassSubject?.subjects?.map((subject: string, index: number) => (
              <div key={index} className="mb-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSubject === subject}
                    onChange={() => handleCheckboxChange(subject)}
                    className="mr-2 cursor-pointer"
                  />
                  <span className="text-gray-800">{subject}</span>
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-purple-800">
              Selected Subject
            </h3>
            {selectedSubject && (
              <div className="flex items-center">
                <span className="text-blue-800">
                  {selectedSubject} from{" "}
                  {location.state.selectedClass.className}
                </span>
              </div>
            )}
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none mt-4"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectList;
