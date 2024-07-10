import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SingUp";
import Protected from "./component/protect";
import Profile from "./pages/Profile";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashBoard from "./pages/AdminDashBoard";
import NotFound from "./pages/404";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLoginPage/>}/>
          <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
