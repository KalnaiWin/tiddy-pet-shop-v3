import express from "express"
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { createProduct, deleteProduct, editProduct, getAllProducts } from "../controller/product.controller.js";

const router = express.Router();


router.use(arcjetProtection);

router.get("/all", getAllProducts);
router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;