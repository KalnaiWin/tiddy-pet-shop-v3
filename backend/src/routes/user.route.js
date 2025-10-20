import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { protectRoute, veriyAdmin } from "../middleware/auth.middlware.js";
import { addNewUser, banUser, deleteUser, getAllUser, selectRole, viewUserProfile } from "../controller/user.controller.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute, veriyAdmin);

router.get("/all", getAllUser);
router.put("/edit-role/:id", selectRole);
router.post("/add", addNewUser);
router.delete("/delete/:id", deleteUser);
router.get("/profile/:id", viewUserProfile);
router.put("/ban/:id", banUser);

export default router;