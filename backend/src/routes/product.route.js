import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductByCategory,
} from "../controller/product.controller.js";
import { uploadProductImages } from "../middleware/upload.middleware.js";
import { protectRoute, veriyAdmin } from "../middleware/auth.middlware.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/all", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/:id", getProduct);
router.post("/create", veriyAdmin, uploadProductImages, createProduct);
router.put("/edit/:id", veriyAdmin, uploadProductImages, editProduct);
router.delete("/delete/:id", veriyAdmin, deleteProduct);

export default router;
