import { useEffect } from "react";
import useAuth from "../../CustomHooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  const { logout, successMessage, error } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (successMessage) {
      toast.warn(successMessage);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Hello, [User Name]
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/adminHome")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-6 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          >
            Cancel
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Logout;
