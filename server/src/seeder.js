import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const products = [
  // 🔥 SHOES
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://cdn.culture-circle.com/media/img_url/Untitled_design_-_2026-02-25T134817.528.png",
      "https://cdn.culture-circle.com/media/img_url/Untitled_design_-_2026-02-25T134817.528.png",
      "https://cdn.culture-circle.com/media/img_url/Untitled_design_-_2026-02-25T134817.528.png",
      "https://cdn.culture-circle.com/media/img_url/Untitled_design_-_2026-02-25T134817.528.png",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "shoes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://cdn.shopify.com/s/files/1/0570/7389/3509/t/1/assets/02-04-2025-175342-img01.jpg",
      "https://cdn.shopify.com/s/files/1/0570/7389/3509/t/1/assets/02-04-2025-175342-img01.jpg",
      "https://cdn.shopify.com/s/files/1/0570/7389/3509/t/1/assets/02-04-2025-175342-img01.jpg",
      "https://cdn.shopify.com/s/files/1/0570/7389/3509/t/1/assets/02-04-2025-175342-img01.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "shoes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/106/089/021/original/1494005_01.jpg.jpeg",
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/106/089/021/original/1494005_01.jpg.jpeg",
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/106/089/021/original/1494005_01.jpg.jpeg",
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/106/089/021/original/1494005_01.jpg.jpeg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "shoes",
  },

  // 🔥 CLOTHES
  {
    name: "Lazy Eye Linen Shirt",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/LAZYEYELINENSHIRTINBROWN1.png",
      "https://www.jaywalking.in/cdn/shop/files/LAZYEYELINENSHIRTINBROWN1.png",
      "https://www.jaywalking.in/cdn/shop/files/LAZYEYELINENSHIRTINBROWN1.png",
      "https://www.jaywalking.in/cdn/shop/files/LAZYEYELINENSHIRTINBROWN1.png",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Patchwork Pants",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/PATCHWORKPANTS1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/PATCHWORKPANTS1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/PATCHWORKPANTS1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/PATCHWORKPANTS1.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Dancing Man Couching Jacket",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/dancingmancouchingjacket.png",
      "https://www.jaywalking.in/cdn/shop/files/dancingmancouchingjacket.png",
      "https://www.jaywalking.in/cdn/shop/files/dancingmancouchingjacket.png",
      "https://www.jaywalking.in/cdn/shop/files/dancingmancouchingjacket.png",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/A0126707-2CA9-4201-83C8-87FE6393F173.jpg",
      "https://www.jaywalking.in/cdn/shop/files/A0126707-2CA9-4201-83C8-87FE6393F173.jpg",
      "https://www.jaywalking.in/cdn/shop/files/A0126707-2CA9-4201-83C8-87FE6393F173.jpg",
      "https://www.jaywalking.in/cdn/shop/files/A0126707-2CA9-4201-83C8-87FE6393F173.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/23.jpg",
      "https://www.jaywalking.in/cdn/shop/files/23.jpg",
      "https://www.jaywalking.in/cdn/shop/files/23.jpg",
      "https://www.jaywalking.in/cdn/shop/files/23.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/5.jpg",
      "https://www.jaywalking.in/cdn/shop/files/5.jpg",
      "https://www.jaywalking.in/cdn/shop/files/5.jpg",
      "https://www.jaywalking.in/cdn/shop/files/5.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/25.jpg",
      "https://www.jaywalking.in/cdn/shop/files/25.jpg",
      "https://www.jaywalking.in/cdn/shop/files/25.jpg",
      "https://www.jaywalking.in/cdn/shop/files/25.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Badly Stitched Denim Jacket",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/BADLYSTITCHEDDENIMJACKET1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BADLYSTITCHEDDENIMJACKET1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BADLYSTITCHEDDENIMJACKET1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BADLYSTITCHEDDENIMJACKET1.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://daysforclothing.com/cdn/shop/files/1_da485e3f-ee4f-4384-a6d7-bf43bce19e9f.png",
      "https://daysforclothing.com/cdn/shop/files/1_da485e3f-ee4f-4384-a6d7-bf43bce19e9f.png",
      "https://daysforclothing.com/cdn/shop/files/1_da485e3f-ee4f-4384-a6d7-bf43bce19e9f.png",
      "https://daysforclothing.com/cdn/shop/files/1_da485e3f-ee4f-4384-a6d7-bf43bce19e9f.png",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Savile Jacket",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/savilejacket.jpg",
      "https://www.jaywalking.in/cdn/shop/files/savilejacket.jpg",
      "https://www.jaywalking.in/cdn/shop/files/savilejacket.jpg",
      "https://www.jaywalking.in/cdn/shop/files/savilejacket.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Samba",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/2_3b8f873f-f5fb-4f9a-b65e-2f48b563b2e2.jpg",
      "https://www.jaywalking.in/cdn/shop/files/2_3b8f873f-f5fb-4f9a-b65e-2f48b563b2e2.jpg",
      "https://www.jaywalking.in/cdn/shop/files/2_3b8f873f-f5fb-4f9a-b65e-2f48b563b2e2.jpg",
      "https://www.jaywalking.in/cdn/shop/files/2_3b8f873f-f5fb-4f9a-b65e-2f48b563b2e2.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
  {
    name: "Bleached Pocket Pants",
    price: 999,
    description: "Premium streetwear t-shirt",
    images: [
      "https://www.jaywalking.in/cdn/shop/files/BLEACHEDPOCKETPANTS2_1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BLEACHEDPOCKETPANTS2_1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BLEACHEDPOCKETPANTS2_1.jpg",
      "https://www.jaywalking.in/cdn/shop/files/BLEACHEDPOCKETPANTS2_1.jpg",
    ],
    video:
      "https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/3b5be455d13943a4a37b55935004aa94_d98c/Handball_Spezial_Shoes_Brown_IF6490_video.mp4",
    category: "clothes",
  },
];

const seedData = async () => {
  try {
    console.log("⏳ Seeding...");
    await Product.deleteMany(); // ⚠️ clears old data
    await Product.insertMany(products);
    console.log("✅ Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();