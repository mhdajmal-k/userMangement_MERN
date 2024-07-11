import React, { useState } from "react";
import { succsess, waring } from "../utils/tostify";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { LoginUser } from "../redux/useSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {error,loading}=useSelector((state)=>state.user)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleForm =async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email.trim() == "") {

      return waring("email is required");
    }
    if (password.trim() == "") {
      return waring("password required");
    }
    try {
      const response=await dispatch(LoginUser(formData)).unwrap()

      if(response){
        succsess(response.message)
        
          navigate("/")
      
      }
     
    } catch (error) {
  
      waring(error.error)
    }
  };
  return (
    <React.Fragment>
      <section className="flex items-center justify-center bg-slate-200 min-h-screen">
        <div className="p-8 rounded-lg shadow-lg w-full bg bg-white max-w-sm">
          <h1 className="text-center font-bold uppercase m-3">Sign Up</h1>
          <form onSubmit={handleForm}>
            <label className="block m-2">Email:</label>
            <input
              className="block w-full p-1 rounded-md ring-1	ring-gray-900"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <label className="block m-2">Password:</label>
            <input
              className="min-w-full p-1 rounded-md ring-1 ring-gray-900"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              id="password"
              onChange={handleChange}
              autoComplete="password"
            />
            <div className="flex justify-center mt-4">
              <button
                className="items-center bg-blue-500 rounded-md p-1 m-2 w-16"
                type="submit"
              >
                {loading?"loading":"Log In"}
              </button>
            </div>
            {error&& <p className=" text-red-500 mb-1">{error}</p>}
           
          </form>
          <p className="text-base text-center">
            New User?
            <NavLink  to={"/signup"}>

            <span className="text-blue-500 cursor-pointer"> Sing up</span>
            </NavLink>

          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default React.memo(Login);
