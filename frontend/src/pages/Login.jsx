import React, { Fragment } from "react";
import NavBar from "../component/NavBar";
import Login from "../component/LoginPage";
import { ToastContainer } from 'react-toastify'

const LoginPage = () => {
  return (
    <Fragment>
      <NavBar />
      <Login />
      <ToastContainer/>
    </Fragment>
  );
};

export default LoginPage;
