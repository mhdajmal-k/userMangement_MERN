import express from "express";
import { loginPage,SingUp,login,updateUser } from "../Controlers/userControlers.js";
import { auth } from "../middilware/authMiddilware.js";

const router = express.Router();

router.get("/",loginPage)
router.post("/auth",SingUp)
router.post("/login",login)
router.put("/updateUser/:id",auth,updateUser)


export default router