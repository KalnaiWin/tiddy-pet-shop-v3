import express from "express";
import { login, logOut, signUp, updateImageProfile } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middlware.js";

const router = express.Router();



router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

router.put("/update-profile", protectRoute, updateImageProfile); 
router.get("/check", protectRoute, (req, res) => { 
  res.status(200).json(req.user);
});


router.get("/forget-password", (req, res) => {
  res.send("Forget password");
});

router.get("/reset-password", (req, res) => {
  res.send("Reset password");
});

export default router;
