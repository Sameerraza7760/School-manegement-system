import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClassRoom } from "../../../types/types.class";
import Header from "../../components/Header/Header";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
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
      <div className="mt-[100px] mx-auto bg-gradient-to-br from-purple-200 to-white p-8 rounded-md shadow-lg w-[90%] sm:w-[94%]">
        <h2 className="text-4xl font-bold mb-6 text-purple-800">
          Choose Classes for Teaching
        </h2>
        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={!selectedClass}
              onChange={handleSelectAll}
              className="mr-2 appearance-none"
              style={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                border: "2px solid #D1D5DB",
                backgroundColor: "#F3F4 F6",
              }}
            />
            {selectedClass ? (
              <BiCheckboxChecked className="text-purple-800" />
            ) : (
              <BiCheckbox className="text-gray-500" />
            )}
            <span className="ml-2 text-lg">Select All Classes</span>
          </label>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-purple-800">
            Available Classes
          </h3>
          <ul className="space-y-4">
            {classes.map((classItem: ClassRoom) => (
              <li
                key={classItem.id}
                className="flex items-center bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedClass === classItem}
                  onChange={() => handleCheckboxChange(classItem)}
                  className="mr-3 appearance-none"
                  style={{
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    border: "2px solid #D1D5DB",
                    backgroundColor: "#F3F4F6",
                  }}
                />
                {selectedClass === classItem ? (
                  <BiCheckboxChecked className="text-purple-800" />
                ) : (
                  <BiCheckbox className="text-gray-500" />
                )}
                <span className="text-lg text-gray-800 ml-3">
                  Class {classItem.className}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-purple-800">
            Selected Class
          </h3>
          {selectedClass && (
            <div className="flex items-center bg-purple-100 p-4 rounded-md shadow-md">
              <span className="text-lg text-blue-800">
                Class {selectedClass.className}
              </span>
            </div>
          )}
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

export default ClassList;
