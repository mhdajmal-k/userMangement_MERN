import express from 'express'
import { adminLogin,getUser,updateUser,createNewUser } from '../Controlers/adminControlers.js'
import { adminAuth } from '../middilware/authMiddilware.js'
const router=express.Router()

router.post("/login",adminLogin)
router.get("/getUsers",adminAuth,getUser)
router.put("/updateUser/:id",adminAuth,updateUser)
router.post("/createNewUser",adminAuth,createNewUser)


export default router