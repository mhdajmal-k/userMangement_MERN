import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='bg-slate-500 w-full flex justify-between p-3 text-center shadow-md'>
        <div>

        <h4>userManagement</h4>
        </div>
        <div className='flex cursor-pointer font-semibold'>
            <NavLink to={"/login"}> 
              
            <h4 className='pr-16'> signIn</h4>
            </NavLink>
            <NavLink to={"/signup"}>

            <h4 className='pr-3'>signUp</h4>
            </NavLink>
        </div>

    </nav>
  )
}

export default NavBar