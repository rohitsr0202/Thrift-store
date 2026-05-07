import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/Product.js";
import { products } from "./productCatalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const supportedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const imageDir = path.join(__dirname, "../client/src/assets/Images");
const imageBaseUrl = process.env.IMAGE_BASE_URL || "http://localhost:8000/product-images";

const getImageNumber = (filename) => {
  const match = filename.match(/(\d+)(?=\D*$)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const loadProductImageUrls = async (imagePrefix) => {
  const entries = await fs.readdir(imageDir, { withFileTypes: true });

  const filenames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => filename.startsWith(imagePrefix))
    .filter((filename) => supportedImageExtensions.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => getImageNumber(a) - getImageNumber(b));

  if (filenames.length === 0) {
    throw new Error(`No images found for prefix "${imagePrefix}" in ${imageDir}`);
  }

  return filenames.map((filename) => `${imageBaseUrl}/${encodeURIComponent(filename)}`);
};

const main = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI or MONGO_URI in server/.env.");
  }

  await mongoose.connect(mongoUri);

  for (const product of products) {
    const images = await loadProductImageUrls(product.imagePrefix);
    const { imagePrefix, ...productData } = product;

    await Product.findOneAndUpdate(
      { name: product.name },
      { ...productData, images },
      { upsert: true, returnDocument: "after", runValidators: true }
    );

    console.log(`Synced "${product.name}" with ${images.length} image(s).`);
  }

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error(`Sync failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
