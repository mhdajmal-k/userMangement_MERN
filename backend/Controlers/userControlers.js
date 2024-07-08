import asyncHandler from "express-async-handler";
import { User } from "../Model/useModel.js";
import bcryptjs from "bcryptjs";

export const loginPage = asyncHandler(async (req, res) => {
  res.status(200).send("hello");
});

export const SingUp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({
    $or: [{ name: userName }, { email: email }],
  });
  if (existingUser) {
    console.log("from existing user");
    // throw new Error('Account Exists!!');
    return res
      .status(409)
      .send({ message: "user Already exist", success: true });
  }
  const hashingPassword = bcryptjs.hashSync(password, 10);
  const creatingNewUser = new User({
    userName,
    email,
    password: hashingPassword,
  });
  try {
    await creatingNewUser.save();
    return res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    console.log("this is from error");
    return res.status(400).send({ message: error.message, success: false });
  }
});
