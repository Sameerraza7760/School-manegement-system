import { Button, Input, Modal } from "antd";
import { useState } from "react";

const StudentProfile = () => {
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

  const studentInfo = {
    name: "John Doe",
    rollNumber: "ST12345",
    grade: "10",
    section: "A",
    dob: "January 1, 2000",
    address: "123 Main Street, Cityville",
    contactNumber: "+1 123-456-7890",
    email: "john.doe@example.com",
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl">
      <h2 className="text-4xl font-bold mb-6 text-indigo-800">Student Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(studentInfo).map(([label, value]) => (
          <div key={label} className="mb-4">
            <label className="text-indigo-600 font-semibold">{label}:</label>
            <p className="text-gray-800">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          className="bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none"
          type="primary"
          onClick={showModal}
        >
          Edit Name
        </Button>
        <Modal
          title="Edit Name"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleOk}>
              Save
            </Button>,
          ]}
        >
          <Input placeholder="Enter your New Name ..." />
        </Modal>
      </div>
    </div>
  );
};

export default StudentProfile;