import express from "express";
import {
  forgetPassword,
  login,
  logOut,
  resetPassword,
  signUp,
  updateImageProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middlware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

router.put("/update-profile", protectRoute, updateImageProfile);
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);


export default router;
