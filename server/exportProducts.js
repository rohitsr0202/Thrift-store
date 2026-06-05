import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/Product.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
const data = await Product.find({}, "name price description images video category");
console.log(JSON.stringify(data, null, 2));
await mongoose.disconnect();