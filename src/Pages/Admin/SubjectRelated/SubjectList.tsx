import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../../components/Header/Header'
function SubjectList() {
  const navigate=useNavigate()
  // Hardcoded array of available subjects
  const availableSubjects = [
    { id: "subject1", name: "Mathematics" },
    { id: "subject2", name: "Science" },
    { id: "subject3", name: "History" },
    // Add more subjects as needed
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleCheckboxChange = (subjectName) => {
    const updatedSelectedSubjects = [...selectedSubjects];
    const index = updatedSelectedSubjects.indexOf(subjectName);

    if (index === -1) {
      updatedSelectedSubjects.push(subjectName);
    } else {
      updatedSelectedSubjects.splice(index, 1);
    }

    setSelectedSubjects(updatedSelectedSubjects);
  };

  const handleSelectAll = () => {
    const allSubjectNames = availableSubjects.map((subject) => subject.name);
    setSelectedSubjects(allSubjectNames);
  };

  return (
  <>
<Header/>
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Select Subjects for Teacher</h2>
        <div className="mb-4">
          <label className="text-gray-600 mb-2 block">
            <input
              type="checkbox"
              checked={selectedSubjects.length === availableSubjects.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-purple-800">Available Subjects</h3>
          <ul className="space-y-2">
            {availableSubjects.map((subjectItem) => (
              <li key={subjectItem.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subjectItem.name)}
                  onChange={() => handleCheckboxChange(subjectItem.name)}
                  className="mr-2"
                />
                <span className="text-gray-800">{subjectItem.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-purple-800">Selected Subjects</h3>
          <ul className="space-y-2">
            {selectedSubjects.map((subjectName) => (
              <li key={subjectName} className="flex items-center">
                <span className="text-blue-800">{subjectName}</span>
              </li>
            ))}
          </ul>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
            onClick={() =>navigate('/TeacherForm')}
          >
            Next
          </button>
        </div>
      </div>
    </div></>
  );
}

export default SubjectList;