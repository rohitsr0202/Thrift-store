import axios from "./axios";

export const getCart = () => axios.get("/cart");

export const addToCart = ({ productId, size, quantity }) =>
  axios.post("/cart", { productId, size, quantity });

export const updateCartItem = (id, quantity) =>
  axios.patch(`/cart/${id}`, { quantity });

export const removeCartItem = (id) => axios.delete(`/cart/${id}`);
