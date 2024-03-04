import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClassRoom } from "../../../types/types.class";
import Header from "../../components/Header/Header";

function ClassList() {
  const navigate = useNavigate();
  const classes = useSelector((state: any) => state?.class?.classes);
  // const { getClassesFromDb } = useClassRoom();

  const [selectedClass, setSelectedClass] = useState<ClassRoom | null>(null);

  const handleCheckboxChange = (classItem: ClassRoom) => {
    setSelectedClass(classItem);
  };

  const handleSelectAll = () => {
    setSelectedClass(null);
  };

  const handleNextClick = () => {
    if (selectedClass) {
      console.log(selectedClass);

      navigate("/SubjectList", { state: { selectedClass } });
    } else {
      console.error("Please select a class.");
    }
  };

  // useEffect(() => {
  //   getClassesFromDb();
  // }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[100px]">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Select Classes for Teacher
          </h2>
          <div className="mb-4">
            <label className="text-gray-600 mb-2 block">
              <input
                type="checkbox"
                checked={!selectedClass}
                onChange={handleSelectAll}
                className="mr-2"
              />
              Select All
            </label>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-purple-800">
              Available Classes
            </h3>
            <ul className="space-y-2">
              {classes.map((classItem: ClassRoom) => (
                <li key={classItem.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClass === classItem}
                    onChange={() => handleCheckboxChange(classItem)}
                    className="mr-2"
                  />
                  <span className="text-gray-800">
                    Class {classItem.className}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-purple-800">
              Selected Class
            </h3>
            {selectedClass && (
              <div className="flex items-center">
                <span className="text-blue-800">
                  Class {selectedClass.className}
                </span>
              </div>
            )}
          </div>
          <div className="mt-6">
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

export default ClassList;
