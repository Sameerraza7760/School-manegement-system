import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TeacherInfo } from "../../../types/types.teacher";
const TeacherProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const teacherProfile: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {teacherProfile.teacherName} Profile
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">TeacherName</label>
          <p className="text-gray-800">{teacherProfile.teacherName}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">PhoneNumber</label>
          <p className="text-gray-800">{teacherProfile.phoneNumber}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">Teacher Email</label>
          <p className="text-gray-800">{teacherProfile.email}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">Subject</label>
          <p className="text-gray-800">{teacherProfile.selectedSubject}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">ClassName</label>
          <p className="text-gray-800">{teacherProfile.ClassName}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600 font-semibold">ClassName ID</label>
          <p className="text-gray-800">{teacherProfile.classId}</p>
        </div>
      </div>
      <div className="mt-6">
        <Button
          className="bg-gray-800 text-white  rounded hover:bg-gray-900 focus:outline-none"
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
          <Input placeholder="Enter your New Name ..." className="mb-3" />
          <Input placeholder="Enter Your PhoneNummber ..."></Input>
          <Button className="mt-3">Save</Button>
        </Modal>
      </div>
    </div>
  );
};

export default TeacherProfile;
