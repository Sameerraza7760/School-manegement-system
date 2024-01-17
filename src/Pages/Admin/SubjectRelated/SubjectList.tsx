import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassRoom } from "../../../types/types.class";
import Header from "./../../components/Header/Header";

function SubjectList() {
  const classes = useSelector((state: any) => state?.class?.classes);
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const location = useLocation();
  const ClassSubject = location.state.selectedClass;

  const handleCheckboxChange = (subject: string, className: string) => {
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
      <div className="container mx-auto mt-[100px]">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Select Subjects for Teacher
          </h2>
          <div className="mb-4">
            <label className="text-gray-600 mb-2 block">
              <input
                type="checkbox"
                checked={!selectedSubject}
                onChange={handleSelectAll}
                className="mr-2"
              />
              Select All
            </label>
          </div>
          <div className="mb-4">
            <span className="ml-1">
              Class {location.state.selectedClass.className}
            </span>
            {ClassSubject.subjects.map((subject: string, index: number) => (
              <div key={index} className="mb-6">
                <ul className="space-y-2">
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubject === subject}
                      onChange={() =>
                        handleCheckboxChange(
                          subject,
                          location.state.selectedClass.className
                        )
                      }
                      className="mr-2"
                    />
                    <span className="text-gray-800">{subject}</span>
                  </li>
                </ul>
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
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
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
