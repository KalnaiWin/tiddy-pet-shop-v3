import cloudinary from "../lib/cloudinary.js";
import Product from "../model/Product.js";

export const getAllProducts = async (_, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error at getAllProucts: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  console.log("req.params.category:", category);

  let pathCategory = null;
  switch (category) {
    case "health-care":
      pathCategory = "Chăm sóc sức khoẻ";
      break;
    case "beauty":
      pathCategory = "Làm đẹp cho thú cưng";
      break;
    case "food":
      pathCategory = "Thức ăn cho thú cưng";
      break;
    case "hygience":
      pathCategory = "Vệ sinh cho thú cưng";
      break;
    case "accessory":
      pathCategory = "Phụ kiện cho thú cưng";
      break;
    default:
      pathCategory = "Khác";
      break;
  }

  console.log("Query category:", pathCategory);

  try {
    const productCategory = await Product.find({ category: pathCategory });
    if (!productCategory) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
    res.status(200).json(productCategory);
  } catch (error) {
    console.error("Error fetching product by category:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "This product is not exist" });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createProduct = async (req, res) => {
  const {
    name,
    description,
    fromPrice,
    toPrice,
    total,
    status,
    discount,
    category,
  } = req.body;

  console.log(req.body);

  try {
    if (!name || !description || !toPrice || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const productImages = req.files?.image || [];
    const typeImages = req.files?.typeImages || [];

    const uploadToCloudinary = (buffer, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    };

    let imageUrls = [];

    if (productImages.length > 0) {
      imageUrls = await Promise.all(
        productImages.map((file) => uploadToCloudinary(file.buffer, "products"))
      );
    } else if (req.body.image) {
      imageUrls = Array.isArray(req.body.image)
        ? req.body.image
        : [req.body.image];
    } else {
      return res.status(400).json({ message: "Product images are required" });
    }

    const parsedTypes = [];

    if (req.body["type[0][price]"] && typeImages.length > 0) {
      const typeUploadPromises = typeImages.map(async (file, i) => {
        const price = req.body[`type[${i}][price]`];
        const types = req.body[`type[${i}][types]`];

        if (!price || !types) {
          throw new Error(`Missing price or types for type at index ${i}`);
        }

        const imageUrl = await uploadToCloudinary(file.buffer, "products/type");

        return {
          price: Number(price),
          types,
          image: imageUrl,
        };
      });

      parsedTypes.push(...(await Promise.all(typeUploadPromises)));

      // ✅ Validate that we have the same number of types as images
      const typeCount = Object.keys(req.body).filter(
        (key) => key.startsWith("type[") && key.endsWith("][price]")
      ).length;
      if (parsedTypes.length !== typeCount) {
        return res.status(400).json({
          message: "Each product type must have an image",
        });
      }
    }

    const newProduct = new Product({
      name,
      description,
      fromPrice: fromPrice || 0,
      toPrice,
      image: imageUrls,
      total,
      status,
      discount,
      type: parsedTypes,
      category,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Failed in creating product: ", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "This product is not exist" });

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log("Failed in deleting product: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    fromPrice,
    toPrice,
    total,
    status,
    discount,
    category,
  } = req.body;

  // console.log("FILES:", req.files);
  // console.log("BODY:", req.body);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const uploadToCloudinary = (buffer, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    };

    // ✅ Handle product images
    const newImages = req.files?.image || [];
    const oldImages = req.body.oldImages
      ? Array.isArray(req.body.oldImages)
        ? req.body.oldImages
        : [req.body.oldImages]
      : [];

    let imageUrls = [...oldImages]; // Keep old images

    if (newImages.length > 0) {
      const uploadedUrls = await Promise.all(
        newImages.map((file) => uploadToCloudinary(file.buffer, "products"))
      );
      imageUrls = [...imageUrls, ...uploadedUrls]; // Add new images
    }

    // ✅ Handle type images
    const parsedTypes = [];
    const typeImages = req.files?.typeImages || [];

    if (req.body["type[0][price]"]) {
      let typeImageIndex = 0;

      const typeCount = Object.keys(req.body).filter((key) =>
        key.match(/^type\[\d+\]\[price\]$/)
      ).length;

      for (let i = 0; i < typeCount; i++) {
        const price = req.body[`type[${i}][price]`];
        const types = req.body[`type[${i}][types]`];
        const hasNewImage = req.body[`type[${i}][hasNewImage]`] === "true";
        const oldImage = req.body[`type[${i}][image]`];

        if (!price || !types) {
          return res.status(400).json({
            message: `Missing price or types for type at index ${i}`,
          });
        }

        let imageUrl;

        if (hasNewImage) {
          // New image uploaded - must have corresponding file
          if (typeImageIndex >= typeImages.length) {
            return res.status(400).json({
              message: `Missing image file for type at index ${i}`,
            });
          }
          imageUrl = await uploadToCloudinary(
            typeImages[typeImageIndex].buffer,
            "products/type"
          );
          typeImageIndex++;
        } else if (oldImage) {
          // Keep old image URL
          imageUrl = oldImage;
        } else {
          // No image provided at all
          return res.status(400).json({
            message: `Image is required for type at index ${i}`,
          });
        }

        parsedTypes.push({
          price: Number(price),
          types,
          image: imageUrl,
        });
      }
    } else {
      // No types in request, keep existing types
      parsedTypes.push(...product.type);
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.fromPrice = fromPrice !== undefined ? fromPrice : product.fromPrice;
    product.toPrice = toPrice || product.toPrice;
    product.image = imageUrls;
    product.total = total || product.total;
    product.status = status || product.status;
    product.discount = discount !== undefined ? discount : product.discount;
    product.type = parsedTypes.length > 0 ? parsedTypes : product.type;
    product.category = category || product.category;

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Failed in editing product: ", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
