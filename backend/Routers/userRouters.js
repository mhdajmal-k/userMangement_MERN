import express from "express";
import { loginPage,SingUp } from "../Controlers/userControlers.js";

const router = express.Router();

router.get("/",loginPage)
router.post("/auth",SingUp)


export default router