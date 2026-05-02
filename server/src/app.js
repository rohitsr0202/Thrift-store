import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔐 Auth Routes
app.use("/api/auth", authRoutes);

export default app;
