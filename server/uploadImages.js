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

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toTitleWords = (value) =>
  value
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getImageNumber = (filename) => {
  const match = path.basename(filename, path.extname(filename)).match(/_(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const getProductKey = (filename) => {
  const basename = path.basename(filename, path.extname(filename));
  return basename.replace(/_\d+$/, "");
};

const resolveImageDir = async () => {
  const candidates = [
    process.env.IMAGE_DIR,
    path.join(__dirname, "images"),
    path.join(__dirname, "../client/src/assets"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    const absolutePath = path.resolve(__dirname, candidate);

    try {
      const stats = await fs.stat(absolutePath);
      if (stats.isDirectory()) return absolutePath;
    } catch {
      // Try the next configured folder.
    }
  }

  throw new Error(
    "No image folder found. Create server/images or set IMAGE_DIR in server/.env."
  );
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

const groupImagesByProduct = async (imageDir) => {
  const entries = await fs.readdir(imageDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => supportedMimeTypes[path.extname(filename).toLowerCase()]);

  if (files.length === 0) {
    throw new Error(`No supported images found in ${imageDir}`);
  }

  const groups = new Map();
  const forcedProductName = process.env.PRODUCT_NAME?.trim();

  for (const filename of files) {
    const productKey = forcedProductName || getProductKey(filename);
    const existingFiles = groups.get(productKey) || [];
    existingFiles.push(filename);
    groups.set(productKey, existingFiles);
  }

  return groups;
};

const updateProductImages = async (productKey, filenames, imageDir) => {
  const productName = process.env.PRODUCT_NAME?.trim() || toTitleWords(productKey);
  const sortedFilenames = filenames.sort((a, b) => getImageNumber(a) - getImageNumber(b));
  const imageDataUris = [];

  for (const filename of sortedFilenames) {
    imageDataUris.push(await fileToDataUri(path.join(imageDir, filename)));
  }

  if (process.env.DRY_RUN === "true") {
    console.log(
      `Dry run: Would update "${productName}" with ${imageDataUris.length} image(s): ${sortedFilenames.join(", ")}`
    );
    return;
  }

  const product = await Product.findOne({
    name: new RegExp(`^${escapeRegex(productName)}$`, "i"),
  });

  if (!product) {
    console.error(`Failed: "${productName}" was not found in MongoDB.`);
    return;
  }

  product.images = imageDataUris;
  await product.save();

  console.log(
    `Success: Updated "${product.name}" with ${imageDataUris.length} image(s): ${sortedFilenames.join(", ")}`
  );
};

const main = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in server/.env.");
  }

  const imageDir = await resolveImageDir();
  const groupedImages = await groupImagesByProduct(imageDir);

  console.log(`Using images from: ${imageDir}`);

  if (process.env.DRY_RUN !== "true") {
    await mongoose.connect(mongoUri);
  }

  for (const [productKey, filenames] of groupedImages.entries()) {
    try {
      await updateProductImages(productKey, filenames, imageDir);
    } catch (error) {
      console.error(`Failed: "${toTitleWords(productKey)}" - ${error.message}`);
    }
  }

  if (process.env.DRY_RUN !== "true") {
    await mongoose.disconnect();
  }
};

main().catch(async (error) => {
  console.error(`Upload failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
