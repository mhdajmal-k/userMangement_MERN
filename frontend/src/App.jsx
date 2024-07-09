import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SingUp";
import Protected from "./component/protect";
import Profile from "./pages/Profile";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={
            <Protected>
            <HomePage />
          </Protected> 
            } />
            <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
