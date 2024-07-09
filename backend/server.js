import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
dotenv.config();
const port = process.env.PORT || 3001;

import userRouter from "./Routers/userRouters.js";
import { errorHandler } from "./middilware/errorMiddware.js";
import { notFound } from "./middilware/errorHandiler.js";
import { connectDB } from "./config/dbconfig.js";
const app = express();

connectDB();
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}))
app.use(cookieParser())

app.use("/api", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
