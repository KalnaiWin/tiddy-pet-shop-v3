import {
  ResetPasswordSuccessfully,
  sendEmailResetPassword,
  sendWelcomeEmail,
} from "../emails/emailHanlders.js";
import { ENV } from "../lib/env.js";
import { genrateToken } from "../lib/utils.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The length of password should be at least 6." });
    }

    const adminEmails = ENV.ADMIN_EMAILS.split(",");
    const role = adminEmails.includes(email) ? "admin" : "user";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && role === "user") {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existUserWithThisEmail = await User.findOne({ email: email });
    if (existUserWithThisEmail)
      return res
        .status(400)
        .json({ message: "This email has been already used." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.name, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email: ", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credential" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Creadentials" });
    genrateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
    });
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully." });
};

export const updateImageProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error in update profile: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userEmail = await User.findOne({ email: email });
    if (!userEmail) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate token reset
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 60 * 1000; // 1 minute

    userEmail.resetPasswordToken = resetToken;
    userEmail.resetPasswordExpires = resetTokenExpires;

    await userEmail.save();

    // send email
    await sendEmailResetPassword(
      userEmail.email,
      `${ENV.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // update password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    await ResetPasswordSuccessfully(user.email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword: ", error);
    res.status(400).json({ message: error.message });
  }
};
