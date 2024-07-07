import express from "express";
import { loginPage } from "../Controlers/userControlers.js";

const router = express.Router();

router.get("/",loginPage)

export default router