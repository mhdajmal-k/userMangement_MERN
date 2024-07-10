import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/useSlice";
import { logOut } from "../redux/useSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    try {
      dispatch(logOut())
      const response = dispatch(logOutUser());
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-slate-500 w-full flex justify-between p-3 text-center shadow-md">
      <div>
        <h4>userManagement</h4>
      </div>
      {user?.name ? (
        <div className="flex  items-center max-w-full justify-evenly">
          <h3 className="mr-5">{user?.name}</h3>
          <NavLink to={"/profile"}>
            <h4 className=" mx-5 hover:underline cursor-pointer "> Profile</h4>
          </NavLink>
          <button
            className="cursor-pointer mr-6n bg-red-500 hover:underline rounded-md uppercase p-1 mr-10  "
            onClick={handleLogOut}
          >
            logOut
          </button>

          <img
            src={user.profileImage ? user.profileImage : "/image/profile.png"}
            className="h-6 w-6 mr-3 object-contain cursor-pointer rounded-full"
            alt="profilePic"
          />
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

export default React.memo(NavBar);
