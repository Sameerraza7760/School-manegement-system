import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../../components/Header/Header";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

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
      <div className=" mt-[80px] mx-auto bg-gradient-to-br from-purple-200 to-white p-8 rounded-md shadow-lg w-[94%] sm:w-[94%] ">
        <h2 className="text-4xl font-bold mb-6 text-purple-800">
          Select Subjects for Teacher
        </h2>
        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={!selectedSubject}
              onChange={handleSelectAll}
              className="mr-2 appearance-none"
              style={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                border: "2px solid #D1D5DB",
                backgroundColor: "#F3F4F6",
              }}
            />
            {selectedSubject ? (
              <BiCheckboxChecked className="text-blue-800" />
            ) : (
              <BiCheckbox className="text-gray-500" />
            )}
            <span className="ml-2 text-lg">Select All Subjects</span>
          </label>
        </div>
        <div className="mb-4">
          <span className="ml-1 text-gray-800">
            Class {location.state.selectedClass.className}
          </span>
          {ClassSubject?.subjects?.map((subject, index) => (
            <div key={index} className="mb-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubject === subject}
                  onChange={() => handleCheckboxChange(subject)}
                  className="mr-2 appearance-none"
                  style={{
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    border: "2px solid #D1D5DB",
                    backgroundColor: "#F3F4F6",
                  }}
                />
                {selectedSubject === subject ? (
                  <BiCheckboxChecked className="text-blue-800" />
                ) : (
                  <BiCheckbox className="text-gray-500" />
                )}
                <span className="text-lg text-gray-800 ml-3">{subject}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button
            className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none transition-all duration-300"
            onClick={handleNextClick}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default SubjectList;
