import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    video: { type: String },

    // ✅ NEW FIELD
    category: { 
      type: String, 
      required: true, 
      enum: ["shoes", "clothes"] // optional but recommended
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;