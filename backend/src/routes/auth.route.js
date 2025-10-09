import express from "express";
import { login, logOut, signUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

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
