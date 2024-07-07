import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <Fragment>
      <section className="flex justify-center bg-gray-200 items-center min-h-screen box-border">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-center font-bold uppercase m-3">Sign In</h1>
          <form>
            <label htmlFor="email" className="block m-2">Email</label>
            <input type="email" className="border w-full text-base m-2 pl-3 py-1 rounded focus:border-none" placeholder="Enter your email" />

            <label htmlFor="useName" className="block m-2">UserName</label>
            <input type="text" className="border w-full m-2 pl-3 py-1 rounded" placeholder="Enter UserName" />

            <label htmlFor="password" className="block mb-2 m-2">Password</label>
            <input type="password" className="border w-full m-2 pl-3 py-1 rounded" placeholder="Enter Password" />

            <div className="flex justify-center">
              <button type="button" className="bg-blue-600 text-white rounded px-3 py-2 mt-1 hover:opacity-70">Sign in</button>
            </div>
          </form>
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <span>
              <NavLink to={"/login"} className="text-blue-600">Login</NavLink>
            </span>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default SignUp;
