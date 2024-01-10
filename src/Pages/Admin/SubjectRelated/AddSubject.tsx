import { useState } from "react";
import { useParams } from "react-router-dom";
import useSubject from "../../../hooks/useSubject";
import Header from "./../../components/Header/Header";

function AddSubject() {
  const { classRoomid } = useParams();

  const { addSubjectinClass } = useSubject();
  const [subjectName, setSubjectName] = useState("");

  const handleAddSubject = async () => {
    if (!subjectName.trim()) {
      alert("Please enter a subject name");
      return;
    }

    if (classRoomid) {
      await addSubjectinClass(classRoomid, subjectName);
      setSubjectName("");
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-[100px] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Add Subject</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="subjectName" className="text-gray-600 block">
              Subject Name:
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAddSubject}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Add Subject
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSubject;
