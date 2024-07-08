import express from "express";
import { loginPage,SingUp,login } from "../Controlers/userControlers.js";

const router = express.Router();

router.get("/",loginPage)
router.post("/auth",SingUp)
router.post("/login",login)


export default router