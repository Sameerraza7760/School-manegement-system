import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function ClassList() {
    const navigate=useNavigate()
  // Hardcoded array of available classes
  const availableClasses = [
    { id: "class1", name: "Class 1A" },
    { id: "class2", name: "Class 1B" },
    { id: "class3", name: "Class 2A" },
    // Add more classes as needed
  ];

  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleCheckboxChange = (className) => {
    const updatedSelectedClasses = [...selectedClasses];
    const index = updatedSelectedClasses.indexOf(className);

    if (index === -1) {
      updatedSelectedClasses.push(className);
    } else {
      updatedSelectedClasses.splice(index, 1);
    }

    setSelectedClasses(updatedSelectedClasses);
  };

  const handleSelectAll = () => {
    const allClassNames = availableClasses.map((classItem) => classItem.name);
    setSelectedClasses(allClassNames);
  };

  return (
   <>
   <Header/>
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Select Classes for Teacher</h2>
        <div className="mb-4">
          <label className="text-gray-600 mb-2 block">
            <input
              type="checkbox"
              checked={selectedClasses.length === availableClasses.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-purple-800">Available Classes</h3>
          <ul className="space-y-2">
            {availableClasses.map((classItem) => (
              <li key={classItem.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(classItem.name)}
                  onChange={() => handleCheckboxChange(classItem.name)}
                  className="mr-2"
                />
                <span className="text-gray-800">{classItem.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-purple-800">Selected Classes</h3>
          <ul className="space-y-2">
            {selectedClasses.map((className) => (
              <li key={className} className="flex items-center">
                <span className="text-blue-800">{className}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
            onClick={() =>navigate('/SubjectList')}
          >
            Next
          </button>
        </div>
      </div>
    </div></>
  );
}

export default ClassList;