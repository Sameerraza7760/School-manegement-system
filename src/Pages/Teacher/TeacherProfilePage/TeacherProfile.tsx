// TeacherProfile.js

import { Button, Input, Modal } from "antd";
import { useState } from "react";

const TeacherProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const teacherInfo = {
    name: "Jane Smith",
    employeeId: "T789",
    subject: "Mathematics",
    dateOfBirth: "February 15, 1985",
    address: "456 Oak Street, Townsville",
    contactNumber: "+1 987-654-3210",
    email: "jane.smith@example.com",
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Teacher Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(teacherInfo).map(([label, value]) => (
          <div key={label} className="mb-4">
            <label className="text-gray-600 font-semibold">{label}:</label>
            <p className="text-gray-800">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          className="bg-blue-500 text-white  rounded hover:bg-blue-600 focus:outline-none"
          type="primary"
          onClick={showModal}
        >
          Edit Name
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input placeholder="Enter your New Name ..." />
          <Button className="mt-3">Save</Button>
        </Modal>
      </div>
    </div>
  );
};

export default TeacherProfile;
