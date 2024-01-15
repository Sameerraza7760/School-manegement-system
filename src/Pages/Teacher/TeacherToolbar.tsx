
import React from 'react';

const Topbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">Teacher Dashboard</div>

          <div className="flex items-center">
            {/* Add any additional elements you want in the top bar */}
            <div className="mr-4">
              <button className="focus:outline-none text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  {/* Add an appropriate icon for notifications */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 4l-8 4M4 4v8m0 0l8 4m-8-4l8-4m8 4v8m0 0l-8-4m8-4l-8 4"></path>
                </svg>
              </button>
            </div>

            <div className="relative">
              {/* Add an appropriate user avatar or name */}
              <button className="focus:outline-none text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  {/* Add an appropriate icon for user profile */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;