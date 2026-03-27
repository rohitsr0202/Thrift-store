import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{product.name}</h1>

      <img src={product.image} width="300" />

      <h2>₹{product.price}</h2>

      <p>{product.description}</p>

<button onClick={() => navigate(`/checkout/${product._id}`)}>
  Buy Now
</button>    </div>
  );
};

export default ProductDetail;