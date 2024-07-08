import React,{Fragment} from 'react'
import NavBar from '../component/NavBar'
import SignUi from '../component/singUp'
import { ToastContainer } from 'react-toastify'

const SignUp = () => {
  return (
<Fragment>  
  <NavBar/>
  <SignUi/>
  <ToastContainer/>
</Fragment>
  )
}

export default SignUp