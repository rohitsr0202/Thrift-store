import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/product-images",
  express.static(path.join(__dirname, "../../client/src/assets/Images"))
);

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔐 Auth Routes
app.use("/api/auth", authRoutes);

export default app;
