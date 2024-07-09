import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.user)
    console.log(user)
    useEffect(()=>{
        if(!user){
            navigate("/login")}
           
    },[user])
  return user?children:null
   
}

export default Protected