import asyncHandler from "express-async-handler";
import { User } from "../Model/useModel.js";
import bcryptjs from "bcryptjs"

export const loginPage = asyncHandler(async (req, res) => {
  res.status(200).send("hello");
});

export const SingUp = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({
    $or: [{ name: userName }, { email: email }],
  });
  if (existingUser) res.status(409).send("user already exist");
  const hashingPassword=bcryptjs.hashSync(password,10)
  const creatingNewUser=new User({userName,email,password:hashingPassword})
  try {
    await creatingNewUser.save()
    res.status(201).send("user Created success full")
  } catch (error) {
    res.status(400).send("Validation error: " + error.message);
  }

});
