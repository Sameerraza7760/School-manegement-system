
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
const AdminProfile = () => {
  const adminProfile=useSelector((state:any)=>state.admin.admin)
  console.log(adminProfile);
  

  return (
    <>
      <Header />
      <main className="col-span-9 bg-gray-100 mt-[40px] p-9 h-screen max-h-screen">
        <div className="max-w-3xl mx-auto text-center mb-8 mt-8">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-purple-500 cursor-pointer">
          <img
            src="admin-avatar.jpg"
            alt="Admin Avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-purple-800">{adminProfile.username}</h2>
        <p className="text-gray-600">{adminProfile.email}</p>
      </div>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
        <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-purple-800">
            Contact Information
          </h3>
          <p className="text-gray-600 mb-2">Phone: +123 456 7890</p>
          <p className="text-gray-600">{adminProfile.schoolName}</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-purple-800">
            Additional Details
          </h3>
          <p className="text-gray-600 mb-2">Role: {adminProfile.role}</p>
          <p className="text-gray-600">Joined: January 1, 2023</p>
        </div>
      </div>
      </main>
    </>
  );
};

export default AdminProfile;
