// StudentSubjects.js
import React from 'react';

const subjectsList = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Computer Science',
    // Add more subjects as needed
];

const StudentSubjects = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Your Subjects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subjectsList.map((subject, index) => (
                <div
                key={index}
                className="bg-white p-6 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:bg-gray-100 transform hover:scale-105"
              >
                <h2 className="text-lg font-semibold mb-4">{subject}</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod
                  suscipit imperdiet.
                </p>
              </div>
                ))}
            </div>
        </div>
    );
};

export default StudentSubjects;