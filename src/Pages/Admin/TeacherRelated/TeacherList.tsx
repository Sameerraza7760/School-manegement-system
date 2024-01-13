import React, { useState } from 'react';
import Header from '../../components/Header/Header';
const TeacherDetailsPage = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'John Smith',
      subjects: ['Mathematics', 'Physics'],
      contactNumber: '+1 123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Doe',
      subjects: ['English', 'History'],
      contactNumber: '+1 987-654-3210',
    },
    // Add more teacher data as needed
  ]);

  return (
  <>
  <Header/>
  
  <div className="container mx-auto mt-[120px]">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-800">Teacher Details</h2>
      {teachers.map((teacher) => (
        <div key={teacher.id} className="bg-white p-6 rounded-md shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">{teacher.name}</h2>
          <div className="mb-4">
            <span className="font-medium text-gray-600">Subjects:</span>
            <ul className="list-disc pl-5">
              {teacher.subjects.map((subject) => (
                <li key={subject} className="text-gray-700">{subject}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-600">Contact Number:</span>
            <p className="text-gray-700">{teacher.contactNumber}</p>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default TeacherDetailsPage;
