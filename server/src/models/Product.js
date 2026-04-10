import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },

    // ✅ CHANGE THIS
    images: [{ type: String }], // array of image URLs

    video: { type: String },

    category: { 
      type: String, 
      required: true, 
      enum: ["shoes", "clothes"]
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;