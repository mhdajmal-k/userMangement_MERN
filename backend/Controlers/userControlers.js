import asyncHandler from "express-async-handler";
import { User } from "../Model/useModel.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../util/generateToke.js";

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
    return res.status(409).send({ error: "user Already exist", success: true });
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
    return res.status(400).send({ error: error.message, success: false });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email) {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      res.status(200);
      throw new Error("Invalid credential");
    }
    const token = generateToken(validUser._id);
    const toPassUserData = {
      id: validUser._id,
      name: validUser.userName,
      email: validUser.email,
    };
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({ message: "Logged in successfully", user: toPassUserData });
  } else {
    res.status(400).json({ error: "Email is required" });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    if (req.userId !== req.params.id) {
      return res.status(401).json({ error: "Invalid user" });
    }
    const { name, email, ProfileImage } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { userName: name, email: email, profilePic: ProfileImage },
      { new: true }
    );
    console.log(updatedUser.profilePic, "this is the updated profile pic");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const toPassUserData = {
      id: updatedUser._id,
      name: updatedUser.userName,
      email: updatedUser.email,
      profileImage: updatedUser.profilePic,
    };
    // console.log(toPassUserData);
    res.status(201).json({ message: "Updated successfully", user: toPassUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

