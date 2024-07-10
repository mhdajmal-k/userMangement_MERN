import { json } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../Model/useModel.js";
import { generateToken } from "../util/generateToke.js";
import bcrypt from "bcryptjs";

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(404).json({ error: "email and password is required" });
  }
  const validatingEmail = await User.findOne({ email: email });
  if (!validatingEmail){
    return res.status(401).json({ error: "invalid credentials" });
  }
  if (validatingEmail.password == password&&validatingEmail.isAdmin) {
    console.log("hi form validata");
    const token = generateToken(validatingEmail._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({ message: "logged Successfully" });
  }else{
    return res.status(401).json({error:"invalid credentials"})
  }
});

export const getUser = asyncHandler(async (req, res) => {
  console.log("hi");
  const findUsers = await User.find({ isAdmin: false });
  console.log(findUsers);
  if (!findUsers) return res.status(404).json({ error: "users Not found" });
  const { password: pass, ...rest } = findUsers.toObject();
  res.status(200).json({ message: "got all user ", users: rest });
});

export const updateUser = asyncHandler(async (req, res) => {
  const validatingAdminId = await User.findById(req.adminId);
  console.log(validatingAdminId);
  if (!validatingAdminId)
    return res.status(403).json({ error: "forbidden not access to update" });

  const { id } = req.params;
  const { name, email } = req.body;
  if (!name && !email)
    return res.status(400).json({ error: "name and email is required" });
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userName: name, email: email },
    { new: true }
  );
  const { password: pass, ...rest } = updatedUser.toObject();
  if (!updateUser)
    return res.status(404).json({ error: "user Not found", user: rest });
  res
    .status(201)
    .json({ message: "user updated Successfully", user: updateUser });
});

export const createNewUser = asyncHandler(async (req, res) => {
  const validatingAdminId = await User.findById(req.adminId);
  if (!validatingAdminId)
    return res.status(403).json({ error: "forbidden not access to update" });
  const { name, password, email } = req.body;
  if (!name && !password && !email)
    return res.status(400).json({ error: "invalid required Data" });
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ error: "user already exist" });
  const hashingPassword = bcrypt.hashSync(password, 10);

  console.log(hashingPassword, "is the password");
  const newUser = new User({
    userName: name,
    email,
    password: hashingPassword,
  });
  await newUser.save();
  const { password: pass, ...rest } = newUser.toObject();
  console.log(rest, "this is the rest");
  res
    .status(201)
    .json({ message: "new user Created successFully", user: rest });
});
