import cloudinary from "../lib/cloudinary.js";
import Product from "../model/Product.js";
import slugify from "slugify";

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
    image,
    total,
    status,
    discount,
    type,
    category,
  } = req.body;

  try {
    if (!name || !description || !toPrice || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(image) || image.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const imageUrls = await Promise.all(
      image.map(async (img) => {
        try {
          const result = await cloudinary.uploader.upload(img, {
            folder: "products",
          });
          return result.secure_url;
        } catch (err) {
          console.error("Cloudinary upload error:", err);
          throw new Error("Image upload failed");
        }
      })
    );

    const newProduct = new Product({
      name,
      description,
      fromPrice: fromPrice || 0,
      toPrice,
      image: imageUrls,
      total,
      status,
      discount,
      type,
      category,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Failed in creating product: ", error);
    res.status(500).json({ message: "Internal Server Error" });
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
  const { id: productId } = req.params;
  const {
    name,
    description,
    fromPrice,
    toPrice,
    image,
    total,
    status,
    discount,
    type,
    category,
  } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "This product is not exist" });

    let updatedImages = product.image;

    if (Array.isArray(image) && image.length > 0) {
      updatedImages = await Promise.all(
        image.map(async (img) => {
          const result = await cloudinary.uploader.upload(img, {
            folder: "products",
          });
          return result.secure_url;
        })
      );
    }

    // Update info product
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.fromPrice = fromPrice ?? product.fromPrice;
    product.toPrice = toPrice ?? product.toPrice;
    product.image = updatedImages;
    product.total = total ?? product.total;
    product.status = status ?? product.status;
    product.discount = discount ?? product.discount;
    product.category = category ?? product.category;
    if (Array.isArray(type) && type.length > 0) product.type = type;
    product.category = category ?? product.category;

    await product.save();

    return res.status(200).json({ message: "Updated product successfully" });
  } catch (error) {
    console.log("Failed in updating product: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
