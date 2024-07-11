import React, { useState } from "react";
import { succsess, waring } from "../utils/tostify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminLogin } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email.trim() == ""|| password.trim() == "") {
     waring("email and password is required");
     return
    }
    try {
  
      const response =await dispatch(adminLogin(formData)).unwrap();
      if (response.message) {
        succsess(response.message);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      waring(error.error);
    }
  };
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-2"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-2"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className={`w-full p-2 bg-blue-500 text-white rounded mt-4 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error ? (
              <p className="text-red-500 text-center mt-4">{error}</p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AdminLogin;
