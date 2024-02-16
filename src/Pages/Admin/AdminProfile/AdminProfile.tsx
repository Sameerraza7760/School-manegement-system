import { Button, Input, Modal } from "antd";
import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useAssignment from "../../../hooks/useAssignment";
import useAuth from "../../../hooks/useAuth";
import { initialState, reducer } from "../../../reducers/profilesReducer";
import Header from "../../components/Header/Header";

const AdminProfile = () => {
  const { uploadImage } = useAssignment();
  const { updateProfile, fetchAdminDataFromDatabase } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [file, setFile] = useState<File | null>(null);
  const adminProfile = useSelector((state: any) => state.admin.admin);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submitProfile = async () => {
    const url = await uploadImage(file);
    dispatch({ type: "SET_IMAGE", payload: url });

    try {
      await updateProfile(state, adminProfile.schoolid);

      await fetchAdminDataFromDatabase(adminProfile.schoolid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main className="col-span-9 bg-gray-100 mt-[40px] p-9 h-screen max-h-screen">
        <div className="max-w-3xl mx-auto text-center mb-8 mt-8">
          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-purple-500 cursor-pointer">
            <img
              src={adminProfile.image}
              alt="Admin Avatar"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-purple-800">
            {adminProfile.username}
          </h2>
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

        <div className="mt-4 text-center">
          <Button type="primary" className="bg-purple-600" onClick={showModal}>
            Update Profile
          </Button>
          <Modal
            title="Update Profile"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-600">
                Name:
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-gray-600">
                Phone Number:
              </label>
              <Input
                id="phoneNumber"
                placeholder="Enter your phone number"
                onChange={(e) =>
                  dispatch({
                    type: "SET_PHONE_NUMBER",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600">Upload Image:</label>

              <Input type="file" onChange={handleFileChange}></Input>
            </div>
            <Button
              className="bg-blue-800"
              type="primary"
              onClick={submitProfile}
            >
              Update Profile
            </Button>
          </Modal>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default AdminProfile;
