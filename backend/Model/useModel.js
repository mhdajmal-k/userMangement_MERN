import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        index:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export {User}