import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3001;

import userRouter from "./Routers/userRouters.js"
import { errorHandler } from "./middilware/errorMiddware.js";
import { notFound } from "./middilware/errorHandiler.js";
import { connectDB } from "./config/dbconfig.js";
const app = express();

connectDB()

app.use("/api/user",userRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
