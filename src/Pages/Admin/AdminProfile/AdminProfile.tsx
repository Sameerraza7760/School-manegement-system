const AdminProfile = () => {
  return (
    <main className="col-span-9 bg-gray-100 p-8  h-screen max-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-purple-500 cursor-pointer">
          <img
            src="admin-avatar.jpg"
            alt="Admin Avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-purple-800">Admin Name</h2>
        <p className="text-gray-600">admin@example.com</p>
      </div>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-purple-800">
            Contact Information
          </h3>
          <p className="text-gray-600 mb-2">Phone: +123 456 7890</p>
          <p className="text-gray-600">Address: 123 School St, City</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md cursor-pointer">
          <h3 className="text-2xl font-bold mb-4 text-purple-800">
            Additional Details
          </h3>
          <p className="text-gray-600 mb-2">Role: School Administrator</p>
          <p className="text-gray-600">Joined: January 1, 2023</p>
        </div>
      </div>
    </main>
  );
};

export default AdminProfile;