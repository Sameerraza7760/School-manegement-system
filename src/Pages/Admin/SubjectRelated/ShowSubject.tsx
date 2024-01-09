import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import { ClassRoom } from "../../../types/types.class";
import Header from "./../../components/Header/Header";

function ShowSubject() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [subject, setSubject] = useState<ClassRoom | null>();
  const { getClassDetailById } = useClassRoom();
  const { classRoomid } = useParams();

  const handleAddSubject = () => {
    // Add logic to handle adding a new subject to the list
    // For now, let's just close the modal
    setModalOpen(false);
  };

  useEffect(() => {
    const getClassDetail = async () => {
      if (classRoomid) {
        const getClassDetail: ClassRoom | null = await getClassDetailById(
          classRoomid
        );
        setSubject(getClassDetail);
      }
    };
    getClassDetail();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[90px] p-8 bg-white rounded-lg shadow-md max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Subjects</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
        >
          Add Subject
        </button>

        {/* Subject List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subject?.subjects?.map((item) => (
            <li
              key={subject.id}
              className="p-4 bg-gray-100 rounded-md shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item}
              </h3>
              {/* Add additional information or actions related to each subject if needed */}
            </li>
          ))}
        </ul>

        {/* Add Subject Modal */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Add Subject
              </h2>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter subject name"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddSubject}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Add
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowSubject;
