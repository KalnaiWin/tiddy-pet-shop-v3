import multer from "multer";

// Use memory storage so you can directly upload buffers to Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB per file
});

export const uploadProductImages = upload.fields([
  { name: "image", maxCount: 10 }, // product images
  { name: "typeImages", maxCount: 10 }, // type images
]);
