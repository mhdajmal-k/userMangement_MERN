import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="bg-slate-500 w-full flex justify-between p-3 text-center shadow-md">
      <div>
        <h4>userManagement</h4>
      </div>
      {user?.name ? (
        <div className="flex ">
          <h3 className="mr-52">{user?.name}</h3>
          <NavLink to={"/logout"}><h6 className="cursor-pointer mr-6 ">log Out</h6></NavLink>    
        </div>
      ) : (
        <div className="flex cursor-pointer font-semibold">
          <NavLink to={"/login"}>
            <h4 className="pr-16"> signIn</h4>
          </NavLink>
          <NavLink to={"/signup"}>
            <h4 className="pr-3">signUp</h4>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
