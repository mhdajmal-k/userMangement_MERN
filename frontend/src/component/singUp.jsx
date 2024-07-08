import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { succsess, waring } from "../utils/tostify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/useSlice";

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  // useEffect(()=>{
  //   if(error){
  //     waring(error)
  //   }
  // },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      const { userName, email, password } = formData;
      if (userName.trim() == "") {
        waring("name is required");
        return;
      }
      if (email.trim() == "") {
        return waring("email is required");
      }
      if (password.trim() == "") {
        return waring("password is required");
      }
      try {
        const response = await dispatch(registerUser(formData)).unwrap();
        if (response.success) {
          if (response.message == "user created") {
            succsess("Registered successFully");
          }
        }
      } catch (error) {
        waring(error.message);
      }
    }
  };

  return (
    <Fragment>
      <section className="flex justify-center bg-gray-200 items-center min-h-screen box-border">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-center font-bold uppercase m-3">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="useName" className="block m-2">
              UserName
            </label>
            <input
              type="text"
              id="userName"
              onChange={handleFormData}
              value={formData.userName}
              className="border w-full m-2 pl-3 py-1 rounded"
              placeholder="Enter UserName"
              autoComplete="username"
            />

            <label htmlFor="email" className="block m-2">
              Email
            </label>
            <input
              type="email"
              onChange={handleFormData}
              id="email"
              value={formData.email}
              className="border w-full text-base m-2 pl-3 py-1 rounded focus:border-none"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <label htmlFor="password" className="block mb-2 m-2">
              Password
            </label>
            <input
              type="password"
              onChange={handleFormData}
              id="password"
              value={formData.password}
              className="border w-full m-2 pl-3 py-1 rounded"
              placeholder="Enter Password"
              autoComplete="current-password"
            />

            <div className="flex justify-center">
              {loading ? (
                <button className="bg-blue-600 text-white rounded px-3 py-2 mt-1 hover:opacity-40">
                  Loading...
                </button>
              ) : (
                <button className="bg-blue-600 text-white rounded px-3 py-2 mt-1 hover:opacity-70">
                  Sign in
                </button>
              )}
            </div>
          </form>
          {error && <p className="text-red-500 font-bold">{error} </p>}
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <span>
              <NavLink to={"/login"} className="text-blue-600">
                Login
              </NavLink>
            </span>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default SignUp;
