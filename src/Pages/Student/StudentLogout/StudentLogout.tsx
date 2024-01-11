import React from 'react';
// import { useHistory } from 'react-router-dom';

const StudentLogout = () => {
//   const history = useHistory();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing authentication tokens, etc.
    
    // Redirect to the login page after logout
    // history.push('/login');
  };

  return (
    <div className="flex items-center justify-center mt-9">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Logout</h1>
        <p className="text-gray-600 mb-8">Are you sure you want to logout?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Logout
          </button>
          <button
            // onClick={() => history.push('/dashboard')} // Redirect to dashboard on cancel
            className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-100 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogout;