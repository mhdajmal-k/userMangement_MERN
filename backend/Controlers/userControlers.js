import asyncHandler from "express-async-handler"

export const loginPage=asyncHandler(async(req,res)=>{
    res.status(200).send("hello")
})