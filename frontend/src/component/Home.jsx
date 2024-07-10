import React,{Fragment} from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
    const {user,loading}=useSelector((state)=>state.user)
  return (
   <Fragment>
    <div className='items-center flex justify-center h-screen bg-white'>
        <h1>WELCOME {user.name}</h1>
        <h4 >{user.email}</h4>
        
    </div>
   </Fragment>
  )
}

export default Home