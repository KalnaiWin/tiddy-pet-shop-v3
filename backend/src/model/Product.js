import mongoose from "mongoose";

const productTypes = new mongoose.Schema({
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: true,
    },
    fromPrice: {
      type: Number,
      min: 0,
    },
    toPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    image: [
      {
        type: String,
        required: [true, "There should be at least one image"],
      },
    ],
    category: {
      type: String,
      enum: [
        "Chăm sóc sức khoẻ",
        "Làm đẹp cho thú cưng",
        "Thức ăn cho thú cưng",
        "Vệ sinh cho thú cưng",
        "Phụ kiện cho thú cưng",
        "Khác",
      ],
      default: "Khác",
    },
    rate: [
      {
        // rate by star
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        star: {
          type: Number,
          min: 1,
          max: 5,
          default: 4,
        },
      },
    ],
    total: {
      type: Number,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "outofstock"],
      default: "available",
    },
    discount: {
      type: Number,
      default: 0,
    },
    type: {
      type: [productTypes],
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
