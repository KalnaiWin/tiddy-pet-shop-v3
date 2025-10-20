import bcrypt from "bcryptjs";
import User from "../model/User.js";
import { genrateToken } from "../lib/utils.js";

export const getAllUser = async (_, res) => {
  try {
    const allUser = await User.find({});
    return res.status(200).json(allUser);
  } catch (error) {
    console.error("Error at get all user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const selectRole = async (req, res) => {
  const { id: userId } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "This user is not found" });
    }

    user.role = role;

    await user.save();

    return res.status(200).json({
      message: "Role changed successfully",
      user,
    });
  } catch (error) {
    console.error("Error change role user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const addNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "This email is already exist." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The length of password should be at least 6." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      genrateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
        role: newUser.role,
      });
    }
  } catch (error) {
    console.log("Error in creating user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "This user is not found" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "This user has been deleted." });
  } catch (error) {
    console.log("Failed in deleting user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const viewUserProfile = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "This user is not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error viewing user profile:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const banUser = async (req, res) => {
  const { id: userId } = req.params;
  let { banned, banReason } = req.body;

  try {
    banned = Number(banned);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "This user is not found" });
    }

    if (banned === 1 && (!banReason || banReason.trim().length === 0)) {
      return res
        .status(400)
        .json({ message: "Ban reason is required when banning a user." });
    }

    user.banned = banned;
    user.banReason = banned === 1 ? banReason.trim() : null;

    await user.save();

    return res.status(200).json({
      message:
        banned === 1 ? "User has been banned." : "User has been unbanned.",
      user,
    });
  } catch (error) {
    console.error("Error banning/unbanning user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
