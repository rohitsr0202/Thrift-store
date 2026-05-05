import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },

    images: [{ type: String }], // image URLs or base64 data URIs

    video: { type: String },

    category: { 
      type: String, 
      required: true, 
      enum: ["shoes", "clothes", "middle"]
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
