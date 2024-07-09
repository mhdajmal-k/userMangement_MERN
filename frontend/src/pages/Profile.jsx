import React from 'react'
import NavBar from '../component/NavBar'
import UserProfile from '../component/Profile.jsx'
import { ToastContainer } from 'react-toastify'

const Profile = () => {
  return (
    <React.Fragment>
        <NavBar/>
        <UserProfile/>
        <ToastContainer/>
   
    </React.Fragment>
  )
}

export default Profile