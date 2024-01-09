import React, { useState } from 'react';
import Header from './../../components/Header/Header'
const TeacherForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    classes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClassSelect = (className) => {
    const updatedClasses = [...formData.classes];
    const index = updatedClasses.indexOf(className);

    if (index === -1) {
      updatedClasses.push(className);
    } else {
      updatedClasses.splice(index, 1);
    }

    setFormData((prevData) => ({
      ...prevData,
      classes: updatedClasses,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Form Submitted:', formData);
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Teacher Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="text-gray-600 mb-2 block">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="text-gray-600 mb-2 block">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-600 mb-2 block">Select Classes:</label>
            <div className="flex flex-wrap gap-2">
              {/* Replace 'availableClasses' with your actual list of classes */}
              {availableClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  type="button"
                  onClick={() => handleClassSelect(classItem.name)}
                  className={`${
                    formData.classes.includes(classItem.name) ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-800'
                  } py-2 px-4 rounded-md focus:outline-none`}
                >
                  {classItem.name}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div></>
  );
};

export default TeacherForm;

// Replace 'availableClasses' with your actual list of classes
const availableClasses = [
  { id: 'class1', name: 'Class 1A' },
  { id: 'class2', name: 'Class 1B' },
  { id: 'class3', name: 'Class 2A' },
  // Add more classes as needed
];