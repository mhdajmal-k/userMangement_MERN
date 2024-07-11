import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createNewUser } from "../redux/adminSlice";
import { succsess, waring } from "../utils/tostify";

const CreateNewUser = ({  onCloseCreateModal }) => {
  const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const {name,email,password}=formData
    if(name.trim()==""){
      return waring("username  is required") 
    }
    if(email.trim()==""){
        return waring("email is required")
    }
    if(password.trim()==""){
        return waring("password is required")
    }
    try {
      const response = await dispatch(createNewUser(formData)).unwrap();



      if (response.message) {
        succsess(response.message);
        setTimeout(() => {
         onCloseCreateModal(false);
        }, 1000);
      }
    } catch (error) {
      waring(error.error);
    }
  };
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });


  const handelChange = (e) => {

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
              id="name"
              value={formData.name}
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
          <div className="mb-4">
            <label className="block text-gray-700">password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={handelChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={()=>onCloseCreateModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-500-600"
            >
              createNewUser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
