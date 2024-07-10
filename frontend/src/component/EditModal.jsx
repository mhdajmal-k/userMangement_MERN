import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "../redux/adminSlice";
import { succsess, waring } from "../utils/tostify";

const EditUserModal = ({ user, onClose }) => {
  const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("form edit");
    const {userName,email}=formData
    if(userName.trim()==""){
      return waring("username  is required") 
    }
    if(email.trim()=="")return waring("email is required")
    try {
      const response = await dispatch(updateUser(formData)).unwrap();
      console.log(response, "response");

      if (response.message) {
        succsess(response.message);
        setTimeout(() => {
          onClose(false);
        }, 1000);
      }
    } catch (error) {
      waring(error.error);
    }
  };
  const [formData, setFormData] = useState({
    userName: user.userName,
    email: user.email,
    id: user._id,
  });

  console.log(formData);
  const handelChange = (e) => {
    console.log("hi");
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={handelChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={handelChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
