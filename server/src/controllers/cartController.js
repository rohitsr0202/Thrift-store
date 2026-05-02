import CartItem from "../models/Cart.js";
import Product from "../models/Product.js";

const getPopulatedCart = () =>
  CartItem.find({})
    .populate("product")
    .sort({ updatedAt: -1 });

export const getCart = async (req, res) => {
  try {
    const items = await getPopulatedCart();
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, size = "", quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product id is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    const existingItem = await CartItem.findOne({ product: productId, size });

    if (existingItem) {
      existingItem.quantity += normalizedQuantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        product: productId,
        size,
        quantity: normalizedQuantity,
      });
    }

    const items = await getPopulatedCart();
    res.status(201).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);

    const item = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity: normalizedQuantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    const items = await getPopulatedCart();
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    const items = await getPopulatedCart();
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
