import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useClass from "../../../CustomHooks/useClass";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClassAdd = () => {
  const { addClassinDb, deleteClassFromDb, getClassesFromDb } = useClass();
  const [className, setClassName] = useState("");
  const [classList, setClassList] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable
  const navigate = useNavigate();
  const handleAddClass = async () => {
    if (className.trim() !== "") {
      await addClassinDb(className);
      toast.success("Class Added");
      setShowSuccessMessage(true);
      setClassName("");
    }
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showSuccessMessage) {
      timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showSuccessMessage, setShowSuccessMessage]);

  const deleteClass = async (id: string) => {
    await deleteClassFromDb(id);
    toast.warn("Class Delete");
    setShowSuccessMessage(true);
  };

  useEffect(() => {
    const getClass = async () => {
      const classes = await getClassesFromDb();
      setClassList(classes);
      // console.log(classes);
    };
    getClass();
  }, [showSuccessMessage]);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-[90px] flex items-center justify-center">
        <div className="mx-auto bg-white w-full p-6">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">Add Class</h2>

          <div className="mb-4">
            <label htmlFor="className" className="text-gray-600 mb-2 block">
              Class Name:
            </label>
            <div className="flex">
              <input
                type="number"
                id="className"
                name="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="flex-1 border rounded-md p-2 mr-2"
              />
              <button
                onClick={handleAddClass}
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              >
                Add Class
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-purple-800">
              Class List
            </h3>
            <ul className="space-y-2">
              {classList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-purple-100 p-3 rounded-md"
                >
                  <span className="text-purple-800">
                    Class {item.className}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteClass(item.classId)}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/classDetail/${item.classId || ""}`)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Detail
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ClassAdd;
