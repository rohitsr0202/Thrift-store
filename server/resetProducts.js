import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./src/models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const supportedMimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const product = {
  name: "New balance 530",
  price: 999,
  description: "Classic New Balance 530 shoe",
  video: "",
  category: "shoes",
};

const imageDir = path.join(__dirname, "../client/src/assets/Images");
const imagePrefix = "Newbalance530Img";

const getImageNumber = (filename) => {
  const match = filename.match(/(\d+)(?=\D*$)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const fileToDataUri = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = supportedMimeTypes[extension];

  if (!mimeType) {
    throw new Error(`Unsupported image type: ${extension}`);
  }

  const fileBuffer = await fs.readFile(filePath);
  return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
};

const loadProductImages = async () => {
  const entries = await fs.readdir(imageDir, { withFileTypes: true });
  const filenames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => filename.startsWith(imagePrefix))
    .filter((filename) => supportedMimeTypes[path.extname(filename).toLowerCase()])
    .sort((a, b) => getImageNumber(a) - getImageNumber(b));

  if (filenames.length === 0) {
    throw new Error(`No "${imagePrefix}" images found in ${imageDir}`);
  }

  const images = [];

  for (const filename of filenames) {
    images.push(await fileToDataUri(path.join(imageDir, filename)));
  }

  return { filenames, images };
};

const main = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI or MONGO_URI in server/.env.");
  }

  const { filenames, images } = await loadProductImages();

  await mongoose.connect(mongoUri);
  await Product.deleteMany({});
  await Product.create({ ...product, images });
  await mongoose.disconnect();

  console.log(`Reset products collection.`);
  console.log(`Created "${product.name}" with ${images.length} image(s): ${filenames.join(", ")}`);
};

main().catch(async (error) => {
  console.error(`Reset failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
