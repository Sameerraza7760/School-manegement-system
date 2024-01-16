import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassRoom } from "../../../types/types.class";
import Header from "./../../components/Header/Header";

function SubjectList() {
  const classes = useSelector((state: any) => state?.class?.classes);
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const location = useLocation();
  const selectedClass: number[] = location.state.selectedClasses;
console.log(selectedClass);

  const handleCheckboxChange = (subjectName: string, className: number) => {
    const updatedSelectedSubjects = [...selectedSubjects];
    const index = updatedSelectedSubjects.indexOf(subjectName);

    if (index === -1) {
      updatedSelectedSubjects.push(subjectName);
    } else {
      updatedSelectedSubjects.splice(index, 1);
    }

    setSelectedSubjects(updatedSelectedSubjects);
  };

  const filterClassSubject = classes.filter((item: ClassRoom) =>
    selectedClass.includes(item.className)
  );
  console.log("hi==>",filterClassSubject);
  
  const handleSelectAll = () => {
    const allSubjectNames = filterClassSubject
      .flatMap((classroom: ClassRoom) => classroom.subjects)
      .filter(Boolean);

    const isAllSelected = selectedSubjects.length === allSubjectNames.length;

    if (isAllSelected) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(allSubjectNames);
    }
  };
  const handleNextClick = () => {
    const selectedSubjectsInfo = selectedSubjects.map((subjectName) => {
      const classroom = classes.find((classroom: ClassRoom) =>
        classroom.subjects?.includes(subjectName)
      );

      return {
        classId: classroom?.id,
        className: classroom?.className,
        subject: subjectName,
      };
    });

    navigate("/TeacherForm", {
      state: { selectedSubjects: selectedSubjectsInfo },
    });
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
                checked={selectedSubjects.length === filterClassSubject.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              Select All
            </label>
          </div>
          <div className="mb-4">
            {filterClassSubject.map((classroom: ClassRoom) => (
              <div key={classroom.id} className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-purple-800">
                  Class
                  <span className="ml-1"> {classroom.className}</span>
                </h3>
                <ul className="space-y-2">
                  {classroom?.subjects?.map((subject: any, index) => (
                    <li key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onChange={() =>
                          handleCheckboxChange(subject, classroom.className)
                        }
                        className="mr-2"
                      />
                      <span className="text-gray-800">{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-purple-800">
              Selected Subjects
            </h3>
            <ul className="space-y-2">
              {selectedSubjects.map((subjectName, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-800">
                    {subjectName} from{" "}
                    {
                      filterClassSubject.find((classroom: ClassRoom) =>
                        classroom.subjects?.includes(subjectName)
                      )?.className
                    }
                  </span>
                </li>
              ))}
            </ul>
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
