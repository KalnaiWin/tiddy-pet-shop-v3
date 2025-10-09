import express from "express";
import { signUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.get("/login", (req, res) => {
  res.send("Login");
});
router.get("/logout", (req, res) => {
  res.send("Sign Up");
});
router.get("/update-profile", (req, res) => {
  res.send("Update profile");
});
router.get("/check", (req, res) => {
  res.send("Check");
});
router.get("/forget-password", (req, res) => {
  res.send("Forget password");
});
router.get("/reset-password", (req, res) => {
  res.send("Reset password");
});

export default router;
